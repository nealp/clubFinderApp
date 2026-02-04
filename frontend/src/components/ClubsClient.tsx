"use client";
import React, { useMemo, useState } from "react";
type Club = {
  id: string;
  name: string;
  description?: string;
  tags?: string[];
  meeting_time?: string;
  skill_level?: string;
  join_link?: string;
  socials?: Record<string, string> | null;
};

function parseTags(raw: string[] | string | null | undefined): string[] {
  if (!raw) return [];
  //if it is in jsonb format then it's already an array
  if (Array.isArray(raw)) {
    return raw
      .map(String)
      .map((s) => s.trim())
      .filter(Boolean);
  }

  //if it's an object that's not an array extract values
  if (typeof raw === "object") {
    try {
      const vals = Object.values(raw).flat().map(String);
      return vals.map((s) => s.trim()).filter(Boolean);
    } catch {
      return [];
    }
  }

  //if raw is a string, needs to be parsed
  if (typeof raw === "string") {
    const str = raw.trim();
    try {
      const parsed = JSON.parse(str);
      if (Array.isArray(parsed)) {
        return parsed
          .map(String)
          .map((s) => s.trim())
          .filter(Boolean);
      }
    } catch {
      //not json
    }
    //if all else fails return comma-separated values
    return str
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }

  return [];
}

export default function ClubsClient({ clubs }: { clubs: Club[] }) {
  const [selectedTag, setSelectedTag] = useState<string>("All");

  // unique tags
  const uniqueTags = useMemo(() => {
    const seen = new Map<string, string>();
    clubs.forEach((club) => {
      parseTags(club.tags).forEach((tag) => {
        const key = tag.toLowerCase();
        if (!seen.has(key)) {
          seen.set(key, tag);
        }
      });
    });
    return Array.from(seen.values()).sort((a, b) => a.localeCompare(b));
  }, [clubs]);

  // filtered clubs
  const filtered = useMemo(() => {
    if (!selectedTag || selectedTag === "All") return clubs;
    const lowerTag = selectedTag.toLowerCase();
    return clubs.filter((club) =>
      parseTags(club.tags).some((tag) => tag.toLowerCase() === lowerTag),
    );
  }, [clubs, selectedTag]);

  return (
    <div className="min-h-screen bg-white text-black p-8">
      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold">Clubs</h1>

        <label className="text-sm text-gray-600 whitespace-nowrap">
          Filter:
        </label>
        <select
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
          className="border rounded px-3 py-1"
        >
          <option value="All">All</option>
          {uniqueTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <p className="mt-2 text-gray-600">Showing {filtered.length} clubs</p>

      <div className="mt-6 grid grid-cols-[repeat(auto-fit,280px)] gap-10 justify-left">
        {filtered.map((club) => (
          <div
            key={club.id}
            className="border border-gray-300 rounded-lg p-4 hover:shadow-lg transition-shadow
             w-[280px] h-[360px] flex flex-col"
          >
            <h2 className="text-xl font-semibold mb-2">{club.name}</h2>
            <p className="text-sm text-gray-700 mb-4 line-clamp-3">
              {club.description}
            </p>
            <p
              className="text-sm text-gray-500 mb-1 line-clamp-3"
              title={club.meeting_time ?? undefined}
            >
              Meeting Time: {club.meeting_time}
            </p>
            <div className="mt-auto flex justify-end">
              <button className="text-white bg-red-500 hover:bg-red-600 rounded-full px-5 py-2">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
