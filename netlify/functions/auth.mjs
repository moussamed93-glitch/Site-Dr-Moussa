import crypto from 'node:crypto';

/**
 * Démarre la connexion GitHub pour le backoffice (Decap CMS).
 * Redirige l'éditeur vers GitHub, qui reviendra sur /callback.
 */
export async function handler(event) {
  const clientId = process.env.GITHUB_OAUTH_ID;
  if (!clientId) {
    return { statusCode: 500, body: "Configuration manquante : GITHUB_OAUTH_ID" };
  }

  const host = event.headers.host;
  const redirectUri = `https://${host}/.netlify/functions/callback`;
  const state = crypto.randomBytes(16).toString('hex');

  const authUrl =
    'https://github.com/login/oauth/authorize' +
    `?client_id=${clientId}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    '&scope=repo' +
    `&state=${state}`;

  return {
    statusCode: 302,
    headers: {
      Location: authUrl,
      'Set-Cookie': `oauth_state=${state}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=600`,
    },
    body: '',
  };
}
