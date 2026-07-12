/**
 * Fournit les avis Google en quasi temps réel à la page d'accueil.
 * La clé API reste côté serveur ; la réponse est mise en cache sur le CDN
 * Netlify pendant 6 h pour préserver le quota Google Places.
 */
export default async () => {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return new Response(JSON.stringify({ error: 'configuration manquante' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
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
      throw new Error(`Places API ${res.status}`);
    }

    const data = await res.json();
    const reviews = (data.reviews ?? [])
      // Texte original du patient, jamais la traduction automatique de Google.
      .filter((r) => r.originalText?.text ?? r.text?.text)
      .map((r) => ({
        author: r.authorAttribution?.displayName ?? 'Patient Google',
        text: r.originalText?.text ?? r.text.text,
        rating: r.rating ?? null,
      }));

    return new Response(
      JSON.stringify({
        reviews,
        rating: data.rating ?? null,
        userRatingCount: data.userRatingCount ?? null,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          // Cache navigateur court, cache CDN 6 h + tolérance de réponse
          // périmée pendant 24 h si Google est injoignable.
          'Cache-Control': 'public, max-age=300',
          'Netlify-CDN-Cache-Control': 'public, durable, s-maxage=21600, stale-while-revalidate=86400',
        },
      }
    );
  } catch (err) {
    console.error(`[avis] ${err.message}`);
    return new Response(JSON.stringify({ error: 'avis indisponibles' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const config = {
  path: '/api/avis',
};
