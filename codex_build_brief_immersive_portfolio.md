# Codex Build Brief: Immersive 3D Data Professional Portfolio

## Objective
Build a premium, immersive portfolio website for **Sai Praneeth Kamishetty** that showcases his professional experience across three major projects and presents proof-of-work visuals in a polished, recruiter-ready format.

The website should feel like a **cinematic, 3D, data-driven experience**, not a standard portfolio template.

It should combine:
- strong visual design
- technical storytelling
- interactive motion
- selective 3D immersion
- project case studies
- proof-of-work diagrams and dashboard screenshots
- clean GitHub-ready code

---

## Primary Goal
Create a portfolio website that presents Sai as a **data professional who works across analytics, ETL, modeling, dashboards, and structured business problem solving**.

The site should highlight these three experience worlds:

1. **Wipro**
   - Banking / customer churn / risk / customer analytics
   - Power BI-style dashboard proof
   - Churn prediction workflow
   - Business intelligence storytelling

2. **Info Edge**
   - Healthcare / OCR / document digitization / patient data structuring
   - OCR pipeline proof
   - Hospital lookup / patient analytics context
   - Data extraction, validation, normalization story

3. **Kaiser Permanente**
   - Member churn / satisfaction / ETL / reporting / integrated analytics
   - Tableau dashboard proof
   - ETL architecture proof
   - Multi-source healthcare analytics story

---

## Build Philosophy
This is **not** a generic website.

It should feel like:
- a **high-end product experience**
- a **visual case-study platform**
- a **3D data environment**
- a **technical storytelling website**

It must balance:
- elegance
- readability
- interactivity
- depth
- strong content hierarchy

Do **not** make it cluttered, childish, overly gamified, or neon-heavy.

---

## Recommended Stack
Use this stack unless there is a compelling implementation reason to change it:

- **Framework:** Next.js
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Icons:** lucide-react
- **3D:** Spline embeds initially
- **Optional advanced 3D later:** React Three Fiber only if necessary
- **Hosting:** Vercel
- **Version control:** GitHub

Optional additions if useful:
- MDX for project case study content
- Lenis or similar for smooth scrolling
- shadcn/ui components only if needed
- local JSON/TS content files for project metadata

---

## External Tools Context
This project may use or reference:
- **Codex** for implementation, refactoring, and coding assistance
- **v0.app** for rapid section/UI generation
- **Spline** for 3D scene creation and embedding
- **21st.dev** only if later adding an AI assistant or interactive agent features

Important:
- Do not architect the site around 21st.dev in version 1.
- Version 1 should focus on a polished site experience with project storytelling and proof-of-work visuals.

---

## Design Direction

### Visual Mood
- premium
- cinematic
- technical
- futuristic but professional
- dark-mode first
- data-native
- layered and immersive

### Visual References in Words
Think:
- glass panels floating in depth
- soft directional lighting
- deep dark environment
- subtle moving gradients
- illuminated data nodes
- hovering KPI fragments
- transparent panels with blur
- animated lines / grids / signal flow
- restrained enterprise-tech elegance

### Avoid
- loud rainbow colors
- overuse of neon
- excessive motion
- complex 3D everywhere
- poor contrast
- unreadable text over graphics
- gimmicky “hacker” aesthetics

---

## Suggested Color System
Use a premium dark palette.

### Base
- Background: near-black / deep navy
- Surface cards: translucent dark blue-gray
- Borders: subtle cool gray / blue
- Text primary: soft white
- Text secondary: cool muted gray

### Accents
- electric blue
- cyan
- violet
- soft green for positive metrics
- orange/red only for risk or alert visuals

### Project Accent Ideas
- **Wipro:** blue + gold + subtle purple
- **Info Edge:** purple + indigo + teal
- **Kaiser Permanente:** blue + soft clinical cyan + cool violet

---

## Typography
Use a clean, modern, enterprise-ready font system.

Recommended:
- Strong display headings
- Clear sans-serif for body
- Good spacing
- Large readable section titles
- Clear subhead hierarchy

Typography should feel:
- precise
- premium
- modern
- technical

---

## Core Site Structure

### Pages / Sections
Create the site with these sections:

1. **Hero**
2. **About**
3. **Experience Worlds**
   - Wipro
   - Info Edge
   - Kaiser Permanente
