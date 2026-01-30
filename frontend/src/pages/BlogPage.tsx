import { motion } from 'motion/react';
import { Calendar, User, ArrowRight, Tag, Clock, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { blogsApi, Blog } from '../api/blogs.api';
import { BASE_URL } from '../api/api';

const blogHeroImage = "https://images.unsplash.com/photo-1758876021859-bd2371d8f0a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2UlMjBjcmVhdGl2ZSUyMHdyaXRpbmd8ZW58MXx8fHwxNzY5MTc5NjA0fDA&ixlib=rb-4.1.0&q=80&w=1080";

export function BlogPage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await blogsApi.getAll();
        // Sort by creation date descending
        const sortedData = data.sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setPosts(sortedData);
      } catch (err) {
        console.error('Failed to fetch blogs:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (isLoading) {
    return (
      <div className="pt-40 min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-pink-500 animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Chargement des actualités...</p>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-white py-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/2 space-y-6"
            >
              <div className="inline-flex items-center gap-2 bg-pink-50 border border-pink-100 rounded-full px-4 py-2">
                <Tag className="w-4 h-4 text-pink-500" />
                <span className="text-pink-600 text-sm font-medium">Actualités & Conseils</span>
              </div>

              <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                Le Journal de la
                <br />
                <span className="text-pink-500">Formation</span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                Explorez nos derniers articles, guides et retours d'expérience pour booster votre carrière et rester à la pointe de la technologie.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:w-1/2"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video group cursor-pointer">
                <img
                  src={blogHeroImage}
                  alt="Blog Hero"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="flex items-center gap-4 text-sm font-medium text-pink-300 mb-3">
                    <span className="bg-pink-500/20 backdrop-blur-md px-3 py-1 rounded-full border border-pink-500/30">À la une</span>
                    <span>10 min de lecture</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-2 group-hover:text-pink-200 transition-colors">
                    Comment l'apprentissage continu transforme les carrières tech
                  </h2>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.article
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => navigate(`/blog/${post._id}`)}
                className="bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl hover:border-pink-200 transition-all duration-300 group cursor-pointer"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={post.image?.startsWith('http') ? post.image : `${BASE_URL}${post.image?.startsWith('/') ? '' : '/'}${post.image}`}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = blogHeroImage;
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-md text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                      {post.category || 'Actualité'}
                    </span>
                  </div>
                </div>

                <div className="p-8 space-y-4">
                  <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      5 min
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-pink-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {post.excerpt || post.content?.substring(0, 150) + '...'}
                  </p>

                  <div className="pt-4 flex items-center justify-between border-t border-gray-50">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-500" />
                      </div>
                      <span className="text-xs font-medium text-gray-700">{post.author || 'Admin'}</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center text-pink-500 group-hover:bg-pink-500 group-hover:text-white transition-all">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
              <p className="text-gray-500">Aucun article disponible pour le moment.</p>
            </div>
          )}

          <div className="mt-20 text-center">
            <motion.button
              onClick={() => navigate('/blog')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-colors shadow-lg"
            >
              Actualiser la liste
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
}
