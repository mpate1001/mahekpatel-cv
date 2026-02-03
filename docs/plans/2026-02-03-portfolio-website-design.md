# Portfolio Website Design

Personal CV and portfolio website for Mahek Patel - Software Engineer pursuing MSDS at UNC Chapel Hill.

## Goals

- Job hunting: Impress recruiters for Data Scientist / ML Engineer / SWE with ML focus roles
- Professional networking: Establish online presence
- Project showcase: Highlight technical work in depth
- Personal brand: Express unique identity bridging SWE and Data Science

## Target Audience

- Recruiters and hiring managers for DS/ML and SWE roles
- Professional peers in data science and software engineering
- Potential collaborators

## Site Structure

Single-page with smooth scroll navigation + dedicated project detail pages.

### Sections (in order)

1. **Hero** - Bold introduction with animated data visualization
2. **About** - Personal bio with photo and quick stats
3. **Experience** - Interactive career timeline
4. **Projects** - Featured case studies + filterable project grid
5. **Skills** - Interactive skill constellation
6. **Education** - UNC Chapel Hill MSDS + undergraduate
7. **Contact** - Links, form, and resume download
8. **Footer** - Resume button, social links, credits

### Navigation

- Sticky top nav highlighting current section on scroll
- Hamburger menu on mobile
- Smooth scroll to sections

## Visual Design

### Style

- Bold and modern with data-driven aesthetic
- Dark theme as default with light mode toggle
- Vibrant accent colors (electric blue or teal) against dark backgrounds

### Typography

- Large, bold headings
- Clean readable body text
- Monospace accents for technical elements

## Section Details

### Hero

- Full viewport height
- Name displayed large on left
- Animated D3.js visualization on right (options):
  - Force-directed graph showing skill connections
  - Particles flowing between "Engineering" and "Data Science" nodes
  - Dynamic scatter plot of projects sized by impact
- Rotating tagline: "Software Engineer → Data Scientist"
- CTA buttons: "View my work" and "Download resume"
- Animation responds subtly to mouse movement
- Graceful degradation on slower devices

### About

- Two-column layout (photo left, bio right) - stacks on mobile
- Professional headshot with subtle data-themed frame
- 2-3 paragraphs: current focus, professional identity, what drives you
- Animated stats: "7+ years building software", "MSDS @ UNC Chapel Hill"
- Social links row (GitHub, LinkedIn, email)

### Experience

- Vertical timeline with entries alternating left/right
- Central line styled as a data axis
- Each entry:
  - Company name and logo
  - Title and date range
  - 2-3 impact-focused bullet points
  - Tech stack tags
- Scroll-triggered animations
- Hover/click expands entries for more detail
- Visual progression: later roles = larger cards
- Flows naturally into Education (masters as latest chapter)

### Projects

#### Part A: Featured Case Studies (2-3 projects)

Large prominent cards showing:
- Title and one-line description
- Eye-catching thumbnail or custom visualization
- Tags: DS/ML vs SWE, Academic vs Professional
- Link to dedicated case study page

#### Part B: Project Grid

Responsive grid of smaller cards:
- Title, brief description, tech stack tags
- Links to GitHub/demo/notebook
- Color-coded by project type

#### Filtering

Toggle buttons to filter by:
- Type: All | Data Science | Software Engineering
- Source: All | Professional | Academic

#### Case Study Pages (`/projects/[slug]`)

- Problem and context
- Approach and methodology
- Technical implementation details
- Results and impact with visualizations
- Embedded demos, notebooks, or live previews
- Links to code/paper

### Skills

Interactive constellation visualization (force-directed graph):
- Skills as nodes grouped by category
- Categories: Languages, ML/DS, Engineering, Tools
- Connecting lines show relationships
- Hover highlights related skills
- Fallback: clean categorized list for accessibility

### Education

- Cards stacked vertically
- Current masters emphasized at top:
  - UNC Chapel Hill logo
  - "Master of Science in Data Science"
  - Expected graduation date
  - Relevant coursework highlights
  - "In Progress" status indicator
- Undergraduate card below
- Optional certifications row
- Small timeline visual connecting undergrad → work → masters

### Contact

- Direct links row: Email, LinkedIn, GitHub (large tap targets)
- Simple contact form: Name, Email, Message, Submit
- Form submissions via Formspree or serverless function
- Subtle animated background (low-opacity node graph)
- Friendly intro line above form
- Prominent "Download Resume" button

## Technical Architecture

### Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Visualizations**: D3.js wrapped in React components
- **Content**: MDX for case studies, JSON/TS for structured data
- **Resume**: Static PDF in `/public`

### Performance

- Static Site Generation (SSG) for all pages
- Lazy-load D3 visualizations (only when in viewport)
- Next.js `<Image>` component for optimization
- Code splitting per route
- Target: 90+ Lighthouse score

### Responsive Design

- Mobile-first approach
- Breakpoints: mobile → tablet → desktop
- Visualizations simplify on small screens
- Timeline stacks vertically on mobile
- Grid adjusts column count

### Deployment

- Host: Vercel
- Auto-deploy from `main` branch
- Preview deployments for pull requests
- Custom domain setup

## File Structure (Proposed)

```
mahekpatel-cv/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── projects/
│       └── [slug]/
│           └── page.tsx
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Experience.tsx
│   │   ├── Projects.tsx
│   │   ├── Skills.tsx
│   │   ├── Education.tsx
│   │   └── Contact.tsx
│   └── visualizations/
│       ├── HeroVisualization.tsx
│       ├── SkillConstellation.tsx
│       └── Timeline.tsx
├── content/
│   ├── projects/
│   │   ├── project-one.mdx
│   │   └── project-two.mdx
│   └── data/
│       ├── experience.ts
│       ├── skills.ts
│       └── education.ts
├── lib/
│   └── utils.ts
├── public/
│   ├── images/
│   ├── resume.pdf
│   └── favicon.ico
├── docs/
│   └── plans/
└── package.json
```

## Success Criteria

- Site loads fast (< 3s on 3G)
- All sections render correctly on mobile and desktop
- Visualizations are interactive and performant
- Projects are easy to browse and filter
- Contact form works reliably
- Resume is easily downloadable
- Site ranks well for "Mahek Patel" searches (SEO)
- Lighthouse score 90+ across all metrics

## Out of Scope (for initial version)

- Blog/writing section
- CMS integration
- Analytics dashboard
- Multi-language support
- Commenting system
