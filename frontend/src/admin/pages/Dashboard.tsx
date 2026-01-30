import { motion } from 'motion/react';
import {
  GraduationCap,
  UserCheck,
  MessageSquare,
  FileText,
  TrendingUp,
  Users,
  Eye,
  Loader2
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { trainingsApi } from '../../api/trainings.api';
import { inscriptionsApi, Inscription } from '../../api/inscriptions.api';
import { contactsApi, Contact } from '../../api/contacts.api';
import { blogsApi, Blog } from '../../api/blogs.api';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  color: string;
}

function StatCard({ title, value, icon, trend, color }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl ${color} bg-opacity-10 flex items-center justify-center`}>
          {icon}
        </div>
        {trend && (
          <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
            {trend}
          </span>
        )}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-sm text-gray-600">{title}</p>
    </motion.div>
  );
}

interface RecentActivityItem {
  id: string;
  type: 'inscription' | 'contact' | 'blog';
  title: string;
  time: string;
  user?: string;
  date: Date;
}

const formatTimeAgo = (date: Date) => {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);

  if (diffInMinutes < 1) return "À l'instant";
  if (diffInMinutes < 60) return `Il y a ${diffInMinutes} min`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `Il y a ${diffInHours}h`;

  return date.toLocaleDateString('fr-FR');
};

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    trainings: 0,
    inscriptions: 0,
    contacts: 0,
    blogs: 0
  });
  const [recentActivities, setRecentActivities] = useState<RecentActivityItem[]>([]);
  const [popularFormations, setPopularFormations] = useState<{ name: string, students: number, color: string }[]>([]);
  const [chartData, setChartData] = useState<{ month: string, value: number }[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        const [trainings, inscriptions, contacts, blogs] = await Promise.all([
          trainingsApi.getAll(true),
          inscriptionsApi.getAll(),
          contactsApi.getAll(),
          blogsApi.getAll(true)
        ]);

        setStats({
          trainings: trainings.length,
          inscriptions: inscriptions.length,
          contacts: contacts.length,
          blogs: blogs.length
        });

        // Calculate Popular Formations
        const courseCounts = inscriptions.reduce((acc: any, curr) => {
          acc[curr.courseInterest] = (acc[curr.courseInterest] || 0) + 1;
          return acc;
        }, {});

        const colors = ['bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-orange-500', 'bg-indigo-500', 'bg-emerald-500'];
        const popular = Object.entries(courseCounts)
          .sort(([, a]: any, [, b]: any) => b - a)
          .slice(0, 4)
          .map(([name, count]: any, index) => ({
            name,
            students: count,
            color: colors[index % colors.length]
          }));
        setPopularFormations(popular);

        // Calculate Chart Data (Inscriptions by Month - last 5 months)
        const monthNames = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'];
        const submissionsByMonth = inscriptions.reduce((acc: any, curr) => {
          const date = new Date(curr.createdAt);
          const key = `${date.getMonth()}-${date.getFullYear()}`;
          acc[key] = (acc[key] || 0) + 1;
          return acc;
        }, {});

        const lastFiveMonths = [];
        const today = new Date();
        for (let i = 4; i >= 0; i--) {
          const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
          const key = `${d.getMonth()}-${d.getFullYear()}`;
          lastFiveMonths.push({
            month: monthNames[d.getMonth()],
            value: submissionsByMonth[key] || 0
          });
        }
        setChartData(lastFiveMonths);

        // Merge and sort recent activities
        interface RawActivity {
          id: string;
          type: 'inscription' | 'contact' | 'blog';
          title: string;
          user?: string;
          date: Date;
        }

        const rawActivities: RawActivity[] = [
          ...inscriptions.slice(0, 5).map(i => ({
            id: i._id,
            type: 'inscription' as const,
            title: `Nouvelle inscription à "${i.courseInterest}"`,
            user: `${i.firstName} ${i.lastName}`,
            date: new Date(i.createdAt)
          })),
          ...contacts.slice(0, 5).map(c => ({
            id: c._id,
            type: 'contact' as const,
            title: 'Nouveau message de contact',
            user: `${c.firstName} ${c.lastName}`,
            date: new Date(c.createdAt)
          })),
          ...blogs.slice(0, 5).map(b => ({
            id: b._id,
            type: 'blog' as const,
            title: `Nouvel article: ${b.title}`,
            date: new Date(b.createdAt)
          }))
        ];

        const sorted = rawActivities
          .sort((a, b) => b.date.getTime() - a.date.getTime())
          .slice(0, 5)
          .map(a => ({
            ...a,
            time: formatTimeAgo(a.date)
          }));

        setRecentActivities(sorted);

      } catch (err: any) {
        setError(err.message || 'Erreur lors de la récupération des statistiques');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-12 h-12 text-pink-500 animate-spin mb-4" />
        <p className="text-gray-600">Calcul des statistiques...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Bienvenue sur votre tableau de bord administrateur</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 italic">
          {error}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Formations"
          value={stats.trainings}
          icon={<GraduationCap className="w-6 h-6 text-pink-500" />}
          color="text-pink-500"
        />
        <StatCard
          title="Total Inscriptions"
          value={stats.inscriptions}
          icon={<UserCheck className="w-6 h-6 text-blue-500" />}
          color="text-blue-500"
        />
        <StatCard
          title="Messages Contacts"
          value={stats.contacts}
          icon={<MessageSquare className="w-6 h-6 text-green-500" />}
          color="text-green-500"
        />
        <StatCard
          title="Articles Blog"
          value={stats.blogs}
          icon={<FileText className="w-6 h-6 text-purple-500" />}
          color="text-purple-500"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inscriptions Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Inscriptions récentes</h3>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="space-y-4">
            {chartData.map((item) => (
              <div key={item.month} className="flex items-center gap-3">
                <span className="text-sm text-gray-600 w-8">{item.month}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-8 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((item.value / 20) * 100, 100)}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="bg-gradient-to-r from-pink-500 to-pink-600 h-full flex items-center justify-end pr-3"
                  >
                    <span className="text-xs font-medium text-white">{item.value}</span>
                  </motion.div>
                </div>
              </div>
            ))}
            {chartData.every(d => d.value === 0) && (
              <p className="text-center text-sm text-gray-400 py-4">Pas encore d'inscriptions</p>
            )}
          </div>
        </motion.div>

        {/* Popular Formations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Formations populaires</h3>
            <Eye className="w-5 h-5 text-blue-500" />
          </div>
          <div className="space-y-4">
            {popularFormations.length > 0 ? popularFormations.map((formation, index) => (
              <motion.div
                key={formation.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className={`w-2 h-12 ${formation.color} rounded-full`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{formation.name}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                    <Users className="w-3 h-3" />
                    <span>{formation.students} inscriptions</span>
                  </div>
                </div>
              </motion.div>
            )) : (
              <p className="text-center text-sm text-gray-400 py-10">Aucune donnée disponible</p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl border border-gray-200 p-6"
      >
        <h3 className="text-lg font-bold text-gray-900 mb-6">Activité récente</h3>
        <div className="space-y-4">
          {recentActivities.length > 0 ? recentActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${activity.type === 'inscription' ? 'bg-blue-50 text-blue-500' :
                  activity.type === 'contact' ? 'bg-green-50 text-green-500' :
                    'bg-purple-50 text-purple-500'
                }`}>
                {activity.type === 'inscription' ? <UserCheck className="w-5 h-5" /> :
                  activity.type === 'contact' ? <MessageSquare className="w-5 h-5" /> :
                    <FileText className="w-5 h-5" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                {activity.user && (
                  <p className="text-xs text-gray-500 mt-1">{activity.user}</p>
                )}
              </div>
              <span className="text-xs text-gray-400 flex-shrink-0">{activity.time}</span>
            </motion.div>
          )) : (
            <div className="text-center py-10 text-gray-400">Aucune activité récente</div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