4. **Proof of Work Gallery**
5. **Skills & Tools**
6. **GitHub / Resume / Links**
7. **Contact**

Potential route structure:
- `/`
- `/projects/wipro`
- `/projects/info-edge`
- `/projects/kaiser`

You can keep it as a one-page site with deep sections plus optional project detail pages.

---

## Hero Section Requirements
The hero should be the strongest visual moment.

### Hero Goals
Communicate immediately that Sai is:
- a data professional
- experienced in analytics and modeling
- capable of building structured data products
- technically strong
- visually polished

### Hero Content
- name
- concise title
- short positioning line
- primary CTA buttons
- subtle animated statistics or proof counts
- 3D scene or 3D visual layer
- moving background depth

### Example Title Direction
- Data Analyst & Analytics Engineer
- Building insight from messy, multi-source, high-impact data
- Analytics, ETL, Modeling, Dashboards, Decision Intelligence

### Hero Visual Layer
Use Spline or a lightweight 3D treatment that evokes:
- networked data nodes
- floating charts
- data flow
- hovering translucent panels
- soft light and depth

---

## About Section
The about section should explain Sai’s profile clearly and credibly.

Include:
- short professional summary
- strengths in analytics / ETL / modeling / dashboards
- cross-domain experience
- emphasis on turning messy data into actionable decisions
- mention of healthcare and banking work

Keep it concise and premium.

---

## Experience Worlds Section
This is the heart of the site.

Each experience should feel like its own visual environment.

### Each Project World Should Include
- company name
- project title
- one-line project positioning
- business problem
- what Sai worked on
- tools used
- dashboards / models / pipelines built
- what stakeholders used it for
- visual evidence
- key impact or outcome
- “my role” / “what I owned” section

---

## Wipro Experience World

### Story
Banking analytics and customer behavior intelligence focused on churn, risk, segmentation, and decision support.

### Assets to Include
- Wipro churn Power BI-style dashboard image
- Wipro churn prediction model workflow image

### Wipro Website Content
Include:
- business problem: understanding and reducing churn
- data sources: customer demographics, transactions, support interactions, product holdings, etc.
- analytical work: churn analysis, segmentation, dashboarding
- predictive work: churn probability modeling
- stakeholder use: retention campaigns, risk prioritization, decision-making
- tools: Python, SQL, Power BI, Pandas, scikit-learn or similar model tooling

### Visual Theme
- enterprise banking intelligence
- structured grids
- dashboard fragments
- crisp blue/gold accents
- financial data atmosphere

---

## Info Edge Experience World

### Story
Healthcare document digitization and patient data structuring using OCR-driven processing and data standardization.

### Assets to Include
- Info Edge OCR pipeline image
- Optional hospital/patient lookup dashboard image if needed

### Info Edge Website Content
Include:
- problem: patient records spread across scanned and digital documents
- work performed: OCR extraction, regex parsing, normalization, validation, structuring
- data work: converting unstructured documents into usable datasets
- output: structured data for lookup, analytics, and workflows
- tools: Python, OCR, regex, PyMuPDF, Pandas, PySpark, Polars, SQL, Power BI
- business users: hospital staff, doctors, operational stakeholders

### Visual Theme
- document layers
- text blocks
- extraction flow lines
- purple / indigo / teal
- healthcare-tech precision

---

## Kaiser Permanente Experience World

### Story
Integrated member analytics focused on satisfaction, churn, ETL, multi-source healthcare data, and business reporting.

### Assets to Include
- Kaiser Tableau churn + satisfaction dashboard image
- Kaiser ETL architecture image

### Kaiser Website Content
Include:
- business problem: unify multiple member experience datasets for actionable reporting
- data sources: survey data, CRM data, experience/platform data, possibly claims-related context
- work performed: ETL, validation, transformation, analysis, dashboarding
- analytical work: churn analysis, satisfaction drivers, segmentation, reporting
- stakeholder use: retention planning, performance monitoring, decision-making
- tools: Python, SQL, Tableau, Power BI, ETL frameworks, validation logic

### Visual Theme
- clean healthcare enterprise intelligence
- connected system architecture
- controlled motion
- soft clinical blue/cyan/violet palette

---

## Proof of Work Gallery
This section should showcase all the visuals created so far.

### Assets to Include
Use the following images as gallery / case-study support assets:

