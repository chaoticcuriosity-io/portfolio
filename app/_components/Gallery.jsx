"use client";
import { useState, useEffect, useCallback } from "react";
import { isVideo } from "../_data/site";

export default function Gallery({ items }) {
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

  return (
    <>
      <div className="gallery">
        {items.map((it, i) => (
          <button className="tile" key={it.src} onClick={() => setOpen(i)} aria-label={it.alt || "media"}>
            {isVideo(it.src) ? (
              <video src={it.src} muted loop autoPlay playsInline preload="metadata" />
            ) : (
              <img src={it.src} alt={it.alt || ""} loading="lazy" />
            )}
            {it.caption && <span className="tile-cap">{it.caption}</span>}
          </button>
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
