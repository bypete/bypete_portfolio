export async function onRequestPost(context) {
  try {
      // Get the token from the request body
      const request = context.request;
      const body = await request.json();
      const token = body['turnstile-response'];
      
      // Get the connecting IP
      const ip = request.headers.get('CF-Connecting-IP');

      // Get secret key from environment variable
      const SECRET_KEY = context.env.TURNSTILE_SITE_SECRET;
      
      if (!SECRET_KEY) {
          throw new Error('Missing TURNSTILE_SITE_SECRET environment variable');
      }

      // Prepare the verification request
      const formData = new FormData();
      formData.append('secret', SECRET_KEY);
      formData.append('response', token);
      formData.append('remoteip', ip);

      // Verify the token
      const result = await fetch(
          'https://challenges.cloudflare.com/turnstile/v0/siteverify',
          {
              body: formData,
              method: 'POST',
          }
      );

      const outcome = await result.json();

      // Return simple boolean response
      return new Response(
          JSON.stringify({ valid: outcome.success }),
          {
              headers: {
                  'Content-Type': 'application/json',
              }
          }
      );

  } catch (error) {
      // Return false if there's any error
      return new Response(
          JSON.stringify({ valid: false }),
          {
              headers: {
                  'Content-Type': 'application/json',
                  'Status': '400'
              }
          }
      );
  }
}