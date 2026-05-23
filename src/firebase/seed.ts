import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
  databaseURL: process.env.VITE_FIREBASE_DB_URL,
};

if (!firebaseConfig.apiKey || !firebaseConfig.databaseURL) {
  console.error('Missing Firebase env vars. Fill .env first.');
  process.exit(1);
}

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const teachersPath = resolve(__dirname, '../../public/teachers.json');
const teachers = JSON.parse(readFileSync(teachersPath, 'utf-8')) as unknown[];

const indexed = teachers.reduce<Record<string, unknown>>((acc, teacher, i) => {
  acc[`teacher_${String(i + 1).padStart(2, '0')}`] = teacher;
  return acc;
}, {});

set(ref(db, 'teachers'), indexed)
  .then(() => {
    console.log(`Seeded ${teachers.length} teachers to Realtime Database.`);
    process.exit(0);
  })
  .catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
  });
