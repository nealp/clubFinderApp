import ClubCard from "@/components/ClubCard";

type Club = {
  id: string;
  name: string;
  description?: string;
  tags?: string[];
  meeting_time?: string;
  skill_level?: string;
  join_link?: string;
  socials?: unknown; // json object with social media links
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
          <ClubCard
            key={club.id}
            name={club.name}
            description={club.description}
            meetingTime={club.meeting_time}
            skillLevel={club.skill_level}
            tags={club.tags}

            // onViewDetails={() => {
            //   // temporary behavior (later you can navigate to a details page)
            //   alert(`View details: ${club.name}`);
            // }}
          />
        ))}
      </div>
    </main>
  );
}
