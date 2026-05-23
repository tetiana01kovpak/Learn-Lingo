import { Outlet } from 'react-router-dom';
import { Header } from '@/components/Header/Header';

export const Layout = () => (
  <>
    <Header />
    <main style={{ flex: 1 }}>
      <Outlet />
    </main>
  </>
);
