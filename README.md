# Brian Sittmann — Portfolio

Personal portfolio site built with React, Vite, and Tailwind CSS.

## Features

- Light/dark theme toggle
- English/Spanish language switcher
- Project showcase with image carousel and detail modals
- Skills, about, and contact sections
- Contact form powered by EmailJS
- Smooth animations via Framer Motion

## Tech Stack

- **Framework:** React 18
- **Routing:** React Router v6
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Build tool:** Vite
- **Linting:** ESLint

See [stack.md](./stack.md) for more detail.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Lint the project:

```bash
npm run lint
```

## Project Structure

```
portfolio/
├── public/                 # Static assets (CV, PDFs)
├── src/
│   ├── assets/images/      # Project and hero images
│   ├── components/         # UI components (Header, Hero, Projects, Contact, modals, ...)
│   ├── context/            # Theme and language React contexts
│   ├── data/                # Project and skills data
│   ├── pages/               # Page-level components
│   ├── translations/       # i18n strings (en/es)
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── tailwind.config.js
└── vite.config.js
```

## Deployment

Deployed via Vercel / GitHub Pages.
