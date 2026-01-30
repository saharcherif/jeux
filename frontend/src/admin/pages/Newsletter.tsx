import { motion } from 'motion/react';
import { Mail, Trash2, Search, Calendar, Loader2, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { newsletterApi, NewsletterSubscription } from '../../api/newsletter.api';

export function Newsletter() {
    const navigate = useNavigate();
    const [subscriptions, setSubscriptions] = useState<NewsletterSubscription[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchSubscriptions();
    }, []);

    const fetchSubscriptions = async () => {
        try {
            setIsLoading(true);
            const data = await newsletterApi.getAll();
            setSubscriptions(data);
            setError(null);
        } catch (err: any) {
            setError(err.message || 'Impossible de charger la liste des abonnés');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet abonné ?')) return;

        try {
            await newsletterApi.delete(id);
            setSubscriptions(subscriptions.filter(s => s._id !== id));
        } catch (err: any) {
            alert(err.message || 'Erreur lors de la suppression');
        }
    };

    const filteredSubscriptions = subscriptions.filter(s =>
        s.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <Loader2 className="w-12 h-12 text-pink-500 animate-spin mb-4" />
                <p className="text-gray-500 font-medium">Chargement des abonnés...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-8 rounded-3xl border border-gray-200">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-600">
                        <Mail className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Newsletter</h1>
                        <p className="text-gray-600">{subscriptions.length} abonnés au total</p>
                    </div>
                </div>

                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Rechercher un email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-12 pr-6 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-100 focus:border-pink-300 w-full md:w-80 transition-all"
                    />
                </div>
            </div>

            {error ? (
                <div className="bg-red-50 text-red-600 p-6 rounded-3xl border border-red-100">
                    <p className="font-medium">{error}</p>
                    <button
                        onClick={fetchSubscriptions}
                        className="mt-4 text-sm font-bold underline hover:no-underline"
                    >
                        Réessayer
                    </button>
                </div>
            ) : (
                <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-wider">Email</th>
                                    <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-wider">Date d'inscription</th>
                                    <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredSubscriptions.map((sub) => (
                                    <motion.tr
                                        key={sub._id}
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="hover:bg-gray-50/50 transition-colors group"
                                    >
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-pink-100 group-hover:text-pink-500 transition-colors text-xs font-bold">
                                                    {sub.email.charAt(0).toUpperCase()}
                                                </div>
                                                <span className="font-medium text-gray-900">{sub.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-gray-500">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-gray-300" />
                                                {new Date(sub.subscribedAt).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <button
                                                onClick={() => handleDelete(sub._id)}
                                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                                title="Supprimer l'abonné"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                                {filteredSubscriptions.length === 0 && (
                                    <tr>
                                        <td colSpan={3} className="px-8 py-12 text-center text-gray-500 italic">
                                            Aucun abonné trouvé
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
