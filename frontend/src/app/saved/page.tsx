'use client';

import { useApp } from '@/contexts/AppContext';
import ClubCard from '@/components/ClubCard';

export default function SavedPage() {
  const { savedClubs } = useApp();

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <h1 className="text-2xl font-bold sm:text-3xl">Saved Clubs</h1>
        <p className="mt-2 text-gray-600">
          {savedClubs.length === 0
            ? 'No saved clubs yet. Visit Clubs to save your favorites.'
            : `${savedClubs.length} saved club${savedClubs.length === 1 ? '' : 's'}`}
        </p>
        <div
          className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6
            lg:grid-cols-3 lg:gap-8 xl:grid-cols-4"
        >
          {savedClubs.map((club) => (
            <ClubCard
              key={club.id}
              club={{ ...club, desc: club.desc, description: club.desc }}
              showSaveButton={true}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
