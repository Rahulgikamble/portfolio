# Portfolio Backend — Vercel Zero-Config Version

Same as the e-commerce backend — see that README for the full explanation.
Vercel auto-detects app.js and runs it directly as a Vercel Function.

## Local setup
npm install
cp .env.example .env
npm run dev

## Deploying to Vercel
1. Push to GitHub
2. Vercel: Add New Project → import repo → Root Directory = this backend folder
3. Framework Preset: should auto-detect "Express"
4. Add ALL environment variables: MONGO_URI, JWT_SECRET, ADMIN_NAME,
   ADMIN_EMAIL, ADMIN_PASSWORD, RESEND_API_KEY, EMAIL_TO
5. Deploy
6. Update your frontend's VITE_API_URL to this URL + /api, redeploy
