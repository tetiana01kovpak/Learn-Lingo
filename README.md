# Learn Lingo

A web application for a company offering online language tutor services. Users can browse tutors, filter by language / level / hourly price, expand a card to read full bio and reviews, save favorites, and book a trial lesson — all backed by Firebase Authentication and Realtime Database.

## Live demo

Deploy target: Netlify (set `VITE_FIREBASE_*` env vars in the Netlify dashboard before deploying).

## Tech stack

- **React 18** + **TypeScript** + **Vite**
- **React Router v6** — routing for Home / Teachers / Favorites
- **Redux Toolkit** + **redux-persist** — auth and favorites state, persisted to `localStorage`
- **Firebase v10** — `firebase/auth` (email + password) and `firebase/database` (Realtime DB)
- **react-hook-form** + **yup** — form state and validation (login, registration, trial booking)
- **react-hot-toast** — toast notifications
- **CSS Modules** — scoped component styling with shared CSS custom properties for design tokens

## Pages

| Route        | Access  | Description                                                                       |
| ------------ | ------- | --------------------------------------------------------------------------------- |
| `/`          | Public  | Marketing hero with the catalog CTA, plus a stats banner.                         |
| `/teachers`  | Public  | List of tutors with filters by language / level / price and "Load more" pagination (4 cards per page). Each card can be expanded to show experience and reviews, and supports booking a trial lesson. |
| `/favorites` | Private | Tutors the current user has hearted. Redirects to `/` for guests.                 |

## Features

- Registration, login, logout via Firebase Authentication (email + password)
- Modal forms with Yup validation and a password visibility toggle
- All modals close on the X button, backdrop click, or **Esc**
- Heart icon — guests get a toast, authenticated users get their favorite synced to Firebase under `users/{uid}/favorites` **and** kept in localStorage via redux-persist (state survives a hard refresh and is restored on login)
- Card collapses / expands with `Read more`; expanded view shows experience and reviews
- "Book trial lesson" modal with radio reason + name + email + phone (yup validated)
- Filters reflected in the URL query string

## Design

Figma file: <https://www.figma.com/design/dewf5jVviSTuWMMyU3d8Mc/Learn-Lingo>

Color palette (variations supported via the UI KIT palette):

| Token  | Color    |
| ------ | -------- |
| Primary | `#f4c550` |
| Primary soft | `#fbe9ba` |
| Star | `#ffc531` |
| Online dot | `#38cd3e` |
| Text | `#121417` |
| Muted | `#8a8a89` |
| Background | `#f8f8f8` |

## Getting started

```bash
# 1. Install
npm install

# 2. Fill .env (see .env.example)
#    Required: VITE_FIREBASE_API_KEY, VITE_FIREBASE_APP_ID
#    (the other VITE_FIREBASE_* values are pre-filled for the existing project)
cp .env.example .env

# 3. Seed the Realtime Database with the included teacher list (one-off)
npm run seed

# 4. Run the dev server
npm run dev
```

Visit <http://localhost:5173>.

### Build & deploy

```bash
npm run build      # compiles TS and bundles with Vite into dist/
npm run preview    # locally preview the production build
```

For Netlify:

1. Push the repository to GitHub.
2. Connect the repo in Netlify — the `netlify.toml` and `public/_redirects` files already configure the build (`npm run build`) and SPA fallback.
3. In the Netlify site settings, add the `VITE_FIREBASE_*` env vars.

## Firebase Realtime Database schema

```text
/teachers/{id}            ← objects from public/teachers.json
/users/{uid}/favorites/{teacherId}: true
```

The `npm run seed` script loads `public/teachers.json` and writes it under `/teachers`. If the database is empty or Firebase is unreachable, the app falls back to the bundled `teachers.json` so the UI still works.

## Technical task

Brief summary (full Ukrainian/English brief lives in the original Go-IT task):

- 3 pages: **Home**, **Teachers**, **Favorites** (private)
- Authentication via Firebase (register / login / current user / logout)
- Modal forms with `react-hook-form` + `yup`; close on X, backdrop, Esc
- Realtime DB collection `teachers` with: name, surname, languages, levels, rating, reviews, price_per_hour, lessons_done, avatar_url, lesson_info, conditions, experience
- 4 cards on first load, Load more loads the next batch
- Heart button protected by auth — toast for guests, persistent favorite for users
- Read more expands the card; Book trial lesson opens a modal form
- Star task: routing with React Router and filtering by language / level / price

## Scripts

| Command         | Purpose                                                              |
| --------------- | -------------------------------------------------------------------- |
| `npm run dev`   | Start Vite dev server                                                |
| `npm run build` | Type-check and build for production                                  |
| `npm run preview` | Preview the production build locally                               |
| `npm run seed`  | Seed `/teachers` in the Realtime Database from `public/teachers.json` |

## Project structure

```text
src/
├── App.tsx
├── main.tsx
├── assets/                  hero image
├── components/
│   ├── BookTrialModal/
│   ├── Filters/
│   ├── Header/
│   ├── Layout/
│   ├── LoginModal/
│   ├── Modal/               generic modal + shared form styles
│   ├── PrivateRoute/
│   ├── RegistrationModal/
│   ├── TeacherCard/
│   ├── TeacherList/
│   └── ui/                  Select, icons
├── firebase/                config + seed script
├── hooks/                   useAuth, useFavorites, useEscapeKey
├── pages/                   HomePage, TeachersPage, FavoritesPage
├── services/                teachersApi
├── store/                   Redux Toolkit slices + redux-persist
├── styles/                  variables.css, global.css
└── types/                   shared types
```
