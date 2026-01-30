import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Award } from 'lucide-react';
import exampleImage from 'figma:asset/04978e9bd4fba959ca4af5d9c4c3d21920930caa.png';
import { useState, useEffect } from 'react';
import { trainingsApi } from '../api/trainings.api';

interface HeroProps {
  onExploreClick: () => void;
}

export function Hero({ onExploreClick }: HeroProps) {
  const [formationsCount, setFormationsCount] = useState<number | string>('...');

  useEffect(() => {
    trainingsApi.getAll().then(data => {
      setFormationsCount(data.length);
    }).catch(() => {
      setFormationsCount('25+'); // Fallback
    });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white pt-20">
      {/* Animated Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-gray-300/30 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.08, 0.12, 0.08],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gray-200/25 rounded-full blur-3xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-full px-4 py-2"
            >
              <Sparkles className="w-4 h-4 text-gray-600" />
              <span className="text-gray-700 text-sm">Nouvelle génération de formation</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-900 text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight"
            >
              Transformez
              <br />
              <span className="text-pink-500">votre avenir</span>
              <br />
              professionnel
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 text-base sm:text-lg lg:text-xl max-w-xl"
            >
              Des formations premium conçues par des experts pour vous accompagner vers l'excellence. Apprenez à votre rythme, évoluez avec confiance.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
            >
              <motion.button
                onClick={onExploreClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-pink-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium flex items-center justify-center gap-2 hover:bg-pink-600 transition-colors w-full sm:w-auto"
              >
                Explorer les formations
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 sm:pt-8"
            >
              {[
                { number: '500+', label: 'Apprenants' },
                { number: `${formationsCount}+`, label: 'Formations' },
                { number: '98%', label: 'Satisfaction' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -5 }}
                  className="space-y-1"
                >
                  <div className="text-gray-900 text-2xl sm:text-3xl font-bold">{stat.number}</div>
                  <div className="text-gray-600 text-xs sm:text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Bento Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.02, rotateZ: 1 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl"
            >
              <img
                src={exampleImage}
                alt="Mon Espace Formation"
                className="w-3/4 h-auto mx-auto"
              />
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-gray-900/30 via-transparent to-transparent px-[5px] py-[0px]" />

              {/* Advanced Animated Overlay */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Animated Gradient Base */}
                <motion.div
                  animate={{
                    background: [
                      'linear-gradient(180deg, rgba(17, 24, 39, 0) 0%, rgba(17, 24, 39, 0.3) 100%)',
                      'linear-gradient(180deg, rgba(17, 24, 39, 0) 0%, rgba(156, 163, 175, 0.2) 100%)',
                      'linear-gradient(180deg, rgba(17, 24, 39, 0) 0%, rgba(17, 24, 39, 0.3) 100%)',
                    ]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0"
                />

                {/* Floating Particles */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -100, 0],
                      x: [0, Math.sin(i) * 50, 0],
                      opacity: [0, 0.6, 0],
                      scale: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 4 + i * 0.5,
                      repeat: Infinity,
                      delay: i * 0.4,
                      ease: "easeInOut"
                    }}
                    className="absolute w-2 h-2 bg-gray-400 rounded-full blur-sm"
                    style={{
                      left: `${10 + i * 12}%`,
                      bottom: `${10 + (i % 3) * 10}%`
                    }}
                  />
                ))}

                {/* Animated Mesh Gradient */}
                <motion.div
                  animate={{
                    opacity: [0.2, 0.4, 0.2],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-gradient-to-br from-gray-300/15 via-gray-400/15 to-transparent mix-blend-overlay"
                />

                {/* Shimmer Effect */}
                <motion.div
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                  style={{ width: '50%' }}
                />

                {/* Breathing Vignette */}
                <motion.div
                  animate={{
                    opacity: [0.4, 0.7, 0.4],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-gray-900/50"
                />
              </div>
            </motion.div>

            {/* Floating Cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 bg-white border border-gray-200 rounded-2xl p-4 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-gray-700" />
                </div>
                <div>
                  <div className="text-gray-900 font-medium">Certifié</div>
                  <div className="text-gray-600 text-sm">Diplômes reconnus</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-pink-500 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}