"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { Club } from "@/components/ClubsWithTagFilter";

const STORAGE_KEY = "savedClubs";

// Cache last raw string + parsed result so the same array reference is
// returned when nothing has changed — required by useSyncExternalStore.
let cachedRaw: string | null = undefined as unknown as string | null;
let cachedClubs: Club[] = [];

function readFromStorage(): Club[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === cachedRaw) return cachedClubs;
    cachedRaw = raw;
    if (!raw) {
      cachedClubs = [];
      return cachedClubs;
    }
    const parsed = JSON.parse(raw) as unknown;
    cachedClubs = Array.isArray(parsed) ? (parsed as Club[]) : [];
    return cachedClubs;
  } catch {
    cachedClubs = [];
    return cachedClubs;
  }
}

function writeToStorage(clubs: Club[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clubs));
    window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY }));
  } catch {
    // ignore storage errors (e.g. private browsing quota)
  }
}

// useSyncExternalStore subscriber — notified whenever saved clubs change
function subscribe(callback: () => void) {
  const handler = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY || e.key === null) callback();
  };
  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
}

// Stable empty array for the server snapshot (never changes reference)
const EMPTY: Club[] = [];

export function useSavedClubs() {
  const savedClubs = useSyncExternalStore(
    subscribe,
    readFromStorage,
    // Server snapshot — always the same stable reference
    () => EMPTY,
  );

  const isSaved = useCallback(
    (id: string) => savedClubs.some((c) => c.id === id),
    [savedClubs],
  );

  const toggleSave = useCallback((club: Club) => {
    const current = readFromStorage();
    const exists = current.some((c) => c.id === club.id);
    const next = exists
      ? current.filter((c) => c.id !== club.id)
      : [...current, club];
    writeToStorage(next);
  }, []);

  return { savedClubs, isSaved, toggleSave };
}
