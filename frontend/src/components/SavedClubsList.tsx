"use client";

import { useSavedClubs } from "@/hooks/useSavedClubs";
import type { Club } from "@/components/ClubsWithTagFilter";

export default function SavedClubsList() {
  const { savedClubs, isSaved, toggleSave } = useSavedClubs();

  return (
    <>
      <p className="mb-6 text-gray-600">Your bookmarked clubs.</p>
      <div className="mt-0 grid grid-cols-1 gap-6 sm:grid-cols-[repeat(auto-fill,minmax(260px,1fr))] sm:gap-8 lg:gap-10">
        {savedClubs.map((club: Club) => (
          <div
            key={club.id}
            className="flex flex-col rounded-lg border border-gray-300 p-4 shadow-sm transition-shadow hover:shadow-md sm:min-h-80 lg:min-h-90"
          >
            <h2 className="text-xl font-semibold mb-2">{club.name}</h2>
            <p className="text-sm text-gray-700 mb-4 line-clamp-3">
              {club.description}
            </p>

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

            {club.meeting_time && (
              <p className="text-sm text-gray-500 mb-1">
                Meeting Time: {club.meeting_time}
              </p>
            )}

            <div className="mt-auto flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => toggleSave(club)}
                aria-label="Unsave club"
                className="flex items-center gap-1.5 rounded-full border border-red-500 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
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
                Saved
              </button>
              <button className="text-white bg-red-500 hover:bg-red-600 rounded-full px-5 py-2">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
