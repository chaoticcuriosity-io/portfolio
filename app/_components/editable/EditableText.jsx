"use client";
// Inline plain-text editor. Renders identical view-mode markup (<As className>{value}</As>);
// only attaches contentEditable behaviour when editing.
import { useRef } from "react";
import { useEditing, useEditorCtx } from "./context";
import { escapeHtml } from "./tokens";

export default function EditableText({ value, path, as: As = "span", className, multiline = false }) {
  const editing = useEditing();
  const { commit } = useEditorCtx();
  const ref = useRef(null);

  if (!editing) {
    return <As className={className}>{value}</As>;
  }

  return (
    <As
      ref={ref}
      className={(className ? className + " " : "") + "cc-edit"}
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      data-cc-edit="text"
      onPaste={(e) => {
        e.preventDefault();
        const text = e.clipboardData.getData("text/plain");
        document.execCommand("insertText", false, multiline ? text : text.replace(/\s*\n\s*/g, " "));
      }}
      onKeyDown={(e) => {
        if (!multiline && e.key === "Enter") {
          e.preventDefault();
          ref.current?.blur();
        }
      }}
      onBlur={() => {
        const raw = ref.current?.innerText ?? "";
        const clean = multiline ? raw.replace(/\s+$/, "") : raw.replace(/\s+/g, " ").trim();
        if (clean !== value) commit(path, clean);
      }}
      dangerouslySetInnerHTML={{ __html: escapeHtml(value) }}
    />
  );
}
