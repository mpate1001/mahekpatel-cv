# Brutalist Portfolio Redesign

## Overview

Full visual redesign of mahekpatel-cv from dark navy/teal theme to a brutalist, light-background aesthetic with heavy typography, raw borders, and high contrast. Optimized for engineering hiring managers scanning quickly.

## Aesthetic Principles

- **Light background**: warm off-white `#f5f0e8` as the base
- **High contrast**: black `#111` for primary text and borders, red `#C1121F` as the sole accent
- **Heavy typography**: `Arial, Helvetica, sans-serif` explicitly (not `system-ui` — SF Pro is too polished for brutalism) at 900 weight for headlines. No decorative display fonts.
- **Raw borders**: 2-3px solid borders on cards, inputs, tags. No rounded corners (or minimal `2px` max). No shadows, no blur, no gradients.
- **No decorative visualization**: remove all D3 force graphs. Typography and layout ARE the design.
- **Minimal motion**: fade-in on scroll only. No floats, no bouncing, no slide animations. Border color shift on hover (black → red). Brutalism is anti-ornament.

## Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#f5f0e8` | Page background |
| `--bg-alt` | `#e8e3db` | Alternate section background, card backgrounds |
| `--fg` | `#111111` | Primary text, borders |
| `--fg-muted` | `#666666` | Secondary text |
| `--fg-subtle` | `#999999` | Tertiary text (dates, minor labels) |
| `--accent` | `#C1121F` | Red accent — section borders, hover states, active nav, labels |
| `--accent-dark` | `#780000` | Darker red for visited/pressed states |

## Typography

| Element | Font | Weight | Size (desktop) | Transform |
|---------|------|--------|----------------|-----------|
| Hero name | Arial/Helvetica | 900 | 72-96px | None |
| Section numbers | JetBrains Mono | 700 | 14px | Uppercase |
| Section headings | Arial/Helvetica | 900 | 36px | Uppercase |
| Card titles (h3) | Arial/Helvetica | 700 | 20-24px | None |
| Body text | Arial/Helvetica | 400 | 16px | None |
| Labels/tags | JetBrains Mono | 700 | 11-12px | Uppercase |
| Dates/mono | JetBrains Mono | 400 | 13px | None |
| Nav items | Arial/Helvetica | 700 | 13px | Uppercase, letter-spacing 2px |

## Layout

Single-page, single-column stack. Max-width `72rem` centered (keep existing `section-container`).

### Navbar (sticky)

- Solid `--bg` background, no transparency/blur
- `MP.` logo in 900 weight black, left-aligned
- Section links uppercase with 2px letter-spacing, right-aligned
- On scroll: 2px `--fg` bottom border appears
- Mobile: hamburger → full-width dropdown, solid background
- No active-section highlight animation — just color change (black → red)

### Hero

- Full-width, generous vertical padding (120px top, 80px bottom)
- Name: `MAHEK PATEL.` in 72-96px, 900 weight, `--fg` color, letter-spacing -3px
- Stat line: `SOFTWARE ENGINEER · 7+ YEARS BUILDING DATA PLATFORMS AT SCALE` in 14px, `--accent` color, 700 weight, 2px letter-spacing
- 4px `--fg` horizontal rule below
- Two CTA buttons below the rule: `VIEW MY WORK` and `DOWNLOAD RESUME` — bordered (2px `--fg`), uppercase, 700 weight, no fill. On hover: fill `--fg` with white text (or fill `--accent` for resume).

### Section Pattern

Each section follows this structure:
```
[4px left border, alternating --accent / --fg]
  SECTION_NUMBER — SECTION_TITLE    (JetBrains Mono, uppercase, accent or black)
  [content]
[generous bottom margin: 80-100px]
```

Alternating pattern:
- 01 Experience → `--accent` left border
- 02 Projects → `--fg` left border
- 03 Skills → `--accent` left border
- 04 Education → `--fg` left border
- 05 Contact → `--accent` left border

### 01 — Experience

Each role as a bordered block (2px `--fg` border):
- **Title** in 700 weight, `--fg`
- **Company** in `--accent`, 700 weight
- **Dates** in JetBrains Mono, `--fg-subtle`
- **Description bullets** as plain text with `▹` prefix in `--accent`
- **Tech tags** at bottom: JetBrains Mono, 11px, uppercase, 2px `--fg` border, no fill

Roles stack vertically with 16px gap. No timeline line, no dots, no alternating left/right layout.

### 02 — Projects

**Featured projects** as full-width bordered blocks (2px `--fg` border):
- Title in 700 weight, left-aligned
- Type tag (`DS/ML` or `SWE`) and source tag (`PROFESSIONAL` or `ACADEMIC`) as bordered uppercase labels
- Description as body text
- Tech tags row (same style as Experience)
- Link icons (GitHub, Demo, Paper) as bordered square buttons, right side. On hover: border goes `--accent`.

**Non-featured projects** in a 2-column grid of smaller bordered cards:
- Title, description (truncated), top 3 tech tags, link icons
- Same border style, lighter weight

Filter buttons (All / Data Science / Software, All / Professional / Academic):
- Bordered buttons, uppercase, JetBrains Mono
- Active state: filled `--fg` with `--bg` text (or `--accent` fill)

### 03 — Skills

