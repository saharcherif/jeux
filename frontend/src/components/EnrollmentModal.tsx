import { motion, AnimatePresence } from 'motion/react';
import { X, User, Building2, Mail, Phone, BookOpen, Send, CheckCircle, MapPin, Calendar, GraduationCap, Briefcase, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { inscriptionsApi, CreateInscriptionDto } from '../api/inscriptions.api';
import { trainingsApi, Training } from '../api/trainings.api';

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCourse?: string;
}

type UserType = 'student' | 'b2b';

const educationLevels = [
  'Baccalauréat',
  'Bac +2 (BTS, DUT)',
  'Bac +3 (Licence)',
  'Bac +5 (Master)',
  'Doctorat',
  'Autre'
];

const professionalStatuses = [
  'Étudiant',
  'Salarié',
  'Auto-entrepreneur',
  'En recherche d\'emploi',
  'Autre'
];


export function EnrollmentModal({ isOpen, onClose, initialCourse }: EnrollmentModalProps) {
  const [userType, setUserType] = useState<UserType>('student');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formations, setFormations] = useState<Training[]>([]);
  const [isLoadingFormations, setIsLoadingFormations] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    email: '',
    phone: '',
    city: '',
    educationLevel: '',
    status: '',
    courseInterest: initialCourse || '',
    modality: 'onsite' as 'onsite' | 'online',
    company: '' // Kept for B2B local state
  });

  // Reset form when initialCourse changes or modal opens
  useEffect(() => {
    if (initialCourse) {
      setFormData(prev => ({ ...prev, courseInterest: initialCourse }));
    }
  }, [initialCourse, isOpen]);

  useEffect(() => {
    if (isOpen) {
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
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const data: CreateInscriptionDto = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      birthDate: formData.birthDate,
      email: formData.email,
      phone: formData.phone,
      city: formData.city,
      educationLevel: formData.educationLevel,
      status: userType === 'b2b' ? `Entreprise: ${formData.company} (${formData.status})` : formData.status,
      courseInterest: formData.courseInterest,
      modality: formData.modality
    };

    try {
      await inscriptionsApi.create(data);
      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          firstName: '',
          lastName: '',
          birthDate: '',
          email: '',
          phone: '',
          city: '',
          educationLevel: '',
          status: '',
          courseInterest: initialCourse || '',
          modality: 'onsite',
          company: ''
        });
        onClose();
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue lors de l\'envoi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50"
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden pointer-events-auto"
            >
              <div className="relative bg-gradient-to-br from-pink-500 to-pink-600 p-8 text-white">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="space-y-2">
                  <h2 className="text-3xl font-bold">
                    {userType === 'student' ? 'Inscription' : 'Demande Pro'}
                  </h2>
                  <p className="text-pink-100">
                    Complétez vos informations pour finaliser votre demande.
                  </p>
                </div>
              </div>

              <div className="p-8 overflow-y-auto max-h-[calc(90vh-140px)]">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                      <div className="p-3 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm">
                        {error}
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setUserType('student')}
                        className={`p-4 rounded-2xl border-2 transition-all ${userType === 'student'
                          ? 'border-pink-500 bg-pink-50'
                          : 'border-gray-200 bg-white hover:border-pink-200'
                          }`}
                      >
                        <User className={`w-6 h-6 mx-auto mb-2 ${userType === 'student' ? 'text-pink-500' : 'text-gray-400'
                          }`} />
                        <span className={`font-medium ${userType === 'student' ? 'text-pink-500' : 'text-gray-700'
                          }`}>Individuel</span>
                      </motion.button>

                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setUserType('b2b')}
                        className={`p-4 rounded-2xl border-2 transition-all ${userType === 'b2b'
                          ? 'border-pink-500 bg-pink-50'
                          : 'border-gray-200 bg-white hover:border-pink-200'
                          }`}
                      >
                        <Building2 className={`w-6 h-6 mx-auto mb-2 ${userType === 'b2b' ? 'text-pink-500' : 'text-gray-400'
                          }`} />
                        <span className={`font-medium ${userType === 'b2b' ? 'text-pink-500' : 'text-gray-700'
                          }`}>Entreprise</span>
                      </motion.button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-gray-900 font-medium block text-sm">Prénom *</label>
                        <input
                          type="text"
                          name="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors"
                          placeholder="Votre prénom"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-gray-900 font-medium block text-sm">Nom *</label>
                        <input
                          type="text"
                          name="lastName"
                          required
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors"
                          placeholder="Votre nom"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-gray-900 font-medium block text-sm">Date de naissance *</label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="date"
                            name="birthDate"
                            required
                            value={formData.birthDate}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-gray-900 font-medium block text-sm">Ville *</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            name="city"
                            required
                            value={formData.city}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors"
                            placeholder="Votre ville"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-gray-900 font-medium block text-sm">Email *</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors"
                            placeholder="votre@email.com"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-gray-900 font-medium block text-sm">Téléphone *</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors"
                            placeholder="+216 XX XXX XXX"
                          />
                        </div>
                      </div>
                    </div>

                    {userType === 'b2b' && (
                      <div className="space-y-2">
                        <label className="text-gray-900 font-medium block text-sm">Nom de l'entreprise *</label>
                        <input
                          type="text"
                          name="company"
                          required
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors"
                          placeholder="Nom de votre entreprise"
                        />
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-gray-900 font-medium block text-sm">Niveau d'études *</label>
                        <div className="relative">
                          <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <select
                            name="educationLevel"
                            required
                            value={formData.educationLevel}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors bg-white appearance-none"
                          >
                            <option value="">Sélectionner</option>
                            {educationLevels.map(level => <option key={level} value={level}>{level}</option>)}
                          </select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-gray-900 font-medium block text-sm">Statut *</label>
                        <div className="relative">
                          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <select
                            name="status"
                            required
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors bg-white appearance-none"
                          >
                            <option value="">Sélectionner</option>
                            {professionalStatuses.map(status => <option key={status} value={status}>{status}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-gray-900 font-medium block text-sm">Formation *</label>
                      <div className="relative">
                        <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <select
                          name="courseInterest"
                          required
                          value={formData.courseInterest}
                          onChange={handleChange}
                          disabled={isLoadingFormations}
                          className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors bg-white appearance-none disabled:bg-gray-50 disabled:text-gray-500"
                        >
                          <option value="">
                            {isLoadingFormations ? 'Chargement...' : 'Choisir une formation'}
                          </option>
                          {formations.map(f => (
                            <option key={f._id} value={f.title}>
                              {f.title}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-gray-900 font-medium block text-sm">Modalité *</label>
                      <div className="flex gap-4">
                        <label className="flex-1">
                          <input
                            type="radio"
                            name="modality"
                            value="onsite"
                            checked={formData.modality === 'onsite'}
                            onChange={handleChange}
                            className="sr-only peer"
                          />
                          <div className="p-3 text-center border-2 border-gray-200 rounded-xl peer-checked:border-pink-500 peer-checked:bg-pink-50 transition-all cursor-pointer">
                            En présentiel
                          </div>
                        </label>
                        <label className="flex-1">
                          <input
                            type="radio"
                            name="modality"
                            value="online"
                            checked={formData.modality === 'online'}
                            onChange={handleChange}
                            className="sr-only peer"
                          />
                          <div className="p-3 text-center border-2 border-gray-200 rounded-xl peer-checked:border-pink-500 peer-checked:bg-pink-50 transition-all cursor-pointer">
                            En ligne
                          </div>
                        </label>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-pink-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-pink-600 transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                      Envoyer ma demande
                    </button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 space-y-6"
                  >
                    <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-gray-900">Demande envoyée !</h3>
                      <p className="text-gray-600">Notre équipe reviendra vers vous très rapidement.</p>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
