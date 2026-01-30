import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-pink-50 to-white flex items-center justify-center px-6 pt-32 pb-16">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* 404 Number */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative mb-8"
          >
            <h1 className="text-[180px] font-bold text-pink-500/10 leading-none select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <Search className="w-24 h-24 text-pink-500" strokeWidth={1.5} />
            </div>
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-4 mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900">
              Page introuvable
            </h2>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              Désolé, la page que vous recherchez n'existe pas ou a été déplacée. 
              Explorez nos formations pour découvrir de nouvelles opportunités !
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              onClick={() => navigate('/')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-pink-500 text-white px-8 py-4 rounded-full hover:bg-pink-600 transition-colors shadow-lg font-medium flex items-center gap-2 min-w-[200px] justify-center"
            >
              <Home className="w-5 h-5" />
              Retour à l'accueil
            </motion.button>

            <motion.button
              onClick={() => navigate(-1)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-gray-700 px-8 py-4 rounded-full hover:bg-gray-50 transition-colors shadow-lg font-medium border border-gray-200 flex items-center gap-2 min-w-[200px] justify-center"
            >
              <ArrowLeft className="w-5 h-5" />
              Page précédente
            </motion.button>
          </motion.div>

          {/* Suggestions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-16 pt-12 border-t border-gray-200"
          >
            <p className="text-sm text-gray-500 mb-4">Vous pourriez être intéressé par :</p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => navigate('/formations')}
                className="bg-gray-100 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-200 transition-colors text-sm font-medium"
              >
                Nos formations
              </button>
              <button
                onClick={() => navigate('/#parcours')}
                className="bg-gray-100 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-200 transition-colors text-sm font-medium"
              >
                Parcours d'apprentissage
              </button>
              <button
                onClick={() => navigate('/#contact')}
                className="bg-gray-100 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-200 transition-colors text-sm font-medium"
              >
                Contactez-nous
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
