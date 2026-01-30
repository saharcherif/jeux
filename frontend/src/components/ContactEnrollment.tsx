import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { contactsApi, CreateContactDto } from '../api/contacts.api';
import { trainingsApi, Training } from '../api/trainings.api';

export function ContactEnrollment() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formations, setFormations] = useState<Training[]>([]);
  const [isLoadingFormations, setIsLoadingFormations] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    const fetchFormations = async () => {
      setIsLoadingFormations(true);
      try {
        const data = await trainingsApi.getAll();
        setFormations(data.filter(f => f.isActive));
      } catch (err) {
        console.error('Error fetching formations:', err);
      } finally {
        setIsLoadingFormations(false);
      }
    };
    fetchFormations();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Split name into firstName and lastName
    const nameParts = formData.name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || ' ';

    const data: CreateContactDto = {
      firstName,
      lastName,
      email: formData.email,
      phone: formData.phone,
      message: formData.course
        ? `[Formation: ${formData.course}] ${formData.message}`
        : formData.message
    };

    try {
      await contactsApi.create(data);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', course: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue lors de l\'envoi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative bg-white lg:py-32 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
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
            <span className="text-gray-700 text-sm font-medium">Contact & Inscription</span>
          </motion.div>
          <h2 className="text-gray-900 text-4xl lg:text-6xl font-bold">
            Prêt à commencer
            <br />
            <span className="text-pink-500">votre aventure ?</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 lg:p-12 shadow-lg">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="p-4 bg-red-50 text-red-700 rounded-2xl border border-red-100 text-sm">
                      {error}
                    </div>
                  )}

                  {/* Name Field */}
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="space-y-2"
                  >
                    <label className="text-gray-700 text-sm font-medium">Nom complet</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-gray-900 placeholder-gray-400 focus:border-pink-400 focus:bg-white transition-all outline-none text-sm sm:text-base"
                        placeholder="Votre nom"
                        required
                      />
                      {focusedField === 'name' && (
                        <motion.div
                          layoutId="focus-indicator"
                          className="absolute inset-0 border-2 border-pink-400 rounded-2xl pointer-events-none"
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </div>
                  </motion.div>

                  {/* Email Field */}
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="space-y-2"
                  >
                    <label className="text-gray-700 text-sm font-medium">Email</label>
                    <div className="relative">
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-gray-900 placeholder-gray-400 focus:border-pink-400 focus:bg-white transition-all outline-none text-sm sm:text-base"
                        placeholder="votre@email.com"
                        required
                      />
                      {focusedField === 'email' && (
                        <motion.div
                          layoutId="focus-indicator"
                          className="absolute inset-0 border-2 border-pink-400 rounded-2xl pointer-events-none"
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </div>
                  </motion.div>

                  {/* Phone Field */}
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="space-y-2"
                  >
                    <label className="text-gray-700 text-sm font-medium">Téléphone</label>
                    <div className="relative">
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-gray-900 placeholder-gray-400 focus:border-pink-400 focus:bg-white transition-all outline-none text-sm sm:text-base"
                        placeholder="+33 6 12 34 56 78"
                        required
                      />
                      {focusedField === 'phone' && (
                        <motion.div
                          layoutId="focus-indicator"
                          className="absolute inset-0 border-2 border-pink-400 rounded-2xl pointer-events-none"
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </div>
                  </motion.div>

                  {/* Course Select */}
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="space-y-2"
                  >
                    <label className="text-gray-700 text-sm font-medium">Formation souhaitée</label>
                    <div className="relative">
                      <select
                        value={formData.course}
                        onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                        onFocus={() => setFocusedField('course')}
                        onBlur={() => setFocusedField(null)}
                        disabled={isLoadingFormations}
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-gray-900 focus:border-pink-400 focus:bg-white transition-all outline-none appearance-none cursor-pointer disabled:opacity-50 text-sm sm:text-base"
                        required
                      >
                        <option value="" className="bg-white">
                          {isLoadingFormations ? 'Chargement...' : 'Sélectionnez une formation'}
                        </option>
                        {formations.map(f => (
                          <option key={f._id} value={f.title} className="bg-white">
                            {f.title}
                          </option>
                        ))}
                      </select>
                      {focusedField === 'course' && (
                        <motion.div
                          layoutId="focus-indicator"
                          className="absolute inset-0 border-2 border-pink-400 rounded-2xl pointer-events-none"
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </div>
                  </motion.div>

                  {/* Message Field */}
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="space-y-2"
                  >
                    <label className="text-gray-700 text-sm font-medium">Message (optionnel)</label>
                    <div className="relative">
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        rows={4}
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-gray-900 placeholder-gray-400 focus:border-pink-400 focus:bg-white transition-all outline-none resize-none text-sm sm:text-base"
                        placeholder="Parlez-nous de votre projet..."
                      />
                      {focusedField === 'message' && (
                        <motion.div
                          layoutId="focus-indicator"
                          className="absolute inset-0 border-2 border-pink-400 rounded-2xl pointer-events-none"
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </div>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(236, 72, 153, 0.3)" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-pink-500 text-white px-6 sm:px-8 py-4 sm:py-5 rounded-full text-base sm:text-lg font-bold hover:bg-pink-600 transition-colors flex items-center justify-center gap-3 shadow-lg disabled:opacity-50"
                  >
                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  </motion.button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20 bg-green-50 rounded-3xl border border-green-100"
                >
                  <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Demande envoyée !</h3>
                  <p className="text-gray-600">Nous reviendrons vers vous sous 24h.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-8 text-pink-600 font-bold hover:underline"
                  >
                    Envoyer une autre demande
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Right: Contact Info & Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <div className="space-y-6">
              {[
                {
                  icon: Mail,
                  title: 'Email',
                  value: 'contact@monespaceformation.fr',
                  description: 'Réponse sous 24h'
                },
                {
                  icon: Phone,
                  title: 'Téléphone',
                  value: '+33 1 23 45 67 89',
                  description: 'Lun-Ven 9h-18h'
                },
                {
                  icon: MapPin,
                  title: 'Adresse',
                  value: '123 Avenue de la Formation',
                  description: 'Paris, France'
                }
              ].map((contact, index) => (
                <motion.div
                  key={contact.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="flex items-start gap-4 bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 hover:shadow-lg hover:border-pink-300 transition-all duration-500 cursor-pointer"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                    <contact.icon className="w-6 h-6 text-gray-700" />
                  </div>
                  <div>
                    <div className="text-gray-500 text-sm">{contact.title}</div>
                    <div className="text-gray-900 font-medium">{contact.value}</div>
                    <div className="text-gray-400 text-sm">{contact.description}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300 rounded-3xl p-8"
            >
              <h3 className="text-gray-900 text-2xl font-bold mb-6">
                Ce qui vous attend
              </h3>
              <div className="space-y-4">
                {[
                  'Entretien personnalisé avec un conseiller',
                  'Évaluation de votre niveau et objectifs',
                  'Proposition de parcours sur-mesure',
                  'Accès immédiat à la plateforme',
                  'Support et accompagnement continu'
                ].map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-gray-700 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}