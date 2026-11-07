# Supabase setup (later stage)

The app includes browser/server client helpers and a Next.js `proxy.ts` session refresher. The UI currently runs in preview mode without Supabase credentials.

When we are ready to add real accounts and persistent data:

1. Create a Supabase project.
2. Copy the Project URL and publishable key into `.env.local` (start from `.env.example`).
3. Keep `.env.local` out of Git. Never put a Supabase secret/service-role key in a `NEXT_PUBLIC_` variable or browser code.
4. Design the profile, post, follow, comment, and moderation schema together, then enable Row Level Security and test its policies before using real user data.

No database migrations are included yet; we will design those deliberately in the next backend stage.
