# Overview

KK Financial 2016 is a professional loan consulting web application serving clients in Mumbai, India. The platform provides comprehensive information about various loan products (housing, personal, business, vehicle, education, and loan against property), features an interactive EMI calculator, and enables potential clients to submit consultation requests. The application is designed to establish trust and credibility in the financial services sector while providing a modern, accessible user experience.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The application uses a modern React-based single-page application (SPA) architecture:

- **Framework**: React 18+ with TypeScript for type safety and developer experience
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom design system based on shadcn/ui components
- **State Management**: TanStack Query (React Query) for server state management
- **UI Components**: shadcn/ui component library built on Radix UI primitives

**Design Rationale**: This stack provides a balance of modern developer experience, performance, and maintainability. The component-based architecture allows for reusable UI elements while Tailwind CSS enables rapid styling with a consistent design language. Wouter was chosen over React Router for its minimal bundle size.

## Backend Architecture

The backend follows a simple Express.js REST API pattern:

- **Runtime**: Node.js with Express.js framework
- **Type Safety**: TypeScript with shared types between frontend and backend
- **API Layer**: RESTful endpoints for consultation request submission and retrieval
- **Validation**: Zod schemas for runtime type validation and data integrity
- **Development**: Vite dev server integration for hot module replacement

**Design Rationale**: Express provides a familiar, straightforward API server suitable for this consulting platform's needs. The monorepo structure with shared types ensures type safety across the full stack. Zod validation prevents invalid data from entering the system.

## Data Storage

**Current Implementation**: In-memory storage using Map data structures

**Design Decision**: The application currently uses a simple in-memory storage layer (`MemStorage` class) for consultation requests. This is suitable for development and demonstration but data is lost on server restart.

**Future Migration Path**: The codebase is structured with an `IStorage` interface, making it straightforward to swap to a database implementation (PostgreSQL with Drizzle ORM is configured but not actively used).

**Rationale**: The interface-based design allows the application to function immediately while providing a clear migration path to persistent storage when needed.

## Form Handling & Validation

- **Frontend**: React Hook Form with Zod resolver for client-side validation
- **Backend**: Zod schema validation on API endpoints
- **Shared Schemas**: Type definitions shared between client and server via `shared/schema.ts`

**Design Decision**: This dual-layer validation approach ensures data integrity - the frontend provides immediate user feedback while the backend enforces validation as a security measure. Shared schemas eliminate duplication and ensure consistency.

## Email Notifications

**Current Implementation**: Console-based email service that logs notification details

**Design Decision**: The `EmailService` interface abstracts email sending, with a `ConsoleEmailService` implementation for development. The code includes a placeholder `SMTPEmailService` for production use with nodemailer.

**Rationale**: This allows the application to function without SMTP credentials during development while providing a clear implementation path for production email notifications.

## Design System

The application implements a custom design system following financial services best practices:

- **Color Scheme**: Professional blue/teal primary colors conveying trust and stability
- **Typography**: Inter font family for modern, accessible readability
- **Component Patterns**: Consistent spacing, rounded corners, and shadow patterns
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

**Reference Points**: Design inspired by Stripe's clarity and Wise's approachable trust signals, as documented in `design_guidelines.md`.

## Build & Development

- **Build Tool**: Vite for fast development and optimized production builds
- **Development Mode**: Hot module replacement with integrated backend proxy
- **Production Build**: Optimized client bundle + bundled Node.js server
- **Type Checking**: TypeScript compilation with path aliases for clean imports

**Design Decision**: Vite provides superior developer experience compared to traditional bundlers, with near-instant HMR. The single build configuration handles both client and server builds.

# External Dependencies

## Database (Configured, Not Active)

- **Neon Serverless PostgreSQL**: Cloud-hosted PostgreSQL via `@neondatabase/serverless`
- **Drizzle ORM**: Type-safe database toolkit with schema at `shared/schema.ts`
- **Migration Tool**: Drizzle Kit for schema migrations

**Note**: Database configuration exists but the application currently uses in-memory storage. Database can be activated by implementing the storage interface and running migrations.

## UI Component Libraries

- **Radix UI**: Headless UI components (accordion, dialog, dropdown, etc.)
- **shadcn/ui**: Pre-styled component patterns built on Radix UI
- **Tailwind CSS**: Utility-first CSS framework
- **class-variance-authority**: Type-safe component variant system
- **Lucide React**: Icon library

## Form & Validation

- **React Hook Form**: Performant form state management
- **Zod**: TypeScript-first schema validation
- **@hookform/resolvers**: React Hook Form integration with Zod

## Data Fetching

- **TanStack Query**: Server state management and caching
- **Custom fetch wrapper**: Centralized API request handling in `lib/queryClient.ts`

## Fonts & Icons

- **Google Fonts**: Inter font family via CDN
- **Font Awesome**: Icon library via CDN (used in static HTML assets)

## Development Tools

- **tsx**: TypeScript execution for development server
- **esbuild**: Fast JavaScript bundler for production server build
- **Replit Plugins**: Development banner, runtime error modal, and cartographer for Replit environment

## Email (Placeholder)

- **nodemailer**: SMTP email library (configured but using console logger in development)

**Email Configuration**: The application includes type definitions for nodemailer but currently logs emails to console. Production deployment would require SMTP credentials.