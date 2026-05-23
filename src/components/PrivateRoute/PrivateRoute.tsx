import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/store/store';

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const user = useAppSelector((s) => s.auth.user);
  const initialized = useAppSelector((s) => s.auth.initialized);

  if (!initialized) {
    return (
      <div className="container" style={{ paddingBlock: 96 }}>
        Loading…
      </div>
    );
  }

  if (!user) return <Navigate to="/" replace />;

  return <>{children}</>;
};
