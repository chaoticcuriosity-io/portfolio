"use client";
// Dev-only: binds one item to dnd-kit's useSortable and hands the props to `render`.
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function SortableItemDnd({ id, render }) {
  const { setNodeRef, transform, transition, attributes, listeners, isDragging } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    ...(isDragging ? { zIndex: 50, opacity: 0.8, cursor: "grabbing" } : {}),
  };
  return render({ setNodeRef, style, handle: { ...attributes, ...listeners }, isDragging });
}
