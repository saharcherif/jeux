import { motion, AnimatePresence } from 'motion/react';
import { Menu, ChevronDown, BookOpen, Target, Star, MessageCircle, Code, Database, TrendingUp, PenTool, Briefcase, Shield, Cloud, Cpu, ArrowRight, Building2, Newspaper } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logoImage from 'figma:asset/f3339a614dcacfa00d47bc693f36df06e4c39efd.png';
import { EnrollmentModal } from './EnrollmentModal';
import { useLanguage } from '../context/LanguageContext';
import { categoriesApi, Category } from '../api/categories.api';
import { trainingsApi, Training } from '../api/trainings.api';
import { BASE_URL } from '../api/api';

interface NavigationProps {
  onNavigateToCategory: (category: string) => void;
}

const categoryUIMap: Record<string, { icon: any, color: string, bg: string }> = {
  'Développement': { icon: Code, color: 'text-blue-500', bg: 'bg-blue-50' },
  'Data Science': { icon: Database, color: 'text-purple-500', bg: 'bg-purple-50' },
  'Marketing': { icon: TrendingUp, color: 'text-pink-500', bg: 'bg-pink-50' },
  'Design': { icon: PenTool, color: 'text-orange-500', bg: 'bg-orange-50' },
  'Management': { icon: Briefcase, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  'Sécurité': { icon: Shield, color: 'text-red-500', bg: 'bg-red-50' },
  'Cloud': { icon: Cloud, color: 'text-sky-500', bg: 'bg-sky-50' },
  'DevOps': { icon: Cpu, color: 'text-emerald-500', bg: 'bg-emerald-50' },
};

export function Navigation({ onNavigateToCategory }: NavigationProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const [categoryGroups, setCategoryGroups] = useState<{ category: Category; trainings: Training[] }[]>([]);

  useEffect(() => {
    Promise.all([
      categoriesApi.getAll(),
      trainingsApi.getAll()
    ]).then(([cats, trains]) => {
      const activeTrains = trains.filter(t => t.isActive);
      const grouped = cats
        .filter(c => c.isActive)
        .map(cat => ({
          category: cat,
          trainings: activeTrains.filter(t => t.category === cat.name).slice(0, 3) // Show top 3 trainings per category
        }));
      setCategoryGroups(grouped);
    }).catch(err => console.error('Erreur navigation data:', err));
  }, []);

  const mainLinks = [
    { label: t('nav.pathways'), href: '#parcours', icon: Target },
    { label: t('nav.testimonials'), href: '#témoignages', icon: Star },
    { label: t('nav.contact'), href: '#contact', icon: MessageCircle },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-6 left-6 right-6 z-50 bg-white/70 backdrop-blur-2xl rounded-[28px] shadow-2xl shadow-pink-500/10 border border-white/20"
      >
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="cursor-pointer"
              onClick={() => navigate('/')}
            >
              <img src={logoImage} alt="Mon Espace Formation" className="h-10" />
            </motion.div>

            {/* Desktop Categories (Visible on large screens) */}
            <div className="hidden xl:flex items-center gap-6 mr-auto ml-12">
              <button
                onClick={() => onNavigateToCategory('Toutes')}
                className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors"
              >
                {t('nav.all_formations')}
              </button>

              <div className="h-4 w-px bg-gray-300" />

              <button
                onClick={() => navigate('/b2b')}
                className={`text-sm font-medium transition-colors ${location.pathname === '/b2b'
                  ? 'text-pink-600'
                  : 'text-gray-500 hover:text-pink-600'
                  }`}
              >
                {t('nav.b2b')}
              </button>

              <button
                onClick={() => navigate('/blog')}
                className={`text-sm font-medium transition-colors ${location.pathname === '/blog'
                  ? 'text-pink-600'
                  : 'text-gray-500 hover:text-pink-600'
                  }`}
              >
                {t('nav.blog')}
              </button>

              <button
                onClick={() => navigate('/contact')}
                className={`text-sm font-medium transition-colors ${location.pathname === '/contact'
                  ? 'text-pink-600'
                  : 'text-gray-500 hover:text-pink-600'
                  }`}
              >
                {t('nav.contact')}
              </button>
            </div>

            <div className="flex items-center gap-4">
              {/* Language Toggle */}


              {/* Animated Menu Icon */}
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-3 group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  className="absolute inset-0 bg-gray-100 rounded-full"
                />

                <div className="relative flex items-center gap-2">
                  <span className="hidden md:block text-sm font-medium text-gray-600 mr-1">{t('nav.menu')}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Menu className="w-6 h-6 text-gray-700 group-hover:text-gray-900 transition-colors" strokeWidth={2} />
                  </motion.div>
                </div>
              </motion.button>

              {/* S'inscrire Button */}
              <motion.button
                onClick={() => setIsModalOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden sm:block bg-pink-500 text-white px-6 py-2.5 rounded-full hover:bg-pink-600 transition-colors shadow-lg font-medium"
              >
                {t('nav.signup')}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/5 -z-10 h-screen"
                onClick={() => setIsOpen(false)}
              />

              {/* Dropdown Panel - Expanded for Categories */}
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-[calc(100%+8px)] right-6 lg:right-12 w-[calc(100%-48px)] lg:w-[800px] bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-pink-500/10 border border-white/40 overflow-hidden"
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Left Column: Navigation Links */}
                  <div className="p-6 lg:p-8 lg:w-1/3 bg-white/50 border-b lg:border-b-0 lg:border-r border-gray-100">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Navigation</h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          onNavigateToCategory('Toutes');
                          setIsOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white transition-all group text-left"
                      >
                        <div className="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center text-pink-500 group-hover:scale-110 transition-transform">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <span className="font-medium text-gray-700 group-hover:text-pink-600">{t('nav.all_formations')}</span>
                      </button>

                      <button
                        onClick={() => {
                          navigate('/b2b');
                          setIsOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white transition-all group text-left"
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <span className="font-medium text-gray-700 group-hover:text-blue-600">{t('nav.b2b')}</span>
                      </button>

                      <button
                        onClick={() => {
                          navigate('/blog');
                          setIsOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white transition-all group text-left"
                      >
                        <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform">
                          <Newspaper className="w-4 h-4" />
                        </div>
                        <span className="font-medium text-gray-700 group-hover:text-purple-600">{t('nav.blog')}</span>
                      </button>

                      {mainLinks.map((item) => (
                        <a
                          key={item.href}
                          href={item.href}
                          onClick={(e) => {
                            setIsOpen(false);
                            if (location.pathname !== '/') {
                              e.preventDefault();
                              navigate('/' + item.href);
                            }
                          }}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white transition-all group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500 group-hover:scale-110 transition-transform">
                            <item.icon className="w-4 h-4" />
                          </div>
                          <span className="font-medium text-gray-700 group-hover:text-gray-900">{item.label}</span>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Categories Grid */}
                  <div className="p-6 lg:p-8 lg:w-2/3">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t('nav.explore_category')}</h3>
                      <button
                        onClick={() => {
                          onNavigateToCategory('Toutes');
                          setIsOpen(false);
                        }}
                        className="text-xs font-medium text-pink-500 hover:text-pink-600 flex items-center gap-1"
                      >
                        {t('nav.see_all')} <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      {categoryGroups.map((group, index) => {
                        const { category: cat, trainings } = group;
                        const ui = categoryUIMap[cat.name] || { icon: Code, color: 'text-gray-500', bg: 'bg-gray-50' };
                        const Icon = ui.icon;

                        return (
                          <div key={cat._id} className="space-y-4">
                            <button
                              onClick={() => {
                                onNavigateToCategory(cat.name);
                                setIsOpen(false);
                              }}
                              className="flex items-center gap-3 group text-left w-full"
                            >
                              <div className={`w-10 h-10 rounded-lg ${ui.bg} flex items-center justify-center ${ui.color} group-hover:scale-110 transition-transform overflow-hidden border border-gray-100 group-hover:border-pink-200`}>
                                {cat.image ? (
                                  <img
                                    src={cat.image.startsWith('http') ? cat.image : `${BASE_URL}${cat.image.startsWith('/') ? '' : '/'}${cat.image}`}
                                    alt={cat.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <Icon className="w-5 h-5" strokeWidth={2} />
                                )}
                              </div>
                              <span className="font-bold text-gray-900 group-hover:text-pink-600 transition-colors">
                                {cat.name}
                              </span>
                            </button>

                            <div className="ml-12 space-y-1 border-l-2 border-gray-50 pl-4">
                              {trainings.map(training => (
                                <button
                                  key={training._id}
                                  onClick={() => {
                                    navigate(`/formations/${training._id}`);
                                    setIsOpen(false);
                                  }}
                                  className="block text-sm text-gray-500 hover:text-pink-600 hover:translate-x-2 transition-all duration-300 truncate w-full text-left py-1"
                                >
                                  {training.title}
                                </button>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Enrollment Modal */}
      <EnrollmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}