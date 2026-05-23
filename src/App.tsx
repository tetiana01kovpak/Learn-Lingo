import { Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Layout } from '@/components/Layout/Layout';
import { PrivateRoute } from '@/components/PrivateRoute/PrivateRoute';
import { HomePage } from '@/pages/HomePage';
import { TeachersPage } from '@/pages/TeachersPage';
import { FavoritesPage } from '@/pages/FavoritesPage';
import { useAuth } from '@/hooks/useAuth';

export const App = () => {
  useAuth();

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/teachers" element={<TeachersPage />} />
          <Route
            path="/favorites"
            element={
              <PrivateRoute>
                <FavoritesPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { fontFamily: 'Roboto, sans-serif' },
          success: { iconTheme: { primary: '#f4c550', secondary: '#fff' } },
        }}
      />
    </>
  );
};
