"use client";
import { useState, useEffect, useCallback } from "react";
import { isVideo } from "../_data/site";
import { useEditing } from "./editable/context";
import EditableMedia, { folderFromSrc } from "./editable/EditableMedia";
import EditableText from "./editable/EditableText";

export default function Gallery({ items, basePath }) {
  const editing = useEditing();
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
  const Tile = editing ? "div" : "button";

  return (
    <>
      <div className="gallery">
        {items.map((it, i) => (
          <Tile
            className="tile"
            key={it.src}
            {...(editing ? {} : { onClick: () => setOpen(i), "aria-label": it.alt || "media" })}
          >
            <EditableMedia path={`${basePath}.${i}.src`} src={it.src} folder={folderFromSrc(it.src)}>
              {isVideo(it.src) ? (
                <video src={it.src} muted loop autoPlay playsInline preload="metadata" />
              ) : (
                <img src={it.src} alt={it.alt || ""} loading="lazy" />
              )}
            </EditableMedia>
            {it.caption &&
              (editing ? (
                <EditableText as="span" className="tile-cap" value={it.caption} path={`${basePath}.${i}.caption`} />
              ) : (
                <span className="tile-cap">{it.caption}</span>
              ))}
          </Tile>
        ))}
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
