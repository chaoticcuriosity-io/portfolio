"use client";
// Wraps an inline <img>/<video> element. In view mode it renders the child element verbatim
// (so production markup is unchanged); in edit mode it overlays a "Replace" control that opens
// the media library and commits the chosen src to `path`.
import { useState } from "react";
import { useEditing, useEditorCtx } from "./context";
import MediaLibrary from "./MediaLibrary";

export function folderFromSrc(src) {
  const m = /^\/media\/([^/]+)\/[^/]+$/.exec(src || "");
  return m ? m[1] : null;
}

export default function EditableMedia({ children, path, src, folder }) {
  const editing = useEditing();
  const { commit } = useEditorCtx();
  const [picking, setPicking] = useState(false);

  if (!editing) return children;

  const open = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setPicking(true);
  };

  const onPick = (newSrc) => {
    setPicking(false);
    if (newSrc && newSrc !== src) commit(path, newSrc);
  };

  return (
    <span className="cc-media" data-cc-media>
      {children}
      <span
        className="cc-media-edit"
        role="button"
        tabIndex={0}
        onClick={open}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") open(e); }}
        title="Replace media"
      >
        ⟳ Replace
      </span>
      {picking && (
        <MediaLibrary
          currentSrc={src}
          folder={folder || folderFromSrc(src) || "personal"}
          onPick={onPick}
          onClose={() => setPicking(false)}
        />
      )}
    </span>
  );
}
