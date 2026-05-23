import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/config';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setUser } from '@/store/authSlice';
import { clearFavorites, hydrateFavorites } from '@/store/favoritesSlice';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const status = useAppSelector((s) => s.auth.status);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        dispatch(
          setUser({
            uid: fbUser.uid,
            email: fbUser.email ?? '',
            name: fbUser.displayName ?? (fbUser.email?.split('@')[0] ?? 'User'),
          }),
        );
        dispatch(hydrateFavorites(fbUser.uid));
      } else {
        dispatch(setUser(null));
        dispatch(clearFavorites());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return { user, status, isAuthenticated: Boolean(user) };
};
