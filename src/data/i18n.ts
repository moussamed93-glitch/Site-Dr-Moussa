/**
 * Version arabe du site (7 pages : accueil, contact et 5 services).
 *
 * Principes retenus :
 * - Les URLs gardent les slugs latins sous /ar/ (partageables, pas de
 *   pourcentage-encodage illisible) ; seul le contenu est en arabe.
 * - L'arabe utilisé est l'arabe standard moderne, pas le dialecte tunisien :
 *   c'est le registre attendu sur un site médical et celui que Google indexe.
 * - Le vocabulaire cible les requêtes réellement observées dans Search Console
 *   et dans la fiche Google (طبيب عيون est le terme n°1, loin devant
 *   أخصائي أمراض العيون qui est plus savant mais très peu tapé).
 */

export type Lang = 'fr' | 'ar';

/** Paires de pages FR <-> AR, source unique pour hreflang et le sélecteur de langue. */
export const PAGE_PAIRS: { fr: string; ar: string }[] = [
  { fr: '/', ar: '/ar/' },
  { fr: '/contact/', ar: '/ar/contact/' },
  { fr: '/services/consultation-ophtalmologique/', ar: '/ar/services/consultation-ophtalmologique/' },
  { fr: '/services/cataracte/', ar: '/ar/services/cataracte/' },
  { fr: '/services/glaucome/', ar: '/ar/services/glaucome/' },
  { fr: '/services/keratocone/', ar: '/ar/services/keratocone/' },
  { fr: '/services/ophtalmologie-pediatrique/', ar: '/ar/services/ophtalmologie-pediatrique/' },
];

/** Renvoie l'URL équivalente dans l'autre langue, ou null si la page n'est pas traduite. */
export function counterpart(pathname: string): { lang: Lang; href: string } | null {
  const path = pathname.endsWith('/') ? pathname : `${pathname}/`;
  const asFr = PAGE_PAIRS.find((p) => p.fr === path);
  if (asFr) return { lang: 'ar', href: asFr.ar };
  const asAr = PAGE_PAIRS.find((p) => p.ar === path);
  if (asAr) return { lang: 'fr', href: asAr.fr };
  return null;
}

/** Les 5 services disponibles en arabe, dans l'ordre d'affichage. */
export const SERVICES_AR = [
  { slug: 'consultation-ophtalmologique', title: 'استشارة طب العيون' },
  { slug: 'cataracte', title: 'الساد (الماء الأبيض)' },
  { slug: 'glaucome', title: 'الزرق (الماء الأزرق)' },
  { slug: 'keratocone', title: 'القرنية المخروطية' },
  { slug: 'ophtalmologie-pediatrique', title: 'طب عيون الأطفال' },
] as const;

/** Navigation de la version arabe (ne pointe que vers des pages qui existent en arabe). */
export const NAV_AR = [
  { label: 'الرئيسية', href: '/ar/' },
  {
    label: 'خدماتنا',
    href: '/ar/services/consultation-ophtalmologique/',
    children: SERVICES_AR.map((s) => ({ label: s.title, href: `/ar/services/${s.slug}/` })),
  },
  { label: 'اتصل بنا', href: '/ar/contact/' },
];

/**
 * Données de l'établissement en arabe, pour le balisage schema.org des pages /ar/.
 *
 * Le `name` n'est volontairement PAS traduit : les deux versions linguistiques
 * partagent le même @id, et un nom stable aide Google à comprendre qu'il s'agit
 * d'un seul et même établissement. Le nom arabe est déclaré en `alternateName`,
 * qui est le champ prévu pour cela. L'adresse, elle, est bien localisée.
 */
export const CLINIC_AR = {
  alternateName: 'عيادة طب العيون الدكتور محمد موسى',
  doctorAlternateName: 'الدكتور محمد موسى',
  address: {
    streetAddress: 'المركز الطبي هورايزن، الطابق الأول، مكتب 2 و3، طريق بنزرت كم 4',
    addressLocality: 'حي الانطلاقة (منيهلة)',
    addressRegion: 'أريانة',
  },
} as const;

/** Chaînes d'interface de la version arabe. */
export const UI_AR = {
  skipLink: 'انتقل إلى المحتوى الرئيسي',
  brandName: 'الدكتور محمد موسى',
  brandSub: 'طبيب عيون · أريانة',
  brandAria: 'الدكتور محمد موسى، الصفحة الرئيسية',
  openMenu: 'فتح القائمة',
  closeMenu: 'إغلاق القائمة',
  mainNav: 'القائمة الرئيسية',
  cta: 'احجز موعدًا',
  breadcrumbHome: 'الرئيسية',
  breadcrumbServices: 'خدماتنا',
  langSwitchToAr: 'العربية',
  langSwitchToFr: 'Français',
  langSwitchAriaAr: 'اقرأ هذه الصفحة بالعربية',
  langSwitchAriaFr: 'Lire cette page en français',
  // Blocs de page service
  symptoms: 'الأعراض',
  whenToConsult: 'متى تستشير الطبيب؟',
  treatments: 'العلاج والمتابعة',
  faq: 'أسئلة شائعة',
  // Pied de page
  footerContact: 'العيادة',
  footerHours: 'أوقات العمل',
  footerServices: 'خدماتنا',
  footerFollow: 'تابع العيادة',
  footerPhone: 'الهاتف',
  footerRights: 'جميع الحقوق محفوظة',
  footerFrenchSite: 'الموقع بالفرنسية',
  hoursWeek: 'الاثنين إلى الجمعة',
  hoursSat: 'السبت',
  hoursSun: 'الأحد',
  closed: 'مغلق',
  reviewsLabel: 'تقييمًا على Google',
  callUs: 'اتصل بنا',
  whatsapp: 'موعد عبر واتساب',
} as const;
