"use client";

import PageContainer from "@/components/PageContainer";
import SavedClubsList from "@/components/SavedClubsList";
import { useSavedClubs } from "@/hooks/useSavedClubs";
import Link from "next/link";

export default function SavedPage() {
  const { savedClubs } = useSavedClubs();

  if (savedClubs.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center gap-4 text-center"
        style={{ minHeight: "calc(100vh - 8rem)" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-300"
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
        <p className="text-gray-500">No saved clubs yet.</p>
        <Link
          href="/clubs"
          className="rounded-full bg-red-500 px-5 py-2 text-sm font-medium text-white hover:bg-red-600 transition-colors"
        >
          Browse clubs
        </Link>
      </div>
    );
  }

  return (
    <PageContainer title="Saved Clubs">
      <SavedClubsList />
    </PageContainer>
  );
}
