export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  type: "ds-ml" | "software";
  source: "professional" | "academic";
  featured: boolean;
  technologies: string[];
  image?: string;
  github?: string;
  demo?: string;
  paper?: string;
}

export const projects: Project[] = [
  {
    id: "wedding-rsvp-analytics",
    slug: "wedding-rsvp-analytics",
    title: "Wedding RSVP Analytics Dashboard",
    description:
      "Real-time analytics dashboard for tracking wedding RSVPs with automated data scraping from Zola.com.",
    longDescription:
      "Built to solve Zola.com's lack of robust RSVP tracking and analytics. Features a Playwright-based web scraper that extracts guest data daily via GitHub Actions, storing results and deploying a React dashboard with summary cards, pie charts showing bride vs groom split, searchable guest tables, and filters by relationship/RSVP status.",
    type: "software",
    source: "professional",
    featured: true,
    technologies: [
      "Python",
      "Playwright",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "GitHub Actions",
      "Vite",
    ],
    github: "https://github.com/mpate1001/MikeMetSaumOneWeddin2026",
    demo: "https://dashboard.mikemetsaumone.com",
  },
  {
    id: "crime-lens-charlotte",
    slug: "crime-lens-charlotte",
    title: "Crime Lens of Charlotte",
    description:
      "Interactive D3.js visualization dashboard exploring crime patterns and trends in Charlotte, NC.",
    longDescription:
      "Built for DATA 760 - Visualization & Communication at UNC. Features an interactive Leaflet map with ZIP code boundaries, temporal crime trends (2017-2023), stacked bar charts for crime hotspots, and a zoomable treemap for crime type hierarchies. Includes cross-visualization filtering, spatial join analysis, and automated data updates via GitHub Actions.",
    type: "ds-ml",
    source: "academic",
    featured: true,
    technologies: [
      "D3.js",
      "Leaflet",
      "JavaScript",
      "HTML/CSS",
      "Python",
      "GitHub Actions",
    ],
    github: "https://github.com/mpate1001/crime-lens-of-charlotte",
    demo: "https://mpate1001.github.io/crime-lens-of-charlotte/",
  },
  {
    id: "portable-predictions",
    slug: "portable-predictions",
    title: "Portable Predictions",
    description:
      "ML-powered Streamlit app for predicting California housing prices with crime data integration and model interpretability.",
    longDescription:
      "A housing price prediction app that combines multiple ML models (Linear, Ridge, Random Forest, XGBoost) with crime data to provide safety-aware investment recommendations. Features SHAP-based model interpretability, ZIP code safety metrics visualization, and an investment recommendation score. Deployed on Streamlit Cloud.",
    type: "ds-ml",
    source: "academic",
    featured: true,
    technologies: [
      "Python",
      "Streamlit",
      "Scikit-learn",
      "XGBoost",
      "SHAP",
      "Pandas",
    ],
    github: "https://github.com/mpate1001/portable_predictions",
    demo: "https://portablepredictions.streamlit.app/",
  },
  {
    id: "seat-finder",
    slug: "seat-finder",
    title: "Wedding Seat Finder",
    description:
      "Mobile-friendly seat lookup app with QR code scanning and real-time Google Sheets integration.",
    longDescription:
      "A streamlined guest experience app for wedding check-ins. Guests scan a QR code, search their name with fuzzy matching, and instantly see their table assignment with a personalized message. Features real-time sync with Google Sheets, unique guest identification for common names, and an animated table display. Mobile-first design optimized for high throughput during reception check-ins.",
    type: "software",
    source: "professional",
    featured: false,
    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "Google Sheets API",
      "CSS",
    ],
    github: "https://github.com/mpate1001/Seat-Finder",
    demo: "https://seats.mikemetsaumone.com/",
  },
  {
    id: "wedding-photo-queue",
    slug: "wedding-photo-queue",
    title: "Wedding Photo Queue Manager",
    description:
      "Event management app with bulk SMS, WhatsApp, and email notifications for coordinating group photos.",
    longDescription:
      "Password-protected dashboard for event planners to manage group photo queuing. Features real-time group tracking from Google Sheets, triple notification redundancy (SMS + WhatsApp + Email via Twilio and SendGrid), bulk operations with checkbox selection, and persistent status tracking. Includes test mode for simulation without using credits.",
    type: "software",
    source: "professional",
    featured: false,
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Twilio",
      "SendGrid",
      "Vercel",
    ],
    github: "https://github.com/mpate1001/Wedding-Photo-Queue",
    demo: "https://photos.mikemetsaumone.com",
  },
  {
    id: "us-income-poverty-trends",
    slug: "us-income-poverty-trends",
    title: "U.S. Income vs Poverty Trends",
    description:
      "Interactive D3.js visualization exploring the relationship between income, poverty, and education across U.S. states (2010-2023).",
    longDescription:
      "Built for DATA 760 at UNC. An animated scatterplot showing how median household income correlates with poverty rates using ACS 5-Year Estimates. Features a year slider with play animation, dynamic size encoding (poverty rate or education %), state-level hover tooltips, and live data fetching from the U.S. Census Bureau API.",
    type: "ds-ml",
    source: "academic",
    featured: false,
    technologies: [
      "D3.js",
      "JavaScript",
      "HTML/CSS",
      "Census API",
    ],
    github: "https://github.com/mpate1001/us-income-poverty-trends",
    demo: "https://mpate1001.github.io/us-income-poverty-trends/",
  },
];
