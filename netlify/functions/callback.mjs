/**
 * Reçoit le retour de GitHub, échange le code contre un jeton d'accès,
 * puis renvoie à Decap CMS le message d'autorisation attendu.
 */
export async function handler(event) {
  const clientId = process.env.GITHUB_OAUTH_ID;
  const clientSecret = process.env.GITHUB_OAUTH_SECRET;
  const code = event.queryStringParameters?.code;
  const returnedState = event.queryStringParameters?.state;
  const cookieState = (event.headers.cookie || '').match(/oauth_state=([^;]+)/)?.[1];

  const page = (status, content) => ({
    statusCode: 200,
    headers: { 'Content-Type': 'text/html' },
    body: `<!doctype html><html><body><script>
      (function () {
        function receiveMessage(e) {
          window.opener.postMessage(
            'authorization:github:${status}:${JSON.stringify(content)}',
            e.origin
          );
          window.removeEventListener('message', receiveMessage, false);
        }
        window.addEventListener('message', receiveMessage, false);
        window.opener.postMessage('authorizing:github', '*');
      })();
    </script></body></html>`,
  });

  if (!code) return page('error', { message: 'Code d’autorisation manquant.' });
  if (!clientId || !clientSecret) return page('error', { message: 'Configuration OAuth manquante.' });
  if (!cookieState || cookieState !== returnedState) {
    return page('error', { message: 'État de sécurité invalide, réessayez.' });
  }

  try {
    const res = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
    });
    const data = await res.json();
    if (data.error || !data.access_token) {
      return page('error', { message: data.error_description || 'Échec de l’authentification.' });
    }
    return page('success', { token: data.access_token, provider: 'github' });
  } catch (e) {
    return page('error', { message: 'Erreur réseau lors de l’authentification.' });
  }
}
