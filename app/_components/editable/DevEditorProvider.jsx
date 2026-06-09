"use client";
// Dev-only provider: wires the zustand editing store into the shared EditingContext and
// mounts the editor toolbar. Loaded only under a NODE_ENV !== "production" branch.
import { useEffect } from "react";
import { EditingContext } from "./context";
import { useEditorStore } from "../../_editor/store";
import EditorRoot from "../../_editor/EditorRoot";

export default function DevEditorProvider({ initialContent, children }) {
  // Seed once; preserve the working copy across client navigations (layout persists).
  useEffect(() => {
    if (useEditorStore.getState().content == null) {
      useEditorStore.getState().seed(initialContent);
    }
  }, [initialContent]);

  const content = useEditorStore((s) => s.content) ?? initialContent;
  const editing = useEditorStore((s) => s.editing);
  const commit = useEditorStore((s) => s.commit);
  const move = useEditorStore((s) => s.move);
  const addItem = useEditorStore((s) => s.addItem);
  const removeItem = useEditorStore((s) => s.removeItem);
  const toggleSection = useEditorStore((s) => s.toggleSection);

  const value = { content, editing, commit, move, addItem, removeItem, toggleSection };

  return (
    <EditingContext.Provider value={value}>
      {children}
      <EditorRoot />
    </EditingContext.Provider>
  );
}
