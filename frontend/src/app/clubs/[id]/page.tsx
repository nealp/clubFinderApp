import supabase from "@/lib/supabaseClient";
import Link from "next/link";
import { notFound } from "next/navigation";

function normalizeTags(tags: any): string[] {
  if (Array.isArray(tags))
    return tags
      .filter((t) => typeof t === "string")
      .map((t) => t.trim())
      .filter(Boolean);
  if (typeof tags === "string") {
    try {
      const parsed = JSON.parse(tags);
      if (Array.isArray(parsed))
        return parsed
          .filter((t) => typeof t === "string")
          .map((t) => t.trim())
          .filter(Boolean);
    } catch {
      /* not JSON */
    }
    return tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  }
  return [];
}

export default async function ClubDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // 1. Get ALL clubs (to find the current one AND related ones)
  const { data: rawClubs, error } = await supabase.from("clubs").select("*");

  if (error || !rawClubs) return notFound();

  // 2. Normalize all clubs so we can compare tags easily
  const allClubs = rawClubs.map((c) => ({
    ...c,
    tags: normalizeTags(c.tags),
  }));

  // 3. Find the specific club
  const club = allClubs.find((c) => c.id === id);
  if (!club) return notFound();

  // 4. Find Related Clubs (sharing at least one tag)
  const relatedClubs = allClubs
    .filter((c) => c.id !== club.id) // Not the current club
    .filter((c) => c.tags.some((tag) => club.tags.includes(tag))) // Shares a tag
    .slice(0, 3); // Top 3

  return (
    <main className="min-h-screen bg-white text-black p-6 sm:p-12">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/clubs"
          className="text-red-500 hover:underline mb-8 inline-block"
        >
          ← Back to Directory
        </Link>

        {/* MAIN CLUB CARD */}
        <div className="rounded-2xl border border-gray-300 p-8 shadow-sm mb-12">
          <h1 className="text-4xl font-bold mb-4">{club.name}</h1>
          <div className="flex flex-wrap gap-2 mb-6">
            {club.tags.map((tag) => (
              <span
                key={tag}
                className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            {club.description}
          </p>
          <div className="text-sm text-gray-500 border-t pt-4">
            <p>
              <strong>Meeting:</strong>{" "}
              {club.meeting_time || "Contact for info"}
            </p>
          </div>
        {/* SOCIALS */}
        {club.socials && (
          <div className="mt-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">Socials</p>

            <div className="flex flex-wrap gap-3">
              {club.socials.instagram && (
                <a
                  href={club.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-full border border-gray-300 hover:border-red-500 hover:text-red-600 transition"
                >
                  Instagram
                </a>
              )}

              {club.socials.discord && (
                <a
                  href={club.socials.discord}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-full border border-gray-300 hover:border-red-500 hover:text-red-600 transition"
                >
                  Discord
                </a>
              )}

              {club.socials.website && (
                <a
                  href={club.socials.website}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-full border border-gray-300 hover:border-red-500 hover:text-red-600 transition"
                >
                  Website
                </a>
              )}

              {club.socials.email && (
                <a
                  href={`mailto:${club.socials.email}`}
                  className="px-4 py-2 rounded-full border border-gray-300 hover:border-red-500 hover:text-red-600 transition"
                >
                  Email
                </a>
              )}
            </div>
          </div>
        )}
        </div>

        {/* RELATED CLUBS */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Related Clubs</h2>
          {relatedClubs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedClubs.map((related) => (
                <Link
                  key={related.id}
                  href={`/clubs/${related.id}`}
                  className="group block p-4 border border-gray-200 rounded-xl hover:border-red-500 transition-all"
                >
                  <h3 className="font-bold group-hover:text-red-600">
                    {related.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                    {related.description}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 italic">No similar clubs found.</p>
          )}
        </section>
      </div>
    </main>
  );
}
