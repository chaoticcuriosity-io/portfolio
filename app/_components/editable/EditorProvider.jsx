"use client";
// Phase 2: a static, read-only provider seeded from the server with the content object.
// The dev-only editing layer (zustand store, edit toggle, mutators) is layered on in Phase 3
// by replacing the value provided here — Views consume the same context either way.
import { EditingContext } from "./context";

const noop = () => {};

export default function EditorProvider({ initialContent, children }) {
  const value = {
    content: initialContent,
    editing: false,
    commit: noop,
    move: noop,
    addItem: noop,
    removeItem: noop,
    toggleSection: noop,
  };
  return <EditingContext.Provider value={value}>{children}</EditingContext.Provider>;
}
