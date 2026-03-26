# Tourism Truth Session Notes

This file is a fast context handoff for future AI sessions.

## What This Project Is

`Tourism Truth` is a React + TypeScript + Vite + Tailwind + Framer Motion + React Router + Supabase app.

Core idea:
- premium-feeling tourism mini-game
- users authenticate
- choose travel setup
- choose destination
- choose place
- choose Truth or Dare
- Truth shows fact/truth content
- Dare runs a shuffle-card reveal game

## Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- React Router
- Supabase Auth + profile/session storage

## Important Root Files

- `README.md`: setup instructions
- `supabase/schema.sql`: schema and policies
- `SESSION.md`: this handoff file
- `index.html`: tab icon + page title
- `tailwind.config.ts`: theme tokens

## Key App Structure

- `src/routes/AppRouter.tsx`
- `src/context/AuthContext.tsx`
- `src/context/GameFlowContext.tsx`
- `src/layouts/AppLayout.tsx`
- `src/data/experienceData.ts`
- `src/components/app/*`
- `src/components/ui/*`
- `src/pages/*`

## Current Design Direction

The UI was heavily restyled into a feminine premium look:

- blush / mauve / champagne / cream palette
- soft-glassmorphism
- editorial typography
- warm dark background
- rounded cards
- soft shadows
- premium but not childish

Shared styling is mainly controlled in:

- `src/index.css`
- `tailwind.config.ts`
- `src/components/ui/Button.tsx`
- `src/components/ui/Input.tsx`
- `src/components/ui/Badge.tsx`
- `src/components/app/PageHero.tsx`

## Branding Assets

Logo used in app header:
- `public/asset/logo/logo.png`

Browser tab icon:
- `public/asset/logo/tab logo.png`

Destination slideshow images:
- `public/asset/destinations/*`

Shuffle card images:
- `public/asset/Uno Cards/1Card.png` through `12Card.png`
- `public/asset/Uno Cards/BackCard.png`

## Landing Slideshow Notes

File:
- `src/components/app/DestinationSlideshow.tsx`

Behavior:
- uses real destination images
- text is separated from image for readability
- slideshow was enlarged significantly
- image area is much taller now

## Travel Setup Notes

Users can change travel setup anytime.

Places where this is exposed:
- navbar link in `src/layouts/AppLayout.tsx`
- dashboard action in `src/pages/DashboardPage.tsx`

Travel setup page:
- `src/pages/TravelTypePage.tsx`

## Truth / Dare Flow Rules

Current intended flow:

- Truth:
  - `/app/play/fact`
  - fun fact screen appears only for Truth
  - truth panel content was expanded for more context

- Dare:
  - goes straight to `/app/play/shuffle`
  - no separate fun fact screen before shuffle anymore

Files:
- `src/pages/TruthOrDarePage.tsx`
- `src/pages/FunFactPage.tsx`
- `src/pages/ShuffleCardsPage.tsx`

## Shuffle Game Current Logic

File:
- `src/pages/ShuffleCardsPage.tsx`

Current behavior:
- shuffle duration is 5 seconds
- during shuffle, front card images are visible
- after shuffle, deck randomizes and flips to card backs
- user clicks a face-down card
- result is random, not tied to the exact clicked card position
- tries to avoid repeating the previous drawn card when possible
- once selected, the full deck disappears
- a much larger featured chosen card is shown
- the revealed dare text is shown on that big featured card
- right panel no longer repeats the same dare text
- user can reshuffle and pick again before completing

Important state used there:
- `isShuffling`
- `deckOrder`
- `revealedCardId`
- `lastDrawnCardId`
- `revealedDare`
- `shuffleCycle`

## Destination / Premium Rules

Destinations:
- Intramuros: free
- Binondo: premium
- Ilocos: premium
- Boracay: premium

Premium behavior:
- controlled by `profile.isPremium`
- locked cards open premium modal

Files:
- `src/pages/DestinationPage.tsx`
- `src/components/app/PremiumModal.tsx`
- `src/pages/PremiumPage.tsx`

## Data Notes

File:
- `src/data/experienceData.ts`

Contains:
- travel types
- destinations
- place experiences
- truths
- fun facts
- dares

This file is important for most product/content changes.

## Auth / State

Auth:
- `src/context/AuthContext.tsx`
- `src/hooks/useAuth.ts`
- `src/lib/supabase.ts`

Game flow state:
- `src/context/GameFlowContext.tsx`

Game flow context stores:
- travel type
- destination
- place
- mode
- revealed card title
- revealed prompt

## Important Pages

- `src/pages/LandingPage.tsx`
- `src/pages/LoginPage.tsx`
- `src/pages/RegisterPage.tsx`
- `src/pages/DashboardPage.tsx`
- `src/pages/TravelTypePage.tsx`
- `src/pages/DestinationPage.tsx`
- `src/pages/IntramurosPlacesPage.tsx`
- `src/pages/TruthOrDarePage.tsx`
- `src/pages/FunFactPage.tsx`
- `src/pages/ShuffleCardsPage.tsx`
- `src/pages/CompletionPage.tsx`
- `src/pages/PremiumPage.tsx`

## Validation Status

At the time this file was written:

- `npm.cmd run lint` passes
- `npm.cmd run build` passes

Note:
- PowerShell may block `npm.ps1`
- if that happens, use `npm.cmd run lint` and `npm.cmd run build`

## If A Future AI Session Starts Here

Read these first:

1. `SESSION.md`
2. `README.md`
3. `src/routes/AppRouter.tsx`
4. `src/data/experienceData.ts`
5. `src/pages/ShuffleCardsPage.tsx`
6. `src/components/app/DestinationSlideshow.tsx`
7. `src/context/GameFlowContext.tsx`

## Good Next-Step Areas If User Asks For More

- expand content dataset manually with richer custom truth/fun-fact copy
- make shuffle reveal animation even more dramatic
- improve browser QA on mobile
- optimize CSS build cost if needed
- add real payment integration later
