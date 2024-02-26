import { createBrowserClient } from "@supabase/ssr";

/**
 * The function `createClient` creates a browser client using the Supabase URL and anonymous key from environment variables.
 */
export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
