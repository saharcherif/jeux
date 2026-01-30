import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'FR' | 'EN';

type Translations = {
  [key in Language]: {
    [key: string]: string;
  };
};

const translations: Translations = {
  FR: {
    'nav.all_formations': 'Toutes les formations',
    'nav.b2b': 'B2B',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.menu': 'Menu',
    'nav.signup': "S'inscrire",
    'nav.explore_category': 'Explorer par catégorie',
    'nav.see_all': 'Voir tout',
    'nav.pathways': 'Parcours',
    'nav.testimonials': 'Témoignages',
    'cta.launch_offer': 'Offre de lancement',
    'cta.title': "Commencez votre\ntransformation aujourd'hui",
    'cta.subtitle': "Rejoignez des centaines de professionnels qui ont déjà franchi le cap.\nProfitez de 30 jours d'essai gratuit, sans engagement.",
    'cta.discover': 'Découvrez nos formations',
    'cta.contact_us': 'Contactez-nous',
    'cta.no_card': 'Aucune carte bancaire requise',
    'cta.support': 'Support 7j/7',
    'cta.custom_training': 'Formation sur mesure',
    'cta.custom_training_desc': "Besoin d'une formation personnalisée pour votre équipe ? Contactez-nous pour un devis sur mesure.",
    'cta.learn_more': 'En savoir plus',
    'cta.financing': 'Financement disponible',
    'cta.financing_desc': "Découvrez nos solutions de financement et les aides disponibles pour votre formation professionnelle.",
    'cta.see_options': 'Voir les options',
  },
  EN: {
    'nav.all_formations': 'All Courses',
    'nav.b2b': 'B2B',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.menu': 'Menu',
    'nav.signup': 'Sign Up',
    'nav.explore_category': 'Explore by Category',
    'nav.see_all': 'See All',
    'nav.pathways': 'Pathways',
    'nav.testimonials': 'Testimonials',
    'cta.launch_offer': 'Launch Offer',
    'cta.title': "Start Your\nTransformation Today",
    'cta.subtitle': "Join hundreds of professionals who have already taken the leap.\nEnjoy a 30-day free trial, no commitment required.",
    'cta.discover': 'Discover Our Courses',
    'cta.contact_us': 'Contact Us',
    'cta.no_card': 'No credit card required',
    'cta.support': '24/7 Support',
    'cta.custom_training': 'Custom Training',
    'cta.custom_training_desc': 'Need personalized training for your team? Contact us for a custom quote.',
    'cta.learn_more': 'Learn More',
    'cta.financing': 'Financing Available',
    'cta.financing_desc': 'Discover our financing solutions and aid available for your professional training.',
    'cta.see_options': 'See Options',
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('FR');

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
