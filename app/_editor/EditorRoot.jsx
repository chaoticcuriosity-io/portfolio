"use client";
// Dev-only floating toolbar: Edit toggle, undo/redo, discard, Save (writes content.json).
// Publish (git push) is wired in Phase 6.
import { useEffect, useState } from "react";
import { useEditorStore } from "./store";
import "./editor.css";

export default function EditorRoot() {
  const [mounted, setMounted] = useState(false);
  const [saving, setSaving] = useState(false);
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
        </>
      )}
    </div>
  );
}
