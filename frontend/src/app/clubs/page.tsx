import supabase from "@/lib/supabaseClient";
import ClubsClient from "@/components/ClubsClient";

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

  return (data || []).map((row: Club) => ({
    ...row,
    socials:
      typeof row.socials === "string"
        ? (() => {
            try {
              return JSON.parse(row.socials);
            } catch {
              return null;
            }
          })()
        : row.socials || null,
  })) as Club[];
}

export default async function ClubsPage() {
  const clubs = await getClubs();
  return <ClubsClient clubs={clubs} />;
}
