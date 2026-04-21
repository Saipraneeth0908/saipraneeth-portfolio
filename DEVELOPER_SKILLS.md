# Developer Skills: Immersive Web Development & Portfolio Implementation

## Table of Contents
1. [Immersive Web Development Fundamentals](#immersive-web-development-fundamentals)
2. [3D Integration Patterns](#3d-integration-patterns)
3. [Animation Architecture](#animation-architecture)
4. [Component Patterns & Reusability](#component-patterns--reusability)
5. [Performance Optimization](#performance-optimization)
6. [Dark Mode & Premium Design Systems](#dark-mode--premium-design-systems)
7. [UX & Motion Guidelines](#ux--motion-guidelines)
8. [Testing & Accessibility](#testing--accessibility)
9. [Deployment & DevOps](#deployment--devops)

---

## IMMERSIVE WEB DEVELOPMENT FUNDAMENTALS

### Core Principle: Layered Depth Architecture

**What it is:**
Creating perceived 3D depth through CSS layering, z-index stratification, and transform positioning.

**How to implement:**
```typescript
// Establish visual layers from back to front
const layers = {
  background: 'transform: translateZ(-100px)',      // Furthest, slowest
  midground: 'transform: translateZ(0px)',           // Medium depth
  content: 'transform: translateZ(100px)',           // Main content
  foreground: 'transform: translateZ(200px)',        // Overlay, fastest
};

// Use perspective on parent container
<div style={{ perspective: '1000px' }}>
  {/* Children respond to 3D transforms */}
</div>
```

**Why it matters:**
- Engages users with premium, cinematic feel
- Guides visual hierarchy without clutter
- Creates sense of movement and depth on scroll

**Anti-patterns to avoid:**
- ❌ Excessive blur (kills legibility)
- ❌ Neon colors everywhere (looks gamified)
- ❌ 3D elements that don't serve navigation
- ❌ Overuse of motion that distracts

---

### Cinematic Visual Language

**Glass Morphism:**
```css
/* Create premium translucent panels */
background: rgba(19, 24, 41, 0.6);  /* Semi-transparent dark blue */
backdrop-filter: blur(10px);         /* Frosted glass effect */
border: 1px solid rgba(45, 55, 72, 0.5);  /* Subtle border */
box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4); /* Soft shadow */
```

**Directional Lighting:**
- Use cool-toned shadows instead of hard blacks
- Apply subtle gradient shadows: `box-shadow: 0 20px 40px rgba(0, 100, 200, 0.1)`
- Light source appears from top-left (creates consistency)

**Color Field Depth:**
- Dark base (#0a0e27) feels distant
- Layers of slightly lighter panels create depth perception
- Accents (#00d4ff) appear closest to viewer

---

### Data Visualization Integration

**Principle:** Make embedded dashboards feel like living elements, not static images.

**Techniques:**
1. Use SVG or canvas for animated data visuals
2. Subtle animations: lines drawing, nodes appearing, gradients shifting
3. Grid patterns + data nodes create technical aesthetic
4. Numbers animate from 0→final value on scroll (engagement metric)

**Example:**
```typescript
// Animated metric display
<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  onViewportEnter={() => animateCount(0, 2500, 1000)}
>
  {count}+ Projects Analyzed
</motion.div>
```

---

## 3D INTEGRATION PATTERNS

### Decision Matrix: When to Use What

| Scenario | Technology | Reason |
|----------|-----------|--------|
| Hero scene | Spline embed | Fast, optimized, premium feel |
| Interactive 3D (mouse/scroll response) | React Three Fiber | Full control, performant on desktop |
| Simple depth + parallax | CSS 3D Transforms | No runtime cost, hardware accelerated |
| Animated data visualization | Three.js canvas or SVG | Precise performance control |
| Background atmospheric effect | CSS gradient or canvas pattern | Minimal overhead |

---

### Spline Best Practices

**Why Spline for your hero:**
- Embed code loads in parallel, doesn't block page render
- Works beautifully on mobile (unlike heavy Three.js scenes)
- Premium visual quality with minimal effort
- Spline CDN handles optimization

**Optimization checklist:**
- Polygon count: < 100k
- Textures: use atlasing (combine 10 small textures into 1 large one)
- Resolution: 2K textures adequate (not 4K for web)
- Total asset size: 150-300KB (scene + textures gzipped)

**Loading strategy:**
```typescript
// Render without 3D initially, load Spline asynchronously
import dynamic from 'next/dynamic';

const SplineEmbed = dynamic(
  () => import('./SplineEmbed'),
  { 
    ssr: false,
    loading: () => <SkeletonLoader /> 
  }
);

// Hero renders with gradient background first, Spline loads in background
<HeroBackground>
  <GradientFallback />
  <Suspense fallback={<Skeleton />}>
    <SplineEmbed />
  </Suspense>
</HeroBackground>
```

---

### React Three Fiber for Advanced Interactive 3D

**When to use:** Desktop-first experiences where users drag, rotate, or interact with 3D objects.

**Performance optimization:**
```typescript
// Code split 3D components
const canvas = lazy(() => import('./Canvas3D'));

// Set device pixel ratio limit
<Canvas dpr={Math.min(window.devicePixelRatio, 2)}>
  {/* Scene content */}
</Canvas>

// Use InstancedMesh for many similar objects
<instancedMesh args={[geometry, material, 1000]} />

// Separate static and animated geometries
const staticGeo = useMemo(() => new BoxGeometry(), []);
const animatedGeo = useRef(new BoxGeometry()); // Re-created each frame if needed
```

**Mobile fallback:**
```typescript
// Disable Three Fiber on mobile or simplify dramatically
if (isMobile) {
  // Show static image or simpler CSS 3D instead
  return <StaticImage />;
}

return <Canvas>{/* 3D scene */}</Canvas>;
```

---

### CSS 3D Transforms for Lightweight Parallax

**Use case:** Parallax layers behind content, floating cards with subtle depth.

**Implementation:**
```css
/* Parent container sets up 3D space */
.parallax-container {
  perspective: 1000px; /* Creates 3D perspective */
}

/* Child layers move at different speeds */
.layer-background {
  transform: translateZ(-100px) scale(1.1); /* Moves back, scales up to prevent shrinking */
}

.layer-mid {
  transform: translateZ(0px); /* Stays in place */
}

/* On scroll, update translateY */
.layer-background {
  transform: translateZ(-100px) scale(1.1) translateY(scrollOffset * -0.3); /* -0.3 parallax factor */
}
```

**JavaScript with requestAnimationFrame:**
```typescript
const handleScroll = () => {
  requestAnimationFrame(() => {
    const scrollY = window.scrollY;
    element.style.transform = `translateZ(-100px) translateY(${scrollY * -0.3}px)`;
  });
};
```

---

## ANIMATION ARCHITECTURE

### Framer Motion: Foundation

**Installation & Setup:**
```bash
npm install framer-motion
```

**Core Concepts:**
- `initial`: starting state
- `animate`: target state
- `exit`: state when component unmounts
- `transition`: how to get from initial→animate
- `whileHover`, `whileTap`: interactive states

---

### Timing Standards (Premium Motion)

```typescript
export const TIMING = {
  fast: 0.15,        // 150ms - button hover, micro-feedback
  quick: 0.2,        // 200ms - quick state changes
  normal: 0.4,       // 400ms - standard transitions
  moderate: 0.5,     // 500ms - section changes
  slow: 0.6,         // 600ms - important entrances
  cinematic: 0.8,    // 800ms - hero moments, grand reveals
  hero: 1.0,         // 1000ms - special occasions
};

// Rule: anything < 100ms feels janky
// Anything > 1000ms (except special hero) feels sluggish
```

---

### Easing Equations (Cubic Beziers)

```typescript
export const EASING = {
  // [x1, y1, x2, y2] - cubic-bezier coordinates
  
  // Most versatile - smooth deceleration
  smooth: [0.4, 0.0, 0.2, 1],
  
  // Entrance - feels alive, slight spring
  entrance: [0.34, 1.56, 0.64, 1],
  
  // Exit - quick, gets out of the way
  exit: [0.2, 0, 0.4, 1],
  
  // Elastic - bounce at the end
  bounce: [0.68, -0.55, 0.265, 1.55],
  
  // Slow start, fast end
  easeIn: [0.42, 0, 1, 1],
  
  // Fast start, slow end
  easeOut: [0, 0, 0.58, 1],
};
```

**Rule:** Linear easing feels robotic. Always use curve-based easing.

---

### Scroll-Driven Animations (Most Important for Portfolio)

**Pattern 1: Parallax Background**
```typescript
import { useScroll, useTransform, motion } from 'framer-motion';

export const ParallaxSection = ({ children }) => {
  const { scrollY } = useScroll();
  
  // Range: when scroll goes 0→1000px, background goes 0→300px down
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  
  return (
    <motion.div style={{ y }}>
      {children}
    </motion.div>
  );
};
```

**Pattern 2: Reveal on Scroll (Most Used)**
```typescript
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export const RevealOnScroll = ({ children, delay = 0 }) => {
  const { ref, inView } = useInView({
    threshold: 0.3, // Trigger when 30% visible
    triggerOnce: true, // Only animate once
  });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.4, 0, 0.2, 1], // smooth easing
      }}
    >
      {children}
    </motion.div>
  );
};
```

**Pattern 3: Staggered Children**
```typescript
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // 100ms delay between children
      delayChildren: 0.3,   // Wait before first child animates
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

<motion.div variants={container} initial="hidden" animate="show">
  <motion.div variants={item}>Item 1</motion.div>
  <motion.div variants={item}>Item 2</motion.div>
</motion.div>
```

---

### Animation Performance Optimization

**GPU-Accelerated Properties Only:**
```typescript
// ✅ GOOD - Hardware accelerated
transform: translateX(100px);
transform: translateY(100px);
transform: scale(1.1);
transform: rotate(30deg);
opacity: 0.5;

// ❌ BAD - Triggers layout recalculation
left: 100px;     // Avoid, use transform instead
top: 100px;      // Avoid, use transform instead
width: 200px;    // Avoid, animate transform: scaleX instead
height: 200px;   // Avoid, animate transform: scaleY instead
```

**Memoization Pattern:**
```typescript
const ProjectCard = memo(
  ({ project, index, onClick }) => {
    const delay = index * 0.1;
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        viewport={{ once: true, margin: '0px 0px -100px 0px' }}
      >
        {/* Content */}
      </motion.div>
    );
  },
  (prev, next) => prev.project.id === next.project.id && prev.index === next.index
);
```

**Throttle Scroll Events:**
```typescript
// ✓ GOOD - Framer Motion handles throttling
const { scrollY } = useScroll();
const opacity = useTransform(scrollY, [0, 500], [0, 1]);

// ❌ BAD - Every scroll fires immediately
window.addEventListener('scroll', () => {
  // DOM mutations happen every frame - janky!
});
```

---

### Accessibility: Motion Preferences

```typescript
import { useReducedMotion } from 'framer-motion';

export const AccessibleAnimation = () => {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <motion.div
      animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5 }}
    >
      Content animates only if user allows motion
    </motion.div>
  );
};
```

**CSS Fallback:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## COMPONENT PATTERNS & REUSABILITY

### Button Component

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
}) => {
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        // Base styles
        'rounded-md font-medium transition-all',
        
        // Variants
        variant === 'primary' && 'bg-accent-blue text-background-base',
        variant === 'secondary' && 'border border-border-primary text-text-primary',
        variant === 'ghost' && 'text-text-primary hover:bg-surface-card',
        
        // Sizes
        size === 'sm' && 'px-3 py-2 text-sm',
        size === 'md' && 'px-6 py-3 text-base',
        size === 'lg' && 'px-8 py-4 text-lg',
        
        // Disabled state
        disabled && 'opacity-50 cursor-not-allowed',
      )}
      transition={{
        duration: 0.2,
        type: 'spring',
        stiffness: 400,
        damping: 10,
      }}
    >
      {children}
    </motion.button>
  );
};
```

---

### Card Component (Reusable for Projects, Skills, etc.)

```typescript
interface CardProps {
  children: React.ReactNode;
  hover?: boolean;
  gradient?: 'wipro' | 'infoedge' | 'kaiser';
}

export const Card: React.FC<CardProps> = ({
  children,
  hover = true,
  gradient,
}) => {
  return (
    <motion.div
      whileHover={hover ? { y: -4 } : {}}
      className={cn(
        'rounded-lg border p-6',
        'bg-surface-card border-border-primary',
        'backdrop-blur-md',
        hover && 'cursor-pointer transition-all',
        gradient && `border-${gradient}-accent`,
      )}
      style={{
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
      }}
    >
      {children}
    </motion.div>
  );
};
```

---

### Gallery Component with Lazy Loading

```typescript
import Image from 'next/image';
import { motion } from 'framer-motion';

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
}

export const GalleryGrid: React.FC<{ items: GalleryItem[] }> = ({ items }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
    >
      {items.map((item) => (
        <motion.div key={item.id} variants={item}>
          <Image
            src={item.src}
            alt={item.alt}
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%231a1f3a' width='400' height='300'/%3E%3C/svg%3E"
            className="rounded-lg"
          />
          <p className="mt-2 text-sm text-text-secondary">{item.caption}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};
```

---

### RevealOnScroll Wrapper

```typescript
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface RevealOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  variant?: 'fadeUp' | 'fadeLeft' | 'fadeRight';
}

export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  delay = 0,
  variant = 'fadeUp',
}) => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const variants = {
    fadeUp: {
      hidden: { opacity: 0, y: 60 },
      visible: { opacity: 1, y: 0 },
    },
    fadeLeft: {
      hidden: { opacity: 0, x: -60 },
      visible: { opacity: 1, x: 0 },
    },
    fadeRight: {
      hidden: { opacity: 0, x: 60 },
      visible: { opacity: 1, x: 0 },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants[variant]}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      {children}
    </motion.div>
  );
};
```

---

## PERFORMANCE OPTIMIZATION

### Image Optimization Strategy

**Using Next.js Image Component:**
```typescript
import Image from 'next/image';

<Image
  src="/proof/wipro-dashboard.webp"
  alt="Wipro churn prediction dashboard"
  width={1200}
  height={675}
  priority={false}           // Set true only for hero images
  loading="lazy"              // Lazy load off-screen images
  placeholder="blur"          // Show blur while loading
  blurDataURL={blurDataUrl}  // Low-quality placeholder
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  quality={75}                // Reduce to 75% quality (imperceptible to human eye)
/>
```

**Image Conversion Pipeline:**
```bash
# Convert PNG to WebP (40-60% smaller)
cwebp input.png -o output.webp -q 75

# Convert PNG to JPEG (fallback for older browsers)
convert input.png -quality 75 output.jpg

# Multiple resolutions for responsive design
cwebp input.png -o dashboard-1200w.webp -resize 1200 0
cwebp input.png -o dashboard-800w.webp -resize 800 0
cwebp input.png -o dashboard-400w.webp -resize 400 0
```

**Responsive Image Markup:**
```typescript
<picture>
  <source srcSet="dashboard-1200w.webp" media="(min-width: 1200px)" />
  <source srcSet="dashboard-800w.webp" media="(min-width: 800px)" />
  <img src="dashboard-fallback.jpg" alt="Dashboard" />
</picture>
```

---

### Font Optimization

**Preload Variable Font:**
```html
<!-- In next.js layout.tsx or _document.tsx -->
<link
  rel="preload"
  href="/fonts/inter-var.woff2"
  as="font"
  type="font/woff2"
  crossOrigin="anonymous"
/>
```

**Font Face Declaration:**
```css
@font-face {
  font-family: 'Inter Variable';
  src: url('/fonts/inter-var.woff2') format('woff2-variations');
  font-weight: 100 900;
  font-display: swap;  /* Show text immediately, swap font when loaded */
  font-variation-settings: "wght" 400;
}
```

**Rule:** Use variable fonts (single file for all weights). Never load separate weight files.

---

### Code Splitting & Bundle Optimization

**Dynamic Imports:**
```typescript
import dynamic from 'next/dynamic';

// Lazy load Spline (heavy library)
const SplineEmbed = dynamic(
  () => import('./SplineEmbed'),
  { 
    ssr: false,
    loading: () => <div className="h-96 bg-surface-card animate-pulse" />,
  }
);

// Lazy load gallery (only on scroll to gallery section)
const ProofGallery = dynamic(
  () => import('./gallery/ProofGallery'),
  {
    ssr: true,
    loading: () => <GallerySkeletonLoader />,
  }
);
```

**Tree Shaking - Only Import What You Need:**
```typescript
// ✅ GOOD - Only HeroContainer imported
import { HeroContainer } from '@/components/hero';

// ❌ BAD - Imports entire framer-motion library
import * as Motion from 'framer-motion';
```

---

### Core Web Vitals Targets

```typescript
// Performance budget targets
export const PERF_TARGETS = {
  // First Contentful Paint - show something fast
  fcp: 1.2,  // seconds
  
  // Largest Contentful Paint - hero image/video loads
  lcp: 2.5,  // seconds (GOOD < 2.5s, POOR > 4.0s)
  
  // First Input Delay - respond to user clicks
  fid: 100,  // milliseconds (GOOD < 100ms, POOR > 300ms)
  
  // Interaction to Next Paint - respond to interactions
  inp: 200,  // milliseconds (GOOD < 200ms, POOR > 500ms)
  
  // Cumulative Layout Shift - no surprise content jumps
  cls: 0.1,  // score (GOOD < 0.1, POOR > 0.25)
  
  // Bundle size targets
  mainBundle: 120,  // KB gzipped
  cssBundle: 30,    // KB gzipped
  totalInitial: 400, // KB total
};
```

**How to measure in DevTools:**
1. Open Chrome DevTools → Performance tab
2. Click record → scroll page → stop
3. Look for "Largest Contentful Paint" marker
4. Check for yellow/red blocks (layout thrashing)

---

### Performance Checklist

```
Hero Section
☐ Spline loads in parallel (doesn't block initial render)
☐ Heading text renders as HTML (not text in image)
☐ CTA buttons interactive within 2s
☐ No layout shift as fonts/images load (use aspect-ratio CSS)

Scroll Animations
☐ useScroll() transforms throttled/batched
☐ No DOM mutations triggered on scroll
☐ Transform + opacity only (no width/height changes)
☐ GPU-backed animations verified in DevTools
☐ 60fps maintained (no red frames in Performance tab)

Code Bundle
☐ Main JS bundle < 120KB gzipped
☐ CSS bundle < 30KB gzipped
☐ 3D libraries (Spline, Three.js) lazy-loaded
☐ Unused code removed (tree-shaking verified)

Images
☐ All images > 50KB converted to WebP
☐ Placeholder blur shown while loading
☐ native lazy="lazy" on all off-screen images
☐ Responsive srcset for 3+ breakpoints
☐ No CLS when images load

Fonts
☐ Variable fonts used (single file, not separate weights)
☐ font-display: swap (text visible immediately)
☐ Preload strategy for above-fold fonts
☐ No FOIT (Flash of Invisible Text)
```

---

## DARK MODE & PREMIUM DESIGN SYSTEMS

### Color Palette Architecture

**Base Palette (Establish Depth):**
```css
:root {
  /* Backgrounds - establish hierarchy */
  --background-base: #0a0e27;      /* Deepest, furthest back */
  --background-surface: #131829;   /* Slightly elevated */
  --background-card: #1a1f3a;      /* Interactive cards */
  --background-overlay: rgba(10, 14, 39, 0.8); /* Modals, overlays */

  /* Text Hierarchy */
  --text-primary: #f0f4f8;         /* Primary text, ~95% brightness */
  --text-secondary: #a3aac4;       /* Secondary text, ~65% brightness */
  --text-tertiary: #6b7280;        /* Hints, captions, ~40% brightness */

  /* Borders & Dividers */
  --border-primary: #2d3748;       /* Visible on dark */
  --border-secondary: #1f2937;     /* Subdued lines */
  --border-focus: #4299e1;         /* Interactive focus state */
}
```

**Accent Color System:**
```css
:root {
  /* Core tech accents */
  --accent-blue: #00d4ff;          /* Primary CTA, links */
  --accent-cyan: #00f9ff;          /* Bright highlights */
  --accent-violet: #a78bfa;        /* Modern, premium feel */
  --accent-indigo: #6366f1;        /* Deep, technical */

  /* Semantic colors */
  --success: #10b981;              /* Green - positive metrics */
  --warning: #f59e0b;              /* Amber - caution */
  --danger: #ef4444;               /* Red - risk/alerts */

  /* Project-specific accent overrides */
  --wipro-primary: var(--accent-blue);
  --wipro-accent: #d97706;         /* Warm gold */

  --infoedge-primary: var(--accent-indigo);
  --infoedge-accent: var(--accent-cyan);

  --kaiser-primary: var(--accent-blue);
  --kaiser-accent: var(--accent-cyan);
}
```

---

### Tailwind Configuration for Dark Mode

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',  // Use class-based dark mode (manually toggled)
  theme: {
    extend: {
      colors: {
        'surface': {
          base: '#0a0e27',
          emphasis: '#131829',
          card: '#1a1f3a',
          overlay: 'rgba(10, 14, 39, 0.8)',
        },
        'text': {
          primary: '#f0f4f8',
          secondary: '#a3aac4',
          tertiary: '#6b7280',
        },
        'border': {
          primary: '#2d3748',
          secondary: '#1f2937',
          focus: '#4299e1',
        },
        'accent': {
          blue: '#00d4ff',
          cyan: '#00f9ff',
          violet: '#a78bfa',
          indigo: '#6366f1',
        },
      },
      backdropBlur: {
        sm: '4px',
        md: '8px',
        lg: '10px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 212, 255, 0.3)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.4)',
        'elevated': '0 8px 30px rgba(0, 212, 255, 0.2)',
      },
    },
  },
};

export default config;
```

---

### Typography System

**Font Scale:**
```css
:root {
  /* Display & Headings */
  --heading-display: 3.5rem;  /* Hero H1 */
  --heading-xl: 2.25rem;      /* Section titles */
  --heading-lg: 1.875rem;     /* Subsections */
  --heading-md: 1.5rem;       /* Card titles */
  --heading-sm: 1.125rem;     /* Sidebar titles */

  /* Body Text */
  --body-lg: 1.125rem;        /* Readable, features */
  --body-md: 1rem;            /* Default body */
  --body-sm: 0.875rem;        /* Labels, small text */

  /* Monospace (for code, technical labels) */
  --mono-sm: 0.75rem;         /* Code, small tech */
  --mono-md: 0.875rem;        /* Code blocks */

  /* Font Weights */
  --weight-light: 300;        /* Subtle, secondary text */
  --weight-regular: 400;      /* Body text */
  --weight-medium: 500;       /* Labels, medium emphasis */
  --weight-semibold: 600;     /* Headings */
  --weight-bold: 700;         /* Strong emphasis */
}
```

**Component Typography:**
```typescript
// Hero Section
<h1 className="text-6xl font-bold letter-spacing-tight">
  Data Analyst & Analytics Engineer
</h1>

// Section Header
<h2 className="text-4xl font-semibold text-accent-blue">
  Experience
</h2>

// Body Text
<p className="text-lg text-text-primary leading-relaxed">
  Professional summary...
</p>

// Small Label
<span className="text-xs font-medium text-text-tertiary uppercase">
  Tools Used
</span>
```

---

### Contrast & Accessibility

**WCAG AA Compliance:**
```
✓ Primary text on base: #f0f4f8 on #0a0e27 = 15.7:1 contrast (excellent)
✓ Secondary text on base: #a3aac4 on #0a0e27 = 7.1:1 (acceptable for large text)
❌ Medium gray (#6b7280) on #0a0e27 = 2.4:1 (too low, unacceptable)

Rule: Always verify contrast ratio with WebAIM contrast checker or DevTools
```

---

### Component Color Application

**Button - Primary:**
```css
.btn-primary {
  background-color: var(--accent-blue);    /* #00d4ff */
  color: var(--background-base);           /* #0a0e27 */
  border-radius: 6px;
  padding: 12px 24px;
  font-weight: 600;
  transition: all 300ms ease;
}

.btn-primary:hover {
  background-color: var(--accent-cyan);    /* Brighter */
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
}
```

**Button - Secondary:**
```css
.btn-secondary {
  border: 1px solid var(--border-primary);
  background-color: transparent;
  color: var(--text-primary);
  border-radius: 6px;
  padding: 12px 24px;
  transition: all 300ms ease;
}

.btn-secondary:hover {
  background-color: rgba(0, 212, 255, 0.1);
  border-color: var(--accent-blue);
}
```

**Card:**
```css
.card {
  background-color: var(--background-card);
  border: 1px solid var(--border-primary);
  border-radius: 8px;
  backdrop-filter: blur(10px);
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  transition: all 300ms ease;
}

.card:hover {
  border-color: var(--accent-blue);
  box-shadow: 0 8px 30px rgba(0, 212, 255, 0.2);
}
```

---

## UX & MOTION GUIDELINES

### Premium Motion Standards

**What feels premium:**
- Purposeful animations that reveal information
- Consistent motion timing (600-800ms for major reveals)
- Smooth easing (cubic-bezier, never linear)
- Animations enhance, never distract
- Motion respects user preferences (prefers-reduced-motion)

**What feels cheap:**
- Constant spinning/rotating elements
- Overly fast animations (< 100ms)
- Overly slow animations (> 1000ms, unless special)
- Motion on every element (visual noise)
- Jarring color flashes

---

### Interactive Feedback Pattern

```typescript
// Premium button interaction
<motion.button
  whileHover={{ scale: 1.02 }}      // 2% enlarge
  whileTap={{ scale: 0.98 }}        // 2% shrink on click
  transition={{
    duration: 0.2,
    type: 'spring',
    stiffness: 400,    // Snappier feel
    damping: 10,       // Minimal bounce
  }}
>
  Learn More
</motion.button>
```

**Why this works:**
- Scale 1.02 feels responsive without being obvious
- Scale 0.98 gives tactile feedback (feels like pressing button)
- Spring physics feels alive and premium
- 200ms total duration feels instant but not jarring

---

### Parallax Guidelines

```typescript
// Safe parallax factors
const PARALLAX = {
  background: -0.3,   // Background moves 30% slower (feels far)
  midground: -0.1,    // Mid-layer moves 10% slower
  content: 0,         // Content scrolls normally
  overlay: 0.1,       // Text overlay moves 10% faster
};

// How to apply
const y = useTransform(
  scrollY,
  [0, 500],           // Scroll 0-500px
  [0, 500 * 0.3]      // Background moves 0-150px (30% of scroll)
);
```

**Important:**
- ❌ Parallax > ±0.5 looks gimmicky and disorienting
- ❌ Parallax on every element creates visual noise
- ✓ Subtle parallax enhances depth perception
- ✓ Fallback for mobile (reduce factor by 50%)

---

### Motion Orchestration Pattern

```typescript
// Grand entrance sequence
1. Heading fades in + slides up               (0ms, 0.8s duration)
2. Subheading fades in                        (200ms delay, 0.6s duration)
3. Description fades in                       (400ms delay, 0.6s duration)
4. CTA buttons fade in + scale                (600ms delay, 0.6s duration)
5. Background particles animate               (800ms delay, continuous)

Total: 1.2s feels grand but not intrusive
Each element has clear timing, feels orchestrated (not random)
```

---

### Scroll Storytelling

```typescript
// Page flow: hero → scroll → reveal → parallax → engage → call-to-action

Hero Section
├─ Hero entrance (800ms on load)
├─ Parallax background as scroll starts
└─ Hero stays sticky until scroll past

About Section
├─ Fades in on scroll (reveal pattern)
├─ Text appears from top to bottom (staggered, 100ms apart)
└─ Parallax mid-layer creates depth

Experience Section
├─ Each project card reveals on scroll (staggered 150ms)
├─ Project-specific accent color highlights
├─ Images load with blur placeholder (no CLS)
└─ Hover lifts card forward (y: -4px)

Gallery
├─ Grid items appear in sequence (staggered 100ms)
├─ Click expands to full-screen modal (smooth Framer Motion)
├─ Images lazy-load as user scrolls to gallery
└─ Captions fade in with images

Skills
├─ Skill pills float in one at a time
├─ Category tabs smooth transition
└─ Icons subtle animation on hover

Contact
├─ Links glow on hover (box-shadow animation)
├─ Call-to-action button large, prominent
└─ Footer links fade in on final scroll
```

---

## TESTING & ACCESSIBILITY

### Keyboard Navigation Testing

```typescript
// All interactive elements must be keyboard accessible

✓ Tab through all buttons, links, form inputs
✓ Enter key activates buttons
✓ Space key activates buttons (if <button>, not <div>)
✓ Arrow keys navigate tabs or dropdowns
✓ Escape closes modals
✓ Focus visible on all interactive elements (outline or glow)

// Test with screen readers
✓ VoiceOver (Mac): Cmd+F5
✓ NVDA (Windows): Free screen reader
✓ JAWS (Windows): Premium screen reader
```

### Accessibility Checklist (WCAG AA)

```
Color & Contrast
☐ Text contrast > 4.5:1 (WCAG AA)
☐ Large text contrast > 3:1 (WCAG AA)
☐ Color not sole method of conveying information (use icons + color)

Images & Media
☐ All images have meaningful alt text
☐ Decorative images have empty alt=""
☐ video has captions

Motion & Animation
☐ prefers-reduced-motion respected (animations disabled)
☐ Auto-playing video should have mute attribute
☐ No animations lasting > 3s loop infinitely

Structure & Semantics
☐ Proper heading hierarchy <h1> → <h2> → <h3> (no skipping)
☐ Links have descriptive text (not "click here")
☐ Form inputs have associated <label> elements
☐ Interactive elements are <button> or <a>, not <div onclick>

Focus Management
☐ Focus indicator visible on all interactive elements
☐ Focus order logical (top-to-bottom, left-to-right)
☐ Modal traps focus inside modal
☐ Viewport zoom not disabled (no user-scalable=no)

Language & Text
☐ Page language set (<html lang="en">)
☐ Font size readable (min 16px)
☐ Line spacing > 1.5 for body text
☐ Letter-spacing not too tight (min -0.02em)
```

---

## DEPLOYMENT & DEVOPS

### Vercel Deployment

**Environment Setup:**
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod

# Set up automatic deployments from GitHub
# (connect repo in Vercel dashboard)
```

**Vercel Optimization:**
```javascript
// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.example.com',
      },
    ],
    formats: ['image/webp', 'image/avif'], // Modern formats
    unoptimized: false, // Enable optimizations
  },
  
  experimental: {
    optimizePackageImports: ['@/components'],
  },
};
```

---

### Lighthouse CI

**Setup:**
```bash
npm install --save-dev @lhci/cli@0.9.x

# Create lighthouserc.json
```

**Configuration:**
```json
{
  "ci": {
    "collect": {
      "numberOfRuns": 3,
      "url": ["https://yoursite.com"],
      "headless": true
    },
    "upload": {
      "target": "temporary-public-storage"
    },
    "assert": {
      "assertMatrix": [
        {
          "matchingUrlPattern": "https://yoursite.com",
          "assertions": {
            "categories:performance": ["error", { "minScore": 0.9 }],
            "categories:accessibility": ["error", { "minScore": 0.9 }],
            "categories:best-practices": ["error", { "minScore": 0.9 }]
          }
        }
      ]
    }
  }
}
```

---

### GitHub Actions for CI/CD

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI

on: [push, pull_request]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - uses: treosh/lighthouse-ci-action@v9
        with:
          configPath: './lighthouserc.json'
```

---

### Performance Monitoring

**Tools to Use:**
1. **Google PageSpeed Insights** - Real user data
2. **WebPageTest** - Detailed waterfall analysis
3. **Chrome DevTools Performance Tab** - Frame-by-frame debugging
4. **Lighthouse CI** - Automated measurement on deploy

**Metrics to Track:**
- LCP (Largest Contentful Paint)
- FID (First Input Delay) / INP (Interaction to Next Paint)
- CLS (Cumulative Layout Shift)
- TTL (Time to Interactive)
- TTFB (Time to First Byte)

---

## PRACTICAL IMPLEMENTATION FLOW

### Week 1: Foundation
```
Day 1-2: Project setup + Tailwind configuration
Day 3-4: Layout components (Navbar, Footer, Layout wrapper)
Day 5: Verify dark mode + color system
```

### Week 2: Content
```
Day 1-2: Hero section (no animation, gradient placeholder)
Day 3-4: About + Experience sections (Wipro, Info Edge, Kaiser)
Day 5: Gallery + Skills sections (static layout)
```

### Week 3: Animation
```
Day 1-2: Framer Motion setup + entrance animations
Day 3-4: Scroll animations (parallax, reveal on scroll)
Day 5: Interactive states (hover, click, focus)
```

### Week 4: Performance & Polish
```
Day 1-2: Image optimization + code splitting
Day 3-4: Lighthouse audit + Core Web Vitals tuning
Day 5: Accessibility audit + final polish
```

---

## QUICK REFERENCE: Copy-Paste Snippets

### Dark Mode CSS Variable Setup
```css
:root {
  --bg-base: #0a0e27;
  --bg-surface: #131829;
  --bg-card: #1a1f3a;
  --text-primary: #f0f4f8;
  --text-secondary: #a3aac4;
  --text-tertiary: #6b7280;
  --accent-blue: #00d4ff;
  --accent-cyan: #00f9ff;
  --accent-violet: #a78bfa;
  --border-primary: #2d3748;
}
```

### Framer Motion Timing Constants
```typescript
export const TIMING = { fast: 0.15, quick: 0.2, normal: 0.4, moderate: 0.5, slow: 0.6, cinematic: 0.8 };
export const EASING = { smooth: [0.4, 0, 0.2, 1], entrance: [0.34, 1.56, 0.64, 1], exit: [0.2, 0, 0.4, 1] };
```

### Next.js Image Lazy Load Pattern
```typescript
<Image src="/path/to/image.webp" alt="Description" loading="lazy" placeholder="blur" />
```

### RevealOnScroll Component
```typescript
const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
<motion.div ref={ref} initial={{ opacity: 0, y: 60 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} />
```

---

## Additional Resources

**Frameworks & Libraries:**
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

**Performance:**
- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

**Accessibility:**
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

**This document serves as the foundation for all development decisions. Reference it throughout the build process.**
