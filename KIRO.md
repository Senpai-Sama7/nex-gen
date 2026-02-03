# Project Context

## Overview
React + TypeScript + Vite landing page with 3D particle effects and GSAP animations.

## Tech Stack
- React 19, TypeScript 5.9, Vite 7
- Three.js + @react-three/fiber for 3D graphics
- GSAP + ScrollTrigger for animations
- Tailwind CSS 3.4 + shadcn/ui (new-york style)
- Zod + react-hook-form for forms

## Structure
```
src/
├── components/       # Reusable components
│   └── ui/          # shadcn/ui components
├── sections/        # Page sections (Hero, Services, etc.)
├── hooks/           # Custom hooks
└── lib/             # Utilities
```

## Path Aliases
- `@/*` → `./src/*`

## Commands
- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint

## Conventions
- Use shadcn/ui components from `@/components/ui`
- Sections are full-page scroll-snap components with class `snap-section`
- 3D canvas is fixed background, content overlays with z-index
- Dark theme (black bg, white text)
