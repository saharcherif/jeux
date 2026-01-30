import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Zap, Target } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
interface HeroProps {
  onExploreClick: () => void;
}
export function CTASection({ onExploreClick }: HeroProps) {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const handleExploreClickContact = () => {
    navigate('/contact');
  };
  return (
    <section className="relative py-32 px-6 lg:px-12 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative bg-gradient-to-br from-pink-500 via-pink-600 to-purple-600 rounded-3xl overflow-hidden shadow-2xl">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <motion.div
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }}
                className="w-full h-full"
                style={{
                  backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 1px, transparent 1px)',
                  backgroundSize: '50px 50px'
                }}
              />
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 right-10 w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center"
            >
              <Sparkles className="w-10 h-10 text-white" />
            </motion.div>

            <motion.div
              animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-10 left-10 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center"
            >
              <Zap className="w-8 h-8 text-white" />
            </motion.div>

            {/* Content */}
            <div className="relative px-8 lg:px-16 py-16 lg:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
              <div className="max-w-4xl mx-auto text-center space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2"
                >
                  <Target className="w-4 h-4 text-white" />
                  <span className="text-white text-sm font-medium">{t('cta.launch_offer')}</span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-white text-4xl lg:text-7xl font-bold leading-tight whitespace-pre-line"
                >
                  {t('cta.title')}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-white/90 text-xl lg:text-2xl max-w-3xl mx-auto whitespace-pre-line"
                >
                  {t('cta.subtitle')}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(255, 255, 255, 0.5)" }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-gray-900 px-10 py-5 rounded-full text-lg font-bold hover:bg-gray-100 transition-colors inline-flex items-center gap-3 shadow-2xl"
                    onClick={onExploreClick} >
                    {t('cta.discover')}
                    <ArrowRight className="w-6 h-6" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-white/20 transition-colors"
                    onClick={handleExploreClickContact} >
                    {t('cta.contact_us')}
                  </motion.button>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-wrap justify-center items-center gap-8 pt-8 text-white/90 text-sm"
                >
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                    </svg>
                    <span>{t('cta.no_card')}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                    </svg>
                    <span>{t('cta.support')}</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Secondary CTA Cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="bg-white border border-gray-200 rounded-3xl p-8 hover:border-pink-300 hover:shadow-xl transition-all duration-500 group cursor-pointer"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                <Sparkles className="w-7 h-7 text-gray-700" />
              </div>
              <h3 className="text-gray-900 text-2xl font-bold">{t('cta.custom_training')}</h3>
              <p className="text-gray-600">
                {t('cta.custom_training_desc')}
              </p>
              <div className="flex items-center gap-2 text-pink-500 font-medium pt-2 group-hover:gap-4 transition-all">
                <span>{t('cta.learn_more')}</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="bg-white border border-gray-200 rounded-3xl p-8 hover:border-pink-300 hover:shadow-xl transition-all duration-500 group cursor-pointer"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                <Target className="w-7 h-7 text-gray-700" />
              </div>
              <h3 className="text-gray-900 text-2xl font-bold">{t('cta.financing')}</h3>
              <p className="text-gray-600">
                {t('cta.financing_desc')}
              </p>
              <div className="flex items-center gap-2 text-pink-500 font-medium pt-2 group-hover:gap-4 transition-all">
                <span>{t('cta.see_options')}</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}