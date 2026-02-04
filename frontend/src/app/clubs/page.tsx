import supabase from "@/lib/supabaseClient";
import ClubsWithTagFilter from "@/components/ClubsWithTagFilter";

type Club = {
  id: string;
  name: string;
  description?: string;
  tags?: string[];
  meeting_time?: string;
  skill_level?: string;
  join_link?: string;
  socials?: Record<string, string> | null;
};

async function getClubs(): Promise<Club[]> {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    (!process.env.SUPABASE_SERVICE_ROLE_KEY &&
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  ) {
    return [];
  }
  const { data, error } = await supabase.from("clubs").select("*");
  if (error) {
    console.error("Error fetching clubs:", error);
    return [];
  }

  return (data || []).map((row: Club) => {
    const socials =
      typeof row.socials === "string"
        ? (() => {
            try {
              return JSON.parse(row.socials);
            } catch {
              return null;
            }
          })()
        : row.socials || null;

    const tags = normalizeTagsFromRow(row.tags);

    return {
      ...row,
      socials,
      tags,
    };
  }) as Club[];
}

function normalizeTagsFromRow(tags: unknown): string[] {
  if (Array.isArray(tags)) {
    return tags
      .filter((t): t is string => typeof t === "string")
      .map((t) => t.trim())
      .filter(Boolean);
  }
  if (typeof tags === "string") {
    const trimmed = tags.trim();
    if (!trimmed) return [];
    try {
      const parsed = JSON.parse(trimmed) as unknown;
      if (Array.isArray(parsed)) {
        return parsed
          .filter((t): t is string => typeof t === "string")
          .map((t) => t.trim())
          .filter(Boolean);
      }
    } catch {
      // not JSON, treat as comma-separated
    }
    return trimmed.split(",").map((t) => t.trim()).filter(Boolean);
  }
  return [];
}
/*
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
*/
export default async function ClubsPage() {
  const clubs = await getClubs();
  return <ClubsWithTagFilter clubs={clubs} />;
}
