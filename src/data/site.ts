import settings from './settings.json';
import { GOOGLE_RATING, GOOGLE_RATING_COUNT } from './reviews';

/**
 * Les informations du cabinet sont éditables dans le backoffice (/admin/)
 * via le fichier settings.json. Ce module les expose au reste du site.
 */
export const SITE = {
  name: settings.name,
  doctor: settings.doctor,
  title: settings.title,
  url: settings.url,
  phone: settings.phone,
  phoneDisplay: settings.phoneDisplay,
  phone2: settings.phone2,
  phone2Display: settings.phone2Display,
  email: settings.email,
  address: {
    line1: settings.addressLine1,
    line2: settings.addressLine2,
    city: settings.addressCity,
    region: settings.addressRegion,
    postalCode: settings.addressPostalCode,
    country: settings.addressCountry,
  },
  geo: {
    latitude: settings.latitude,
    longitude: settings.longitude,
  },
  mapsUrl: settings.mapsUrl,
  mapsEmbed: settings.mapsEmbed,
  medtnUrl: settings.medtnUrl,
  googleReviewsUrl: settings.googleReviewsUrl,
  reviewCount: GOOGLE_RATING_COUNT ?? settings.reviewCount,
  rating: GOOGLE_RATING ?? settings.rating,
  hours: settings.hours,
  social: {
    facebook: settings.facebook,
    instagram: settings.instagram,
  },
};

export const SERVICES = [
  { slug: 'consultation-ophtalmologique', title: 'Consultation ophtalmologique', short: 'Bilan visuel complet, adulte et enfant, avec équipements de dernière génération.' },
  { slug: 'prescription-de-lunettes', title: 'Prescription de lunettes', short: 'Détermination précise de la correction optique par réfraction automatisée.' },
  { slug: 'adaptation-de-lentilles', title: 'Adaptation de lentilles', short: 'Choix, essai et suivi de lentilles de contact adaptées à votre œil.' },
  { slug: 'cataracte', title: 'Cataracte', short: 'Diagnostic, suivi et chirurgie de la cataracte par techniques modernes.' },
  { slug: 'glaucome', title: 'Glaucome', short: 'Dépistage, surveillance de la tension oculaire et traitement du glaucome.' },
  { slug: 'keratocone', title: 'Kératocône', short: 'Dépistage et prise en charge du kératocône, adaptation spécifique.' },
  { slug: 'pathologies-de-la-cornee', title: 'Pathologies de la cornée', short: 'Diagnostic et traitement des maladies de la cornée.' },
  { slug: 'retine-medicale', title: 'Rétine médicale', short: 'Surveillance et traitement médical des pathologies rétiniennes.' },
  { slug: 'diabete-et-oeil', title: 'Diabète et œil', short: 'Dépistage et suivi de la rétinopathie diabétique.' },
  { slug: 'secheresse-oculaire', title: 'Sécheresse oculaire', short: 'Évaluation et traitement personnalisé de l’œil sec.' },
  { slug: 'ophtalmologie-pediatrique', title: 'Ophtalmologie pédiatrique', short: 'Suivi de la vision de l’enfant : dépistage, strabisme, amblyopie.' },
  { slug: 'urgences-ophtalmologiques', title: 'Urgences ophtalmologiques', short: 'Prise en charge rapide des urgences de l’œil.' },
  { slug: 'suivi-post-operatoire', title: 'Suivi post-opératoire', short: 'Accompagnement attentif après chirurgie oculaire.' },
] as const;

export const NAV = [
  { label: 'Le médecin', href: '/le-medecin/' },
  {
    label: 'Services',
    href: '/services/',
    children: SERVICES.map((s) => ({ label: s.title, href: `/services/${s.slug}/` })),
  },
  { label: 'Chirurgie', href: '/chirurgie/' },
  {
    label: 'Le cabinet',
    href: '/cabinet/',
    children: [
      { label: 'Visite du cabinet', href: '/cabinet/' },
      { label: 'Notre matériel', href: '/materiel/' },
      { label: 'Activité scientifique', href: '/activite-scientifique/' },
    ],
  },
  { label: 'Blog', href: '/blog/' },
  { label: 'Contact', href: '/contact/' },
] as const;

export const PARTNERS = [
  { name: 'CNAM', url: 'https://www.cnam.nat.tn/', logo: '/partners/cnam.png' },
  { name: 'Bridges', url: 'https://bridges.tn/', logo: '/partners/bridges.png' },
  { name: 'IWAY Santé', url: 'https://i-sante.tn/', logo: '/partners/isante.svg' },
  { name: 'TuniHealth', url: 'https://tunihealthassistance.com/', logo: '/partners/tunihealth.png' },
] as const;
