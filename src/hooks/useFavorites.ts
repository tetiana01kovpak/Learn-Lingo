import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { toggleFavorite } from '@/store/favoritesSlice';

export const useFavorites = () => {
  const dispatch = useAppDispatch();
  const ids = useAppSelector((s) => s.favorites.ids);
  const user = useAppSelector((s) => s.auth.user);

  const isFavorite = useCallback((id: string) => ids.includes(id), [ids]);

  const toggle = useCallback(
    (id: string) => {
      if (!user) {
        toast.error('Please log in to manage your favorites.');
        return;
      }
      dispatch(toggleFavorite({ uid: user.uid, id }));
    },
    [dispatch, user],
  );

  return { ids, isFavorite, toggle, isAuthenticated: Boolean(user) };
};
