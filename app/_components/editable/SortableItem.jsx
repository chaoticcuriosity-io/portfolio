"use client";
// Prod-safe sortable item. `render` receives drag props to spread onto the item root + handle.
// In view/production the props are inert (no wrapper, no behaviour) so markup is unchanged.
import { useEditing } from "./context";

const INERT = { setNodeRef: undefined, style: undefined, handle: {}, isDragging: false };

let loadItem = null;
if (process.env.NODE_ENV !== "production") {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  loadItem = () => require("./SortableItemDnd").default;
}

export default function SortableItem({ id, render }) {
  const editing = useEditing();
  if (editing && loadItem) {
    const Item = loadItem();
    return <Item id={id} render={render} />;
  }
  return render(INERT);
}
