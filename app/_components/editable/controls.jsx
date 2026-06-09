"use client";
// Small inline edit controls. Each renders nothing (or passes through) in view mode.
import { useEditing, useEditorCtx } from "./context";

export function DragHandle({ handle }) {
  return (
    <span className="cc-drag" {...handle} title="Drag to reorder" aria-label="Drag to reorder">⠿</span>
  );
}

export function RemoveButton({ onClick, label = "Remove" }) {
  return (
    <button
      type="button"
      className="cc-remove"
      title={label}
      aria-label={label}
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); onClick(); }}
    >
      ×
    </button>
  );
}

export function AddButton({ onClick, children }) {
  const editing = useEditing();
  if (!editing) return null;
  return (
    <button type="button" className="cc-add" onClick={(e) => { e.preventDefault(); onClick(); }}>
      + {children}
    </button>
  );
}

// Accent colour picker (edit mode only; no view-mode output).
export function ColorField({ value, path, label = "Accent" }) {
  const editing = useEditing();
  const { commit } = useEditorCtx();
  if (!editing) return null;
  return (
    <label className="cc-color" title={`${label} colour`}>
      <input type="color" value={value} onChange={(e) => commit(path, e.target.value)} />
      <span>{value}</span>
    </label>
  );
}
