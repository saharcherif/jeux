import { motion } from 'motion/react';
import { ArrowRight, Code, Palette, Briefcase, TrendingUp, Users, Shield, Cloud, GitBranch, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { categoriesApi, Category } from '../api/categories.api';
import { trainingsApi } from '../api/trainings.api';
import { BASE_URL } from '../api/api';

// UI Mapping for categories to keep the design rich
const categoryUIMap: Record<string, { icon: any, color: string, size: 'small' | 'medium' | 'large' }> = {
  'Développement': { icon: Code, color: 'text-blue-500', size: 'large' },
  'Design': { icon: Palette, color: 'text-purple-500', size: 'medium' },
  'Marketing': { icon: Briefcase, color: 'text-pink-500', size: 'medium' },
  'Data Science': { icon: TrendingUp, color: 'text-green-500', size: 'large' },
  'Management': { icon: Users, color: 'text-orange-500', size: 'small' },
  'Sécurité': { icon: Shield, color: 'text-red-500', size: 'medium' },
  'Cloud': { icon: Cloud, color: 'text-sky-500', size: 'medium' },
  'DevOps': { icon: GitBranch, color: 'text-emerald-500', size: 'medium' },
};

export function ProgramsGrid() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      categoriesApi.getAll(),
      trainingsApi.getAll()
    ]).then(([catData, trainData]) => {
      const activeTrainings = trainData.filter(t => t.isActive);

      const enrichedCategories = catData
        .filter(c => c.isActive)
        .map(cat => ({
          ...cat,
          formationsCount: activeTrainings.filter(t => t.category === cat.name).length
        }));

      setCategories(enrichedCategories);
    }).finally(() => {
      setIsLoading(false);
    });
  }, []);

  const handleCategoryClick = (categorySlug: string) => {
    navigate(`/formations/categories/${encodeURIComponent(categorySlug)}`);
  };

  const handleViewAll = () => {
    navigate('/formations');
  };

  if (isLoading) {
    return (
      <div className="py-32 flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-pink-500 animate-spin mb-4" />
        <p className="text-gray-500">Chargement des catégories...</p>
      </div>
    );
  }

  return (
    <section id="formations" className="relative bg-white py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16 space-y-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block bg-gray-100 border border-gray-200 rounded-full px-4 py-2"
          >
            <span className="text-gray-700 text-sm font-medium">Nos formations</span>
          </motion.div>
          <h2 className="text-gray-900 text-3xl sm:text-4xl lg:text-6xl font-bold">
            Des programmes
            <br />
            <span className="text-pink-500">sur mesure</span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg lg:text-xl max-w-2xl">
            Découvrez nos parcours de formation conçus pour répondre aux besoins du marché et booster votre carrière
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 auto-rows-fr">
          {categories.map((category, index) => {
            const ui = categoryUIMap[category.name] || { icon: Code, color: 'text-gray-500', size: 'medium' };
            const Icon = ui.icon;

            return (
              <motion.div
                key={category._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => handleCategoryClick(category.slug)}
                className={`
                  group relative bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-3xl p-6 sm:p-8
                  hover:shadow-xl hover:border-pink-300 transition-all duration-500 cursor-pointer
                  ${ui.size === 'large' ? 'md:col-span-2' : ''}
                  ${ui.size === 'small' ? 'lg:col-span-1' : ''}
                `}
              >
                {/* Category Image/Icon */}
                <motion.div
                  whileHover={{ rotate: 5, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-20 h-20 rounded-2xl mb-6 overflow-hidden bg-gray-100 border border-gray-100 group-hover:border-pink-300 transition-all shadow-sm"
                >
                  {category.image ? (
                    <img
                      src={category.image.startsWith('http') ? category.image : `${BASE_URL}${category.image.startsWith('/') ? '' : '/'}${category.image}`}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Icon className={`w-10 h-10 ${ui.color}`} />
                    </div>
                  )}
                </motion.div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-gray-900 text-xl sm:text-2xl font-bold group-hover:text-pink-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {category.description}
                  </p>

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-3 pt-4">
                    <span className="inline-block bg-gray-100 border border-gray-200 rounded-full px-3 py-1 text-gray-700 text-sm">
                      {category.formationsCount || 0} formation{(category.formationsCount || 0) > 1 ? 's' : ''}
                    </span>
                  </div>

                  {/* CTA */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="flex items-center gap-2 text-pink-500 pt-4"
                  >
                    <span className="text-sm font-medium">En savoir plus</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </div>

                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50/0 via-gray-50/0 to-gray-100/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none" />
              </motion.div>
            );
          })}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <motion.button
            onClick={handleViewAll}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white border border-gray-200 text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:border-pink-300 hover:bg-pink-50 transition-colors inline-flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            Voir toutes les formations
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}