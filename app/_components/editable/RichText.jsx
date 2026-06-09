import { Fragment } from "react";

// Renders a token array [{ t, em?, strong?, b? }] to the exact <em>/<strong>/<b> markup the
// site used when this text was hardcoded. Plain tokens render as bare text nodes (no wrapper),
// so a token always sits between elements and React emits no hydration markers.
export function RichText({ tokens }) {
  return (
    <>
      {tokens.map((tok, i) => {
        if (tok.em) return <em key={i}>{tok.t}</em>;
        if (tok.strong) return <strong key={i}>{tok.t}</strong>;
        if (tok.b) return <b key={i}>{tok.t}</b>;
        return <Fragment key={i}>{tok.t}</Fragment>;
      })}
    </>
  );
}

// Flatten a token array to its plain-text string (used for alt text, titles, etc.).
export function tokensToText(tokens) {
  return tokens.map((t) => t.t).join("");
}
