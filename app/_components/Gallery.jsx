"use client";
import { useState, useEffect, useCallback } from "react";
import { isVideo } from "../_data/site";
import { useEditorCtx } from "./editable/context";
import EditableMedia, { folderFromSrc } from "./editable/EditableMedia";
import EditableText from "./editable/EditableText";
import Sortable from "./editable/Sortable";
import SortableItem from "./editable/SortableItem";
import { DragHandle, RemoveButton } from "./editable/controls";

let loadLibrary = null;
if (process.env.NODE_ENV !== "production") {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  loadLibrary = () => require("./editable/MediaLibrary").default;
}

function AddMediaTile({ basePath, folder, addItem }) {
  const [picking, setPicking] = useState(false);
  const MediaLibrary = picking && loadLibrary ? loadLibrary() : null;
  return (
    <>
      <button type="button" className="tile cc-add-tile" onClick={() => setPicking(true)}>
        + Add media
      </button>
      {MediaLibrary && (
        <MediaLibrary
          folder={folder}
          currentSrc={null}
          onClose={() => setPicking(false)}
          onPick={(src) => { setPicking(false); if (src) addItem(basePath, { src, alt: "" }); }}
        />
      )}
    </>
  );
}

export default function Gallery({ items, basePath }) {
  const { editing, removeItem, addItem } = useEditorCtx();
  const [open, setOpen] = useState(null); // index or null

  const close = useCallback(() => setOpen(null), []);
  const prev = useCallback(() => setOpen((i) => (i === null ? i : (i - 1 + items.length) % items.length)), [items.length]);
  const next = useCallback(() => setOpen((i) => (i === null ? i : (i + 1) % items.length)), [items.length]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, prev, next]);

  const cur = open === null ? null : items[open];
  const defaultFolder = (/\.([^.]+)\.media$/.exec(basePath || "")?.[1]) || "personal";

  const tile = (it, i, s) => {
    const media = (
      <EditableMedia path={`${basePath}.${i}.src`} src={it.src} folder={folderFromSrc(it.src) || defaultFolder}>
        {isVideo(it.src) ? (
          <video src={it.src} muted loop autoPlay playsInline preload="metadata" />
        ) : (
          <img src={it.src} alt={it.alt || ""} loading="lazy" />
        )}
      </EditableMedia>
    );
    const cap = it.caption
      ? (editing
          ? <EditableText as="span" className="tile-cap" value={it.caption} path={`${basePath}.${i}.caption`} />
          : <span className="tile-cap">{it.caption}</span>)
      : null;

    if (!editing) {
      return (
        <button className="tile" onClick={() => setOpen(i)} aria-label={it.alt || "media"}>
          {media}
          {cap}
        </button>
      );
    }
    return (
      <div className="tile cc-item" ref={s.setNodeRef} style={s.style}>
        <DragHandle handle={s.handle} />
        <RemoveButton onClick={() => removeItem(basePath, i)} label="Remove media" />
        {media}
        {cap}
      </div>
    );
  };

  return (
    <>
      <div className="gallery">
        <Sortable path={basePath} ids={items.map((it) => it.src)} strategy="rect">
          {items.map((it, i) => (
            <SortableItem key={it.src} id={it.src} render={(s) => tile(it, i, s)} />
          ))}
        </Sortable>
        {editing && <AddMediaTile basePath={basePath} folder={defaultFolder} addItem={addItem} />}
      </div>

      {cur && (
        <div className="lightbox" onClick={close} role="dialog" aria-modal="true">
          <button className="lb-close" onClick={close} aria-label="Close">×</button>
          <button className="lb-nav lb-prev" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous">‹</button>
          <figure className="lb-figure" onClick={(e) => e.stopPropagation()}>
            {isVideo(cur.src) ? (
              <video src={cur.src} controls autoPlay loop playsInline />
            ) : (
              <img src={cur.src} alt={cur.alt || ""} />
            )}
            {(cur.caption || cur.alt) && <figcaption>{cur.caption || cur.alt}</figcaption>}
          </figure>
          <button className="lb-nav lb-next" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next">›</button>
        </div>
      )}
    </>
  );
}
