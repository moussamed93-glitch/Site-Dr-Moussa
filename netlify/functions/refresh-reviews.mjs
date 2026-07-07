/**
 * Déclenche un redéploiement chaque semaine pour rafraîchir les avis Google
 * même quand personne n'a modifié le contenu du site entre-temps.
 * Nécessite la variable NETLIFY_BUILD_HOOK_URL (créée dans Netlify → Build hooks).
 */
export const config = {
  schedule: '@weekly',
};

export default async () => {
  const hookUrl = process.env.NETLIFY_BUILD_HOOK_URL;
  if (!hookUrl) {
    console.warn('[refresh-reviews] NETLIFY_BUILD_HOOK_URL absent — rebuild ignoré.');
    return new Response('missing hook url', { status: 200 });
  }

  const res = await fetch(hookUrl, { method: 'POST' });
  console.log(`[refresh-reviews] Build hook déclenché (${res.status}).`);
  return new Response('ok', { status: 200 });
};
