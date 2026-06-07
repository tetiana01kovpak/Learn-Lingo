# Learn Lingo

Web app for a company that offers online language tutors. Users can browse tutors, filter them by language, level and price, expand a card for the full bio and reviews, save favorites, and book a trial lesson. Authentication and data are handled by Firebase.

## Tech stack

React 18, TypeScript, Vite, React Router, Redux Toolkit with redux-persist, Firebase (Auth and Realtime DB), react-hook-form with yup, react-hot-toast, and CSS Modules.

## Pages

- `/` (public): hero section with a call to action and a stats banner.
- `/teachers` (public): tutor list with filters and a "Load more" button (4 cards per page). Each card expands to show experience and reviews, and can open the trial booking form.
- `/favorites` (private): tutors the user added to favorites. Guests are redirected to `/`.

## Features

- Firebase auth (register, login, logout) with yup-validated modal forms that close on button, backdrop or Esc.
- Favorites synced to Firebase and localStorage, so they survive a refresh; guests get a prompt instead.
- Expandable cards with reviews, a trial booking form, and filters reflected in the URL.

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Create .env from the example and fill the Firebase keys
cp .env.example .env

# 3. Seed the Realtime Database with the included teachers (one time)
npm run seed

# 4. Start the dev server
npm run dev
```

The app runs at http://localhost:5173.

## Scripts

- `npm run dev`: start the Vite dev server.
- `npm run build`: type-check and build for production.
- `npm run preview`: preview the production build.
- `npm run seed`: load `public/teachers.json` into the Realtime Database.

## Firebase data

```
/teachers/{id}                          objects from public/teachers.json
/users/{uid}/favorites/{teacherId}      true
```

If the database is empty or unreachable, the app falls back to the bundled `public/teachers.json` so the UI still works.

## Deploy

Configured for Netlify (`netlify.toml` and `public/_redirects` set the build command and SPA fallback). Connect the repo in Netlify and add the `VITE_FIREBASE_*` variables in the site settings.
