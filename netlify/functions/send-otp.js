export async function handler(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  
  try {
    const { email, otp, name } = JSON.parse(event.body);
    
    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY environment variable is not configured. Falling back to sandbox.");
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'RESEND_API_KEY missing, falling back to sandbox mode.' })
      };
    }
    
    // Call Resend email API using native fetch (supported on Node 18+)
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'NyayaAI Verification <onboarding@resend.dev>',
        to: email,
        subject: `${otp} is your NyayaAI verification code`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 500px; border: 1px solid #eee; border-radius: 12px; margin: auto;">
            <h2 style="color: #2563eb; margin-bottom: 5px;">NyayaAI</h2>
            <p style="font-size: 12px; color: #777; margin-top: 0;">Sovereign AI Legal Intelligence</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p>Hello ${name},</p>
            <p>Thank you for registering on NyayaAI. Please use the following 6-digit verification code to complete your sign-in process:</p>
            <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 4px; color: #1e3a8a; margin: 20px 0;">
              ${otp}
            </div>
            <p style="font-size: 11px; color: #999;">If you did not request this code, you can safely ignore this email.</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 10px; color: #aaa;">This is an automated notification from your local-first NyayaAI instance deployed on Netlify.</p>
          </div>
        `
      })
    });
    
    const result = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, data: result })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}
