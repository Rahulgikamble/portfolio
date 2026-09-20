const sendEmail = async ({ toEmail, subject, message, replyTo }) => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log('RESEND_API_KEY not set — skipping email notification.');
    return;
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: [toEmail],
      reply_to: replyTo,
      subject,
      text: message,
    }),
  });

  const raw = await res.text();
  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    throw new Error(`Resend returned a non-JSON response (HTTP ${res.status}). First 150 chars: ${raw.slice(0, 150)}`);
  }

  if (!res.ok) {
    throw new Error(data.message || `Resend request failed (HTTP ${res.status})`);
  }
};

export default sendEmail;
