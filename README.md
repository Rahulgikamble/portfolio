# Portfolio Website — Rahul Kamble

Full stack: React (Vite) frontend + Node/Express/MongoDB Atlas backend.

Public pages: Home, Skills, Projects, Contact (with a working message form).
Admin: a single login (no public sign-up) that lets you edit your profile/bio,
add or remove skills (logos appear automatically for common tech names),
add/edit/remove projects, and read contact messages.

Design concept: the site is presented as your own personal API — the nav
reads like routes (/home /skills /projects /contact), each section is
labelled like an endpoint (GET /skills · 200 OK), and the hero prints your
profile as a live-typed JS object.

## Quick start

### 1. Backend
cd backend
npm install
cp .env.example .env      # fill in MONGO_URI, JWT_SECRET, and ADMIN_* values
npm run seed:admin         # creates your one admin login from .env
npm run seed:data          # loads starter profile/skills/projects
npm run dev                 # starts on http://localhost:5001

### 2. Frontend
cd frontend
npm install
cp .env.example .env       # VITE_API_URL=http://localhost:5001/api
npm run dev                 # starts on http://localhost:5173

### 3. Log in as admin
Go to http://localhost:5173/admin/login and use the ADMIN_EMAIL /
ADMIN_PASSWORD you set in backend/.env. This is the ONLY way to reach the
dashboard — there's no link on the public pages by design, except a small
"Admin" link in the footer. From the dashboard (4 tabs: Profile, Skills,
Projects, Messages) you can:
- Profile tab: edit your name/role/bio/links (GitHub, LinkedIn, Instagram,
  WhatsApp) — these show up in the footer and Contact page automatically
  once filled in, and are blank until you do.
- Skills tab: add/remove skills. Logos appear automatically for ~50 common
  tech names.
- Projects tab: add/edit/remove projects, including this portfolio site
  itself. Paste a screenshot URL to show an image (see note below).
- Messages tab: read every message submitted through your Contact form.

### 4. (Optional) Turn on real email notifications for the contact form
By default, contact form messages save to your database and show up in the
Messages tab — but you won't get emailed unless you set this up. This uses
Resend (a transactional email API built for exactly this) rather than your
Gmail account, so there's no App Password / 2FA setup and — unlike some
free form services — its API isn't blocked by a bot/CAPTCHA challenge when
called from server code:
1. Go to https://resend.com and sign up (free, no credit card).
2. In the dashboard, go to API Keys > Create API Key. Copy it.
3. In backend/.env, add:
   RESEND_API_KEY=the_key_you_copied
   EMAIL_TO=your_email_address@example.com
4. Restart the backend (npm run dev). Test by submitting your own Contact
   form — you should get an email within a few seconds, sent from
   "Portfolio Contact <onboarding@resend.dev>". Hitting "Reply" on that
   email replies straight to the person who messaged you.
Note: Resend's free tier without verifying your own domain can only send TO
the email address you signed up with — perfect for this use case (you're
the one receiving notifications), but if you want to send FROM your own
domain later, that's a separate step in their dashboard (Domains > Add).
If you skip this setup entirely, the form still works and saves messages —
you'll just need to check the Messages tab in the dashboard instead of
your inbox.

Note: there's no free, reliable way to get automatic WhatsApp
notifications (that requires a paid WhatsApp Business API) — email is the
solid free option. Your WhatsApp link still shows on the site for visitors
to reach you directly, once you add your number in the Profile tab.

### Adding project screenshots
There's no image upload built in — paste a direct image URL instead:
- Upload a screenshot to imgur.com (free, no account required), right-click
  the uploaded image → "Copy image address", paste that into the Image URL
  field.
- Or add the screenshot to your GitHub repo and use its "raw" URL.
Projects with no image URL show a plain letter placeholder instead — that's
intentional, not a bug, until you add one.
