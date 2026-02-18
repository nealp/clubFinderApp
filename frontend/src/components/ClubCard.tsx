"use client";

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

type ClubCardProps = {
  club: Club;
  onClick: () => void;
};

export default function ClubCard({ club, onClick }: ClubCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full flex-col rounded-lg border border-gray-300 bg-white p-4 text-left shadow-sm transition-shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:min-h-[320px] lg:min-h-[360px]"
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
      <p
        className="text-sm text-gray-500 mb-1 line-clamp-3"
        title={club.meeting_time ?? undefined}
      >
        Meeting Time: {club.meeting_time}
      </p>
      <div className="mt-auto flex justify-end">
        <span className="rounded-full bg-red-500 px-5 py-2 text-sm font-medium text-white">
          View Details
        </span>
      </div>
    </button>
  );
}
