import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createClient = async () => {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
};

/**
 * Check if Supabase session cookies exist without making an API call.
 * Supabase uses cookies like `sb-<project-ref>-auth-token` for session storage.
 * If no session cookie exists, we can skip the expensive `getUser()` network call.
 */
export const hasSessionCookie = async (): Promise<boolean> => {
  const cookieStore = await cookies();
  const all = cookieStore.getAll();
  return all.some(
    (c) =>
      c.name.startsWith("sb-") && c.name.endsWith("-auth-token") && c.value
  );
};
