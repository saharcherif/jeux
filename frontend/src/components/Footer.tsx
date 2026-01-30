import { motion } from 'motion/react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { newsletterApi } from '../api/newsletter.api';
import { trainingsApi, Training } from '../api/trainings.api';
import { useNavigate, Link } from 'react-router-dom';

export function Footer() {
  const navigate = useNavigate();
  const [trainings, setTrainings] = useState<Training[]>([]);

  useEffect(() => {
    trainingsApi.getAll()
      .then(data => {
        // Filter active trainings and take the first 6
        const activeTrainings = data.filter(t => t.isActive).slice(0, 6);
        setTrainings(activeTrainings);
      })
      .catch(err => console.error('Error fetching footer trainings:', err));
  }, []);

  const footerLinks = {
    entreprise: [

      { label: 'Témoignages', href: '#témoignages' },

      { label: 'Parcours', href: '#parcours' },
      { label: 'B2B', href: '/b2b' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' }
    ],

    legal: [
      { label: 'Mentions légales', href: '/mentions-legales' },
      { label: 'Politique de confidentialité', href: '/politique-confidentialite' },
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      await newsletterApi.subscribe(email);
      setStatus('success');
      setMessage('Merci de votre inscription à notre newsletter !');
      setEmail('');
    } catch (err: any) {
      setStatus('error');
      setMessage(err.message || 'Une erreur est survenue lors de l\'inscription.');
    } finally {
      setTimeout(() => {
        if (status === 'success' || status === 'error') {
          setStatus('idle');
          setMessage('');
        }
      }, 5000);
    }
  };

  return (
    <footer className="relative bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300 rounded-3xl p-8 lg:p-12"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h3 className="text-gray-900 text-3xl font-bold">
                Restez informé de nos <span className="text-gray-700">nouveautés</span>
              </h3>
              <p className="text-gray-700">
                Recevez nos dernières formations, conseils et offres exclusives
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    required
                    disabled={status === 'loading'}
                    className="w-full bg-white border border-gray-200 rounded-full px-6 py-4 text-gray-900 placeholder-gray-400 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition-all outline-none disabled:opacity-50"
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-pink-500 text-white px-8 py-4 rounded-full hover:bg-pink-600 transition-colors flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 min-w-[140px]"
                >
                  {status === 'loading' ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Mail className="w-5 h-5" />
                      <span>S'abonner</span>
                    </>
                  )}
                </motion.button>
              </div>

              {/* Feedback Message */}
              {status !== 'idle' && status !== 'loading' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-center gap-2 text-sm font-medium ${status === 'success' ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                >
                  {status === 'success' ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <AlertCircle className="w-4 h-4" />
                  )}
                  {message}
                </motion.div>
              )}
            </form>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 space-y-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="text-gray-900 text-2xl font-bold"
            >
              Mon Espace <span className="text-pink-500">Formation</span>
            </motion.div>
            <p className="text-gray-600 max-w-xs">
              Transformez votre avenir professionnel avec des formations premium adaptées à vos ambitions.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-pink-600 hover:bg-pink-50 hover:border-pink-300 transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Formations */}
          <div className="space-y-4">
            <h4 className="text-gray-900 font-bold">Formations</h4>
            <ul className="space-y-3">
              {trainings.length > 0 ? (
                trainings.map((training) => (
                  <li key={training._id}>
                    <button
                      onClick={() => navigate(`/formations/${training._id}`)}
                      className="text-gray-600 hover:text-pink-600 transition-colors inline-block text-sm text-left w-full hover:translate-x-1"
                    >
                      {training.title}
                    </button>
                  </li>
                ))
              ) : (
                <li className="text-gray-400 text-sm italic">Chargement...</li>
              )}
            </ul>
          </div>

          {/* Entreprise */}
          <div className="space-y-4">
            <h4 className="text-gray-900 font-bold">Entreprise</h4>
            <ul className="space-y-3">
              {footerLinks.entreprise.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith('/') ? (
                    <Link
                      to={link.href}
                      className="text-gray-600 hover:text-pink-600 transition-colors inline-block text-sm hover:translate-x-1 transform duration-200"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-gray-600 hover:text-pink-600 transition-colors inline-block text-sm hover:translate-x-1 transform duration-200"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Ressources */}


          {/* Legal */}
          <div className="space-y-4">
            <h4 className="text-gray-900 font-bold">Légal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith('/') ? (
                    <Link
                      to={link.href}
                      className="text-gray-600 hover:text-pink-600 transition-colors inline-block text-sm hover:translate-x-1 transform duration-200"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-gray-600 hover:text-pink-600 transition-colors inline-block text-sm hover:translate-x-1 transform duration-200"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2025 Mon Espace Formation. Tous droits réservés.
            </p>
            <div className="flex gap-6">

            </div>
          </div>
        </div>
      </div>

      {/* Background Gradient - Removed for white background */}
    </footer>
  );
}