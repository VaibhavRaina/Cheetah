# Vetra Information

## Summary
Vetra is an AI-powered marketing automation platform that transforms marketing workflows. It offers a sleek interface for managing marketing campaigns, content generation, and performance analytics, built with modern web technologies.

## Structure
- **src/app**: Next.js application routes and pages
  - **(marketing)**: Marketing-related pages (home, pricing, about, etc.)
  - **dashboard**: User dashboard interface
- **src/components**: Reusable UI components
  - **global**: Site-wide components
  - **marketing**: Marketing-specific components
  - **ui**: Base UI components (likely shadcn/ui)
- **src/constants**: Application constants and configuration
- **src/hooks**: Custom React hooks
- **src/lib**: Utility libraries
- **src/styles**: Global styling
- **src/utils**: Helper functions
- **public**: Static assets (images, icons, fonts)

## Language & Runtime
**Language**: TypeScript
**Version**: TypeScript 5
**Framework**: Next.js 15.1.4
**React Version**: 19.0.0
**Build System**: Next.js build system
**Package Manager**: Supports npm, yarn, and pnpm (recommended in docs)

## Dependencies
**Main Dependencies**:
- **Next.js 15**: React framework for production
- **React 19**: UI library
- **TailwindCSS**: Utility-first CSS framework
- **Shadcn UI**: Component system (via Radix UI primitives)
- **Framer Motion**: Animation library
- **Zod**: TypeScript-first schema validation
- **React Hook Form**: Form handling
- **Recharts**: Charting library
- **Number Flow**: Smooth number animations

**Development Dependencies**:
- **ESLint**: Code linting
- **TypeScript**: Static type checking
- **PostCSS**: CSS processing
- **TailwindCSS**: CSS framework

## Build & Installation
```bash
# Install dependencies
pnpm install
# or
yarn install
# or
npm install

# Development server
pnpm run dev
# or
yarn dev
# or
npm run dev

# Production build
pnpm run build
# or
yarn build
# or
npm run build

# Start production server
pnpm start
# or
yarn start
# or
npm start
```

## Environment Variables
Required environment variables:
```
NEXT_PUBLIC_APP_URL=your_app_url
```

## Project Configuration
**TypeScript Config**: Standard Next.js TypeScript configuration with path aliases (@/* for src/*)
**Next.js Config**: 
- ESLint ignored during builds
- Remote image patterns configured for Unsplash
**Tailwind Config**: 
- Custom color scheme with light/dark mode support
- Custom animations and keyframes
- Custom font families

## Application Structure
**Routing**: Next.js App Router with two main sections:
- Marketing routes: Public-facing pages (/, /pricing, /about, etc.)
- Dashboard routes: Authenticated user dashboard

**Component Organization**:
- Global components: Site-wide UI elements
- Marketing components: Public-facing UI elements
- UI components: Base component library (shadcn/ui)

**Styling**: 
- TailwindCSS for utility-based styling
- Global CSS variables for theming
- Custom animations for interactive elements