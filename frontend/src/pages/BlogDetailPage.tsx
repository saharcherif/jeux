import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, User, Clock, ArrowLeft, Tag, Share2, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { blogsApi, Blog } from '../api/blogs.api';
import { BASE_URL } from '../api/api';

export function BlogDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    blogsApi.getOne(id)
      .then(data => {
        setPost(data);
      })
      .catch(err => {
        console.error('Error fetching blog post:', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-pink-500 animate-spin mb-4" />
        <p className="text-gray-500">Chargement de l'article...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Article non trouvé</h1>
        <p className="text-gray-600 mb-8">L'article que vous recherchez n'existe pas ou a été déplacé.</p>
        <button
          onClick={() => navigate('/blog')}
          className="bg-pink-500 text-white px-6 py-3 rounded-full font-medium hover:bg-pink-600 transition-colors"
        >
          Retour au blog
        </button>
      </div>
    );
  }

  const imageUrl = post.image
    ? (post.image.startsWith('http') ? post.image : `${BASE_URL}${post.image.startsWith('/') ? '' : '/'}${post.image}`)
    : 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=1200';

  return (
    <article className="min-h-screen pt-32 pb-20 bg-gray-50">
      {/* Article Header */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 mb-12">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/blog')}
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Retour aux articles
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 text-pink-600 font-medium border border-pink-100">
              <Tag className="w-3.5 h-3.5" />
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-gray-500">
              <Calendar className="w-4 h-4" />
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1.5 text-gray-500">
              <Clock className="w-4 h-4" />
              5 min de lecture
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-gray-500" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{post.author}</p>
                <p className="text-xs text-gray-500">Auteur</p>
              </div>
            </div>

            <button className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-6xl mx-auto px-6 lg:px-8 mb-16"
      >
        <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl">
          <img
            src={imageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="prose prose-lg prose-pink prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-img:rounded-2xl max-w-none bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100"
          dangerouslySetInnerHTML={{ __html: post.content || post.excerpt }}
        />
      </div>
    </article>
  );
}
