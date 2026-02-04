/**
 * Filter tags for the clubs page.
 * Add more tags here as needed – they will appear in the filter UI and
 * clubs matching these tags can be filtered.
 */
export const FILTER_TAGS = [
  "Academic Council",
  "Advocacy Council",
  "Arts & Media Council",
  "Club Sport Council",
  "Cultural Council",
  "Graduate Student Organizations",
  "Greek Affiliated Council",
  "Greek Life – Fraternity",
  "Greek Life – Sorority",
  "Interfraternity Council",
  "Multicultural Greek Council",
  "National Pan-Hellenic Council",
  "Other",
  "Panhellenic Council",
  "Recreation Council",
  "Religious & Spiritual Council",
  "Residential Life",
  "Service & Engagement Council",
  "Student Businesses",
  "Student Government Organizations",
  // Add more tags below:
  // "",
] as const;

export type FilterTag = (typeof FILTER_TAGS)[number];
