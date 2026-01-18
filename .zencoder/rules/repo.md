---
description: Repository Information Overview
alwaysApply: true
---

# Indie-Tunes Information

## Summary
Indie-Tunes is a full-stack web application for managing and playing music. It features a React-based frontend with an Express backend, PostgreSQL database integration with Drizzle ORM, and user authentication via Passport.js. The application is styled with Tailwind CSS and Shadcn UI components, deployed on Netlify.

## Structure

### Main Directories
- **client/**: React TypeScript single-page application (SPA) - user interface with components, hooks, and pages
- **server/**: Express.js backend - API routes, middleware, and server logic
- **shared/**: Shared TypeScript code - types, schemas, and route definitions used by both client and server
- **script/**: Build scripts - esbuild and Vite configuration for production bundling
- **public/**: Built static assets and index.html served by the backend
- **attached_assets/**: Sample audio files (music.mp3, music.m4a)

### Project Type
Monorepo with integrated frontend and backend (not a monorepo with separate packages, but a unified full-stack application)

## Language & Runtime

**Language**: TypeScript 5.6.3  
**Runtime**: Node.js (modern, ESNext modules)  
**Build System**: Vite 7.3.0 (frontend) + esbuild 0.25.0 (server bundling)  
**Package Manager**: npm  
**Database**: PostgreSQL with Drizzle ORM 0.39.3

## Dependencies

### Main Frontend Dependencies
- **React**: 18.3.1 - UI library
- **React DOM**: 18.3.1 - React rendering
- **Vite**: 7.3.0 - Development and build server
- **Tailwind CSS**: 3.4.17 - Utility-first CSS
- **Radix UI**: Complete component library (@radix-ui/react-* packages)
- **Shadcn UI**: UI component system (components.json configured)
- **React Query**: 5.60.5 - Server state management
- **React Hook Form**: 7.55.0 - Form state management
- **Zod**: 3.24.2 - Schema validation
- **Framer Motion**: 11.18.2 - Animation library
- **Wouter**: 3.3.5 - Lightweight router
- **Recharts**: 2.15.2 - Chart library

### Backend & Database Dependencies
- **Express**: 4.21.2 - HTTP server
- **Drizzle ORM**: 0.39.3 - SQL ORM
- **Drizzle-Zod**: 0.7.0 - Schema validation bridge
- **PostgreSQL**: pg 8.16.3 - Database driver
- **Passport**: 0.7.0 - Authentication middleware
- **Passport-Local**: 1.0.0 - Local authentication strategy
- **Express-Session**: 1.18.1 - Session management
- **Connect-PG-Simple**: 10.0.0 - PostgreSQL session store
- **WebSocket**: ws 8.18.0 - Real-time communication

### Development Dependencies
- **TypeScript**: 5.6.3 - Type checking
- **tsx**: 4.20.5 - TypeScript execution for Node.js
- **Tailwind CSS Vite**: 4.1.18 - Vite plugin for Tailwind
- **Vite React**: 4.7.0 - Vite plugin for React
- **esbuild**: 0.25.0 - JavaScript bundler
- **PostCSS**: 8.4.47 - CSS transformation
- **Drizzle Kit**: 0.31.8 - Database schema management

## Build & Installation

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Starts development server running `tsx server/index.ts` with `NODE_ENV=development`

### Production Build
```bash
npm run build
```
- Builds React frontend with Vite (outputs to `public/`)
- Bundles Express server with esbuild (outputs to `dist/index.cjs`)
- Minifies and bundles only whitelisted dependencies to reduce cold start

### Production Start
```bash
npm start
```
Runs `NODE_ENV=production node dist/index.cjs` on port 5000

### Type Checking
```bash
npm run check
```
TypeScript compilation check without emitting

### Database Migration
```bash
npm run db:push
```
Runs Drizzle Kit to push schema changes to PostgreSQL

## Deployment

**Platform**: Netlify  
**Build Command**: `npm run build`  
**Publish Directory**: `public/`  
**Single Page App Routing**: Configured with wildcard redirects to `/index.html`

## Main Entry Points

- **Frontend**: `client/src/main.tsx` - React DOM render entry point
- **Backend**: `server/index.ts` - Express server initialization and route registration
- **Routes**: `server/routes.ts` - API endpoint definitions
- **Static**: `server/static.ts` - Static file serving configuration
- **Vite Setup**: `server/vite.ts` - Development Vite middleware setup

## Configuration Files

- **TypeScript**: `tsconfig.json` - Compiler options, path aliases for `@/*` and `@shared/*`
- **Vite**: `vite.config.ts` - Vite build and dev server configuration
- **Tailwind**: `tailwind.config.ts` - Tailwind theming, dark mode, custom colors
- **Shadcn UI**: `components.json` - Component library configuration and aliases
- **PostCSS**: `postcss.config.js` - CSS processing pipeline
- **Netlify**: `netlify.toml` - Deployment configuration
- **Replit**: `.replit` - Replit environment configuration

## API & Data Architecture

- **Shared Routes**: `shared/routes.ts` - Type-safe route definitions
- **Shared Schema**: `shared/schema.ts` - Zod schemas for request/response validation
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Authentication**: Passport.js with local strategy and session management
- **Real-time**: WebSocket support via `ws` library for bidirectional communication
