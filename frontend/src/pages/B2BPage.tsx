import { motion } from 'motion/react';
import { Building2, Users, TrendingUp, Shield, CheckCircle, ArrowRight, Target, Award } from 'lucide-react';
import { useState } from 'react';
import { EnrollmentModal } from '../components/EnrollmentModal';
import image from 'figma:asset/f3339a614dcacfa00d47bc693f36df06e4c39efd.png'; // Using logo/brand asset if needed, but prefer main hero logic
import heroImage from 'figma:asset/f2dddff10fce8c5cc0468d3c13d16d6eeadcbdb7.png'; // Reusing an existing large asset as placeholder or the one from Hero

// Using the new Unsplash image found
const b2bHeroImage = "https://images.unsplash.com/photo-1758691736067-b309ee3ef7b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjB0cmFpbmluZyUyMHRlYW0lMjBtZWV0aW5nJTIwb2ZmaWNlfGVufDF8fHx8MTc2OTE3OTIxNHww&ixlib=rb-4.1.0&q=80&w=1080";

export function B2BPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const features = [
    {
      icon: Users,
      title: "Formation d'équipe",
      description: "Formez vos collaborateurs simultanément sur les technologies de pointe."
    },
    {
      icon: Target,
      title: "Parcours sur mesure",
      description: "Des programmes adaptés aux besoins spécifiques de votre entreprise."
    },
    {
      icon: TrendingUp,
      title: "Suivi de performance",
      description: "Tableaux de bord détaillés pour suivre la progression de vos équipes."
    },
    {
      icon: Shield,
      title: "Certification Pro",
      description: "Certifications reconnues valorisant l'expertise de vos employés."
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 bg-pink-50 border border-pink-100 rounded-full px-4 py-2">
                <Building2 className="w-4 h-4 text-pink-500" />
                <span className="text-pink-600 text-sm font-medium">Solution Entreprise</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Accélérez la
                <br />
                <span className="text-pink-500">croissance</span> de
                <br />
                votre entreprise
              </h1>
              
              <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                Développez les compétences de vos équipes avec nos programmes de formation professionnelle sur mesure.
              </p>

              <div className="flex gap-4">
                <motion.button
                  onClick={() => setIsModalOpen(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-pink-500 text-white px-8 py-4 rounded-full text-lg font-medium flex items-center gap-2 hover:bg-pink-600 transition-colors shadow-lg shadow-pink-500/25"
                >
                  Demander un devis
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="pt-8 border-t border-gray-100">
                <div className="flex items-center gap-8">
                  <div>
                    <div className="text-3xl font-bold text-gray-900">50+</div>
                    <div className="text-sm text-gray-500">Entreprises clientes</div>
                  </div>
                  <div className="w-px h-12 bg-gray-200" />
                  <div>
                    <div className="text-3xl font-bold text-gray-900">100%</div>
                    <div className="text-sm text-gray-500">Adaptable</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={b2bHeroImage} 
                  alt="Formation entreprise" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
              </div>
              
              {/* Floating Badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 max-w-xs"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">ROI Garanti</h3>
                    <p className="text-sm text-gray-500">Augmentez la productivité de vos équipes dès le premier mois.</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Pourquoi choisir nos solutions B2B ?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Une approche pédagogique innovante conçue pour les besoins des entreprises modernes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-3xl border border-gray-100 hover:shadow-xl hover:border-pink-200 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-pink-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-pink-500/10 blur-3xl rounded-full translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-blue-500/10 blur-3xl rounded-full -translate-x-1/2" />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">
            Prêt à transformer votre entreprise ?
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Discutons de vos besoins et construisons ensemble le plan de formation idéal pour vos équipes.
          </p>
          <motion.button
            onClick={() => setIsModalOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-pink-500 text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-pink-600 transition-colors shadow-2xl shadow-pink-500/50"
          >
            Obtenir un devis personnalisé
          </motion.button>
        </div>
      </section>

      <EnrollmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
