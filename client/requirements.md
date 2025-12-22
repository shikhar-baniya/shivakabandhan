## Packages
framer-motion | Essential for immersive scroll-triggered animations and page transitions
lucide-react | Icon library (already in base, but emphasizing use)
clsx | Utility for constructing className strings conditionally
tailwind-merge | Utility to merge Tailwind classes without conflicts

## Notes
Tailwind Config - extend fontFamily:
fontFamily: {
  serif: ["'Cinzel'", "serif"],
  sans: ["'Lato'", "sans-serif"],
  script: ["'Great Vibes'", "cursive"],
}
The website is a single-page scrolling application.
Images will use Unsplash placeholders that match the spiritual/wedding theme.
The RSVP form connects to POST /api/rsvps.
Glassmorphism effects require backdrop-filter support.