1. Wipro Power BI dashboard
2. Wipro churn prediction workflow
3. Kaiser Tableau churn + satisfaction dashboard
4. Kaiser ETL architecture
5. Info Edge OCR pipeline
6. Optional Info Edge hospital dashboard / lookup UI

### Gallery Behavior
- elegant card grid or cinematic gallery
- hover effects
- click to expand
- image detail modal or full project page
- caption and short explanation for each image
- smooth transitions

Do not make it look like a random image dump.

---

## Skills & Tools Section
Group skills by category.

### Suggested Categories
- Analytics
- Data Engineering
- Modeling
- Dashboarding
- Data Processing
- Visualization
- Workflow / Collaboration

### Skills To Include
Based on experience:
- Python
- SQL
- Power BI
- Tableau
- Pandas
- NumPy
- scikit-learn
- PySpark
- Polars
- OCR
- Regex
- PyMuPDF
- ETL
- Data validation
- Feature engineering
- Regression
- Clustering
- Segmentation
- Dashboard design
- Business intelligence

Represent these visually in a premium way:
- icons
- floating pills
- categorized cards
- subtle motion

---

## Contact / Resume / Links Section
This section should be clean and minimal.

Include:
- GitHub
- LinkedIn
- Resume link
- email / contact CTA
- optional “View case studies” CTA
- optional downloadable resume button

Keep the final section elegant and simple.

---

## Motion Guidelines
Animation should feel premium and controlled.

### Use Motion For
- section reveal
- image parallax
- card hover
- subtle glow tracking
- scrolling depth
- project transition moments
- spotlight effects
- floating data particles in the background

### Avoid
- overly fast movement
- constant spinning elements
- distracting scroll hijacking
- too many animated objects at once
- flashy transitions that hurt readability

---

## 3D Guidelines
Use 3D strategically.

### Good Uses of 3D
- hero scene
- transitional separators between project sections
- background scene behind one or two highlighted sections
- floating accent objects tied to data storytelling

### Bad Uses of 3D
- every card being 3D
- heavy full-screen scenes on every section
- complicated WebGL interactions that slow the site

### Spline Use
Prefer:
- embedded Spline Viewer in version 1
- optimized scenes
- limited asset count
- soft lighting
- premium materials
- interactive but smooth experience

Potential 3D objects:
- floating KPI cube
- data nodes and connecting lines
- layered translucent panels
- chart ribbon structures
- luminous grid room

---

## Performance Requirements
This site should be visually rich but still performant.

### Priorities
- optimize images
- lazy-load heavy assets
- use responsive media
- minimize oversized 3D scenes
- reduce unnecessary client-side rendering
- use code splitting where helpful
- graceful fallbacks for 3D loading

### Accessibility
- maintain text contrast
- keyboard-accessible navigation
- reduced motion support if possible
- alt text for images
- readable font sizes
- mobile-safe layouts

---

## Recommended Folder Structure

Use a structure close to this:

```bash
immersive-portfolio/
  public/
    proof/
      wipro-churn-dashboard.png
      wipro-model-workflow.png
      kaiser-tableau-dashboard.png
      kaiser-etl-architecture.png
      infoedge-ocr-pipeline.png
      infoedge-hospital-dashboard.png
    spline/
    logos/
  src/
    app/
      page.tsx
      projects/
        wipro/
          page.tsx
        info-edge/
          page.tsx
        kaiser/
          page.tsx
    components/
      layout/
      hero/
      project-world/
      gallery/
      ui/
      spline/
    content/
      projects.ts
      skills.ts
      metrics.ts
    data/
    lib/
    styles/
  docs/
    design-system.md
    sitemap.md
    content-map.md
    motion-guidelines.md
    codex-build-brief.md
  package.json
  tailwind.config.ts
  tsconfig.json
```

---

## Data Model / Content Structure
Create structured content files for project data.

### Example `projects.ts`
Each project should contain:
- slug
- company
- title
- summary
- role
- tools
- metrics
- images
- sections
- theme colors

This should drive reusable components.

---

## Required Components
Build reusable components for this site.

### Likely Components
- Navbar
- HeroScene
- HeroStats
- SectionHeader
- ExperienceWorld
- ProjectOverviewCard
- ProofGallery
- ImageLightbox
- SkillsGrid
- CTASection
- Footer
- SplineEmbed
- AnimatedBackground
- MetricCard
- ToolPill
- TimelineStrip

