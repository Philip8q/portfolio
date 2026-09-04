# Portfolio Website — Design Document

**Author:** Philip
**Date:** 2026-09-03
**Assignment:** Personal Website Live on the FlyRank Domain
**Inspiration:** [codebucks27/Next.js-Developer-Portfolio-Starter-Code](https://github.com/codebucks27/Next.js-Developer-Portfolio-Starter-Code)
**Status:** Design phase — no code written yet.

---

## 1. Site Map

Two pages, matching the assignment's "one page is enough to start" spirit while giving room for the About page to carry the detailed bio.

```
/ (Home)
├── Hero section (name, tagline, profile image, social links)
├── What I Build (2–3 project cards, inline)
├── What I'm Learning (skills/tech stack)
└── Contact CTA (booking link)

/about (About)
├── Bio / story
├── What I do (skills breakdown)
├── FlyRank internship context
└── Contact CTA (same as home)
```

**Navigation:** Fixed top bar with logo/name on the left, page links on the right, dark/light mode toggle at the far right. Single-click to switch pages. Smooth scroll on Home for section jumps.

---

## 2. Content Plan

### 2.1 Home Page

#### Hero Section
- **Name:** Philip Omondi
- **Tagline:** Developer & Automation Engineer
- **Subline:** "I build AI-driven lead systems and n8n automations that turn inbound interest into actionable pipelines."
- **Profile image:** `public/images/profile/7.jpeg` (real headshot from Philip)
- **Social links:** GitHub (Philip8q), LinkedIn (linkedin.com/in/oketch-omondi/), a small icon row
- **Primary CTA:** "See My Work" → scrolls to projects section
- **Secondary CTA:** "Connect" → mailto link or WhatsApp

#### What I Build (Projects Section)
Three cards, each with: cover image, title, short description, tech tags, link to live demo or GitHub repo.

| # | Title | Description | Tech | Link |
|---|-------|-------------|------|------|
| 1 | **LeadFlow** | AI-driven lead generation & CRM automation — captures, qualifies, and scores business leads using streaming chat and n8n workflows. | Next.js, AI SDK, OpenRouter, n8n, Supabase | [GitHub](https://github.com/Philip8q/leadflow) / [Live](https://leadflow.vercel.app) |
| 2 | **Expense Tracker** | Personal expense tracker with live filtering, dashboard stats, dark mode, and a full accessibility pass. | React, Vite, CSS Modules, Vitest | [Live](https://philip8q.github.io/expense-tracker/) / [GitHub](https://github.com/Philip8q/expense-tracker) |
| 3 | **Weekly Review Assistant** | Personal AI agent that auto-generates a weekly report: what shipped, what's stalled, what to prioritize next. | n8n, Groq, Gemini, GitHub API | [Spec](https://github.com/Philip8q/leadflow/blob/main/docs/ai-fluency/personal-agent/WEEKLY_REVIEW_ASSISTANT_SPEC.md) |

Cards animate in on scroll (Framer Motion). Each card has a subtle hover lift effect.

#### What I'm Learning (Skills Section)
A clean grid or tag cloud of tech/tools, grouped:

| Category | Items |
|----------|-------|
| **Languages** | JavaScript, Python |
| **Frameworks** | Next.js (App Router), React |
| **Automation** | n8n, Docker, Webhooks |
| **AI/ML** | OpenRouter, Groq, Gemini, AI SDK |
| **Databases** | PostgreSQL, Supabase |
| **Tools** | Git, GitHub, Vercel, Netlify |

#### Contact CTA (Footer area)
- "Let's build something together."
- "Email me" → mailto link (caysonb8@gmail.com)
- "WhatsApp" → https://wa.me/254707610964
- Social icon row (GitHub, LinkedIn)

---

### 2.2 About Page

#### Bio / Story
A short narrative (3–4 paragraphs):

> I'm Philip, a developer and automation engineer based in Nairobi. I work at the
> intersection of code and automation — building AI-driven systems that do real work,
> not just demos.
>
> I'm currently a FlyRank intern, where my capstone project is LeadFlow: an AI lead
> qualification system that captures inbound interest, scores it in real time, and
> feeds it into an organized pipeline — all orchestrated through n8n workflows I
> built from scratch.
>
> Before that, I built a personal expense tracker from zero using React and AI-assisted
> development — 17 prompts, a full Vitest suite, and a live deployment on GitHub
> Pages. I also built a Weekly Review Assistant that monitors my own git activity and
> n8n execution logs, then generates an honest "what shipped, what's stalled" report
> every Monday morning.
>
> I learn by building. Every project here is real, tested, and deployed — not a
> tutorial copy.

#### What I Do (Skills Breakdown)
Three columns or cards:

1. **Build AI Systems** — Lead scoring, streaming chat, tool-augmented LLMs
2. **Automate Workflows** — n8n pipelines, webhook integrations, scheduled agents
3. **Ship Web Apps** — Next.js, React, accessible UI, deployment on Vercel/Netlify

#### FlyRank Internship Context
> This site is part of the FlyRank internship program. Once my capstone (LeadFlow)
> is approved, an official FlyRank completion badge will appear here.

#### Contact CTA
Same as Home — email + WhatsApp + social links.

---

## 3. Visual Design

### 3.1 Color Palette

Inspired by the codebucks27 starter's clean, minimal aesthetic. Two themes:

**Light Mode:**
| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#FAF9F6` (warm off-white) | Page background |
| `--bg-secondary` | `#FFFFFF` | Cards, sections |
| `--text-primary` | `#1A1A2E` (near-black) | Headings, body |
| `--text-secondary` | `#6B7280` (gray) | Subtitles, descriptions |
| `--accent` | `#2563EB` (blue) | CTAs, links, active states |
| `--accent-hover` | `#1D4ED8` | Hover states |
| `--border` | `#E5E7EB` | Card borders, dividers |

**Dark Mode:**
| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#0F0F23` (deep navy) | Page background |
| `--bg-secondary` | `#1A1A2E` | Cards, sections |
| `--text-primary` | `#E2E8F0` | Headings, body |
| `--text-secondary` | `#94A3B8` | Subtitles, descriptions |
| `--accent` | `#60A5FA` (light blue) | CTAs, links, active states |
| `--accent-hover` | `#93C5FD` | Hover states |
| `--border` | `#2D2D44` | Card borders, dividers |

### 3.2 Typography

| Element | Font | Weight | Size |
|---------|------|--------|------|
| **Logo/Name** | Inter | 700 | 1.25rem |
| **Nav links** | Inter | 500 | 0.9rem |
| **Hero name** | Inter | 800 | 3.5rem (desktop) / 2.5rem (mobile) |
| **Hero tagline** | Inter | 400 | 1.25rem |
| **Section headings** | Inter | 700 | 2rem |
| **Body text** | Inter | 400 | 1rem |
| **Card title** | Inter | 600 | 1.25rem |
| **Card description** | Inter | 400 | 0.9rem |
| **Tech tags** | Inter | 500 | 0.75rem |

Using `next/font/google` for Inter — no external CSS request.

### 3.3 Layout

- **Max width:** 1200px, centered
- **Padding:** 2rem on sides (desktop), 1rem (mobile)
- **Section spacing:** 5rem between major sections
- **Card grid:** 3 columns (desktop), 2 (tablet), 1 (mobile)
- **Hero:** Full viewport height (100vh), centered content, subtle gradient or pattern background

---

## 4. Component Architecture

Since this uses **Pages Router**, the structure follows `src/pages/`:

```
portfolio/
├── src/
│   ├── pages/
│   │   ├── _app.js            # Theme provider, layout wrapper
│   │   ├── _document.js       # Custom <html> for dark mode (no flash)
│   │   ├── index.js           # Home page
│   │   └── about.js           # About page
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.js      # Fixed nav, logo, links, theme toggle
│   │   │   └── Footer.js      # Contact CTA, social links
│   │   ├── home/
│   │   │   ├── Hero.js        # Name, tagline, profile image, CTAs
│   │   │   ├── ProjectCard.js # Individual project card
│   │   │   ├── ProjectsGrid.js# Grid of ProjectCards
│   │   │   ├── SkillsGrid.js  # Tech/tools grid
│   │   │   └── ContactCTA.js  # Booking + email buttons
│   │   ├── about/
│   │   │   ├── Bio.js         # Story paragraphs
│   │   │   ├── SkillsBreakdown.js # 3-column what-I-do
│   │   │   └── InternshipNote.js  # FlyRank badge placeholder
│   │   └── ui/
│   │       ├── ThemeToggle.js # Sun/moon icon toggle
│   │       ├── AnimatedSection.js # Framer Motion scroll reveal
│   │       └── SocialIcons.js # GitHub, LinkedIn, email icons
│   ├── styles/
│   │   ├── globals.css        # CSS variables, resets, base styles
│   │   └── Home.module.css    # Home page specific styles
│   └── data/
│       ├── projects.js        # Project cards data (title, desc, links, tags)
│       └── skills.js          # Skills data
├── public/
│   ├── images/
│   │   ├── profile/           # Profile photos
│   │   ├── projects/          # Project cover images
│   │   └── svgs/              # Icons, social logos
│   └── favicon.ico
├── next.config.js
├── jsconfig.json
├── package.json
└── tailwind.config.js
```

### Key Libraries

| Library | Version | Purpose |
|---------|---------|---------|
| `next` | ~14 (Pages Router) | Framework — using Pages Router to match the inspiration |
| `react` | 18 | UI |
| `tailwindcss` | 3.x | Styling (matching the inspiration's stack) |
| `framer-motion` | 11.x | Scroll animations, page transitions |
| `@iconify/react` | 4.x | SVG icons (GitHub, LinkedIn, etc.) |

> **Note:** Using Tailwind v3 (not v4) to match the inspiration's setup. The
> portfolio is independent of LeadFlow's v4 stack.

---

## 5. Responsive Behavior

| Breakpoint | Hero | Projects Grid | Nav |
|------------|------|---------------|-----|
| **Desktop** (≥1024px) | Full viewport, centered, 3.5rem name | 3-column grid | Horizontal links + theme toggle |
| **Tablet** (768–1023px) | Full viewport, 3rem name | 2-column grid | Horizontal links, possibly hamburger |
| **Mobile** (<768px) | Full viewport, 2.5rem name, stacked CTAs | 1-column stack | Hamburger menu (slide-in) |

- Profile image: 200px circle on desktop, 150px on mobile
- Cards: horizontal scroll on mobile OR stacked vertical
- Footer: centered, stacked vertically on mobile

---

## 6. Interactions & Animations

| Element | Animation | Library |
|---------|-----------|---------|
| Page sections | Fade-in + slide-up on scroll | Framer Motion `whileInView` |
| Project cards | Staggered entrance (0.1s delay each) | Framer Motion `staggerChildren` |
| Card hover | Subtle lift (translateY -4px) + shadow increase | CSS transition |
| Theme toggle | Sun ↔ moon morph | Framer Motion `AnimatePresence` |
| Nav links | Underline slide-in on hover | CSS pseudo-element |
| CTA buttons | Background color shift on hover | CSS transition |

**Performance:** All animations use `transform` and `opacity` only (GPU-accelerated). No layout-triggering properties.

---

## 7. Dark Mode Implementation

1. **No flash on load:** `_document.js` injects a `<script>` that reads `localStorage.theme` before React hydrates and sets `class="dark"` on `<html>` immediately.
2. **Toggle:** `ThemeToggle.js` reads/writes `localStorage.theme` and toggles the `dark` class on `<html>`.
3. **Tailwind config:** `darkMode: 'class'` — all dark variants use Tailwind's `dark:` prefix.
4. **Default:** Respects `prefers-color-scheme` if no stored preference.

---

## 8. Deployment Plan

### Hosting: Netlify (recommended by FlyRank)

1. **Build command:** `npm run build`
2. **Output directory:** `.next` (or `out` with `next export` for static)
3. **Node version:** 20+
4. **Site name:** `PhilipOmondi` → `philipomondi.netlify.app` (clean, CV-ready)

### Steps
1. Push repo to GitHub
2. Import on Netlify (GitHub integration)
3. Set build settings (auto-detected for Next.js)
4. Rename site to clean URL
5. Verify HTTPS (automatic on Netlify)
6. Test in private window, logged out

### DNS Walkthrough (for the assignment)
To be written after deployment — covers:
- What DNS does (phonebook analogy)
- CNAME records (Netlify's `philipomondi.netlify.app` → their load balancer)
- The full journey: typed URL → resolver → nameserver → record → response
- Written for a non-technical audience

---

## 9. What's NOT in Scope (Yet)

- Blog/articles section (space reserved for future)
- FlyRank completion badge (added after capstone approval)
- Contact form (booking link is enough for now)
- Custom domain (Netlify free URL is the deliverable)
- Analytics (can add later)

---

## 10. Open Questions for Philip

1. ✅ Profile photo — `7.jpeg` provided
2. ✅ LinkedIn — linkedin.com/in/oketch-omondi/
3. ✅ Contact — WhatsApp or email (no Calendly)
4. ✅ Site name — PhilipOmondi → philipomondi.netlify.app
5. **Project images** — do you have screenshots of LeadFlow and Expense Tracker, or should we use placeholders?
6. **WhatsApp number** — what's the full WhatsApp link (wa.me/number format)?

---

*This document is the design blueprint. No code will be written until Philip reviews and approves it.*
