import { motion } from 'motion/react';
import { ArrowRight, ChevronRight, Clock, BookOpen, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { trainingsApi, Training } from '../api/trainings.api';

const COLORS = [
  'from-pink-500 to-purple-600',
  'from-purple-500 to-blue-600',
  'from-blue-500 to-cyan-600',
  'from-emerald-500 to-teal-600'
];

export function LearningPaths() {
  const navigate = useNavigate();
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    trainingsApi.getAll().then(data => {
      // Show the most recent 3 active formations as featured paths
      setTrainings(data.filter(t => t.isActive).slice(-3).reverse());
    }).finally(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div id="parcours" className="py-32 flex flex-col items-center justify-center bg-white">
        <Loader2 className="w-12 h-12 text-pink-500 animate-spin mb-4" />
        <p className="text-gray-500">Chargement des parcours...</p>
      </div>
    );
  }

  if (trainings.length === 0) return null;

  return (
    <section id="parcours" className="relative bg-white py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 lg:mb-20 space-y-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block bg-gray-100 border border-gray-200 rounded-full px-4 py-2"
          >
            <span className="text-gray-700 text-sm font-medium">Parcours de formation</span>
          </motion.div>
          <h2 className="text-gray-900 text-3xl sm:text-4xl lg:text-6xl font-bold">
            Votre chemin vers
            <br />
            <span className="text-pink-500">l'excellence</span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto">
            Des parcours structurés et progressifs pour atteindre vos objectifs professionnels
          </p>
        </motion.div>

        {/* Paths Grid */}
        <div className="space-y-6 sm:space-y-8">
          {trainings.map((training, index) => {
            const color = COLORS[index % COLORS.length];
            const modulesCount = training.modules?.length || 0;
            const steps = training.modules?.slice(0, 5).map(m => m.moduleName) || [
              'Introduction au domaine',
              'Fondamentaux essentiels',
              'Pratique et projets',
              'Techniques avancées',
              'Certification finale'
            ];

            return (
              <motion.div
                key={training._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.01 }}
                className="group relative"
                onClick={() => navigate(`/formations/${training._id}`)}
              >
                {/* Main Card */}
                <div className="relative bg-white border border-gray-200 rounded-3xl overflow-hidden hover:border-pink-300 hover:shadow-xl transition-all duration-500 cursor-pointer">
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                  <div className="relative p-6 sm:p-8 lg:p-12">
                    <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
                      {/* Left: Info */}
                      <div className="lg:col-span-2 space-y-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <span className="inline-block bg-gray-100 border border-gray-200 rounded-full px-3 py-1 text-gray-700 text-xs font-medium">
                              {training.category}
                            </span>
                            {training.level && (
                              <span className="inline-block bg-pink-50 border border-pink-100 text-pink-600 rounded-full px-3 py-1 text-xs font-medium">
                                {training.level}
                              </span>
                            )}
                            <span className="text-gray-500 text-sm flex items-center gap-1">
                              <Clock className="w-4 h-4" /> {training.hours}h
                              <span className="mx-1">•</span>
                              <BookOpen className="w-4 h-4" /> {modulesCount} modules
                            </span>
                          </div>

                          <h3 className="text-gray-900 text-2xl sm:text-3xl font-bold group-hover:text-pink-500 transition-colors">
                            {training.title}
                          </h3>

                          <p className="text-gray-600 text-base sm:text-lg line-clamp-2">
                            {training.description}
                          </p>
                        </div>

                        {/* CTA */}
                        <motion.button
                          whileHover={{ x: 5 }}
                          className="inline-flex items-center gap-2 text-pink-500 font-medium"
                        >
                          Découvrir le parcours
                          <ArrowRight className="w-5 h-5" />
                        </motion.button>
                      </div>

                      {/* Right: Steps */}
                      <div className="space-y-3">
                        <h4 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-4">
                          Programme du parcours
                        </h4>
                        {steps.map((step, stepIndex) => (
                          <motion.div
                            key={stepIndex}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: stepIndex * 0.1 }}
                            whileHover={{ x: 5 }}
                            className="flex items-center gap-3 group/step"
                          >
                            <div className={`flex-shrink-0 w-8 h-8 bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center text-gray-700 text-xs font-medium group-hover/step:bg-gray-200 group-hover/step:border-gray-300 transition-colors`}>
                              {stepIndex + 1}
                            </div>
                            <span className="text-gray-600 text-sm group-hover/step:text-gray-900 transition-colors line-clamp-1">
                              {step}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-1 bg-gradient-to-r from-pink-300 to-pink-500 origin-left"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 relative"
        >
          <div className="relative bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 rounded-3xl p-12 border border-gray-300 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle, rgba(107, 114, 128, 0.4) 1px, transparent 1px)',
                backgroundSize: '30px 30px'
              }} />
            </div>

            <div className="relative text-center space-y-6">
              <h3 className="text-gray-900 text-3xl lg:text-4xl font-bold">
                Besoin d'un parcours personnalisé ?
              </h3>
              <p className="text-gray-700 text-lg max-w-2xl mx-auto">
                Nos conseillers pédagogiques sont là pour vous aider à créer le parcours parfaitement adapté à vos objectifs
              </p>
              <motion.button
                onClick={() => navigate('/contact')}
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(236, 72, 153, 0.2)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
              >
                Contactez-nous
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}