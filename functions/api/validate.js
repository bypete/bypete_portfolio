// Simplified Cloudflare API function that only checks Turnstile
export async function onRequestPost(context) {
  try {
    return await handleRequest(context);
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ valid: false }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

async function handleRequest({ request, env }) {
  const ip = request.headers.get("CF-Connecting-IP");
  const data = await request.json();
  const token = data['turnstile-response'];
  
  const tokenValidated = await validateToken(ip, token, env.TURNSTILE_SECRET_KEY);
  
  return new Response(JSON.stringify({ valid: tokenValidated }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

async function validateToken(ip, token, secretKey) {
  const formData = new FormData();
  formData.append("secret", secretKey);
  formData.append("response", token);
  formData.append("remoteip", ip);
  
  const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
  const result = await fetch(url, {
    body: formData,
    method: "POST",
  });
  
  const outcome = await result.json();
  return outcome.success;
}