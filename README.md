# Code Connect Field Guide

A production-ready internal learning site for Figma Code Connect, built with Next.js App Router, TypeScript, Tailwind CSS, and Geist.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Validate a production build

```bash
npm run typecheck
npm run lint
npm run build
```

## Deploy to Vercel

Import this repository into Vercel and accept the detected **Next.js** defaults. No environment variables, services, or build overrides are required. The app uses static content and exports every route at build time.

## Content note

The guide follows Figma's Template API direction and uses `.figma.ts` files for new examples. Verify plan entitlements and fast-moving CLI details against the linked official Figma documentation before an organization-wide rollout.
