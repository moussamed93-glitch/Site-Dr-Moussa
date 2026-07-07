import { writeFile, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

/**
 * Récupère les avis Google réels via l'API Places (New) et les écrit dans
 * src/data/reviews.json avant chaque build. Si les identifiants manquent
 * (ex. build local sans secrets), on garde le fichier existant tel quel
 * plutôt que de faire échouer le build.
 */
const OUTPUT_PATH = fileURLToPath(new URL('../src/data/reviews.json', import.meta.url));

const apiKey = process.env.GOOGLE_PLACES_API_KEY;
const placeId = process.env.GOOGLE_PLACE_ID;

if (!apiKey || !placeId) {
  console.warn(
    '[avis-google] GOOGLE_PLACES_API_KEY ou GOOGLE_PLACE_ID absent — reviews.json conservé tel quel.'
  );
  process.exit(0);
}

try {
  const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}?languageCode=fr`, {
    headers: {
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask':
        'reviews.originalText,reviews.text,reviews.authorAttribution,reviews.rating,rating,userRatingCount',
    },
  });

  if (!res.ok) {
    throw new Error(`Places API a répondu ${res.status} : ${await res.text()}`);
  }

  const data = await res.json();
  const reviews = (data.reviews ?? [])
    // On garde le texte ORIGINAL de l'avis (pas la traduction Google) pour ne
    // jamais reformuler les mots du patient.
    .filter((r) => r.originalText?.text ?? r.text?.text)
    .map((r) => ({
      author: r.authorAttribution?.displayName ?? 'Patient Google',
      text: r.originalText?.text ?? r.text.text,
      rating: r.rating ?? null,
    }));

  const payload = {
    reviews,
    rating: data.rating ?? null,
    userRatingCount: data.userRatingCount ?? null,
    fetchedAt: new Date().toISOString(),
  };

  await writeFile(OUTPUT_PATH, JSON.stringify(payload, null, 2) + '\n', 'utf8');
  console.log(`[avis-google] ${reviews.length} avis synchronisés depuis Google Places.`);
} catch (err) {
  console.warn(`[avis-google] Échec de la synchronisation (${err.message}) — reviews.json conservé tel quel.`);
  // On ne bloque jamais le build pour un problème côté API Google.
  const existing = await readFile(OUTPUT_PATH, 'utf8').catch(() => null);
  if (!existing) {
    await writeFile(OUTPUT_PATH, JSON.stringify({ reviews: [] }, null, 2) + '\n', 'utf8');
  }
}
