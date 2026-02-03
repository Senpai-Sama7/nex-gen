# AGENTS.md - NexGen Web Solutions

> This file contains essential information for AI coding agents working on this project.
> Last updated: 2026-02-03

---

## Project Overview

**NexGen Web Solutions** is a React + TypeScript + Vite landing page for a Houston-based web design agency. The site features 3D particle effects using Three.js and GSAP-powered scroll animations. It targets small businesses in specific industries: metal fabrication, oilfield services, home services, and medical practices.

- **Live URL**: https://nexgenweb.com (intended)
- **Deployment**: Vercel (SPA configuration)
- **Repository**: Private

---

## Technology Stack

| Category | Technology | Version |
|----------|------------|---------|
| Framework | React | 19.2.0 |
| Language | TypeScript | 5.9.3 |
| Build Tool | Vite | 7.2.4 |
| Styling | Tailwind CSS | 3.4.19 |
| UI Components | shadcn/ui | New York style |
| 3D Graphics | Three.js + @react-three/fiber | 0.182.0 |
| Animations | GSAP + ScrollTrigger | 3.14.2 |
| Icons | Lucide React | 0.562.0 |
| Forms | react-hook-form + Zod | 7.70.0 + 4.3.5 |
| Theme | next-themes | 0.4.6 |

---

## Project Structure

```
my-app/
├── public/                    # Static assets (images, SEO files)
│   ├── *.jpg / *.webp        # Project images in dual format
│   ├── robots.txt            # SEO crawler instructions
│   ├── sitemap.xml           # SEO sitemap
│   ├── 404.html              # Custom 404 page
│   └── _redirects            # Vercel redirect rules
├── src/
│   ├── components/           # React components
│   │   ├── ui/              # shadcn/ui components (50+ components)
│   │   ├── ExitIntentPopup.tsx
│   │   ├── FloatingCTA.tsx
│   │   ├── IntroOverlay.tsx
│   │   ├── Navigation.tsx
│   │   ├── ParticleField.tsx     # 3D background particles
│   │   ├── SocialProofToast.tsx
│   │   └── ThemeToggle.tsx
│   ├── sections/             # Page sections (lazy-loaded)
│   │   ├── Hero.tsx         # Above-the-fold (eager loaded)
│   │   ├── Industries.tsx   # Industry cards
│   │   ├── Approach.tsx     # Value proposition
│   │   ├── Services.tsx     # Service offerings
│   │   ├── Process.tsx      # Workflow timeline
│   │   ├── Testimonials.tsx # Client reviews
│   │   ├── About.tsx        # Company info
│   │   ├── FAQ.tsx          # Accordion FAQ
│   │   └── Contact.tsx      # Contact form
│   ├── hooks/                # Custom React hooks
│   │   ├── useTheme.ts      # Dark/light theme management
│   │   └── use-mobile.ts    # Mobile breakpoint detection
│   ├── lib/                  # Utility functions
│   │   └── utils.ts         # cn() helper for Tailwind classes
│   ├── App.tsx              # Root component with 3D canvas
│   ├── main.tsx             # React entry point
│   └── index.css            # Global styles + CSS variables
├── index.html               # SEO-optimized HTML template
├── vite.config.ts           # Vite configuration with manual chunks
├── tailwind.config.js       # Tailwind with custom colors/fonts
├── components.json          # shadcn/ui configuration
└── package.json             # Dependencies and scripts
```

---

## Path Aliases

All imports use the `@/` alias pointing to `./src`:

```typescript
// Correct
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

// Incorrect - avoid relative paths like:
// import { Button } from '../components/ui/button';
```

---

## Build Commands

```bash
# Development server with HMR
npm run dev

# Production build (TypeScript check + Vite build)
npm run build

# Preview production build locally
npm run preview

# Run ESLint
npm run lint
```

---

## Code Style Guidelines

### Component Structure
- Use functional components with explicit return types
- Prefer `const ComponentName = () => { ... }` syntax
- Export default at the bottom of the file
- Use PascalCase for component files

### Styling Conventions
- **Primary brand color**: `#ff6e00` (orange) - use `text-orange`, `bg-orange`, `border-orange`
- **Dark theme**: Default dark mode with `dark:` prefix for light overrides
- **Headings**: Use `font-teko` (Teko font, uppercase, letter-spacing)
- **Body text**: Use `font-opensans` (Open Sans)
- **Glass effect**: Use `className="glass"` for frosted glass cards
- **Glow effects**: Use `className="glow-orange"` for orange box-shadow

### CSS Classes Order (Tailwind)
1. Layout (position, display, flex/grid)
2. Sizing (width, height)
3. Spacing (padding, margin)
4. Typography (font, text)
5. Visuals (bg, border, shadow)
6. Transitions & Animation
7. Dark mode overrides (`dark:`)

### Section Conventions
- Each section is a full-page component with `min-h-screen`
- Sections have an `id` attribute for anchor navigation
- Hero is eagerly loaded; all other sections use `React.lazy()`
- Sections use GSAP ScrollTrigger for scroll-based animations

### 3D/Canvas Guidelines
- Background particle field is fixed with `z-0`
- Content overlays with `z-10` or higher
- Hero has its own Canvas for the 3D metallic torus knot
- Use `dpr={[1, 2]}` for device pixel ratio optimization
- Always wrap 3D components in `<Suspense fallback={null}>`

