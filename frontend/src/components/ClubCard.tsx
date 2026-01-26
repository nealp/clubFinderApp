import TagChip from "./TagChip";
export type ClubCardProps = {
  name: string;
  description?: string;
  meetingTime?: string;
  skillLevel?: string;
  tags?: string[];
  onViewDetails?: () => void; // optional click handler
};

export default function ClubCard({
  name,
  description,
  meetingTime,
  skillLevel,
  tags,
  //   onViewDetails,
}: ClubCardProps) {
  return (
    <div
      className="border border-gray-300 rounded-lg p-4 hover:shadow-lg transition-shadow
      w-[280px] h-[360px] flex flex-col"
    >
      <h2 className="text-xl font-semibold mb-2">{name}</h2>

      {description ? (
        <p className="text-sm text-gray-700 mb-4">{description}</p>
      ) : null}

      {tags && tags.length > 0 ? (
        <div className="mb-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <TagChip key={tag} label={tag} />
          ))}
        </div>
      ) : null}

      {meetingTime ? (
        <p className="text-sm text-gray-500 mb-1">
          Meeting Time: {meetingTime}
        </p>
      ) : null}

      {skillLevel ? (
        <p className="text-sm text-gray-500 mb-1">Skill Level: {skillLevel}</p>
      ) : null}

      <div className="mt-auto flex justify-end">
        <button
          type="button"
          className="text-white bg-red-500 hover:bg-red-600 rounded-full px-5 py-2"
        >
          View Details(Card)
        </button>
      </div>
    </div>
  );
}
