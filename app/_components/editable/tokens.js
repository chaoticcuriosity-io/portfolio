// Helpers to move between the {t, em?, strong?, b?} token model and contentEditable HTML.
// (Named tokens.js, not richtext.js, to avoid a case-insensitive-FS clash with RichText.jsx.)

export function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Token array → HTML string for seeding a contentEditable host.
export function tokensToHtml(tokens) {
  return tokens
    .map((t) => {
      let h = escapeHtml(t.t);
      if (t.em) h = `<em>${h}</em>`;
      if (t.strong) h = `<strong>${h}</strong>`;
      if (t.b) h = `<b>${h}</b>`;
      return h;
    })
    .join("");
}

// contentEditable DOM → token array. Recognises <em>/<i> and <strong>/<b>; collapses adjacent
// same-mark runs. Editing normalises legacy <b> to a strong mark (visually identical).
export function nodesToTokens(root) {
  const tokens = [];
  const push = (text, marks) => {
    if (!text) return;
    const tok = { t: text };
    if (marks.strong) tok.strong = true;
    if (marks.em) tok.em = true;
    const last = tokens[tokens.length - 1];
    if (last && Boolean(last.strong) === Boolean(tok.strong) && Boolean(last.em) === Boolean(tok.em)) {
      last.t += text;
    } else {
      tokens.push(tok);
    }
  };
  const walk = (node, marks) => {
    node.childNodes.forEach((child) => {
      if (child.nodeType === 3) {
        push(child.textContent, marks);
      } else if (child.nodeType === 1) {
        const tag = child.tagName.toLowerCase();
        if (tag === "br") {
          push("\n", marks);
          return;
        }
        const m = { ...marks };
        if (tag === "b" || tag === "strong") m.strong = true;
        if (tag === "i" || tag === "em") m.em = true;
        walk(child, m);
      }
    });
  };
  walk(root, {});
  return tokens.length ? tokens : [{ t: "" }];
}
