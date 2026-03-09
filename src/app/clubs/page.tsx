'use client';

import { useState } from 'react';
import Link from 'next/link';
import ClubCard from '@/components/ClubCard';
import SearchBar from '@/components/SearchBar';

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

const placeholderClubs: Club[] = [
  {
    id: '1',
    name: 'Club 1',
    description: 'This is the first placeholder club.',
    tags: ['placeholder'],
    meeting_time: 'Fridays at 5 PM',
    skill_level: 'Beginner',
    join_link: 'https://google.com',
    socials: { instagram: 'https://google.com', tiktok: 'https://google.com' },
  },
  {
    id: '2',
    name: 'Club 2',
    description: 'This is the second placeholder club.',
    tags: ['placeholder'],
    meeting_time: 'Saturdays at 3 PM',
    skill_level: 'Intermediate',
    join_link: 'https://google.com',
    socials: { instagram: 'https://google.com', tiktok: 'https://google.com' },
  },
];

export default function ClubsPage() {
  const [filteredClubs, setFilteredClubs] = useState<Club[]>(placeholderClubs);

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 relative">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">Clubs</h1>
            <p className="mt-2 text-gray-600">All Clubs:</p>
          </div>
          <Link
            href="/clubs/add"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-500 text-white shadow-lg transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            title="Add a club"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </Link>
        </div>
        <div className="mt-4">
          <SearchBar clubs={placeholderClubs} onFilteredChange={setFilteredClubs} />
        </div>
        <div
          className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6
            lg:grid-cols-3 lg:gap-8 xl:grid-cols-4"
        >
          {filteredClubs.map((club) => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>
      </div>
    </main>
  );
}