Categories as bold uppercase section headers (`LANGUAGES`, `ML & DATA SCIENCE`, `ENGINEERING`, `TOOLS & DATABASES`).

Skills as bordered pill-style tags:
- 2px border, color-coded by category:
  - Languages: `--fg` border
  - ML/DS: `--accent` border
  - Engineering: `--fg` border
  - Tools: `--fg-muted` border
- No proficiency indicators, no constellation, no interactive hover states

2-column grid for categories on desktop, single column on mobile.

### 04 — Education

Cards with 2px `--fg` border:
- Institution in 700 weight, large
- Degree + field on next line
- Dates in JetBrains Mono
- Highlight tags (same bordered pill style)
- "In Progress" as a `--accent` bordered tag with text `IN PROGRESS` — no pulse animation

### 05 — Contact

Social links as large bordered square blocks (GitHub, LinkedIn, Email) with icon inside. On hover: border → `--accent`, icon → `--accent`.

Email click → clipboard copy (keep existing behavior), toast as a bordered `--accent` block.

Contact form:
- Thick-bordered inputs (2px `--fg`) on `--bg` background
- Labels in uppercase JetBrains Mono
- Submit button: filled `--accent` background, white text, bordered. On hover: darker red.
- Success/error states as bordered blocks (green/red border).

### Footer

- 3px `--fg` top border
- Social icon links (small, bordered) left
- Resume download button center
- Copyright right
- All in one row

### Project Detail Page (`/projects/[slug]`)

Same brutalist treatment:
- Back link with arrow, uppercase
- Title in heavy type
- Type/source tags as bordered labels
- Tech tags row
- Link buttons (GitHub, Demo, Paper) as bordered buttons
- Article content area using existing MDX components, restyled for light background

## Files to Modify

| File | Change |
|------|--------|
| `app/globals.css` | Replace entire theme — new `@theme` tokens, light palette, brutalist utility classes |
| `app/layout.tsx` | Remove Inter font import (use system Arial). Keep JetBrains Mono. Change `<html>` from `className="dark"` to no class. |
| `app/page.tsx` | No structural change — same section component composition |
| `app/loading.tsx` | Restyle for light theme |
| `app/not-found.tsx` | Restyle for light theme |
| `app/projects/[slug]/page.tsx` | Restyle all classes for brutalist light theme |
| `mdx-components.tsx` | Restyle all MDX elements for light background |
| `components/layout/Navbar.tsx` | Rewrite styles: solid bg, thick border on scroll, uppercase links |
| `components/layout/Footer.tsx` | Restyle: thick top border, minimal layout |
| `components/sections/Hero.tsx` | Rewrite: massive name, stat line, bordered CTAs, remove D3 visualization import |
| `components/sections/About.tsx` | Restyle: light theme, bordered photo frame, remove gradient effects |
| `components/sections/Experience.tsx` | Rewrite styles: bordered cards, no timeline, no alternating layout. Remove placeholder data fallback. |
| `components/sections/Projects.tsx` | Restyle: bordered blocks, uppercase labels, bordered filter buttons. Remove placeholder data fallback. |
| `components/sections/Skills.tsx` | Rewrite: bordered tags, category grid, remove SkillConstellation import. Remove placeholder data fallback. |
| `components/sections/Education.tsx` | Restyle: bordered cards, no pulse animation. Remove placeholder data fallback. |
| `components/sections/Contact.tsx` | Restyle: thick-bordered inputs, bordered social blocks |

## Files to Delete

| File | Reason |
|------|--------|
| `components/visualizations/HeroVisualization.tsx` | D3 force graph removed |
| `components/visualizations/SkillConstellation.tsx` | D3 constellation removed |

After deletion, remove the `components/visualizations/` directory if empty.

## Files Unchanged

- `content/data/*.ts` — all content data stays as-is
- `lib/utils.ts` — `cn()` utility stays
- `next.config.ts` — MDX config stays
- `public/` — all assets stay (images, resume, SVGs)
- `package.json` — D3 dependency can be removed since visualizations are deleted

## Motion Budget

| Interaction | Animation |
|-------------|-----------|
| Section enter viewport | `opacity: 0 → 1`, 400ms ease-out. No Y translation. |
| Card hover | Border color `--fg → --accent`, 150ms. No scale, no shadow. |
| Button hover | Background fill transition, 150ms. |
| Nav scroll state | Border-bottom appears, 200ms. |
| Mobile menu | Height expand, 200ms. No fade. |
| Email copy toast | Opacity in/out, 300ms. |

Everything else: no animation. Remove `animate-float`, `animate-delay-*`, `slideUp`, `fadeIn` keyframes.

## Responsive Behavior

- **Desktop (1024px+)**: full max-width container, 2-column skill grid, 2-column non-featured project grid
- **Tablet (640-1023px)**: slightly reduced heading sizes, single-column project grid
- **Mobile (<640px)**: single column everything, hamburger nav, reduced padding, hero name scales to ~48px

## Accessibility Notes

- Light background with `#111` text = excellent contrast ratio (~15:1)
- Red accent `#C1121F` on `#f5f0e8` = ~5.5:1 (passes AA for normal text, AAA for large)
- Keep all existing `aria-label` attributes
- Form labels remain associated with inputs
- No information conveyed by color alone (tags have text labels)
