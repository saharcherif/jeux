import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Search, Eye, Clock, Mail, Phone, MapPin, GraduationCap, Briefcase, FileText, Loader2, Trash2, User } from 'lucide-react';
import { inscriptionsApi, Inscription } from '../../api/inscriptions.api';

export function Inscriptions() {
  const [inscriptions, setInscriptions] = useState<Inscription[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInscription, setSelectedInscription] = useState<Inscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInscriptions = async () => {
    setIsLoading(true);
    try {
      const data = await inscriptionsApi.getAll();
      setInscriptions(data);
    } catch (err: any) {
      setError(err.message || 'Impossible de charger les inscriptions');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInscriptions();
  }, []);

  const filteredInscriptions = inscriptions.filter(inscription => {
    const fullName = `${inscription.firstName} ${inscription.lastName}`.toLowerCase();
    const search = searchTerm.toLowerCase();
    return (
      fullName.includes(search) ||
      inscription.email.toLowerCase().includes(search) ||
      inscription.courseInterest.toLowerCase().includes(search)
    );
  });

  const handleDelete = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette inscription ?')) {
      try {
        await inscriptionsApi.delete(id);
        setInscriptions(inscriptions.filter(ins => ins._id !== id));
      } catch (err: any) {
        alert(err.message || 'Erreur lors de la suppression');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-12 h-12 text-pink-500 animate-spin mb-4" />
        <p className="text-gray-600">Chargement des inscriptions...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Inscriptions</h1>
        <p className="text-gray-600">Gérez les demandes d'inscription reçues</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700">
          {error}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Total Inscriptions', count: inscriptions.length, color: 'bg-blue-50 text-blue-600' },
          {
            label: 'Venu cette semaine', count: inscriptions.filter(i => {
              const date = new Date(i.createdAt);
              const now = new Date();
              const diff = now.getTime() - date.getTime();
              return diff < 7 * 24 * 60 * 60 * 1000;
            }).length, color: 'bg-green-50 text-green-600'
          },
          { label: 'Dernière inscription', count: inscriptions.length > 0 ? new Date(inscriptions[0].createdAt).toLocaleDateString('fr-FR') : '-', color: 'bg-purple-50 text-purple-600' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${stat.color} rounded-2xl p-6`}
          >
            <p className="text-sm font-medium mb-1">{stat.label}</p>
            <p className="text-3xl font-bold">{stat.count}</p>
          </motion.div>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher par nom, email ou formation..."
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Inscriptions List */}
      <div className="space-y-4">
        {filteredInscriptions.map((inscription, index) => (
          <motion.div
            key={inscription._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Info */}
              <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">
                      {inscription.firstName} {inscription.lastName}
                    </h3>
                    <p className="text-sm text-pink-600 font-medium mt-1 flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      {inscription.courseInterest}
                    </p>
                  </div>
                  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${inscription.modality === 'online' ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-orange-50 text-orange-600 border-orange-200'
                    }`}>
                    {inscription.modality === 'online' ? 'En ligne' : 'En présentiel'}
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {inscription.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {inscription.phone}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {inscription.city}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Clock className="w-4 h-4" />
                  {new Date(inscription.createdAt).toLocaleString('fr-FR')}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedInscription(inscription)}
                  className="px-4 py-2 text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors font-medium flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Détails
                </button>
                <button
                  onClick={() => handleDelete(inscription._id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Supprimer"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredInscriptions.length === 0 && (
        <div className="text-center py-20">
          <div className="text-gray-400 text-6xl mb-4">📝</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Aucune inscription trouvée</h3>
          <p className="text-gray-600">Essayez de modifier votre recherche</p>
        </div>
      )}

      {/* Detail Modal */}
      {selectedInscription && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6"
          onClick={() => setSelectedInscription(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            className="bg-white rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Détails de l'inscription</h2>
              <button
                onClick={() => setSelectedInscription(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Trash2 className="w-6 h-6 rotate-45" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-gray-500 flex items-center gap-2 mb-1">
                    <User className="w-4 h-4" />
                    Identité
                  </label>
                  <p className="text-lg text-gray-900 font-bold">
                    {selectedInscription.firstName} {selectedInscription.lastName}
                  </p>
                  <p className="text-sm text-gray-600 italic">
                    Né(e) le {new Date(selectedInscription.birthDate).toLocaleDateString('fr-FR')}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500 flex items-center gap-2 mb-1">
                    <Mail className="w-4 h-4" />
                    Contact
                  </label>
                  <p className="text-gray-900">{selectedInscription.email}</p>
                  <p className="text-gray-900">{selectedInscription.phone}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500 flex items-center gap-2 mb-1">
                    <MapPin className="w-4 h-4" />
                    Localisation
                  </label>
                  <p className="text-gray-900">{selectedInscription.city}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-gray-500 flex items-center gap-2 mb-1">
                    <FileText className="w-4 h-4" />
                    Formation souhaitée
                  </label>
                  <p className="text-lg text-pink-600 font-bold">{selectedInscription.courseInterest}</p>
                  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border mt-2 ${selectedInscription.modality === 'online' ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-orange-50 text-orange-600 border-orange-200'
                    }`}>
                    {selectedInscription.modality === 'online' ? 'En ligne' : 'En présentiel'}
                  </span>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500 flex items-center gap-2 mb-1">
                    <GraduationCap className="w-4 h-4" />
                    Niveau d'études
                  </label>
                  <p className="text-gray-900">{selectedInscription.educationLevel}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500 flex items-center gap-2 mb-1">
                    <Briefcase className="w-4 h-4" />
                    Statut actuel
                  </label>
                  <p className="text-gray-900">{selectedInscription.status}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
              <p>ID: {selectedInscription._id}</p>
              <p>Reçue le {new Date(selectedInscription.createdAt).toLocaleString('fr-FR')}</p>
            </div>

            <button
              onClick={() => setSelectedInscription(null)}
              className="w-full mt-8 px-4 py-4 bg-gray-900 text-white rounded-2xl hover:bg-gray-800 transition-colors font-bold"
            >
              Fermer
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
