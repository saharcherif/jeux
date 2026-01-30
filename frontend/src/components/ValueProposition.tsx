import { motion } from 'motion/react';
import { Clock, Award, Users, Headphones, CheckCircle, Star } from 'lucide-react';

const values = [
  {
    icon: Clock,
    title: 'Flexibilité totale',
    description: 'Apprenez à votre rythme, où vous voulez, quand vous voulez. Nos formations s\'adaptent à votre emploi du temps.',
    stats: '24/7 disponible'
  },
  {
    icon: Award,
    title: 'Certifications reconnues',
    description: 'Obtenez des diplômes et certifications valorisés par les entreprises leaders du marché.',
    stats: 'ISO certifié'
  },
  {
    icon: Users,
    title: 'Accompagnement personnalisé',
    description: 'Bénéficiez d\'un suivi individuel avec nos mentors experts tout au long de votre parcours.',
    stats: '1-to-1 mentoring'
  },
  {
    icon: Headphones,
    title: 'Support dédié',
    description: 'Notre équipe est à votre écoute pour répondre à toutes vos questions et vous guider.',
    stats: 'Réponse en 2h'
  }
];

const achievements = [
  'Formateurs certifiés et experts du secteur',
  'Contenu actualisé chaque trimestre',
  'Projets pratiques et études de cas réels',
  'Communauté active de professionnels',
  'Accès à vie aux ressources de formation',
  'Garantie satisfaction 30 jours'
];

export function ValueProposition() {
  return (
    <section className="relative bg-white lg:py-32 px-6 lg:px-12 overflow-hidden">
      {/* Background Elements - Subtle */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-gray-200/40 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gray-300/30 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 space-y-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block bg-gray-100 border border-gray-200 rounded-full px-4 py-2"
          >
            <span className="text-gray-700 text-sm font-medium">Pourquoi nous choisir</span>
          </motion.div>
          <h2 className="text-gray-900 text-4xl lg:text-6xl  sm:text-4xl  font-bold">
            Une expérience
            <br />
            <span className="text-pink-500">d'apprentissage unique</span>
          </h2>
        </motion.div>

        {/* Value Cards - Bento Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.03 }}
              className="group relative bg-white border border-gray-200 rounded-3xl p-8 hover:shadow-xl hover:border-pink-300 transition-all duration-500"
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50/0 via-transparent to-gray-100/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />

              <div className="relative space-y-4">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center justify-center w-14 h-14 bg-gray-100 rounded-2xl group-hover:bg-gray-200 transition-colors"
                >
                  <value.icon className="w-7 h-7 text-gray-700" />
                </motion.div>

                <div className="space-y-2">
                  <h3 className="text-gray-900 text-xl font-bold">{value.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </div>

                <div className="pt-2">
                  <span className="inline-block bg-gray-100 border border-gray-200 rounded-full px-3 py-1 text-gray-700 text-xs font-medium">
                    {value.stats}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievements Section - Asymmetric Bento */}
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left: Image Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl lg:p-12 p-6 border border-gray-300">
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gray-300 rounded-2xl flex items-center justify-center">
                    <Star className="w-10 h-10 text-gray-700" />
                  </div>
                  <div>
                    <div className="text-gray-900 text-4xl font-bold">98%</div>
                    <div className="text-gray-700">Taux de satisfaction</div>
                  </div>
                </div>

                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="bg-white/80 backdrop-blur-sm border border-gray-300 rounded-2xl p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="w-10 h-10 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full border-2 border-white"
                        />
                      ))}
                    </div>
                    <span className="text-gray-600 text-sm">+500 apprenants actifs</span>
                  </div>
                  <p className="text-gray-800 italic">
                    "Une plateforme exceptionnelle qui a transformé ma carrière professionnelle"
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right: Checklist */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h3 className="text-gray-900 text-3xl font-bold mb-8">
              Ce qui fait notre
              <span className="text-pink-500"> différence</span>
            </h3>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="flex items-start gap-4 group"
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.4 }}
                    className="flex-shrink-0 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors"
                  >
                    <CheckCircle className="w-4 h-4 text-gray-700" />
                  </motion.div>
                  <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                    {achievement}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}