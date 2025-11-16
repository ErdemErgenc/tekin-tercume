This folder is deprecated. The local Express email server was removed.

Current email sending happens via Vercel Functions under `api/`:
- `POST /api/contact` (contact/quote form, supports attachments)
- `GET /api/email-stats` (optional stats)

Set env vars in Vercel Project → Settings → Environment Variables:
- `EMAIL_USER` (Gmail)
- `EMAIL_PASSWORD` (Gmail App Password)
