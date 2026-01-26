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

import ClubCard from "@/components/ClubCard";

export default function ClubsPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <h1 className="text-2xl font-bold sm:text-3xl">Clubs</h1>
        <p className="mt-2 text-gray-600">All Clubs:</p>

        <div
          className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6
            lg:grid-cols-3 lg:gap-8 xl:grid-cols-4"
        >
          {placeholderClubs.map((club) => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>
      </div>
    </main>
  );
}
