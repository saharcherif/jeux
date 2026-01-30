import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Search, FileText, Eye, Loader2 } from 'lucide-react';
import { blogsApi, Blog } from '../../api/blogs.api';

export function Blogs() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPublished, setFilterPublished] = useState<'all' | 'published' | 'draft'>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const data = await blogsApi.getAll(true);
      setBlogs(data);
    } catch (err: any) {
      setError(err.message || 'Impossible de charger les articles');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterPublished === 'all' ||
      (filterPublished === 'published' && blog.isActive) ||
      (filterPublished === 'draft' && !blog.isActive);
    return matchesSearch && matchesFilter;
  });

  const handleDelete = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      try {
        await blogsApi.delete(id);
        setBlogs(blogs.filter(blog => blog._id !== id));
      } catch (err: any) {
        alert(err.message || 'Erreur lors de la suppression');
      }
    }
  };

  const handleTogglePublish = async (blog: Blog) => {
    const formData = new FormData();
    formData.append('isActive', (!blog.isActive).toString());
    try {
      await blogsApi.update(blog._id, formData);
      setBlogs(blogs.map(b =>
        b._id === blog._id ? { ...b, isActive: !b.isActive } : b
      ));
    } catch (err: any) {
      alert(err.message || 'Erreur lors de la mise à jour');
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-12 h-12 text-pink-500 animate-spin mb-4" />
        <p className="text-gray-600">Chargement des articles...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Articles de blog</h1>
          <p className="text-gray-600">Gérez votre contenu éditorial</p>
        </div>
        <motion.button
          onClick={() => navigate('/admin/blogs/create')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-pink-500 text-white px-6 py-3 rounded-xl hover:bg-pink-600 transition-colors shadow-lg font-medium flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Nouvel article
        </motion.button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700">
          {error}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total', count: blogs.length, color: 'bg-blue-50 text-blue-600' },
          { label: 'Publiés', count: blogs.filter(b => b.isActive).length, color: 'bg-green-50 text-green-600' },
          { label: 'Brouillons', count: blogs.filter(b => !b.isActive).length, color: 'bg-yellow-50 text-yellow-600' },
          { label: 'Vues totales', count: blogs.reduce((sum, b) => sum + (b.views || 0), 0), color: 'bg-purple-50 text-purple-600' },
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

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher un article..."
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-colors"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {(['all', 'published', 'draft'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setFilterPublished(filter)}
              className={`px-4 py-2 rounded-xl transition-colors ${filterPublished === filter
                ? 'bg-pink-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              {filter === 'all' ? 'Tous' : filter === 'published' ? 'Publiés' : 'Brouillons'}
            </button>
          ))}
        </div>
      </div>

      {/* Blogs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredBlogs.map((blog, index) => (
          <motion.div
            key={blog._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden bg-gray-100">
              {blog.image ? (
                <img
                  src={blog.image.startsWith('http') ? blog.image : `https://api.mon-espace.msit-demo.fr${blog.image}`}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <FileText className="w-12 h-12" />
                </div>
              )}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${blog.isActive
                  ? 'bg-green-500 text-white'
                  : 'bg-yellow-500 text-white'
                  }`}>
                  {blog.isActive ? 'Publié' : 'Brouillon'}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-pink-50 text-pink-600 px-3 py-1 rounded-full text-xs font-medium">
                  {blog.category}
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(blog.createdAt).toLocaleDateString('fr-FR')}
                </span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                {blog.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {blog.excerpt}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100 mb-4">
                <div className="text-sm text-gray-500">
                  Par <span className="font-medium text-gray-700">{blog.author}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Eye className="w-4 h-4" />
                  <span>{blog.views || 0}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate(`/admin/blogs/${blog._id}/edit`)}
                  className="flex-1 px-4 py-2 text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Modifier
                </button>
                <button
                  onClick={() => handleTogglePublish(blog)}
                  className={`flex-1 px-4 py-2 rounded-lg transition-colors font-medium ${blog.isActive
                    ? 'text-yellow-600 hover:bg-yellow-50'
                    : 'text-green-600 hover:bg-green-50'
                    }`}
                >
                  {blog.isActive ? 'Dépublier' : 'Publier'}
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredBlogs.length === 0 && (
        <div className="text-center py-20">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Aucun article trouvé</h3>
          <p className="text-gray-600">Essayez de modifier votre recherche</p>
        </div>
      )}
    </div>
  );
}
