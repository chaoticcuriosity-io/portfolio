"use client";
// Prod-safe sortable container. In view/production it renders children untouched; in dev edit
// mode it loads the dnd-kit-backed context. The require sits in a static NODE_ENV branch so
// dnd-kit is never bundled into production.
import { useEditing } from "./context";

let loadDnd = null;
if (process.env.NODE_ENV !== "production") {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  loadDnd = () => require("./SortableDnd").default;
}

export default function Sortable({ path, ids, strategy, children }) {
  const editing = useEditing();
  if (editing && loadDnd) {
    const Dnd = loadDnd();
    return <Dnd path={path} ids={ids} strategy={strategy}>{children}</Dnd>;
  }
  return <>{children}</>;
}
