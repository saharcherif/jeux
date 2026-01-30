export interface Formation {
  id: number;
  title: string;
  category: string;
  level: string;
  duration: string;
  price: number;
  rating: number;
  reviews: number;
  students: number;
  image: string;
  instructor: string;
  description: string;
  skills: string[];
  badge?: string;
}

export const formations: Formation[] = [
  {
    id: 1,
    title: 'Développement Web Full-Stack',
    category: 'Développement',
    level: 'Débutant',
    duration: '12 semaines',
    price: 1499,
    rating: 4.8,
    reviews: 156,
    students: 423,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
    instructor: 'Sarah Martinez',
    description: 'Maîtrisez le développement web moderne avec React, Node.js et les meilleures pratiques',
    skills: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
    badge: 'Populaire'
  },
  {
    id: 2,
    title: 'Data Science & Intelligence Artificielle',
    category: 'Data Science',
    level: 'Intermédiaire',
    duration: '16 semaines',
    price: 1899,
    rating: 4.9,
    reviews: 203,
    students: 567,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    instructor: 'Dr. Ahmed Ben Ali',
    description: 'Plongez dans le machine learning et l\'IA avec Python et TensorFlow',
    skills: ['Python', 'TensorFlow', 'Machine Learning', 'Deep Learning'],
    badge: 'Top évalué'
  },
  {
    id: 3,
    title: 'Marketing Digital Avancé',
    category: 'Marketing',
    level: 'Intermédiaire',
    duration: '10 semaines',
    price: 1299,
    rating: 4.7,
    reviews: 189,
    students: 392,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    instructor: 'Laura Dubois',
    description: 'Maîtrisez SEO, SEA, réseaux sociaux et analytics pour booster votre croissance',
    skills: ['SEO', 'Google Ads', 'Social Media', 'Analytics']
  },
  {
    id: 4,
    title: 'Design UX/UI avec Figma',
    category: 'Design',
    level: 'Débutant',
    duration: '8 semaines',
    price: 999,
    rating: 4.8,
    reviews: 142,
    students: 318,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
    instructor: 'Marc Fontaine',
    description: 'Créez des interfaces utilisateur modernes et intuitives avec Figma',
    skills: ['Figma', 'UX Research', 'Prototyping', 'Design Systems']
  },
  {
    id: 5,
    title: 'Gestion de Projet Agile & Scrum',
    category: 'Management',
    level: 'Tous niveaux',
    duration: '6 semaines',
    price: 899,
    rating: 4.6,
    reviews: 128,
    students: 276,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
    instructor: 'Karim Mansour',
    description: 'Devenez Scrum Master certifié et gérez vos projets avec agilité',
    skills: ['Scrum', 'Kanban', 'Jira', 'Leadership'],
    badge: 'Nouveau'
  },
  {
    id: 6,
    title: 'Cybersécurité & Ethical Hacking',
    category: 'Sécurité',
    level: 'Avancé',
    duration: '14 semaines',
    price: 1699,
    rating: 4.9,
    reviews: 167,
    students: 234,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
    instructor: 'Hassan El Amrani',
    description: 'Apprenez à sécuriser les systèmes et détecter les vulnérabilités',
    skills: ['Penetration Testing', 'Network Security', 'Cryptography', 'Linux']
  },
  {
    id: 7,
    title: 'Cloud Computing avec AWS',
    category: 'Cloud',
    level: 'Intermédiaire',
    duration: '12 semaines',
    price: 1599,
    rating: 4.7,
    reviews: 145,
    students: 298,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
    instructor: 'Sophie Laurent',
    description: 'Maîtrisez AWS et devenez architecte cloud certifié',
    skills: ['AWS', 'EC2', 'S3', 'Lambda', 'Docker']
  },
  {
    id: 8,
    title: 'DevOps & CI/CD',
    category: 'DevOps',
    level: 'Intermédiaire',
    duration: '10 semaines',
    price: 1399,
    rating: 4.8,
    reviews: 134,
    students: 267,
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800',
    instructor: 'Thomas Richard',
    description: 'Automatisez vos déploiements et optimisez vos workflows',
    skills: ['Jenkins', 'Docker', 'Kubernetes', 'Git', 'Terraform']
  }
];
