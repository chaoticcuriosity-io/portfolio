"use client";
// Inline rich-text editor for token-array fields (em/strong/b). View mode renders <RichText>
// inside <As> exactly as before; edit mode is a contentEditable host with bold/italic only.
import { useRef } from "react";
import { useEditing, useEditorCtx } from "./context";
import { RichText } from "./RichText";
import { tokensToHtml, nodesToTokens } from "./tokens";

export default function EditableRichText({ tokens, path, as: As = "span", className }) {
  const editing = useEditing();
  const { commit } = useEditorCtx();
  const ref = useRef(null);

  if (!editing) {
    return (
      <As className={className}>
        <RichText tokens={tokens} />
      </As>
    );
  }

  return (
    <As
      ref={ref}
      className={(className ? className + " " : "") + "cc-edit"}
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      data-cc-edit="rich"
      onPaste={(e) => {
        e.preventDefault();
        document.execCommand("insertText", false, e.clipboardData.getData("text/plain"));
      }}
      onKeyDown={(e) => {
        const mod = e.metaKey || e.ctrlKey;
        if (mod && e.key.toLowerCase() === "b") {
          e.preventDefault();
          document.execCommand("bold");
        } else if (mod && e.key.toLowerCase() === "i") {
          e.preventDefault();
          document.execCommand("italic");
        } else if (e.key === "Enter") {
          e.preventDefault();
          ref.current?.blur();
        }
      }}
      onBlur={() => {
        const next = nodesToTokens(ref.current);
        if (JSON.stringify(next) !== JSON.stringify(tokens)) commit(path, next);
      }}
      dangerouslySetInnerHTML={{ __html: tokensToHtml(tokens) }}
    />
  );
}
