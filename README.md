# Deepak's Portfolio

This project is a React single-page application built with Vite. The portfolio
and its email/referral tools are rendered as React pages; the existing CSS and
images remain part of the project.

## Run locally

Install Node.js, then run:

```sh
npm install
npm run dev
```

Vite prints the local address (usually `http://localhost:5173`). To create and
preview a production build, run `npm run build` and then `npm run preview`.

## Pages

- `/` — portfolio
- `/generate-email` — cover-letter email generator
- `/referral` — referral application
- `/auth` — recruiter-email password prompt
- `/email-form` — recruiter email form
- `/email-template` — application email preview

The old `/html/...` page URLs redirect to their React routes. When deploying,
configure the static host to serve `index.html` for application routes.

## EmailJS and authentication

The invitation and recruiter forms send email through EmailJS. Configure the
service IDs, template IDs, and public keys for your EmailJS account in
`src/pages/HomePage.jsx` and `src/pages/UtilityPages.jsx`.

The recruiter password check is retained for compatibility with the original
site. It runs in the browser and is not secure access control; protect sensitive
operations with server-side authentication instead.
