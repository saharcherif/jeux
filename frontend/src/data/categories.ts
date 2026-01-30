import { Code, Palette, Briefcase, TrendingUp, Users, Shield, Cloud as CloudIcon, GitBranch } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: LucideIcon;
  color: string;
  size: 'small' | 'medium' | 'large';
  formationsCount: number;
}

export const categories: Category[] = [
  {
    id: 1,
    name: 'Développement',
    slug: 'Développement',
    description: 'Maîtrisez les technologies web modernes et créez des applications performantes',
    icon: Code,
    color: 'pink',
    size: 'large',
    formationsCount: 1
  },
  {
    id: 2,
    name: 'Design',
    slug: 'Design',
    description: 'Créez des expériences utilisateur exceptionnelles',
    icon: Palette,
    color: 'purple',
    size: 'medium',
    formationsCount: 1
  },
  {
    id: 3,
    name: 'Marketing',
    slug: 'Marketing',
    description: 'Développez votre expertise en stratégie digitale',
    icon: Briefcase,
    color: 'blue',
    size: 'medium',
    formationsCount: 1
  },
  {
    id: 4,
    name: 'Data Science',
    slug: 'Data Science',
    description: 'Transformez les données en décisions stratégiques',
    icon: TrendingUp,
    color: 'green',
    size: 'large',
    formationsCount: 1
  },
  {
    id: 5,
    name: 'Management',
    slug: 'Management',
    description: 'Développez vos compétences managériales',
    icon: Users,
    color: 'orange',
    size: 'small',
    formationsCount: 1
  },
  {
    id: 6,
    name: 'Sécurité',
    slug: 'Sécurité',
    description: 'Protégez les systèmes et détectez les vulnérabilités',
    icon: Shield,
    color: 'red',
    size: 'medium',
    formationsCount: 1
  },
  {
    id: 7,
    name: 'Cloud',
    slug: 'Cloud',
    description: 'Maîtrisez les infrastructures cloud modernes',
    icon: CloudIcon,
    color: 'blue',
    size: 'medium',
    formationsCount: 1
  },
  {
    id: 8,
    name: 'DevOps',
    slug: 'DevOps',
    description: 'Automatisez vos déploiements et workflows',
    icon: GitBranch,
    color: 'purple',
    size: 'medium',
    formationsCount: 1
  }
];