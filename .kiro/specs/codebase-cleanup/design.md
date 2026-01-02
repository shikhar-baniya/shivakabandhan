# Design Document

## Overview

The codebase cleanup design focuses on systematically identifying and removing unnecessary files while preserving essential components for the Indian wedding invitation website. The current codebase contains full-stack application components (Express server, React components, database configurations, authentication systems) that are not needed for a simple single-page website with scroll animations and glassmorphism effects.

## Architecture

### Current State Analysis
- **Server Directory**: Contains Express server, database connections, routes, and authentication
- **Client Directory**: Contains React components and complex frontend architecture
- **Shared Directory**: Contains shared schemas and routes for full-stack communication
- **Dependencies**: Heavy full-stack dependencies including Express, React, database drivers, authentication libraries

### Target State
- **Simple Website Structure**: HTML, CSS, JavaScript files for single-page website
- **Build Tools**: Vite, TypeScript, Tailwind CSS for development and building
- **Animation Libraries**: GSAP or similar for scroll-triggered animations
- **Minimal Dependencies**: Only what's needed for the wedding website features

## Components and Interfaces

### File Classification System

#### Files to Remove
1. **Server-side Files**
   - `server/` directory (Express server, database, routes, authentication)
   - `shared/` directory (API schemas and routes)
   - Database configuration files (`drizzle.config.ts`)

2. **Complex Frontend Files**
   - React components if not needed for simple website
   - Complex state management files
   - API integration files

3. **Unnecessary Dependencies**
   - Express and server-side packages
   - Database drivers (pg, drizzle-orm)
   - Authentication packages (passport, express-session)
   - Complex React ecosystem packages if not needed

#### Files to Preserve
1. **Core Website Files**
   - HTML entry point
   - CSS/SCSS files
   - JavaScript files for animations and interactions
   - Image assets and fonts

2. **Build Configuration**
   - `vite.config.ts` (may need simplification)
   - `tailwind.config.ts`
   - `tsconfig.json`
   - `postcss.config.js`
   - `package.json` (with cleaned dependencies)

3. **Project Files**
   - `.kiro/` directory
   - `attached_assets/` directory
   - `.gitignore`
   - Documentation files

### Dependency Management

#### Dependencies to Remove
- Express ecosystem: `express`, `express-session`, `connect-pg-simple`
- Database: `drizzle-orm`, `drizzle-kit`, `pg`
- Authentication: `passport`, `passport-local`
- Server utilities: `memorystore`, `ws`
- Complex React ecosystem packages (if not needed)

#### Dependencies to Keep
- Build tools: `vite`, `typescript`, `tsx`, `esbuild`
- Styling: `tailwindcss`, `autoprefixer`, `postcss`
- Animation: `framer-motion` (useful for wedding website animations)
- Utilities: `clsx`, `class-variance-authority`
- Date handling: `date-fns` (for wedding date displays)

## Data Models

### Project Structure (Target)
```
/
├── .kiro/                    # Kiro configuration
├── attached_assets/          # Project documentation
├── src/                      # Source files
│   ├── index.html           # Main HTML file
│   ├── styles/              # CSS/SCSS files
│   ├── scripts/             # JavaScript files
│   └── assets/              # Images, fonts, etc.
├── public/                   # Static assets
├── dist/                     # Build output
├── package.json             # Simplified dependencies
├── vite.config.ts           # Build configuration
├── tailwind.config.ts       # Styling configuration
└── tsconfig.json            # TypeScript configuration
```

### Package.json Structure (Target)
```json
{
  "name": "wedding-invitation",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "framer-motion": "^11.18.2",
    "date-fns": "^3.6.0",
    "clsx": "^2.1.1"
  },
  "devDependencies": {
    "vite": "^7.3.0",
    "typescript": "5.6.3",
    "tailwindcss": "^3.4.17",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.47"
  }
}
```

## Error Handling

### File Removal Safety
- Create backup list of removed files
- Verify no critical files are accidentally removed
- Check for hidden dependencies before removing files
- Validate build process works after cleanup

### Dependency Conflicts
- Check for peer dependency issues after removing packages
- Ensure remaining packages are compatible
- Update lock files after dependency changes
- Test build process after each major removal

## Testing Strategy

### Validation Steps
1. **Pre-cleanup Validation**
   - Document current file structure
   - Identify all dependencies and their purposes
   - Create removal plan with safety checks

2. **Incremental Removal**
   - Remove files in logical groups
   - Test build process after each group removal
   - Verify no broken imports or references

3. **Post-cleanup Validation**
   - Ensure build process works correctly
   - Verify all remaining files serve a purpose
   - Test that development server starts properly
   - Confirm no broken references or imports

### Rollback Strategy
- Keep detailed log of all removed files
- Maintain ability to restore files if needed
- Test each removal step before proceeding
- Document any issues encountered during cleanup