import data from './reviews.json';

/**
 * Avis Google — synchronisés automatiquement à chaque build depuis l'API
 * Google Places (scripts/fetch-google-reviews.mjs). Ne plus éditer ce fichier
 * à la main : il est réécrit à chaque déploiement.
 */
export interface Review {
  author: string;
  text: string;
  rating?: number | null;
}

export const REVIEWS: Review[] = data.reviews;
export const GOOGLE_RATING: number | null = 'rating' in data ? (data.rating as number | null) : null;
export const GOOGLE_RATING_COUNT: number | null =
  'userRatingCount' in data ? (data.userRatingCount as number | null) : null;
