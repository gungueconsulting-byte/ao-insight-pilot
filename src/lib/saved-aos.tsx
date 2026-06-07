import { useEffect, useState, useCallback } from "react";

const KEY = "ao_saved";

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function useSavedAOs() {
  const [ids, setIds] = useState<string[]>([]);
  useEffect(() => {
    setIds(read());
    const h = () => setIds(read());
    window.addEventListener("storage", h);
    return () => window.removeEventListener("storage", h);
  }, []);
  const toggle = useCallback((id: string) => {
    const cur = read();
    const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
    localStorage.setItem(KEY, JSON.stringify(next));
    setIds(next);
  }, []);
  const remove = useCallback((id: string) => {
    const next = read().filter((x) => x !== id);
    localStorage.setItem(KEY, JSON.stringify(next));
    setIds(next);
  }, []);
  return { ids, toggle, remove, isSaved: (id: string) => ids.includes(id) };
}