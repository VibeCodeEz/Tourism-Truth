# Tourism Truth

Tourism Truth is a polished travel mini-game app built with React, TypeScript, Vite, Tailwind CSS, Framer Motion, React Router, and Supabase.

Users can:

- register and log in with Supabase Auth
- choose a travel setup
- select a destination with premium locking
- pick one place inside the destination
- choose Truth or Dare
- read a place-specific fun fact
- play a 12-card shuffle dare reveal
- finish on a completion screen with replay actions

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- React Router
- Supabase Auth + database
- Sonner toasts

## Environment variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Use `.env.example` as the starting point.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` from `.env.example`.

3. In Supabase, run the SQL from `supabase/schema.sql`.

4. Start the app:

```bash
npm run dev
```

5. Validate production output:

```bash
npm run lint
npm run build
```

## Supabase notes

- Enable email/password auth.
- If email confirmation is enabled in your Supabase project, new users may need to verify before first login.
- Profiles are created client-side through upsert and are also supported by the SQL trigger in the schema file.

## Project structure

```text
src/
  components/
    app/
    ui/
  context/
  data/
  hooks/
  layouts/
  lib/
  pages/
  routes/
  types/
supabase/
  schema.sql
```

## Key routes

- `/` landing page
- `/login` login
- `/register` register
- `/app` dashboard
- `/app/travel-type` travel setup
- `/app/destinations` destination selection
- `/app/destinations/:destinationKey` place selection
- `/app/play` truth or dare selection
- `/app/play/fact` fun fact / truth page
- `/app/play/shuffle` 12-card dare shuffle
- `/app/play/completion` completion screen
- `/premium` premium upgrade page

## Important files

- `src/context/AuthContext.tsx` handles session bootstrap, profile sync, premium updates, and gameplay history writes.
- `src/context/GameFlowContext.tsx` stores the current travel flow and persists it to local storage.
- `src/data/experienceData.ts` contains typed travel types, destinations, fun facts, truths, and safe dares.
- `src/routes/AppRouter.tsx` lazy-loads route pages for cleaner production chunking.
- `src/pages/ShuffleCardsPage.tsx` runs the 8-second shuffle sequence and reveal flow.

## SQL schema summary

The schema provisions:

- `profiles`
  - `id`
  - `full_name`
  - `travel_type`
  - `is_premium`
  - `created_at`
- `game_sessions`
  - `id`
  - `user_id`
  - `destination`
  - `place_name`
  - `mode`
  - `revealed_card`
  - `created_at`

It also includes:

- row-level security policies for per-user access
- a trigger to auto-create a profile row when a new auth user is created

## Verification

These commands pass in the current workspace:

```bash
npm run lint
npm run build
```
