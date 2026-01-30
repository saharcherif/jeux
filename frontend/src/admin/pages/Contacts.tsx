import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Search, Eye, Mail, Phone, Loader2, Trash2, User, MessageCircle } from 'lucide-react';
import { contactsApi, Contact } from '../../api/contacts.api';

export function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContacts = async () => {
    setIsLoading(true);
    try {
      const data = await contactsApi.getAll();
      setContacts(data);
    } catch (err: any) {
      setError(err.message || 'Impossible de charger les contacts');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter(contact => {
    const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
    const search = searchTerm.toLowerCase();
    return (
      fullName.includes(search) ||
      contact.email.toLowerCase().includes(search) ||
      (contact.message && contact.message.toLowerCase().includes(search))
    );
  });

  const handleDelete = async (id: string) => {
    if (window.confirm('Supprimer ce message définitivement ?')) {
      try {
        await contactsApi.delete(id);
        setContacts(contacts.filter(c => c._id !== id));
      } catch (err: any) {
        alert(err.message || 'Erreur lors de la suppression');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-12 h-12 text-pink-500 animate-spin mb-4" />
        <p className="text-gray-600">Chargement des messages...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages de contact</h1>
        <p className="text-gray-600">Gérez les messages envoyés depuis le site</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700">
          {error}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 p-6 rounded-2xl"
        >
          <p className="text-sm font-medium text-blue-600 mb-1">Total Messages</p>
          <p className="text-3xl font-bold text-blue-900">{contacts.length}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-green-50 p-6 rounded-2xl"
        >
          <p className="text-sm font-medium text-green-600 mb-1">Dernier message</p>
          <p className="text-3xl font-bold text-green-900">
            {contacts.length > 0 ? new Date(contacts[0].createdAt).toLocaleDateString('fr-FR') : '-'}
          </p>
        </motion.div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher un message par nom, email ou contenu..."
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {filteredContacts.map((contact, index) => (
          <motion.div
            key={contact._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-gray-900 text-lg">
                    {contact.firstName} {contact.lastName}
                  </h3>
                  <span className="text-xs text-gray-400">
                    {new Date(contact.createdAt).toLocaleString('fr-FR')}
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {contact.email}
                  </div>
                  {contact.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {contact.phone}
                    </div>
                  )}
                </div>

                <p className="text-gray-600 text-sm italic line-clamp-1 border-l-2 border-pink-100 pl-3">
                  "{contact.message}"
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedContact(contact)}
                  className="px-4 py-2 text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors font-medium flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Voir
                </button>
                <button
                  onClick={() => handleDelete(contact._id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredContacts.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
          <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Aucun message trouvé</h3>
        </div>
      )}

      {/* Detail Modal */}
      {selectedContact && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6"
          onClick={() => setSelectedContact(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            className="bg-white rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900">Détails du message</h2>
              <button onClick={() => setSelectedContact(null)} className="text-gray-400 hover:text-gray-600 transition-all">
                <Trash2 className="w-6 h-6 rotate-45" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">Expéditeur</label>
                  <p className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <User className="w-5 h-5 text-pink-500" />
                    {selectedContact.firstName} {selectedContact.lastName}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">Date d'envoi</label>
                  <p className="text-gray-900">{new Date(selectedContact.createdAt).toLocaleString('fr-FR')}</p>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">Coordonnées de contact</label>
                <div className="space-y-2">
                  <a href={`mailto:${selectedContact.email}`} className="flex items-center gap-2 text-pink-600 hover:underline">
                    <Mail className="w-4 h-4" />
                    {selectedContact.email}
                  </a>
                  {selectedContact.phone && (
                    <a href={`tel:${selectedContact.phone}`} className="flex items-center gap-2 text-pink-600 hover:underline">
                      <Phone className="w-4 h-4" />
                      {selectedContact.phone}
                    </a>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 block">Message</label>
                <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                  {selectedContact.message || "Aucun message fourni."}
                </p>
              </div>
            </div>

            <div className="flex gap-4 mt-8 pt-6 border-t border-gray-100">
              <a
                href={`mailto:${selectedContact.email}`}
                className="flex-1 bg-gray-900 text-white py-4 rounded-2xl font-bold text-center hover:bg-gray-800 transition-colors"
              >
                Répondre par Email
              </a>
              <button
                onClick={() => setSelectedContact(null)}
                className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-2xl font-bold hover:bg-gray-200 transition-colors"
              >
                Fermer
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