Each should be modular and clean.

---

## Implementation Order
Build in this sequence.

### Phase 1: Foundation
1. Initialize Next.js app
2. Configure Tailwind
3. Create base layout
4. Set up dark design system
5. Build navigation and section shell
6. Add placeholder content structure

### Phase 2: Core UX
1. Build hero section
2. Build About section
3. Build reusable ExperienceWorld layout
4. Build Proof of Work gallery
5. Build Skills section
6. Build Contact section

### Phase 3: Content Integration
1. Add Wipro project content and visuals
2. Add Info Edge project content and visuals
3. Add Kaiser project content and visuals
4. Add project detail pages if needed

### Phase 4: Motion + Immersion
1. Add Framer Motion transitions
2. Add parallax and hover interactions
3. Integrate Spline hero
4. Add project section depth effects
5. Polish interactive states

### Phase 5: Optimization
1. Improve responsiveness
2. Optimize image loading
3. Add loading states
4. Improve accessibility
5. Reduce layout shift
6. Clean code structure

### Phase 6: Ship
1. Prepare metadata
2. Connect GitHub repo
3. Deploy to Vercel
4. Verify mobile behavior
5. Final QA

---

## How To Use v0.app
v0 can help generate the first UI scaffolds.

Use it for:
- hero section skeleton
- project card grid
- gallery layout
- contact section
- page shell ideas

Do not rely on v0 to finish the entire site automatically.

Take generated code, then refine it manually in this repo.

---

## How To Use Codex On This Project
Codex should be used iteratively.

### Good Codex Task Examples
- Set up the initial Next.js + Tailwind app structure.
- Build a reusable project-world component with animations.
- Create a premium dark hero section with motion and placeholders for Spline.
- Implement a proof-of-work gallery with modal image previews.
- Add project content from local metadata files.
- Integrate a Spline scene with loading fallback and responsive sizing.
- Refactor the site for accessibility and responsive layout.

### Working Style
Do not try to prompt the whole site in one request.
Work in incremental tasks:
1. layout
2. components
3. content
4. motion
5. 3D
6. polish

---

## Important Messaging / Tone Rules
The website should make Sai look:
- technically strong
- visually sophisticated
- professional
- trustworthy
- detail-oriented
- capable of solving business problems with data

Do not make the copy:
- overly dramatic
- cliché
- buzzword-heavy
- fake or exaggerated

Use clear, credible, premium wording.

---

## Use These Proof Assets In The Site
The build should include and visually integrate the existing proof-of-work assets created earlier.

### Asset Labels
- Wipro Customer Churn Dashboard
- Wipro Churn Prediction Model Workflow
- Kaiser Member Churn & Satisfaction Dashboard
- Kaiser ETL Architecture
- Info Edge OCR & Document Processing Pipeline
- Optional Info Edge Patient Lookup Dashboard

If actual filenames differ, normalize them in the `public/proof/` folder.

---

## Content Positioning For Sai
Use a concise personal positioning statement consistent with this direction:

Sai is a data professional who works across:
- messy multi-source data
- ETL and transformation workflows
- predictive modeling
- dashboarding for stakeholders
- business-focused decision intelligence

Emphasize that he turns complex data into structured, actionable insights.

---

## Stretch Goals (Only After Core Site Works)
Only do these later if the core website is already strong:

- add project-specific transition animations
- add AI assistant / “Ask about my experience” tool
- add story-driven case study pages with richer motion
- add a timeline or journey view
- add ambient audio toggle only if tasteful
- add dynamic cursor light effects
- add deeper 3D scene interactions

---

## Final Quality Bar
Before considering the site finished, verify that it feels:
- premium
- cinematic
- technical
- immersive
- readable
- fast enough
- recruiter-friendly
- portfolio-worthy
- consistent across all sections

This project should look like a strong modern portfolio for a real data professional, not a student template or a random futuristic landing page.

---

## Expected Final Outcome
A deployed GitHub-backed portfolio website that:
- presents Sai’s experience in a high-end immersive format
- includes proof-of-work visuals for Wipro, Info Edge, and Kaiser
- uses modern frontend practices
- features selective 3D depth with Spline
- tells a coherent professional story
- is ready to share with recruiters, hiring managers, and collaborators