---

## Theme System

The project supports light/dark mode via CSS classes:

```css
/* Root level class toggling */
<html class="dark">  /* Dark mode */
<html>               /* Light mode (default) */
```

### Theme Hook Usage
```typescript
import { useTheme } from '@/hooks/useTheme';

const { theme, toggleTheme, isDark, mounted } = useTheme();

// Always check mounted before rendering theme-dependent content
if (!mounted) return <LoadingSpinner />;
```

### CSS Variables
All colors use HSL CSS variables that switch between light/dark:
- `--background`, `--foreground`
- `--primary` (orange), `--primary-foreground`
- `--card`, `--popover`, `--muted`, `--accent`

---

## Animation Patterns

### GSAP ScrollTrigger
```typescript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Always clean up ScrollTriggers
const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

useEffect(() => {
  const ctx = gsap.context(() => {
    const st = ScrollTrigger.create({ ... });
    scrollTriggersRef.current.push(st);
  }, sectionRef);

  return () => {
    scrollTriggersRef.current.forEach(st => st.kill());
    scrollTriggersRef.current = [];
    ctx.revert();
  };
}, []);
```

### Common Animation Values
- **Duration**: 0.6s - 1s for entrances
- **Easing**: `'power3.out'` for entrances, `'power2.inOut'` for scroll
- **Stagger**: 0.1s - 0.15s between items
- **Blur entrance**: `filter: 'blur(10px)'` → `'blur(0px)'`

---

## shadcn/ui Components

Components are pre-installed from shadcn/ui (New York style). Key locations:

```typescript
// Form components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem } from '@/components/ui/form';

// Feedback
import { toast } from 'sonner';  // From @/components/ui/sonner

// Overlays
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Sheet } from '@/components/ui/sheet';
```

To add a new shadcn component:
```bash
npx shadcn add <component-name>
```

---

## SEO Considerations

The `index.html` contains extensive SEO markup:
- Schema.org JSON-LD (Organization, WebSite, Service, FAQPage)
- Open Graph and Twitter Card meta tags
- Semantic anchors for AI/RAG systems (hidden)
- Google Analytics 4, Meta Pixel, Microsoft Clarity (placeholder IDs)

**Important**: Replace placeholder tracking IDs before deployment:
- `G-XXXXXXXXXX` → Google Analytics ID
- `XXXXXXXXXXXXXXX` → Meta Pixel ID  
- `XXXXXXXXXX` → Microsoft Clarity ID

---

## Performance Optimizations

1. **Code Splitting**: Vite manual chunks for vendor libraries
   - `vendor-react`: React + ReactDOM
   - `vendor-three`: Three.js ecosystem
   - `vendor-gsap`: GSAP animations
   - `vendor-ui`: Radix UI primitives

2. **Lazy Loading**: All sections below Hero use `React.lazy()`

3. **Images**: Dual format (WebP primary, JPG fallback) with `<picture>`

4. **3D Optimization**: 
   - `dpr={[1, 2]}` for pixel ratio limiting
   - Particle count limited to 150
   - Pointer-events disabled on background canvas

---

## Deployment

### Vercel Configuration (`vercel.json`)
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```
This enables SPA routing (all paths serve index.html).

### Build Output
- Static files in `dist/` directory
- Base path set to `'./'` in `vite.config.ts` for relative asset paths

---

## Common Tasks

### Adding a New Section
1. Create `src/sections/NewSection.tsx`
2. Add lazy import in `App.tsx`: `const NewSection = lazy(() => import('./sections/NewSection'));`
3. Include in Suspense wrapper: `<NewSection />`
4. Add navigation link in `Navigation.tsx`
5. Add Schema.org breadcrumb in `index.html`

### Adding a Custom Color
1. Add to `tailwind.config.js` `theme.extend.colors`
2. Add CSS variable in `src/index.css` `:root` and `.dark`

### Adding Form Validation
```typescript
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
});

const form = useForm({
  resolver: zodResolver(schema),
});
```

---

## Security Considerations

- No server-side code (static SPA)
- Form submissions should use external service (Formspree, Netlify Forms, etc.)
- Contact form in `Contact.tsx` needs backend integration
- All external links should use `rel="noopener noreferrer"`

---

## Troubleshooting

### Theme flash on load
The theme system checks `localStorage` and applies class before render. If flashing occurs, verify `useTheme` hook is used correctly with `mounted` check.

### GSAP animations not working
Ensure `ScrollTrigger` is registered: `gsap.registerPlugin(ScrollTrigger)`

### 3D canvas not visible
Check z-index layering:
- Background canvas: `z-0`
- Noise overlay: `z-[1]`
- Content: `z-10`

### TypeScript errors on build
Run `tsc -b` separately to see detailed errors before `vite build`.

---

## External Dependencies to Know

| Package | Purpose |
|---------|---------|
| `lenis` | Smooth scroll (configured but check if used) |
| `embla-carousel-react` | Carousel component |
| `recharts` | Charts (if needed for dashboards) |
| `date-fns` | Date formatting |
| `cmdk` | Command palette |
| `vaul` | Mobile drawer |

---

## Contact & Resources

- **Project Type**: Marketing landing page
- **Target Industries**: Metal fabrication, oilfield services, home services, medical practices
- **Geographic Focus**: Houston, Texas
- **Design Style**: Industrial/premium with orange accent (#ff6e00)
