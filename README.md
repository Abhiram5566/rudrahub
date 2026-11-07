# RudraHub

**A space to connect.** RudraHub is a web-first social platform project by Rudra Works. The long-term plan is to build the web experience first and later add mobile apps that use the same backend.

## Current foundation

- Next.js App Router + TypeScript
- Tailwind CSS v4 via the official PostCSS plugin
- Responsive social-feed UI prototype
- Supabase browser/server client helpers using `@supabase/ssr`
- Next.js `proxy.ts` session refresh hook
- `.env.example` and Git ignore rules for local secrets

> **Preview status:** The feed uses sample content and local component state. Posting, likes, follows, and navigation are demonstrations only. Nothing is persisted, no real accounts exist yet, and Supabase is not connected until credentials are configured.

## Requirements

- Node.js 20.9 or newer
- npm (or another supported package manager)

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. The app is designed to run in preview mode even before `.env.local` contains Supabase values. Supabase helpers will throw a clear setup error if imported before credentials are added.

## Environment variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

Never commit `.env.local`, secret keys, or service-role credentials.

## Useful commands

```bash
npm run dev
npm run lint
npm run build
npm start
```

## Planned development sequence

1. Confirm product requirements and visual direction.
2. Implement Supabase authentication and profiles.
3. Design database tables and Row Level Security policies.
4. Connect the feed to persistent posts, likes, comments, and follows.
5. Add messaging, notifications, discovery, reporting, blocking, and moderation.
6. Deploy and test the web application.
7. Build Android/iOS apps against the same backend.

## Repository

https://github.com/Abhiram5566/rudrahub
