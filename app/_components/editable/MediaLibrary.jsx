"use client";
// Dev-only media picker. Lists existing files from /api/dev/media and uploads new ones via
// /api/dev/upload. Rendered through a portal to <body> so it overlays everything, escaping the
// card/stacking context it is triggered from. Only ever rendered while editing.
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const FOLDERS = ["ai", "space", "xr", "robotics", "physics", "education", "music", "activism", "personal"];

export default function MediaLibrary({ currentSrc, folder, onPick, onClose }) {
  const [items, setItems] = useState(null);
  const [filter, setFilter] = useState("all");
  const [uploadFolder, setUploadFolder] = useState(FOLDERS.includes(folder) ? folder : "personal");
  const [busy, setBusy] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState(null);
  const fileRef = useRef(null);

  function load() {
    setError(null);
    fetch("/api/dev/media")
      .then((r) => r.json())
      .then((d) => setItems(d.items || []))
      .catch((e) => setError(e.message));
  }
  useEffect(load, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function upload(file) {
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("folder", uploadFolder);
      fd.append("file", file);
      const res = await fetch("/api/dev/upload", { method: "POST", body: fd });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(d.error || res.statusText);
      onPick(d.src); // immediately use the freshly uploaded asset
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  if (typeof document === "undefined") return null;

  const shown = (items || []).filter((it) => filter === "all" || it.folder === filter);

  const modal = (
    <div className="cc-ml-backdrop" onMouseDown={onClose} role="dialog" aria-modal="true">
      <div className="cc-ml" onMouseDown={(e) => e.stopPropagation()}>
        <div className="cc-ml-head">
          <strong>Media library</strong>
          <label className="cc-ml-filter">
            Show
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All folders</option>
              {FOLDERS.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </label>
          <span className="cc-eb-grow" />
          <label className="cc-ml-up">
            Upload to
            <select value={uploadFolder} onChange={(e) => setUploadFolder(e.target.value)}>
              {FOLDERS.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </label>
          <button type="button" className="cc-ml-upbtn" onClick={() => fileRef.current?.click()} disabled={busy}>
            {busy ? "Uploading…" : "⬆ Upload photo / video"}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*,video/*"
            hidden
            onChange={(e) => { upload(e.target.files?.[0]); e.target.value = ""; }}
          />
          <button type="button" className="cc-ml-close" onClick={onClose} aria-label="Close">×</button>
        </div>

        {error && <div className="cc-ml-error">{error}</div>}

        <div
          className={"cc-ml-grid" + (dragOver ? " cc-ml-dragover" : "")}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); upload(e.dataTransfer.files?.[0]); }}
        >
          {items === null ? (
            <div className="cc-ml-empty">Loading…</div>
          ) : shown.length === 0 ? (
            <div className="cc-ml-empty">No media here yet — drop a file or use Upload above.</div>
          ) : (
            shown.map((it) => (
              <button
                key={it.src}
                type="button"
                className={"cc-ml-tile" + (it.src === currentSrc ? " cc-sel" : "")}
                onClick={() => onPick(it.src)}
                title={it.name}
              >
                {it.video
                  ? <video src={it.src} muted loop playsInline preload="metadata" />
                  : <img src={it.src} alt="" loading="lazy" />}
                <span className="cc-ml-name">{it.name}</span>
              </button>
            ))
          )}
        </div>
        <div className="cc-ml-foot">Click a photo to use it · drag a file anywhere here to upload</div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
