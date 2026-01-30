import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, X, Clock, Users, Award, Star, ArrowLeft, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { trainingsApi, Training } from '../api/trainings.api';
import { categoriesApi } from '../api/categories.api';
import { BASE_URL } from '../api/api';

export function FormationsListPage() {
  const navigate = useNavigate();
  const { category: urlCategory } = useParams();

  const [formations, setFormations] = useState<Training[]>([]);
  const [categories, setCategories] = useState<string[]>(['Toutes']);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(urlCategory ? decodeURIComponent(urlCategory) : 'Toutes');
  const [selectedLevel, setSelectedLevel] = useState('Tous niveaux');
  const [showFilters, setShowFilters] = useState(false);

  const levels = ['Tous niveaux', 'Débutant', 'Intermédiaire', 'Avancé'];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [trainingsData, categoriesData] = await Promise.all([
          trainingsApi.getAll(),
          categoriesApi.getAll()
        ]);

        setFormations(trainingsData.filter(t => t.isActive));
        setCategories(['Toutes', ...categoriesData.filter(c => c.isActive).map(c => c.name)]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredFormations = formations.filter(formation => {
    const matchesSearch = formation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formation.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Toutes' || formation.category === selectedCategory;

    const matchesLevel = selectedLevel === 'Tous niveaux' ||
      (formation.level === selectedLevel);

    return matchesSearch && matchesCategory && matchesLevel;
  });

  const handleFormationClick = (formationId: string) => {
    navigate(`/formations/${formationId}`);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white pt-32 flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-pink-500 animate-spin mb-4" />
        <p className="text-gray-500">Chargement des formations...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-16">
      {/* Header */}
      <div className="sticky top-28 bg-white/80 backdrop-blur-xl border-b border-gray-200 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <motion.button
                onClick={handleBackToHome}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-700" />
              </motion.button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Nos Formations</h1>
                <p className="text-gray-600 mt-1">{filteredFormations.length} formations disponibles</p>
              </div>
            </div>

            <motion.button
              onClick={() => setShowFilters(!showFilters)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="lg:hidden bg-pink-500 text-white px-4 py-2 rounded-full flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filtres
            </motion.button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher une formation..."
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-pink-500 focus:outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <AnimatePresence>
            {(showFilters || window.innerWidth >= 1024) && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="lg:sticky lg:top-48 h-fit w-full lg:w-64 bg-white border border-gray-200 rounded-2xl p-6 space-y-6"
              >
                <div className="flex items-center justify-between lg:justify-start">
                  <h3 className="font-bold text-gray-900">Filtres</h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="lg:hidden p-1 hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                {/* Category Filter */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">Catégorie</label>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left px-4 py-2 rounded-xl transition-colors ${selectedCategory === category
                          ? 'bg-pink-50 text-pink-600 font-medium'
                          : 'text-gray-600 hover:bg-gray-50'
                          }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Level Filter */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">Niveau</label>
                  <div className="space-y-2">
                    {levels.map((level) => (
                      <button
                        key={level}
                        onClick={() => setSelectedLevel(level)}
                        className={`w-full text-left px-4 py-2 rounded-xl transition-colors ${selectedLevel === level
                          ? 'bg-pink-50 text-pink-600 font-medium'
                          : 'text-gray-600 hover:bg-gray-50'
                          }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reset Filters */}
                <button
                  onClick={() => {
                    setSelectedCategory('Toutes');
                    setSelectedLevel('Tous niveaux');
                    setSearchTerm('');
                  }}
                  className="w-full text-pink-500 hover:text-pink-600 font-medium text-sm py-2"
                >
                  Réinitialiser les filtres
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Formations Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredFormations.map((formation, index) => (
                <motion.div
                  key={formation._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -8 }}
                  onClick={() => handleFormationClick(formation._id)}
                  className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-pink-300 transition-all duration-500 cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={formation.image ? (formation.image.startsWith('http') ? formation.image : `${BASE_URL}${formation.image.startsWith('/') ? '' : '/'}${formation.image}`) : '/placeholder-formation.jpg'}
                      alt={formation.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    {/* Category & Level */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium border border-gray-200">
                        {formation.category}
                      </span>
                      {formation.level && (
                        <span className="bg-pink-50 text-pink-600 px-3 py-1 rounded-full text-xs font-medium border border-pink-100">
                          {formation.level}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-pink-600 transition-colors">
                      {formation.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {formation.description}
                    </p>

                    {/* Instructor */}
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Award className="w-4 h-4" />
                      <span>{formation.instructorName || 'Expert Formateur'}</span>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-sm text-gray-600 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{formation.rating || '4.9'}</span>
                        {formation.reviewsCount && <span className="text-gray-400">({formation.reviewsCount})</span>}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{formation.studentsCount || 0}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{formation.hours}h</span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <span className="text-2xl font-bold text-gray-900">{formation.price}€</span>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium group-hover:bg-pink-600 transition-colors"
                      >
                        Voir détails
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredFormations.length === 0 && (
              <div className="text-center py-20">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Aucune formation trouvée</h3>
                <p className="text-gray-600">Essayez de modifier vos critères de recherche</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
