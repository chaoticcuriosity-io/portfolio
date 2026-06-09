"use client";
// Dev-only: the dnd-kit context for a sortable list. Reorders the array at `path` via the
// editor store on drag end.
import { DndContext, closestCenter, PointerSensor, KeyboardSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, rectSortingStrategy, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useEditorStore } from "../../_editor/store";

const STRATEGIES = { rect: rectSortingStrategy, vertical: verticalListSortingStrategy };

export default function SortableDnd({ path, ids, strategy = "rect", children }) {
  const move = useEditorStore((s) => s.move);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const onDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;
    const from = ids.indexOf(active.id);
    const to = ids.indexOf(over.id);
    if (from < 0 || to < 0) return;
    move(path, from, to);
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext items={ids} strategy={STRATEGIES[strategy] || rectSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  );
}
