import { motion } from 'motion/react';
import { ArrowLeft, Clock, Users, Award, Star, CheckCircle, PlayCircle, Download, Share2, Calendar, TrendingUp, Target } from 'lucide-react';
import { useState } from 'react';
import { EnrollmentModal } from './EnrollmentModal';
import { BASE_URL } from '../api/api';
import { Training } from '../api/trainings.api';

interface FormationDetailProps {
  formation: Training;
  onBack: () => void;
  onClose: () => void;
}

const DEFAULT_MODULES = [
  {
    moduleName: 'Les Fondamentaux',
    topics: [
      'Introduction et configuration de l\'environnement',
      'Les concepts de base essentiels',
      'Premiers pas pratiques',
      'Projet pratique : Application simple'
    ]
  },
  {
    moduleName: 'Concepts Intermédiaires',
    topics: [
      'Architecture et bonnes pratiques',
      'Gestion d\'état avancée',
      'Optimisation des performances',
      'Projet pratique : Application interactive'
    ]
  },
  {
    moduleName: 'Techniques Avancées',
    topics: [
      'Patterns de conception avancés',
      'Tests et qualité du code',
      'Déploiement et CI/CD',
      'Projet pratique : Application complète'
    ]
  }
];

const studentReviews = [
  {
    id: 1,
    name: 'Amira Khalil',
    role: 'Développeuse Frontend',
    rating: 5,
    date: 'Il y a 2 semaines',
    comment: 'Formation exceptionnelle ! Le contenu est très bien structuré et les projets pratiques m\'ont permis de vraiment maîtriser les concepts. Je recommande vivement !',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100'
  },
  {
    id: 2,
    name: 'Mehdi Benali',
    role: 'Chef de Projet',
    rating: 5,
    date: 'Il y a 1 mois',
    comment: 'Excellent accompagnement de l\'instructeur. Les explications sont claires et les ressources fournies sont de grande qualité. J\'ai pu appliquer directement dans mon travail.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
  },
  {
    id: 3,
    name: 'Yasmine Mansour',
    role: 'Étudiante en Informatique',
    rating: 4,
    date: 'Il y a 1 mois',
    comment: 'Très bonne formation avec un bon équilibre entre théorie et pratique. Les projets sont stimulants et permettent de progresser rapidement.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100'
  },
  {
    id: 4,
    name: 'Karim Ouali',
    role: 'Développeur Full-Stack',
    rating: 5,
    date: 'Il y a 2 mois',
    comment: 'Formation complète qui m\'a permis de faire évoluer ma carrière. Le support de la communauté est également un gros plus !',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100'
  }
];

export function FormationDetail({ formation, onBack, onClose }: FormationDetailProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'program' | 'reviews'>('program');

  const modules = formation.modules && formation.modules.length > 0 ? formation.modules : DEFAULT_MODULES;

  return (
    <div className="min-h-screen bg-white pt-32 pb-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-50 via-pink-50 to-white border-b border-gray-200">
        <div className="relative h-[500px]">
          <img
            src={formation.image ? (formation.image.startsWith('http') ? formation.image : `${BASE_URL}${formation.image.startsWith('/') ? '' : '/'}${formation.image}`) : '/placeholder-formation.jpg'}
            alt={formation.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />

          {/* Back Button */}
          <motion.button
            onClick={onBack}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute top-8 left-8 bg-white/20 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </motion.button>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium">
                  {formation.category}
                </span>
                <span className="bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                  {formation.level || 'Tous niveaux'}
                </span>
                {formation.discount && formation.discount > 0 && (
                  <span className="bg-yellow-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                    PROMO -{formation.discount}%
                  </span>
                )}
              </div>

              <h1 className="text-white text-4xl lg:text-6xl font-bold mb-4">{formation.title}</h1>
              <p className="text-white/90 text-xl mb-6 line-clamp-2">{formation.description}</p>

              <div className="flex flex-wrap items-center gap-6 text-white">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold">{formation.rating || '4.9'}</span>
                  <span className="text-white/70">({formation.reviewsCount || 0} avis)</span>
                </div>
                { /*<div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{formation.studentsCount || 0} étudiants</span>
                </div> */}
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{formation.hours}h</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  <span>{formation.instructorName || 'Expert Formateur'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tabs */}
            <div className="flex gap-4 border-b border-gray-200">
              {(['program', 'reviews'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 px-2 font-medium transition-colors relative ${activeTab === tab
                    ? 'text-pink-500'
                    : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  {tab === 'program' && 'Programme'}
                  {/* {tab === 'reviews' && 'Avis'} */}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-500"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'program' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {modules.map((module, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-pink-300 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{module.moduleName}</h3>
                      </div>
                      <span className="bg-pink-50 text-pink-600 px-3 py-1 rounded-full text-sm font-medium">
                        {module.topics.length} sujets
                      </span>
                    </div>
                    <ul className="space-y-3">
                      {module.topics.map((topic, topicIndex) => (
                        <li key={topicIndex} className="flex items-center gap-3 text-gray-700">
                          <PlayCircle className="w-5 h-5 text-gray-400" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'reviews' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Rating Summary */}
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8">
                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <div className="text-6xl font-bold text-gray-900">{formation.rating || '4.9'}</div>
                      <div className="flex items-center justify-center gap-1 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${i < Math.floor(formation.rating || 4.9)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                              }`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-600 mt-2">{formation.reviewsCount || 0} avis</p>
                    </div>
                    <div className="flex-1 space-y-2">
                      {[5, 4, 3, 2, 1].map((star) => (
                        <div key={star} className="flex items-center gap-3">
                          <span className="text-sm text-gray-600 w-8">{star} ★</span>
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-yellow-400"
                              style={{ width: `${star === 5 ? 75 : star === 4 ? 20 : 5}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 w-12">
                            {star === 5 ? '75%' : star === 4 ? '20%' : '5%'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                  {studentReviews.map((review) => (
                    <div
                      key={review.id}
                      className="bg-white border border-gray-200 rounded-2xl p-6"
                    >
                      <div className="flex items-start gap-4">
                        <img
                          src={review.image}
                          alt={review.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <div className="font-bold text-gray-900">{review.name}</div>
                              <div className="text-sm text-gray-600">{review.role}</div>
                            </div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <div className="flex items-center gap-1 mb-3">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                                  }`}
                              />
                            ))}
                          </div>
                          <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column - Sticky Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 bg-white border-2 border-gray-200 rounded-2xl p-8 space-y-6">
              <div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{formation.price}€</div>
                <p className="text-gray-600">Paiement unique</p>
              </div>

              <motion.button
                onClick={() => setIsModalOpen(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-pink-500 text-white py-4 rounded-xl font-bold hover:bg-pink-600 transition-colors"
              >
                S'inscrire maintenant
              </motion.button>

              <div className="space-y-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-3 text-gray-700">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span>Début : À tout moment</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span>Durée : {formation.hours}h</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <TrendingUp className="w-5 h-5 text-gray-400" />
                  <span>Accès illimité à vie</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Download className="w-5 h-5 text-gray-400" />
                  <span>Ressources téléchargeables</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Award className="w-5 h-5 text-gray-400" />
                  <span>Certificat de fin</span>
                </div>
              </div>

              <button className="w-full border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:border-pink-300 hover:bg-pink-50 transition-colors flex items-center justify-center gap-2">
                <Share2 className="w-5 h-5" />
                Partager cette formation
              </button>
            </div>
          </div>
        </div>
      </div>

      <EnrollmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialCourse={formation.title}
      />
    </div>
  );
}