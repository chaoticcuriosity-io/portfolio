"use client";
// In production this is a static, read-only pass-through (editing always false) — none of the
// editor code below the dev branch is bundled, because `process.env.NODE_ENV` is statically
// replaced at build time and the dead branch (incl. its require) is eliminated.
import { EditingContext } from "./context";

const noop = () => {};

export default function EditorProvider({ initialContent, children }) {
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const DevEditorProvider = require("./DevEditorProvider").default;
    return <DevEditorProvider initialContent={initialContent}>{children}</DevEditorProvider>;
  }

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
