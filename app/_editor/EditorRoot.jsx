"use client";
// Dev-only floating toolbar: Edit toggle, undo/redo, discard, Save (writes content.json).
// Publish (git push) is wired in Phase 6.
import { useEffect, useState } from "react";
import { useEditorStore } from "./store";
import "./editor.css";

export default function EditorRoot() {
  const [mounted, setMounted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [status, setStatus] = useState(null); // { ok, msg }

  const editing = useEditorStore((s) => s.editing);
  const dirty = useEditorStore((s) => s.dirty);
  const content = useEditorStore((s) => s.content);
  const canUndo = useEditorStore((s) => s.past.length > 0);
  const canRedo = useEditorStore((s) => s.future.length > 0);
  const setEditing = useEditorStore((s) => s.setEditing);
  const discard = useEditorStore((s) => s.discard);
  const undo = useEditorStore((s) => s.undo);
  const redo = useEditorStore((s) => s.redo);
  const markSaved = useEditorStore((s) => s.markSaved);

  useEffect(() => setMounted(true), []);

  // Keyboard: Cmd/Ctrl+Z undo, Cmd/Ctrl+Shift+Z redo (only while editing).
  useEffect(() => {
    if (!editing) return;
    const onKey = (e) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key.toLowerCase() === "z") {
        // Let contentEditable handle undo while a field is focused.
        if (document.activeElement?.isContentEditable) return;
        e.preventDefault();
        e.shiftKey ? redo() : undo();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [editing, undo, redo]);

  if (!mounted) return null;

  async function save() {
    setSaving(true);
    setStatus(null);
    try {
      const res = await fetch("/api/dev/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || res.statusText);
      markSaved();
      setStatus({ ok: true, msg: "Saved ✓" });
    } catch (e) {
      setStatus({ ok: false, msg: "Save failed: " + e.message });
    } finally {
      setSaving(false);
    }
  }

  async function publish() {
    const okToGo = window.confirm(
      "Publish your changes?\n\nThis commits content + media and pushes to GitHub. If this branch is connected to Vercel, the live site redeploys in ~1 minute."
    );
    if (!okToGo) return;

    setPublishing(true);
    setStatus(null);
    try {
      // Persist any unsaved edits first so the commit includes them.
      if (useEditorStore.getState().dirty) {
        const sres = await fetch("/api/dev/content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(useEditorStore.getState().content),
        });
        if (!sres.ok) throw new Error("Save before publish failed");
        markSaved();
      }
      const res = await fetch("/api/dev/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "content: site edits via visual editor" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.ok === false) {
        const lastErr =
          (data.steps || []).filter((s) => !s.ok).map((s) => (s.stderr || "").trim()).filter(Boolean).join(" · ") ||
          data.error ||
          res.statusText;
        throw new Error(lastErr);
      }
      setStatus(
        data.nothingToCommit
          ? { ok: true, msg: "Nothing new to publish" }
          : { ok: true, msg: `Published to ${data.branch} ✓ — Vercel redeploys shortly` }
      );
    } catch (e) {
      setStatus({ ok: false, msg: "Publish failed: " + e.message });
    } finally {
      setPublishing(false);
    }
  }

  return (
    <div className="cc-editor-bar" data-editing={editing ? "1" : "0"}>
      <button
        className="cc-eb-toggle"
        onClick={() => setEditing(!editing)}
        title={editing ? "Exit edit mode" : "Enter edit mode"}
      >
        <span className="cc-eb-led" /> {editing ? "Editing" : "Edit site"}
      </button>

      {editing && (
        <>
          <span className="cc-eb-sep" />
          <button className="cc-eb-icon" onClick={undo} disabled={!canUndo} title="Undo (Ctrl/Cmd+Z)">↶</button>
          <button className="cc-eb-icon" onClick={redo} disabled={!canRedo} title="Redo (Ctrl/Cmd+Shift+Z)">↷</button>
          <span className="cc-eb-sep" />
          {dirty && <span className="cc-eb-dirty" title="Unsaved changes">● Unsaved</span>}
          {status && <span className={status.ok ? "cc-eb-ok" : "cc-eb-err"}>{status.msg}</span>}
          <span className="cc-eb-grow" />
          <button className="cc-eb-btn" onClick={discard} disabled={!dirty}>Discard</button>
          <button className="cc-eb-btn cc-eb-save" onClick={save} disabled={!dirty || saving}>
            {saving ? "Saving…" : "Save"}
          </button>
          <button className="cc-eb-btn cc-eb-publish" onClick={publish} disabled={publishing}>
            {publishing ? "Publishing…" : "Publish"}
          </button>
        </>
      )}
    </div>
  );
}
