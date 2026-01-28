type ClubCardProps = {
  club: {
    id: string;
    name: string;
    description?: string;
    tags?: string[];
    meeting_time?: string;
    skill_level?: string;
    join_link?: string;
  };
};

export default function ClubCard({ club }: ClubCardProps) {
  return (
    <article
      className="min-w-0 flex flex-col rounded-lg border border-gray-300 bg-white p-4
        shadow-sm transition-shadow hover:shadow-md sm:p-5"
    >
      <h2 className="text-lg font-semibold sm:text-xl">{club.name}</h2>
      {club.description && (
        <p className="mt-2 flex-1 text-sm text-gray-700 line-clamp-3 sm:line-clamp-4">
          {club.description}
        </p>
      )}
      {club.meeting_time && (
        <p className="mt-3 text-sm text-gray-500">Meeting: {club.meeting_time}</p>
      )}
      {club.skill_level && (
        <p className="text-sm text-gray-500">Level: {club.skill_level}</p>
      )}
      <div className="mt-4 flex flex-wrap gap-2 pt-2 sm:mt-auto">
        {club.tags?.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-600"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-4 flex justify-end">
        <a
          href={club.join_link ?? "#"}
          target={club.join_link ? "_blank" : undefined}
          rel={club.join_link ? "noopener noreferrer" : undefined}
          className="rounded-full bg-red-500 px-5 py-2 text-sm font-medium text-white
            transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          View Details
        </a>
      </div>
    </article>
  );
}
