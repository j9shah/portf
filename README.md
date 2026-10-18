# Jainam Shah · Portfolio

A minimal single-page portfolio built with Next.js 15, React 18, TypeScript, and Tailwind CSS. Static content is rendered on the server; theme selection uses `next-themes`. Experience disclosures use native HTML and work without JavaScript.

## Run locally

Use Node.js 24 (the exact version is in `.nvmrc`) and npm. If you use nvm, run `nvm install` and `nvm use` first.

```sh
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). Inter is fetched by `next/font` during development/build and served locally to visitors, so font compilation requires internet access.

## Check and build

```sh
npm run typecheck
npm run build
npm run start
```

The existing Vercel configuration installs from the lockfile and runs the Next.js production build.

## Update content

- Edit `lib/data.ts` for the introduction, contact links, experience, projects, education, and skills. Keep incoming/current/past statuses explicit; an incoming role does not automatically change when its start date passes.
- Set a project's `display` to `featured` or `archive`. Archive descriptions, feature highlights, technologies, and links are retained from the previous portfolio.
- The site exposes email, LinkedIn, and GitHub. It does not publish a phone number or resume file.
- `/about`, `/experience`, `/projects`, and `/contact` redirect to the matching homepage anchors.

## Appearance

Theme colors and layout live in `app/globals.css`. The three `--accent*` tokens in the light/dark palettes control all blue accents; replace them with neutral colors for a monochrome design. The theme follows the system until a visitor selects a preference, which is remembered locally.

`app/icon.svg` is the owl source used by the header, favicon, and social previews. `app/apple-icon.png` is its touch-icon rendering. Both social-image routes share `lib/social-image.tsx`; their text follows the profile data.

## Manual verification

Before shipping a change, check light/dark themes and preference persistence, 320px/mobile/tablet/desktop layouts, keyboard focus and disclosure controls, multiple open experience entries, reduced-motion behavior, 200% zoom/reflow, and all contact/project links. Experience details should start collapsed, and incoming employment should remain clearly labeled.
