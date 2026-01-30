"use client";

import { useState, useMemo } from "react";
import ClubCard from "@/components/ClubCard";
import SearchBar from "@/components/SearchBar";
import FilterButton from "@/components/FilterButton";
type Club = {
  id: string;
  name: string;
  description?: string;
  tags?: string[];
  meeting_time?: string;
  skill_level?: string;
  join_link?: string;
  socials?: unknown;
};
const TIME_OPTIONS = ["Morning", "Afternoon", "Evening", "Weekend"];
const placeholderClubs: Club[] = [
  {
    id: "1",
    name: "Club 1",
    description: "This is the first placeholder club.",
    tags: ["placeholder"],
    meeting_time: "Fridays at 5 PM",
    skill_level: "Beginner",
    join_link: "https://google.com",
    socials: { instagram: "https://google.com", tiktok: "https://google.com" },
  },
  {
    id: "2",
    name: "Club 2",
    description: "This is the second placeholder club.",
    tags: ["placeholder"],
    meeting_time: "Saturdays at 3 PM",
    skill_level: "Intermediate",
    join_link: "https://google.com",
    socials: { instagram: "https://google.com", tiktok: "https://google.com" },
  },
];

export default function ClubsPage() {
  const [filteredClubs, setFilteredClubs] = useState<Club[]>(placeholderClubs);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const toggleTimeFilter = (time: string) => {
    setSelectedTimes((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time],
    );
  };
  const finalClubs = useMemo(() => {
    if (selectedTimes.length === 0) return filteredClubs;

    return filteredClubs.filter((club) => {
      const timeStr = club.meeting_time?.toLowerCase() || "";

      // Basic check: Does the club's time string contain our filter word?
      // Note: "Weekend" is checked against Saturday/Sunday
      return selectedTimes.some((filter) => {
        const f = filter.toLowerCase();
        if (f === "weekend")
          return timeStr.includes("saturday") || timeStr.includes("sunday");
        if (f === "evening")
          return (
            timeStr.includes("pm") &&
            !timeStr.includes("12") &&
            !timeStr.includes("1 pm")
          );
        return timeStr.includes(f);
      });
    });
  }, [filteredClubs, selectedTimes]);

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <h1 className="text-2xl font-bold sm:text-3xl">Clubs</h1>
        <p className="mt-2 text-gray-600">All Clubs:</p>
        <div className="mt-4 flex items-center gap-2 w-full">
          <div className="flex-1">
            <SearchBar
              clubs={placeholderClubs}
              onFilteredChange={setFilteredClubs}
            />
          </div>
          <FilterButton
            onClick={() => setShowFilters(!showFilters)}
            activeFiltersCount={selectedTimes.length}
          />
        </div>
        {showFilters && (
          <div className="mt-4 p-4 border rounded-xl bg-gray-50 animate-in fade-in slide-in-from-top-2">
            <p className="text-sm font-semibold text-gray-700 mb-3">
              Meeting Time
            </p>
            <div className="flex flex-wrap gap-2">
              {TIME_OPTIONS.map((time) => (
                <button
                  key={time}
                  onClick={() => toggleTimeFilter(time)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors
                    ${
                      selectedTimes.includes(time)
                        ? "bg-blue-600 text-white"
                        : "bg-white border border-gray-300 text-gray-600 hover:border-blue-400"
                    }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        )}
        <div
          className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6
    lg:grid-cols-3 lg:gap-8 xl:grid-cols-4"
        >
          {/* 👇 Switch filteredClubs to finalClubs here */}
          {finalClubs.map((club) => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>
        {finalClubs.length === 0 && (
          <div className="mt-12 text-center">
            <p className="text-gray-500">
              No clubs match those filters. Try adjusting your search!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
