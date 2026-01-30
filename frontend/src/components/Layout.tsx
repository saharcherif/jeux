import { Outlet, useNavigate } from 'react-router-dom';
import { Navigation } from './Navigation';
import { Footer } from './Footer';

export function Layout() {
  const navigate = useNavigate();

  const handleNavigateToCategory = (category: string) => {
    if (category === 'Toutes') {
      navigate('/formations');
    } else {
      navigate(`/formations/categories/${encodeURIComponent(category)}`);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <Navigation onNavigateToCategory={handleNavigateToCategory} />
      <Outlet />
      <Footer />
    </div>
  );
}
