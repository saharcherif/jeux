import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { FormationsListPage } from './pages/FormationsListPage';
import { FormationDetailPage } from './pages/FormationDetailPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { B2BPage } from './pages/B2BPage';
import { BlogPage } from './pages/BlogPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { ContactPage } from './pages/ContactPage';
import { LegalMentionsPage } from './pages/LegalMentionsPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { LanguageProvider } from './context/LanguageContext';
import { ScrollToTop } from './components/ScrollToTop';

// Admin imports
import { AdminAuthProvider } from './admin/auth/AdminAuthContext';
import { AdminAuthGuard } from './admin/auth/AdminAuthGuard';
import { AdminLayout } from './admin/layouts/AdminLayout';
import { Login } from './admin/pages/Login';
import { ForgotPassword } from './admin/pages/ForgotPassword';
import { Dashboard } from './admin/pages/Dashboard';
import { Categories } from './admin/pages/Categories';
import { Formations } from './admin/pages/Formations';
import { FormationCreate } from './admin/pages/FormationCreate';
import { FormationEdit } from './admin/pages/FormationEdit';
import { Inscriptions } from './admin/pages/Inscriptions';
import { Contacts } from './admin/pages/Contacts';
import { Blogs } from './admin/pages/Blogs';
import { BlogCreate } from './admin/pages/BlogCreate';
import { BlogEdit } from './admin/pages/BlogEdit';
import { Newsletter as AdminNewsletter } from './admin/pages/Newsletter';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <LanguageProvider>
        <AdminAuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/formations" element={<FormationsListPage />} />
              <Route path="/formations/categories/:category" element={<FormationsListPage />} />
              <Route path="/formations/:id" element={<FormationDetailPage />} />
              <Route path="/b2b" element={<B2BPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:id" element={<BlogDetailPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/mentions-legales" element={<LegalMentionsPage />} />
              <Route path="/politique-confidentialite" element={<PrivacyPolicyPage />} />
              <Route path="/404" element={<NotFoundPage />} />
            </Route>

            {/* Admin Auth Routes (No Layout) */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/forgot-password" element={<ForgotPassword />} />

            {/* Admin Protected Routes */}
            <Route
              path="/admin"
              element={
                <AdminAuthGuard>
                  <AdminLayout />
                </AdminAuthGuard>
              }
            >
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="categories" element={<Categories />} />
              <Route path="formations" element={<Formations />} />
              <Route path="formations/create" element={<FormationCreate />} />
              <Route path="formations/:id/edit" element={<FormationEdit />} />
              <Route path="inscriptions" element={<Inscriptions />} />
              <Route path="contacts" element={<Contacts />} />
              <Route path="blogs" element={<Blogs />} />
              <Route path="blogs/create" element={<BlogCreate />} />
              <Route path="blogs/:id/edit" element={<BlogEdit />} />
              <Route path="newsletter" element={<AdminNewsletter />} />
            </Route>

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </AdminAuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}