type Club = {
  id: string;
  name: string;
  description?: string;
  tags?: string[];
  meeting_time?: string;
  skill_level?: string;
  join_link?: string;
  socials?: unknown; //json object with social media links
};

const placeholderClubs: Club[] = [
  {
    id: "1",
    name: "Club 1",
    description: "This is the first placeholder club.",
    tags: ["placeholder"],
    meeting_time: "Fridays at 5 PM",
    skill_level: "Beginner",
    join_link: "https://google.com",
    socials: {
      instagram: "https://google.com",
      tiktok: "https://google.com",
    },
  },
  {
    id: "2",
    name: "Club 2",
    description: "This is the second placeholder club.",
    tags: ["placeholder"],
    meeting_time: "Saturdays at 3 PM",
    skill_level: "Intermediate",
    join_link: "https://google.com",
    socials: {
      instagram: "https://google.com",
      tiktok: "https://google.com",
    },
  },
];

export default function ClubsPage() {
  return (
    <main className="min-h-screen bg-white text-black p-8">
      <h1 className="text-3xl font-bold">Clubs</h1>
      <p className="mt-2 text-gray-600">All Clubs:</p>
      <div className="mt-6 grid grid-cols-[repeat(auto-fit,280px)] gap-10 justify-left">
        {placeholderClubs.map((club) => (
          <div
            key={club.id}
            className="border border-gray-300 rounded-lg p-4 hover:shadow-lg transition-shadow
             w-[280px] h-[360px] flex flex-col"
          >
            <h2 className="text-xl font-semibold mb-2">{club.name}</h2>
            <p className="text-sm text-gray-700 mb-4">{club.description}</p>
            <p className="text-sm text-gray-500 mb-1">
              Meeting Time: {club.meeting_time}
            </p>
            <p className="text-sm text-gray-500 mb-1">
              Skill Level: {club.skill_level}
            </p>
            <div className="mt-auto flex justify-end">
              <button className="text-white bg-red-500 hover:bg-red-600 rounded-full px-5 py-2">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
