import { motion } from 'motion/react';
import { ArrowLeft, Save, ImagePlus, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { blogsApi } from '../../api/blogs.api';

export function BlogCreate() {
    const navigate = useNavigate();

    // Form State
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [isActive, setIsActive] = useState(true);

    // Media State
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // UI State
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('category', category);
        formData.append('excerpt', excerpt);
        formData.append('content', content);
        formData.append('author', author);
        formData.append('isActive', isActive.toString());

        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            await blogsApi.create(formData);
            navigate('/admin/blogs');
        } catch (err: any) {
            setError(err.message || 'Une erreur est survenue lors de la création de l\'article');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <motion.button
                    onClick={() => navigate('/admin/blogs')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-6 h-6" />
                </motion.button>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Nouvel article</h1>
                    <p className="text-gray-600">Rédigez un nouvel article pour votre blog</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 pb-20">
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700">
                        {error}
                    </div>
                )}

                {/* Basic Information */}
                <div className="bg-white rounded-2xl border border-gray-200 p-8 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Titre *</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none"
                            placeholder="Titre de l'article"
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie *</label>
                            <input
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none"
                                placeholder="Ex: Technologie, Formation..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Auteur *</label>
                            <input
                                type="text"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                required
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none"
                                placeholder="Nom de l'auteur"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                        <select
                            value={isActive ? 'active' : 'draft'}
                            onChange={(e) => setIsActive(e.target.value === 'active')}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none"
                        >
                            <option value="active">Publié</option>
                            <option value="draft">Brouillon</option>
                        </select>
                    </div>
                </div>

                {/* Media */}
                <div className="bg-white rounded-2xl border border-gray-200 p-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Image de couverture</h2>
                    <div
                        className="aspect-video w-full rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center relative overflow-hidden bg-gray-50 group hover:border-pink-500 transition-colors cursor-pointer"
                        onClick={() => document.getElementById('blog-image')?.click()}
                    >
                        {imagePreview ? (
                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                            <>
                                <ImagePlus className="w-12 h-12 text-gray-400 group-hover:text-pink-500" />
                                <p className="mt-2 text-sm text-gray-500">Cliquez pour ajouter une image</p>
                                <p className="text-xs text-gray-400 mt-1">PNG, JPG jusqu'à 5MB</p>
                            </>
                        )}
                        <input
                            id="blog-image"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="bg-white rounded-2xl border border-gray-200 p-8 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Résumé (Excerpt) *</label>
                        <textarea
                            value={excerpt}
                            onChange={(e) => setExcerpt(e.target.value)}
                            required
                            rows={3}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none"
                            placeholder="Bref résumé de l'article pour la liste..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Contenu *</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                            rows={12}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none font-mono text-sm"
                            placeholder="Corps de l'article..."
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4 z-10">
                    <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border-2 border-gray-200 shadow-xl flex gap-4">
                        <button
                            type="button"
                            onClick={() => navigate('/admin/blogs')}
                            disabled={isLoading}
                            className="flex-1 px-6 py-4 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors font-medium disabled:opacity-50"
                        >
                            Annuler
                        </button>
                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1 px-6 py-4 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition-colors font-medium flex items-center justify-center gap-2 shadow-lg shadow-pink-200 disabled:opacity-50"
                        >
                            {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Save className="w-6 h-6" />}
                            {isLoading ? 'Création en cours...' : 'Publier l\'article'}
                        </motion.button>
                    </div>
                </div>
            </form>
        </div>
    );
}
