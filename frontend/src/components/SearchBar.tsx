'use client';

import { useState, useEffect } from 'react';

type Club = { id: string; name: string };

type Props = {
  clubs: Club[];
  onFilteredChange: (filtered: Club[]) => void;
};

export default function SearchBar({ clubs, onFilteredChange }: Props) {
  const [search, setSearch] = useState('');

  useEffect(() => {
    const q = search.trim().toLowerCase();
    const filtered = q
      ? clubs.filter((c) => c.name.toLowerCase().includes(q))
      : clubs;
    onFilteredChange(filtered);
  }, [search, clubs, onFilteredChange]);

  return (
    <div className="relative">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for clubs..."
        className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <span
        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
        aria-hidden
      >
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </span>
    </div>
  );
}
