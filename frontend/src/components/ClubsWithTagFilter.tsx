"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useSavedClubs } from "@/hooks/useSavedClubs";

import Link from "next/link";
export type Club = {
  id: string;
  name: string;
  description?: string;
  tags?: string[];
  meeting_time?: string;
  skill_level?: string;
  join_link?: string;
  socials?: Record<string, string> | null;
};

/** Build filter options from actual DB tags so spelling/grammar match; match is case-insensitive. */
function getUniqueTagsFromClubs(clubs: Club[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const club of clubs) {
    for (const tag of club.tags ?? []) {
      const t = tag.trim();
      if (!t) continue;
      const key = t.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      result.push(t);
    }
  }
  result.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
  return result;
}

function clubMatchesTag(club: Club, selectedTag: string): boolean {
  if (!club.tags?.length) return false;
  const want = selectedTag.toLowerCase().trim();
  return club.tags.some((t) => t.toLowerCase().trim() === want);
}

function FilterIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default function ClubsWithTagFilter({ clubs }: { clubs: Club[] }) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const { isSaved, toggleSave } = useSavedClubs();

  const filterTagOptions = useMemo(
    () => getUniqueTagsFromClubs(clubs),
    [clubs],
  );

  const filteredClubs =
    selectedTag == null
      ? clubs
      : clubs.filter((club) => clubMatchesTag(club, selectedTag));

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectTag = (tag: string | null) => {
    setSelectedTag(tag);
    setIsFilterOpen(false);
  };

  const displayLabel = selectedTag ?? "All Clubs";

  return (
    <main className="min-h-screen bg-white text-black p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-bold sm:text-3xl">Clubs</h1>
      <p className="mt-2 text-gray-600">All Clubs:</p>

      {/* Filter options = tags from DB so spelling/grammar match */}
      <div className="relative mt-4 inline-block" ref={filterRef}>
        <button
          type="button"
          onClick={() => setIsFilterOpen((open) => !open)}
          aria-expanded={isFilterOpen}
          aria-haspopup="listbox"
          className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          <span className="shrink-0 text-gray-500" aria-hidden>
            <FilterIcon />
          </span>
          <span>{displayLabel}</span>
          <span
            className={`shrink-0 transition-transform ${isFilterOpen ? "rotate-180" : ""}`}
          >
            <ChevronIcon />
          </span>
        </button>

        {isFilterOpen && (
          <div
            role="listbox"
            className="absolute left-0 top-full z-20 mt-1 min-w-55 max-w-[min(320px,90vw)] rounded-lg border border-gray-200 bg-white py-1 shadow-lg sm:min-w-65"
          >
            <div className="max-h-[70vh] overflow-y-auto py-1">
              <button
                type="button"
                role="option"
                aria-selected={selectedTag === null}
                onClick={() => handleSelectTag(null)}
                className={`w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-gray-100 ${
                  selectedTag === null
                    ? "bg-red-50 font-medium text-red-600"
                    : "text-gray-700"
                }`}
              >
                All Clubs
              </button>
              {filterTagOptions.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  role="option"
                  aria-selected={selectedTag === tag}
                  onClick={() => handleSelectTag(tag)}
                  className={`w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-gray-100 ${
                    selectedTag === tag
                      ? "bg-red-50 font-medium text-red-600"
                      : "text-gray-700"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-[repeat(auto-fill,minmax(260px,1fr))] sm:gap-8 lg:gap-10">
        {filteredClubs.map((club) => (
          <div
            key={club.id}
            className="flex flex-col rounded-lg border border-gray-300 p-4 shadow-sm transition-shadow hover:shadow-md sm:min-h-80 lg:min-h-90"
          >
            <h2 className="text-xl font-semibold mb-2">{club.name}</h2>
            <p className="text-sm text-gray-700 mb-4 line-clamp-3">
              {club.description}
            </p>
            {/* Tags displayed exactly as in DB */}
            {club.tags && club.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {club.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <p
              className="text-sm text-gray-500 mb-1 line-clamp-3"
              title={club.meeting_time ?? undefined}
            >
              Meeting Time: {club.meeting_time}
            </p>
            <div className="mt-auto flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => toggleSave(club)}
                aria-label={isSaved(club.id) ? "Unsave club" : "Save club"}
                className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  isSaved(club.id)
                    ? "border-red-500 bg-red-50 text-red-600 hover:bg-red-100"
                    : "border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill={isSaved(club.id) ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
                {isSaved(club.id) ? "Saved" : "Save"}
              </button>
              <button className="text-white bg-red-500 hover:bg-red-600 rounded-full px-5 py-2">
                View Details
              </button> */}
              <Link
                href={`/clubs/${club.id}`}
                className="text-white bg-red-500 hover:bg-red-600 rounded-full px-5 py-2 inline-block"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
