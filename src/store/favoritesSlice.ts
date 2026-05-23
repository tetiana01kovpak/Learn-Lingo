import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { get, ref, remove, set } from 'firebase/database';
import { db } from '@/firebase/config';

interface FavoritesState {
  ids: string[];
  hydratedFromRemote: boolean;
}

const initialState: FavoritesState = {
  ids: [],
  hydratedFromRemote: false,
};

export const hydrateFavorites = createAsyncThunk<string[], string>(
  'favorites/hydrate',
  async (uid) => {
    try {
      const snap = await get(ref(db, `users/${uid}/favorites`));
      if (snap.exists()) {
        const value = snap.val() as Record<string, boolean>;
        return Object.keys(value).filter((k) => value[k]);
      }
    } catch (err) {
      console.warn('[LearnLingo] Failed to hydrate favorites from Firebase.', err);
    }
    return [];
  },
);

export const toggleFavorite = createAsyncThunk<
  { id: string; added: boolean },
  { uid: string; id: string },
  { state: { favorites: FavoritesState } }
>('favorites/toggle', async ({ uid, id }, { getState }) => {
  const currentIds = getState().favorites.ids;
  const isFav = currentIds.includes(id);
  const path = `users/${uid}/favorites/${id}`;
  try {
    if (isFav) {
      await remove(ref(db, path));
    } else {
      await set(ref(db, path), true);
    }
  } catch (err) {
    console.warn('[LearnLingo] Failed to sync favorite to Firebase.', err);
  }
  return { id, added: !isFav };
});

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    clearFavorites: (state) => {
      state.ids = [];
      state.hydratedFromRemote = false;
    },
    addLocalFavorite: (state, action: PayloadAction<string>) => {
      if (!state.ids.includes(action.payload)) {
        state.ids.push(action.payload);
      }
    },
    removeLocalFavorite: (state, action: PayloadAction<string>) => {
      state.ids = state.ids.filter((id) => id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(hydrateFavorites.fulfilled, (state, action) => {
        state.ids = Array.from(new Set([...state.ids, ...action.payload]));
        state.hydratedFromRemote = true;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        const { id, added } = action.payload;
        if (added && !state.ids.includes(id)) {
          state.ids.push(id);
        } else if (!added) {
          state.ids = state.ids.filter((x) => x !== id);
        }
      });
  },
});

export const { clearFavorites, addLocalFavorite, removeLocalFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
