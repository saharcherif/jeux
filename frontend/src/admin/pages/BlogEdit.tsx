import { motion } from 'motion/react';
import { ArrowLeft, Save, ImagePlus, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { blogsApi } from '../../api/blogs.api';

export function BlogEdit() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

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
    const [existingImage, setExistingImage] = useState<string | null>(null);

    // UI State
    const [isLoading, setIsLoading] = useState(false);
    const [isDataLoading, setIsDataLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBlog = async () => {
            if (!id) return;
            try {
                const data = await blogsApi.getOne(id);
                setTitle(data.title);
                setCategory(data.category);
                setExcerpt(data.excerpt);
                setContent(data.content || '');
                setAuthor(data.author);
                setIsActive(data.isActive);
                setExistingImage(data.image || null);
            } catch (err: any) {
                setError(err.message || 'Impossible de charger l\'article');
            } finally {
                setIsDataLoading(false);
            }
        };
        fetchBlog();
    }, [id]);

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
        if (!id) return;
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
            await blogsApi.update(id, formData);
            navigate('/admin/blogs');
        } catch (err: any) {
            setError(err.message || 'Une erreur est survenue lors de la mise à jour de l\'article');
        } finally {
            setIsLoading(false);
        }
    };

    if (isDataLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <Loader2 className="w-12 h-12 text-pink-500 animate-spin mb-4" />
                <p className="text-gray-600">Chargement de l'article...</p>
            </div>
        );
    }

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
                    <h1 className="text-3xl font-bold text-gray-900">Modifier l'article</h1>
                    <p className="text-gray-600">{title}</p>
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
                        ) : existingImage ? (
                            <img src={existingImage.startsWith('http') ? existingImage : `https://api.mon-espace.msit-demo.fr${existingImage}`} alt="Existing" className="w-full h-full object-cover" />
                        ) : (
                            <>
                                <ImagePlus className="w-12 h-12 text-gray-400 group-hover:text-pink-500" />
                                <p className="mt-2 text-sm text-gray-500">Cliquez pour modifier l'image</p>
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
                            {isLoading ? 'Mise à jour en cours...' : 'Mettre à jour l\'article'}
                        </motion.button>
                    </div>
                </div>
            </form>
        </div>
    );
}
