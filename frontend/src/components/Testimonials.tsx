import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sophie Martin',
    role: 'Développeuse Full-Stack',
    company: 'TechCorp',
    image: 'https://i.pravatar.cc/150?img=1',
    content: 'Mon Espace Formation a complètement transformé ma carrière. En 6 mois, je suis passée de débutante à développeuse confirmée. Les formateurs sont exceptionnels et le suivi personnalisé fait toute la différence.',
    rating: 5,
    course: 'Développement Web'
  },
  {
    id: 2,
    name: 'Thomas Dubois',
    role: 'Designer UX/UI',
    company: 'Creative Studio',
    image: 'https://i.pravatar.cc/150?img=2',
    content: 'La qualité du contenu et l\'approche pratique m\'ont permis de décrocher mon poste de rêve. Les projets réels et le portfolio construit durant la formation ont été déterminants lors de mes entretiens.',
    rating: 5,
    course: 'Design UI/UX'
  },
  {
    id: 3,
    name: 'Marie Laurent',
    role: 'Data Scientist',
    company: 'DataVision',
    image: 'https://i.pravatar.cc/150?img=3',
    content: 'Une expérience d\'apprentissage exceptionnelle. Le programme est bien structuré, les exercices sont pertinents et la communauté est incroyablement soutenante. Je recommande vivement !',
    rating: 5,
    course: 'Data Analytics'
  },
  {
    id: 4,
    name: 'Alexandre Petit',
    role: 'Chef de Projet Digital',
    company: 'Innovation Labs',
    image: 'https://i.pravatar.cc/150?img=4',
    content: 'Grâce à Mon Espace Formation, j\'ai pu me reconvertir avec succès. La flexibilité des cours m\'a permis d\'apprendre tout en travaillant. Aujourd\'hui, je manage une équipe de 10 personnes.',
    rating: 5,
    course: 'Marketing Digital'
  },
  {
    id: 5,
    name: 'Camille Rousseau',
    role: 'Entrepreneure',
    company: 'StartUp Innovante',
    image: 'https://i.pravatar.cc/150?img=5',
    content: 'Le parcours entrepreneuriat m\'a donné toutes les clés pour lancer ma startup. Les mentors sont des professionnels expérimentés qui partagent leurs meilleures pratiques. Inestimable !',
    rating: 5,
    course: 'Entrepreneuriat'
  },
  {
    id: 6,
    name: 'Lucas Bernard',
    role: 'Leader Technique',
    company: 'Global Tech',
    image: 'https://i.pravatar.cc/150?img=6',
    content: 'Formation de très haute qualité avec un excellent rapport qualité-prix. J\'ai particulièrement apprécié les cas pratiques et les certifications reconnues par l\'industrie.',
    rating: 5,
    course: 'Leadership'
  }
];

export function Testimonials() {
  return (
    <section id="témoignages" className="relative bg-white lg:py-32 px-6 lg:px-12 overflow-hidden">
      {/* Background Effects - Subtle */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gray-200/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gray-300/30 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20 space-y-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block bg-gray-100 border border-gray-200 rounded-full px-4 py-2"
          >
            <span className="text-gray-700 text-sm font-medium">Témoignages</span>
          </motion.div>
          <h2 className="text-gray-900 text-5xl lg:text-6xl font-bold">
            Ils ont réussi
            <br />
            <span className="text-pink-500">avec nous</span>
          </h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto">
            Découvrez les histoires inspirantes de nos apprenants qui ont transformé leur carrière
          </p>
        </motion.div>

        {/* Infinite Carousel - Testimonials */}
        <div className="relative overflow-hidden">
          {/* Gradient Overlays for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <motion.div
            animate={{
              x: [0, -100 * testimonials.length]
            }}
            transition={{
              x: {
                duration: 60,
                repeat: Infinity,
                ease: "linear"
              }
            }}
            className="flex gap-6"
          >
            {/* First set of testimonials */}
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={`first-${testimonial.id}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative bg-white border border-gray-200 rounded-3xl p-8 hover:shadow-xl hover:border-pink-300 transition-all duration-500 flex-shrink-0 w-[400px]"
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50/0 via-transparent to-gray-100/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />

                {/* Quote Icon */}
                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="w-16 h-16 text-gray-400" />
                </div>

                <div className="relative space-y-6">
                  {/* Content */}
                  <p className="text-gray-700 leading-relaxed">
                    "{testimonial.content}"
                  </p>

                  {/* Course Tag */}
                  <div className="inline-block bg-gray-100 border border-gray-200 rounded-full px-3 py-1">
                    <span className="text-gray-700 text-xs font-medium">{testimonial.course}</span>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="relative"
                    >
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-200"
                      />
                    </motion.div>
                    <div>
                      <div className="text-gray-900 font-medium">{testimonial.name}</div>
                      <div className="text-gray-600 text-sm">{testimonial.role}</div>
                      <div className="text-gray-500 text-xs">{testimonial.company}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Duplicate set for infinite loop */}
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={`second-${testimonial.id}`}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative bg-white border border-gray-200 rounded-3xl p-8 hover:shadow-xl hover:border-pink-300 transition-all duration-500 flex-shrink-0 w-[400px]"
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50/0 via-transparent to-gray-100/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />

                {/* Quote Icon */}
                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="w-16 h-16 text-gray-400" />
                </div>

                <div className="relative space-y-6">
                  {/* Content */}
                  <p className="text-gray-700 leading-relaxed">
                    "{testimonial.content}"
                  </p>

                  {/* Course Tag */}
                  <div className="inline-block bg-gray-100 border border-gray-200 rounded-full px-3 py-1">
                    <span className="text-gray-700 text-xs font-medium">{testimonial.course}</span>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="relative"
                    >
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-200"
                      />
                    </motion.div>
                    <div>
                      <div className="text-gray-900 font-medium">{testimonial.name}</div>
                      <div className="text-gray-600 text-sm">{testimonial.role}</div>
                      <div className="text-gray-500 text-xs">{testimonial.company}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-white border border-gray-200 rounded-3xl p-8 lg:p-12 shadow-lg"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '500+', label: 'Apprenants formés' },
              { number: '98%', label: 'Taux de réussite' },
              { number: '4.9/5', label: 'Note moyenne' },
              { number: '95%', label: 'Recommandent' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center space-y-2"
              >
                <div className="text-gray-900 text-4xl lg:text-5xl font-bold">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}