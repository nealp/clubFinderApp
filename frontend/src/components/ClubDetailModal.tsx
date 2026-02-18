"use client";

import { useEffect, useState } from "react";

export type Club = {
  id: string;
  name: string;
  description?: string;
  tags?: string[];
  meeting_time?: string;
  skill_level?: string;
  join_link?: string;
  socials?: Record<string, string> | null;
  location?: string;
  category?: string;
  image?: string | null;
};

type ClubDetailModalProps = {
  club: Club | null;
  onClose: () => void;
  isOpen: boolean;
};

const ANIMATION_MS = 300;

export default function ClubDetailModal({
  club,
  onClose,
  isOpen,
}: ClubDetailModalProps) {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIsClosing(false);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, ANIMATION_MS);
  };

  if (!club) return null;

  const visible = isOpen && !isClosing;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) handleClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="club-modal-title"
      className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Dimmed background */}
      <div
        className="absolute inset-0 bg-black/50 transition-opacity duration-300"
        onClick={handleBackdropClick}
        aria-hidden
      />

      {/* Modal panel - slide up */}
      <div
        className={`relative w-full max-h-[90vh] sm:max-h-[85vh] sm:max-w-lg sm:rounded-xl rounded-t-xl bg-white shadow-xl flex flex-col transition-transform duration-300 ease-out ${
          visible ? "translate-y-0" : "translate-y-full sm:translate-y-4 sm:scale-95"
        }`}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 overscroll-contain">
          {/* Optional club image */}
          {club.image && (
            <div className="w-full aspect-video bg-gray-200 shrink-0 overflow-hidden rounded-t-xl">
              <img
                src={club.image}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          )}

          <div className="p-6 pb-8">
            <h2
              id="club-modal-title"
              className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4"
            >
              {club.name}
            </h2>

            {club.description && (
              <section className="mb-5">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Description
                </h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {club.description}
                </p>
              </section>
            )}

            {club.meeting_time && (
              <section className="mb-5">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  Meeting time
                </h3>
                <p className="text-gray-800">{club.meeting_time}</p>
              </section>
            )}

            {club.location && (
              <section className="mb-5">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  Location
                </h3>
                <p className="text-gray-800">{club.location}</p>
              </section>
            )}

            {(club.category || (club.tags && club.tags.length > 0)) && (
              <section className="mb-5">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Category
                </h3>
                <div className="flex flex-wrap gap-2">
                  {club.category && (
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
                      {club.category}
                    </span>
                  )}
                  {club.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {club.join_link && (
              <a
                href={club.join_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 rounded-full bg-red-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                View details / Join
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
