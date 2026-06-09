"use client";
// Dev-only editing store. Holds a mutable working copy of the site content, undo/redo
// history, and dirty/save state. Never imported in production (EditorProvider only pulls
// this in under a NODE_ENV !== "production" branch).
import { create } from "zustand";
import { getPath } from "../_components/editable/context";

// Immutable set of a (possibly nested, possibly array-indexed) dotted path.
export function setByPath(obj, path, value) {
  const keys = path.split(".");
  const clone = (v) => (Array.isArray(v) ? [...v] : { ...v });
  const root = clone(obj);
  let cur = root;
  for (let i = 0; i < keys.length - 1; i++) {
    cur[keys[i]] = clone(cur[keys[i]]);
    cur = cur[keys[i]];
  }
  cur[keys[keys.length - 1]] = value;
  return root;
}

const HISTORY_LIMIT = 60;

// Restore the edit toggle across the fast-refresh / full-reload that a Save triggers.
function initialEditing() {
  if (typeof window === "undefined") return false;
  try {
    return window.sessionStorage.getItem("cc-editing") === "1";
  } catch {
    return false;
  }
}

export const useEditorStore = create((set, get) => {
  // A mutation helper that pushes the prior content onto the undo stack.
  const mutate = (producer) =>
    set((s) => {
      if (s.content == null) return {};
      const next = producer(s);
      if (next === s.content) return {};
      return {
        content: next,
        dirty: true,
        past: [...s.past, s.content].slice(-HISTORY_LIMIT),
        future: [],
      };
    });

  return {
    content: null,
    saved: null,
    editing: initialEditing(),
    dirty: false,
    past: [],
    future: [],

    seed: (content) => set({ content, saved: content, dirty: false, past: [], future: [] }),

    setEditing: (editing) => {
      if (typeof window !== "undefined") {
        try {
          window.sessionStorage.setItem("cc-editing", editing ? "1" : "0");
        } catch {}
      }
      set({ editing });
    },

    commit: (path, value) =>
      mutate((s) => (getPath(s.content, path) === value ? s.content : setByPath(s.content, path, value))),

    move: (path, from, to) =>
      mutate((s) => {
        const arr = getPath(s.content, path);
        if (!Array.isArray(arr) || from === to || from < 0 || to < 0) return s.content;
        const copy = [...arr];
        const [item] = copy.splice(from, 1);
        copy.splice(to, 0, item);
        return setByPath(s.content, path, copy);
      }),

    addItem: (path, item, atIndex) =>
      mutate((s) => {
        const arr = getPath(s.content, path) || [];
        const copy = [...arr];
        copy.splice(atIndex == null ? copy.length : atIndex, 0, item);
        return setByPath(s.content, path, copy);
      }),

    removeItem: (path, index) =>
      mutate((s) => {
        const arr = getPath(s.content, path);
        if (!Array.isArray(arr)) return s.content;
        return setByPath(s.content, path, arr.filter((_, i) => i !== index));
      }),

    toggleSection: (id) =>
      mutate((s) => {
        const sections = s.content.home.sections.map((sec) =>
          sec.id === id ? { ...sec, visible: sec.visible === false } : sec
        );
        return setByPath(s.content, "home.sections", sections);
      }),

    undo: () =>
      set((s) => {
        if (!s.past.length) return {};
        return {
          content: s.past[s.past.length - 1],
          past: s.past.slice(0, -1),
          future: [s.content, ...s.future],
          dirty: true,
        };
      }),

    redo: () =>
      set((s) => {
        if (!s.future.length) return {};
        return {
          content: s.future[0],
          future: s.future.slice(1),
          past: [...s.past, s.content],
          dirty: true,
        };
      }),

    discard: () => set((s) => ({ content: s.saved, dirty: false, past: [], future: [] })),
    markSaved: () => set((s) => ({ saved: s.content, dirty: false })),
  };
});
