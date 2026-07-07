import data from './reviews.json';

/**
 * Avis Google — éditables dans le backoffice (/admin/, section « Avis Google »).
 * Toujours copier les avis mot pour mot depuis la fiche Google, sans reformuler.
 */
export interface Review {
  author: string;
  text: string;
}

export const REVIEWS: Review[] = data.reviews;
