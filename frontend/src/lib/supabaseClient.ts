// src/lib/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "";

if (!supabaseUrl || !supabaseKey) {
  // Don't throw during import — let callers handle missing config.
  // Optionally, you can console.warn here.
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});

export default supabase;
