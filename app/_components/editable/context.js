"use client";
// Shared editing context. In production (and in view mode) `editing` is false and `content`
// is the static content object; the editor (dev-only) swaps in a live store in Phase 3.
import { createContext, useContext } from "react";

const noop = () => {};

export const EditingContext = createContext({
  content: null,
  editing: false,
  commit: noop, // commit(path, value)
  move: noop, // move(path, fromIndex, toIndex)
  addItem: noop, // addItem(path, item, atIndex?)
  removeItem: noop, // removeItem(path, index)
  toggleSection: noop, // toggleSection(id)
});

export function useEditorCtx() {
  return useContext(EditingContext);
}

export function useEditing() {
  return useContext(EditingContext).editing;
}

export function getPath(obj, path) {
  if (!path) return obj;
  return path.split(".").reduce((o, k) => (o == null ? o : o[k]), obj);
}

// Read a slice of the live content by dotted path (or the whole object when omitted).
export function useContent(path) {
  const { content } = useContext(EditingContext);
  return getPath(content, path);
}
