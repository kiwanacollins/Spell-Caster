# Implementation Task List: Spell Caster Platform

Generated from: `prd.md`
Date: November 4, 2025

## Relevant Files

### Core Configuration

- `package.json` - Project dependencies and scripts (includes better-auth)
- `next.config.js` - Next.js 15 configuration, image optimization, API routes
- `tailwind.config.ts` - Custom ancient theme configuration with colors, fonts, animations
- `.env.local` - Environment variables for APIs (OpenAI, Stripe, WhatsApp, Messenger, MongoDB, BetterAuth)
- `middleware.ts` - Route protection middleware for authenticated and admin routes
- `tsconfig.json` - TypeScript configuration
- `.copilot-instructions.md` - AI assistant guidelines for the AI instructions ancient mystical design

### App Structure (Next.js 15 App Router)

- `app/layout.tsx` - Root layout with ancient fonts, metadata, providers
- `app/page.tsx` - Landing page with hero, services, testimonials
- `app/globals.css` - Global styles with custom CSS variables for ancient theme
- `app/(auth)/layout.tsx` - Auth pages layout with parchment background and mystical particles
- `app/(auth)/login/page.tsx` - Login page with email/password form and OAuth buttons
- `app/(auth)/register/page.tsx` - Registration page with password strength validation
- `app/(auth)/forgot-password/page.tsx` - Forgot password email submission
- `app/(auth)/reset-password/page.tsx` - Password reset form with token validation
- `app/(dashboard)/layout.tsx` - Dashboard layout with ProtectedRoute wrapper, integrated sidebar and mobile nav
- `app/(dashboard)/dashboard/page.tsx` - User dashboard overview with shadcn Card components, welcome message, quick stats (Active Spells, Consultations, Messages)
- `app/(dashboard)/dashboard/spells/page.tsx` - My Spells page
- `app/(dashboard)/dashboard/messages/page.tsx` - Multi-channel messaging
- `app/(dashboard)/dashboard/consultations/page.tsx` - Consultations calendar
- `app/(dashboard)/dashboard/journal/page.tsx` - Spiritual journal
- `app/(dashboard)/dashboard/progress/page.tsx` - Spiritual progress tracker
- `app/(dashboard)/dashboard/payments/page.tsx` - Payments & billing
- `app/(dashboard)/dashboard/profile/page.tsx` - Profile & settings
- `app/(admin)/layout.tsx` - Admin portal layout with AdminRoute wrapper
- `app/(admin)/admin/page.tsx` - Admin dashboard with stats and quick actions
- `app/(admin)/admin/users/page.tsx` - User management
- `app/(admin)/admin/spells/page.tsx` - Spell management
- `app/(admin)/admin/consultations/page.tsx` - Consultation management
- `app/(admin)/admin/messages/page.tsx` - Multi-channel inbox with AI responses
- `app/(admin)/admin/testimonials/page.tsx` - Testimonial management
- `app/(admin)/admin/payments/page.tsx` - Financial management
- `app/(admin)/admin/analytics/page.tsx` - Analytics dashboard
- `app/(admin)/admin/cms/page.tsx` - Content management
- `app/(admin)/admin/settings/page.tsx` - Admin settings

### API Routes

- `app/api/auth/[...all]/route.ts` - BetterAuth authentication endpoints (handles sign-in, sign-up, sign-out, session)
- `app/api/spells/route.ts` - Spell CRUD operations
- `app/api/spells/[id]/route.ts` - Individual spell operations
- `app/api/consultations/route.ts` - Consultation booking endpoints
- `app/api/messages/route.ts` - In-app messaging
- `app/api/messages/whatsapp/route.ts` - WhatsApp webhook handler
- `app/api/messages/messenger/route.ts` - Messenger webhook handler
- `app/api/payments/route.ts` - Payment processing
- `app/api/payments/webhook/route.ts` - Stripe webhook handler
- `app/api/ai/generate-response/route.ts` - AI response generation
- `app/api/ai/generate-reading/route.ts` - AI tarot/astrology readings
- `app/api/ai/analyze-sentiment/route.ts` - Message sentiment analysis
- `app/api/testimonials/route.ts` - Testimonial operations
- `app/api/users/route.ts` - User management endpoints (list, search, initialize spiritual profile)
- `app/api/users/[id]/route.ts` - Individual user CRUD operations (get, update, delete, admin actions)
- `app/api/users/me/route.ts` - Current user profile endpoint (get own profile, update own profile, generate referral code)
- `app/api/sessions/route.ts` - Session management (get active sessions, login history, statistics, revoke sessions)
- `app/api/services/route.ts` - Service catalog management

### Components (UI)

- `components/ui/button.tsx` - Ancient themed button component
- `components/ui/card.tsx` - Parchment card with weathered edges (NO left borders)
- `components/ui/input.tsx` - Ink-well style input
- `components/ui/dialog.tsx` - Ancient grimoire modal
- `components/ui/select.tsx` - Custom select with ancient styling
- `components/ui/textarea.tsx` - Quill-style textarea
- `components/ui/badge.tsx` - Mystical badge component
- `components/ui/tabs.tsx` - Ancient tome tabs
- `components/ui/calendar.tsx` - Mystical calendar with lunar phases
- `components/ui/progress.tsx` - Energy meter progress bar
- `components/ui/skeleton.tsx` - Ancient-themed loading skeletons with ServiceCardSkeleton and TestimonialSkeleton using MysticalLoader
- `components/ui/mystical-loader.tsx` - Radial gradient pulsing loader component with customizable size and color
- `components/ui/mystical-loader.css` - CSS animation for mystical pulsing effect (scale/opacity)

### Components (Feature-Specific)

- `components/hero-section.tsx` - 3D ancient book hero with particle effects (smoke/mist), mystical styling
- `components/services-grid.tsx` - Service cards grid with all 11 spiritual services, parchment styling, corner decorations (NO left borders)
- `components/services-grid-with-loading.tsx` - Services grid with mystical loading skeleton states
- `components/about-section.tsx` - About section with healer story, philosophy, expertise areas, and portrait image with mystical frame
- `components/testimonials-carousel.tsx` - Auto-rotating carousel with 7 client testimonials, circular avatars, service badges, 5-star ratings, navigation arrows, dot indicators
- `components/testimonials-with-loading.tsx` - Testimonials carousel with ancient-themed loading states
- `components/cta-section.tsx` - "Join the Circle" call-to-action section with mystical background, animated circles, floating orbs, benefit highlights, dual CTA buttons
- `components/rune-observer.tsx` - IntersectionObserver that reveals `.js-rune` elements with glow as they enter viewport
- `components/footer.tsx` - Footer with four-column layout (brand/contact, services, resources, legal), social media icons with glow effects, security badges, parchment-dark.webp background
- `components/dashboard/welcome-section.tsx` - Dashboard welcome header with personalized greeting, Kiwana's message, mystical quotes using shadcn Card and Alert
- `components/dashboard/sacred-offerings.tsx` - Service summary section with category tabs, service cards, energy level indicators, using shadcn Tabs and Card
- `components/dashboard/testimonials-section.tsx` - Dashboard testimonials display with success rate badge, auto-rotating cards, 5-star ratings using shadcn Card and Badge
- `components/dashboard/spell-progress-tracker.tsx` - Active spell status cards with progress bars, ritual schedules, energy reports using shadcn Card, Progress, and Badge
- `components/dashboard/mystical-insights.tsx` - Daily/weekly spiritual guidance with moon phases, astrology insights, ritual suggestions using shadcn Card
- `components/dashboard/contact-support.tsx` - Kiwana contact card with office hours, booking button, quick contact options using shadcn Card and Button
- `components/dashboard/trust-authenticity.tsx` - Credibility badges, experience statement, disclaimers using shadcn Badge and Alert
- `components/energy-reading-widget.tsx` - Reusable Energy Reading Widget with shadcn Progress, 0-100% animated meter, mystical styling, moon phase and chakra balance display, size variants (sm/md/lg)
- `components/quick-stats-cards.tsx` - Reusable QuickStatsCards component displaying stat metrics (Active Spells, Consultations, Messages, Spirit Points), configurable grid layout, animated on mount, optional links to dashboard pages
- `components/recent-activity-feed.tsx` - Reusable RecentActivityFeed component using shadcn ScrollArea and Badge, displays activity timeline with icons, timestamps, and mystical styling, stagger animation on mount
- `components/quick-action-buttons.tsx` - Reusable QuickActionButtons component with shadcn Button, displays default actions (Request Spell, Book Consultation, Message Healer), customizable layout and variant (default/compact)
- `components/spiritual-calendar.tsx` - Reusable SpiritualCalendar component using shadcn Calendar, displays lunar phases, consultation dates, mystical events with moon phase indicators, event details panel, upcoming events list
- `components/spells-page-client.tsx` - Client-side Spells page component with shadcn Select and DropdownMenu for filtering/sorting, displays spell cards with status badges, energy levels, ritual dates, integrated with DetailedSpellView modal
- `components/spell-card.tsx` - Reusable SpellCard component using shadcn Card and Badge, displays individual spells with 3D hover effects, energy levels, lunar phases, healer notes (default/compact/detailed variants)
- `components/detailed-spell-view.tsx` - Detailed spell view modal using shadcn Dialog, displays full spell information with shadcn Accordion for ritual timeline, ingredients, notes, and healer guidance
- `components/ui/accordion.tsx` - Radix UI Accordion wrapper component for displaying collapsible content sections
- `components/ui/scroll-area.tsx` - Radix UI ScrollArea wrapper component with custom mystical styling
- `lib/utils/activity-feed.ts` - Server-side utility for building activity feed data with timestamps, badges, and activity types
- `lib/utils/quick-stats.ts` - Server-side utility for building quick stats data with icon mappings
- `lib/utils/spiritual-calendar.ts` - Server-side utility for lunar phase calculations, calendar event generation, and event filtering
- `lib/utils/spells.ts` - Server-side utility for spell data management, filtering by status/type, sorting, spell type/status labels and colors
- `lib/utils/moon-phases.ts` - Lunar phase calculation utilities, moon phase icons, spiritual timing recommendations
- `lib/utils/testimonials.ts` - Testimonial data management, success rate calculations, rating aggregation
- `components/particles/mystical-particles.tsx` - tsParticles configuration for smoke and mist effects
- `components/auth/protected-route.tsx` - Client-side protected route wrapper with authentication check and mystical loading state
- `components/auth/admin-route.tsx` - Client-side admin-only route wrapper with role verification and forbidden state
- `components/auth/server-protected-route.tsx` - Server Component protected route wrapper with redirect
- `components/auth/server-admin-route.tsx` - Server Component admin-only route wrapper with redirect
- `components/auth/logout-button.tsx` - Reusable logout button component with loading state and mystical messaging
- `components/auth/dashboard-header.tsx` - Dashboard header with user welcome message and logout button
- `components/navigation/dashboard-sidebar.tsx` - Desktop sidebar navigation with ancient tome styling, energy meter, user info, using react-icons
- `components/navigation/mobile-nav.tsx` - Mobile navigation with ancient scroll Sheet component, responsive menu using react-icons
- `components/spell-card.tsx` - Individual spell display card
- `components/spell-request-form.tsx` - Multi-step spell request form
- `components/consultation-calendar.tsx` - Booking calendar with lunar phases
- `components/message-thread.tsx` - Multi-channel message display
- `components/ai-response-generator.tsx` - Admin AI response interface
- `components/energy-meter.tsx` - Animated energy alignment visualization
- `components/badge-unlock-animation.tsx` - 3D badge reveal animation
- `components/payment-checkout.tsx` - Stripe checkout integration
- `components/admin-spell-queue.tsx` - Spell request management
- `components/admin-ai-dashboard.tsx` - AI usage analytics
- `components/navigation/sidebar.tsx` - Dashboard sidebar navigation
- `components/navigation/mobile-menu.tsx` - Ancient scroll mobile menu
- `components/3d/floating-crystals.tsx` - Three.js crystal component
- `components/3d/ritual-circle.tsx` - Rotating pentacle 3D element
- `components/3d/animated-candles.tsx` - 3D candles with flames
- `components/particles/smoke-effect.tsx` - Particle smoke effect
- `components/particles/floating-orbs.tsx` - Spirit orb particles

### Library Files

- `lib/db/mongodb.ts` - MongoDB connection and client
- `lib/db/models/user.ts` - User model schema with spiritual profile, preferences, stats, and extended fields
- `lib/db/models/user-operations.ts` - User database operations (CRUD, energy tracking, badges, stats updates)
- `lib/db/models/session.ts` - Session and login history model schema with device tracking, location tracking, suspicious activity detection
- `lib/db/models/session-operations.ts` - Session database operations (login tracking, active sessions, revocation, statistics)
- `lib/db/models/index.ts` - Barrel export for all database models
- `lib/db/models/spell.ts` - Spell model schema
- `lib/db/models/consultation.ts` - Consultation model schema
- `lib/db/models/message.ts` - Message model schema
- `lib/db/models/payment.ts` - Payment model schema
- `lib/db/models/testimonial.ts` - Testimonial model schema
- `lib/store/message-store.ts` - Zustand store for multi-channel messaging (WhatsApp, Messenger, In-App) with real-time updates
- `lib/store/user-store.ts` - Zustand store for user profile, spiritual progress, energy tracking, badges, and preferences
- `lib/store/spell-queue-store.ts` - Zustand store for admin spell queue management, AI responses, filtering, and bulk operations
- `lib/store/notification-store.ts` - Zustand store for toast notifications with mystical theming and auto-dismiss
- `lib/store/index.ts` - Barrel export for all Zustand stores
- `lib/store/README.md` - Comprehensive state management documentation with usage examples and best practices
- `lib/auth/auth.config.ts` - BetterAuth configuration with MongoDB adapter, email/password, OAuth providers (Google, Apple)
- `lib/auth/session.ts` - Server-side session management utilities (getSession, getCurrentUser, requireAuth, requireAdmin, isAdmin, signOut)
- `lib/auth/client.ts` - Client-side authentication helpers for React components (signIn, signUp, signOut, useSession)
- `lib/auth/hooks.ts` - Client-side authentication hooks (useUser, useRequireAuth, useIsAdmin)
- `lib/auth/index.ts` - Barrel export for all auth utilities
- `lib/auth/README.md` - Authentication system documentation and usage examples
- `lib/payments/stripe.ts` - Stripe client and utilities
- `lib/payments/pricing.ts` - Pricing calculations and management
- `lib/ai/openai.ts` - OpenAI client configuration
- `lib/ai/prompts.ts` - AI prompt templates for different services
- `lib/ai/response-generator.ts` - AI response generation logic
- `lib/ai/reading-generator.ts` - AI tarot/astrology reading generator
- `lib/ai/sentiment-analyzer.ts` - Message sentiment analysis
- `lib/messaging/whatsapp.ts` - WhatsApp Business API client
- `lib/messaging/messenger.ts` - Facebook Messenger API client
- `lib/messaging/unified-inbox.ts` - Multi-channel message aggregation
- `lib/3d/scene-loader.ts` - Three.js scene management
- `lib/animations/particle-system.ts` - tsParticles configuration
- `lib/utils/date.ts` - Date and lunar phase utilities
- `lib/utils/validation.ts` - Form validation helpers
- `lib/utils/formatting.ts` - Text and number formatting
- `lib/hooks/useUser.ts` - User data hook
- `lib/hooks/useSpells.ts` - Spells data hook
- `lib/hooks/useMessages.ts` - Messages data hook
- `lib/hooks/useAI.ts` - AI response generation hook

### Styles

- `styles/fonts.ts` - Ancient font imports (UnifrakturMaguntia, Crimson Text, etc.)
- `styles/textures.css` - Parchment and leather texture classes
- `styles/animations.css` - Custom keyframe animations
- `styles/particles.css` - Particle effect styles

### Testing

- `__tests__/api/spells.test.ts` - Spell API endpoint tests
- `__tests__/api/messages.test.ts` - Messaging API tests
- `__tests__/api/ai-generation.test.ts` - AI generation tests
- `__tests__/components/spell-card.test.tsx` - Spell card component tests
- `__tests__/lib/ai/response-generator.test.ts` - AI response logic tests
- `__tests__/lib/payments/pricing.test.ts` - Pricing calculation tests
- `__tests__/lib/messaging/unified-inbox.test.ts` - Message aggregation tests

### Public Assets

- `public/textures/parchment.webp` - Parchment texture
- `public/textures/leather.webp` - Leather texture
- `public/textures/stone.webp` - Stone texture
- `public/3d/crystals.glb` - 3D crystal models
- `public/3d/candles.glb` - 3D candle models
- `public/3d/ritual-circle.glb` - 3D pentacle model
- `public/sounds/ambient.mp3` - Optional ambient sound
- `public/icons/runes/` - Mystical rune icon set

---

## Tasks

- [✓] 1.0 Project Setup & Infrastructure
  - [✓] 1.1 Initialize Next.js 15 project with TypeScript and App Router
  - [✓] 1.2 Install and configure Tailwind CSS with custom ancient theme (colors, fonts, spacing)
  - [✓] 1.3 Set up MongoDB database connection and create connection utility
  - [✓] 1.4 Configure environment variables (.env.local) for all API keys (OpenAI, Stripe, WhatsApp, Messenger)
  - [✓] 1.5 Install and configure shadcn/ui components library
  - [✓] 1.6 Set up Google Fonts or local font files for ancient fonts (UnifrakturMaguntia, Crimson Text, EB Garamond, etc.)
  - [✓] 1.7 Create project folder structure (app/, components/, lib/, styles/, public/)
  - [✓] 1.8 Configure ESLint and Prettier with project-specific rules
  - [✓] 1.9 Set up Git repository and create .gitignore file
  - [✓] 1.10 Install testing libraries (Jest, React Testing Library)

- [ ] 2.0 Landing Page & Public Pages Implementation
  - [✓] 2.1 Create root layout with ancient font imports and metadata
  - [✓] 2.2 Design and implement hero section with headline and CTA buttons
  - [✓] 2.3 Integrate 3D hero background (An_ancient_book_aged.glb) using Three.js/React Three Fiber
  - [✓] 2.4 Implement particle effects (smoke, mist) using tsParticles
  - [✓] 2.5 Create service cards grid showcasing all spiritual services (Love, Protection, Wealth, Readings, Energy Work, magic rings etc. let the service svgs guide you and use them in the public/icons/services/)
  - [✓] 2.6 Style service cards with parchment texture, hand-drawn borders, NO left curved borders
  - [✓] 2.7 Add spell icons for each service type
  - [✓] 2.8 Implement About section with healer story and philosophy the image on the right side(in public/images/healer-potrait.webp) and text on the left side
  - [✓] 2.9 Create testimonials carousel with rotating client stories along with their images their names are the image names (in public/images/testimonials/) and mystical styling
  - [✓] 2.10 Build Call-to-Action section ("Join the Circle")
  - [✓] 2.11 Design and implement footer with contact info, social icons, security badges
  - [✓] 2.12 Add scroll-triggered animations (runes glow as they enter viewport)
  - [✓] 2.13 Implement mobile responsive design with adaptive animations
  - [✓] 2.14 Add mystical loading states with ancient-themed skeletons


- [ ] 3.0 Authentication & User Management System
  - [✓] 3.1 Install and configure BetterAuth for authentication
  - [✓] 3.2 Create authentication configuration file with providers (email/password, Google, Apple)
  - [✓] 3.3 Build login page with ancient themed form (ink-well inputs)
    - [✓] 3.3 Build login page with ancient themed form (ink-well inputs)
  - [✓] 3.4 Build registration page with password strength validation and mystical indicators
  - [✓] 3.5 Implement forgot password flow with email submission
  - [✓] 3.6 Create password reset page with token validation
  - [✓] 3.7 Build protected route middleware for authenticated pages
  - [✓] 3.8 Implement logout functionality with "Departing the Circle" messaging
  - [✓] 3.9 Create user profile schema with spiritual tracking (energy alignment, badges, levels)
  - [✓] 3.10 Build API endpoints for user CRUD operations
  - [ ] 3.11 Add two-factor authentication (2FA) setup page
  - [✓] 3.12 Create login history tracking and active sessions management
  - [ ] 3.13 Add social login integration (Google, Apple) with account linking
  - [✓] 3.14 Install and configure Zustand for global state management
  - [✓] 3.15 Create message store for multi-channel messaging state
  - [✓] 3.16 Create user store for profile and spiritual progress state
  - [✓] 3.17 Create spell queue store for admin workflow state
  - [✓] 3.18 Create notification store for toast notifications
  - [✓] 3.19 Document state management patterns and best practices

- [ ] 4.0 User Dashboard (Client Portal) Implementation **[Use shadcn/ui components extensively]**
  - [✓] 3.5 Implement forgot password flow with email submission
  - [✓] 3.6 Create password reset page with token validation
  - [✓] 3.7 Build protected route middleware for authenticated pages
  - [✓] 3.8 Implement logout functionality with "Departing the Circle" messaging
  - [✓] 3.9 Create user profile schema with spiritual tracking (energy alignment, badges, levels)
  - [✓] 3.10 Build API endpoints for user CRUD operations
  - [ ] 3.11 Add two-factor authentication (2FA) setup page
  - [✓] 3.12 Create login history tracking and active sessions management
  - [ ] 3.13 Add social login integration (Google, Apple) with account linking
  - [✓] 3.14 Install and configure Zustand for global state management
  - [✓] 3.15 Create message store for multi-channel messaging state
  - [✓] 3.16 Create user store for profile and spiritual progress state
  - [✓] 3.17 Create spell queue store for admin workflow state
  - [✓] 3.18 Create notification store for toast notifications
  - [✓] 3.19 Document state management patterns and best practices
  - [✓] 3.4 Build registration page with mystical validation messages
  - [✓] 3.5 Implement forgot password flow with email reset
  - [✓] 3.6 Create session management utilities and middleware
  - [✓] 3.7 Build protected route wrapper for dashboard pages
  - [✓] 3.8 Implement logout functionality
  - [✓] 3.9 Create user profile schema in MongoDB (name, email, birth date, location, spiritual profile)
  - [✓] 3.10 Build API endpoints for user CRUD operations
  - [ ] 3.11 Implement two-factor authentication (2FA) setup
  - [✓] 3.12 Create login history tracking and active sessions management
  - [ ] 3.13 Add social login integration (Google, Apple) with account linking

- [ ] 4.0 User Dashboard (Client Portal) Implementation **[Use shadcn/ui components extensively]**
  - [✓] 4.1 Create dashboard layout with shadcn Sidebar component and ancient tome styling
  - [ ] 4.2 **Dashboard Overview Redesign** - Implement new spiritual dashboard layout
    - [ ] 4.2.1 Build Welcome & Personal Touch Section
      - [ ] 4.2.1.1 Create welcome header component with personalized greeting "Welcome to the Mystical Portal, [Client Name] ✨"
      - [ ] 4.2.1.2 Add mystical subheader: "Step into your sacred space — where your desires manifest and your energy aligns"
      - [ ] 4.2.1.3 Include spiritual quote using shadcn Alert: "Magic is simply the art of focusing intention. Let us guide your transformation"
      - [ ] 4.2.1.4 Add Kiwana's personal message using shadcn Card with avatar and mystical styling
    - [ ] 4.2.2 Build Service Summary (Sacred Offerings) Section
      - [ ] 4.2.2.1 Create service category tabs using shadcn Tabs (Love & Relationships, Wealth & Business, Protection & Cleansing, Justice & Legal)
      - [ ] 4.2.2.2 Design service cards with shadcn Card showing: Title, short description, Energy Level indicator (moon phases)
      - [ ] 4.2.2.3 Add mystical visuals (crystals, candles, light energy icons) to each service card
      - [ ] 4.2.2.4 Implement "Request Spell / Learn More" buttons with ancient styling
      - [ ] 4.2.2.5 Add energy level badges: 🌕 Full Moon Energy / Medium / Strong using shadcn Badge
    - [ ] 4.2.3 Build Testimonials / Results Section
      - [ ] 4.2.3.1 Create testimonial cards using shadcn Card with client quotes and avatars
      - [ ] 4.2.3.2 Add 5-star rating display with ⭐️ icons
      - [ ] 4.2.3.3 Include "97% Success Rate" badge using shadcn Badge with mystical styling
      - [ ] 4.2.3.4 Implement auto-rotating carousel with fade transitions
      - [ ] 4.2.3.5 Add client names and service types to testimonials
    - [ ] 4.2.4 Build Spell Progress Tracker Section
      - [ ] 4.2.4.1 Create active spell status cards using shadcn Card
      - [ ] 4.2.4.2 Implement progress bar using shadcn Progress (e.g., "60% complete")
      - [ ] 4.2.4.3 Add spell status badges: Pending / In Progress / Completed using shadcn Badge
      - [ ] 4.2.4.4 Display ritual schedule with lunar phase timing
      - [ ] 4.2.4.5 Include brief energy reports for each active spell
    - [ ] 4.2.5 Build Mystical Insights / Guidance Section
      - [ ] 4.2.5.1 Create daily/weekly guidance card using shadcn Card with mystical background
      - [ ] 4.2.5.2 Display moon phase indicator with current phase icon (🌒 🌓 🌔 🌕)
      - [ ] 4.2.5.3 Add personalized spiritual message (e.g., "The winds of change favor those who let go of fear")
      - [ ] 4.2.5.4 Include ritual suggestion (e.g., "Light a white candle and set your intention")
      - [ ] 4.2.5.5 Integrate astrology insights tied to spell timing
    - [ ] 4.2.6 Build Contact & Support Section
      - [ ] 4.2.6.1 Create "Message Kiwana" card using shadcn Card with contact button
      - [ ] 4.2.6.2 Display office hours with mystical styling
      - [ ] 4.2.6.3 Add "Book Consultation" button using shadcn Button with ancient theme
      - [ ] 4.2.6.4 Include quick contact options (email, chat, call)
      - [ ] 4.2.6.5 Show Kiwana's avatar and availability status
    - [ ] 4.2.7 Build Trust & Authenticity Section
      - [ ] 4.2.7.1 Create credibility badges using shadcn Badge (15+ years experience, safe practices, privacy guaranteed)
      - [ ] 4.2.7.2 Add "Ancestral spell work and energy healing" statement
      - [ ] 4.2.7.3 Include "Pure white light energy" promise with mystical icon
      - [ ] 4.2.7.4 Display disclaimers using shadcn Alert: "For spiritual and empowerment purposes only"
      - [ ] 4.2.7.5 Add security badges and trust seals with ancient styling
  - [✓] 4.8 Build My Spells page with shadcn Select, DropdownMenu for filter/sort options (status, type, date)
  - [✓] 4.9 Create Spell Card component using shadcn Card with shadcn Badge for status indicators
  - [✓] 4.10 Implement Detailed Spell View using shadcn Dialog/Sheet with ritual timeline (shadcn Accordion) and healer notes
  - [✓] 4.11 Add Spell History Archive using shadcn Table component with success tracking
  - [ ] 4.12 Build multi-channel Messages page using shadcn Tabs (In-App, WhatsApp, Messenger unified inbox)
  - [ ] 4.13 Implement real-time chat interface with shadcn ScrollArea, Avatar, and Badge for read receipts and typing indicators
  - [ ] 4.14 Add file attachment support using shadcn Input (file type) and voice message recording
  - [ ] 4.15 Create message categories using shadcn Tabs and threading (spell-specific, general, urgent)
  - [ ] 4.16 Build Consultations page with shadcn Calendar component (monthly/weekly/daily views)
  - [ ] 4.17 Implement consultation booking interface using shadcn Calendar, Select, RadioGroup for time slot selection
  - [ ] 4.18 Add pre-consultation questionnaire using shadcn Form components and preparation instructions
  - [ ] 4.19 Create Past Consultations view using shadcn Table with session notes and shadcn Rating component
  - [ ] 4.20 Build Spiritual Journal with shadcn Textarea (rich text editor integration) and mystical styling
  - [ ] 4.21 Implement Manifestation Tracker and Dream Journal using shadcn Card and Form components
  - [ ] 4.22 Add Guided Prompts using shadcn Alert and Card components for daily reflection and moon rituals
  - [ ] 4.23 Create Spiritual Progress page with energy alignment graph using shadcn Chart components
  - [ ] 4.24 Implement Badges & Achievements system using shadcn Badge and Dialog with 3D unlock animations
  - [ ] 4.25 Build Spiritual Level System using shadcn Progress (Novice → Master) with perks display using shadcn Card
  - [ ] 4.26 Create Payments & Billing page using shadcn Table component with transaction history
  - [ ] 4.27 Implement Stripe payment method management using shadcn Card, Button (add/remove cards)
  - [ ] 4.28 Add invoice downloads using shadcn Button and receipt generation
  - [ ] 4.29 Build subscription management interface using shadcn Card, Switch, and Badge for recurring services
  - [ ] 4.30 Create Profile & Settings page using shadcn Form, Input, Textarea for personal information editing
  - [ ] 4.31 Implement notification preferences using shadcn Switch, Checkbox (email, SMS, push, per channel)
  - [ ] 4.32 Add accessibility settings using shadcn Switch (dark mode, font size, reduce motion)
  - [ ] 4.33 Build Referrals & Community section using shadcn Card and Input with unique referral links
  - [ ] 4.34 Create Resources & Learning library using shadcn Card and Accordion for articles and videos
  - [ ] 4.35 Implement responsive mobile menu using shadcn Sheet with ancient scroll motif

- [ ] 5.0 Admin Dashboard (Healer Portal) Implementation **[Use shadcn/ui components extensively]**
  - [ ] 5.1 Create admin layout with enhanced navigation using shadcn Sidebar and permissions check
  - [ ] 5.2 Build Admin Overview page with key metrics dashboard using shadcn Card components
  - [ ] 5.3 Implement real-time activity feed using shadcn ScrollArea, Badge, and Avatar for new requests, messages, bookings
  - [ ] 5.4 Create Quick Stats Cards using shadcn Card (completion rate, satisfaction, revenue, subscriptions)
  - [ ] 5.5 Build Calendar Overview using shadcn Calendar with today's consultations and week view
  - [ ] 5.6 Implement Revenue Snapshot using shadcn Card with earnings breakdown
  - [ ] 5.7 Create User Management page using shadcn Table, Input (search), and Select for searchable directory
  - [ ] 5.8 Build User Profile View (admin) using shadcn Tabs with complete history and shadcn Textarea for internal notes
  - [ ] 5.9 Implement user actions using shadcn DropdownMenu and Dialog (suspend, refund, grant credits, delete account)
  - [ ] 5.10 Add user segmentation using shadcn Badge for tagging (VIP, at-risk, high-engagement)
  - [ ] 5.11 Build bulk user operations using shadcn Checkbox and Command for communication tools
  - [ ] 5.12 Create Spell Management page using shadcn Table with request queue
  - [ ] 5.13 Implement spell status filters using shadcn Select, Tabs and shadcn Badge for priority flags
  - [ ] 5.14 Build Spell Detail View (admin) using shadcn Sheet/Dialog with all user information
  - [ ] 5.15 Create spell action controls using shadcn Button, RadioGroup (accept/decline, update status, add notes)
  - [ ] 5.16 Implement photo/video upload using shadcn Input (file) for ritual progress updates
  - [ ] 5.17 Build Spell Templates system using shadcn Command, Dialog for common requests
  - [ ] 5.18 Add Spell Analytics using shadcn Card and Chart components (completion rate, average time, revenue by type)
  - [ ] 5.19 Implement bulk spell operations using shadcn Checkbox, DropdownMenu (status updates, exports, assignments)
  - [ ] 5.20 Create Consultation Management page using shadcn Calendar with calendar system
  - [ ] 5.21 Implement drag-and-drop rescheduling using shadcn Calendar and color-coded events with shadcn Badge
  - [ ] 5.22 Build consultation detail view using shadcn Sheet with user notes and payment status
  - [ ] 5.23 Add session notes interface using shadcn Textarea with shadcn Switch for visibility toggle
  - [ ] 5.24 Create consultation settings using shadcn Form, Input, Select (types, pricing, buffer time, cancellation policy)
  - [ ] 5.25 Implement consultation analytics using shadcn Card and Chart (bookings, ratings, revenue, no-shows)
  - [ ] 5.26 Build Testimonials Management page using shadcn Table with approval queue
  - [ ] 5.27 Implement testimonial actions using shadcn DropdownMenu (approve, reject, feature, reply publicly)
  - [ ] 5.28 Add testimonial analytics using shadcn Card (average rating, sentiment analysis)
  - [ ] 5.29 Create Payments & Financial Management page using shadcn Card with revenue dashboard
  - [ ] 5.30 Build transaction list using shadcn Table with filtering (shadcn Select) and export capabilities
  - [ ] 5.31 Implement payment actions using shadcn DropdownMenu, Dialog (refunds, resend receipts, mark as paid)
  - [ ] 5.32 Add financial reports generation using shadcn Form, Calendar for custom date ranges, tax documentation
  - [ ] 5.33 Build pricing management interface using shadcn Form, Input for service updates
  - [ ] 5.34 Create discount code and promotional offer management using shadcn Table, Dialog, Form
  - [ ] 5.35 Implement subscription management using shadcn Table, Badge with churn tracking
  - [ ] 5.36 Build Analytics & Insights page using shadcn Card, Tabs with traffic metrics
  - [ ] 5.37 Add user behavior analytics using shadcn Chart components and journey mapping
  - [ ] 5.38 Implement goal tracking using shadcn Progress and conversion funnels
  - [ ] 5.39 Create custom reports builder using shadcn Form, Select with scheduled reports
  - [ ] 5.40 Build CMS interface using shadcn Textarea, Form for service pages and blog articles
  - [ ] 5.41 Add media library using shadcn Card, Dialog with upload (shadcn Input file) and organization tools
  - [ ] 5.42 Implement landing page management using shadcn Tabs with A/B testing
  - [ ] 5.43 Create FAQ and email template management using shadcn Accordion, Textarea
  - [ ] 5.44 Build Settings & Configuration page using shadcn Tabs, Form with business settings
  - [ ] 5.45 Implement notification settings using shadcn Switch and team management using shadcn Table (if applicable)
  - [ ] 5.46 Add integration settings using shadcn Form, Input (Stripe, Calendar APIs, Analytics)
  - [ ] 5.47 Build backup & security management interface using shadcn Card, Button, Alert
  - [ ] 5.48 Create system health monitoring dashboard using shadcn Card, Badge, Progress

- [ ] 6.0 Multi-Channel Messaging Integration (WhatsApp, Messenger, In-App)
  - [ ] 6.1 Set up WhatsApp Business API account and obtain credentials
  - [ ] 6.2 Set up Facebook Messenger Platform API and obtain credentials
  - [ ] 6.3 Create WhatsApp client utility in lib/messaging/whatsapp.ts
  - [ ] 6.4 Create Messenger client utility in lib/messaging/messenger.ts
  - [ ] 6.5 Build unified inbox aggregation system to combine all channels
  - [ ] 6.6 Create message model schema supporting multi-channel metadata
  - [ ] 6.7 Implement webhook handler for WhatsApp incoming messages
  - [ ] 6.8 Implement webhook handler for Messenger incoming messages
  - [ ] 6.9 Build real-time message sync using Socket.io or Pusher
  - [ ] 6.10 Create unified message thread component showing all channels
  - [ ] 6.11 Add channel indicators (icons) for WhatsApp, Messenger, In-App
  - [ ] 6.12 Implement channel switching functionality (continue conversation across platforms)
  - [ ] 6.13 Build WhatsApp-specific features (voice notes, location sharing, business profile)
  - [ ] 6.14 Implement Messenger-specific features (GIFs, stickers, quick replies)
  - [ ] 6.15 Add rich media support (images, documents, audio) for all channels
  - [ ] 6.16 Create channel preference settings for users
  - [ ] 6.17 Implement notification routing per channel (WhatsApp native, Messenger native, push)
  - [ ] 6.18 Build admin multi-channel inbox with channel filters
  - [ ] 6.19 Add conversation history showing channel switches
  - [ ] 6.20 Implement broadcast messaging with channel selection
  - [ ] 6.21 Create message templates system (channel-specific formatting)
  - [ ] 6.22 Add read receipts and online status across all channels
  - [ ] 6.23 Implement Do Not Disturb scheduling synced across channels
  - [ ] 6.24 Build communication analytics per channel
  - [ ] 6.25 Add WhatsApp Business features (labels, quick replies, templates)

- [ ] 7.0 Payment System & Pricing Management
  - [ ] 7.1 Set up Stripe account and obtain API keys
  - [ ] 7.2 Install and configure Stripe SDK
  - [ ] 7.3 Create Stripe client utility in lib/payments/stripe.ts
  - [ ] 7.4 Build payment model schema in MongoDB
  - [ ] 7.5 Implement pricing structure with all service rates (spells, readings, consultations, subscriptions)
  - [ ] 7.6 Create pricing management system in admin dashboard
  - [ ] 7.7 Build checkout API endpoint with Stripe integration
  - [ ] 7.8 Implement payment intent creation for single purchases
  - [ ] 7.9 Add subscription payment setup for recurring services
  - [ ] 7.10 Create Stripe webhook handler for payment events
  - [ ] 7.11 Implement payment confirmation and receipt generation
  - [ ] 7.12 Build payment method management (add/remove cards, set default)
  - [ ] 7.13 Add digital wallet support (Apple Pay, Google Pay)
  - [ ] 7.14 Create invoice generation and download functionality
  - [ ] 7.15 Implement refund processing API and admin interface
  - [ ] 7.16 Build payment history view with filtering
  - [ ] 7.17 Add discount code system (creation, validation, application)
  - [ ] 7.18 Implement bundle pricing calculations
  - [ ] 7.19 Create payment plan support for services over $200
  - [ ] 7.20 Build referral credit system
  - [ ] 7.21 Implement gift card functionality
  - [ ] 7.22 Add first-time client discount (10%) automation
  - [ ] 7.23 Create sliding scale pricing interface (private, case-by-case)
  - [ ] 7.24 Build financial reporting and analytics
  - [ ] 7.25 Implement tax documentation generation
  - [ ] 7.26 Add Stripe Connect for payout tracking (if needed)
  - [ ] 7.27 Create pricing display rules (hide until service selected)
  - [ ] 7.28 Implement dynamic pricing updates without code deployment

- [ ] 8.0 AI Integration & Content Generation System
  - [ ] 8.1 Set up OpenAI API account and obtain API key
  - [ ] 8.2 Install and configure OpenAI SDK
  - [ ] 8.3 Create OpenAI client utility in lib/ai/openai.ts
  - [ ] 8.4 Build prompt templates for different services (spells, readings, guidance)
  - [ ] 8.5 Implement AI response generator utility with context awareness
  - [ ] 8.6 Create AI-powered spell description generator
  - [ ] 8.7 Build tarot card interpretation AI service
  - [ ] 8.8 Implement oracle card reading AI generator
  - [ ] 8.9 Create astrology chart analysis AI system (natal charts, transits)
  - [ ] 8.10 Build numerology calculation and interpretation AI
  - [ ] 8.11 Implement dream interpretation AI analyzer
  - [ ] 8.12 Create personalized spiritual guidance generator using user history
  - [ ] 8.13 Build energy reading generation AI (0-100% alignment with breakdown)
  - [ ] 8.14 Implement spell progress update generator with mystical language
  - [ ] 8.15 Create custom ritual creation AI for unique requests
  - [ ] 8.16 Build manifestation journal insight analyzer
  - [ ] 8.17 Implement consultation prep document generator (admin-only view)
  - [ ] 8.18 Create testimonial draft generator from ratings
  - [ ] 8.19 Build FAQ response AI with context-aware answers
  - [ ] 8.20 Implement email/message enhancement AI (expand brief notes)
  - [ ] 8.21 Create blog content generator for educational articles
  - [ ] 8.22 Build intelligent spell recommendation system
  - [ ] 8.23 Implement real-time sentiment analysis for user messages
  - [ ] 8.24 Create voice message transcription and analysis
  - [ ] 8.25 Build image analysis AI for altar/ritual setup feedback (GPT-4V)
  - [ ] 8.26 Implement predictive spell completion timing AI
  - [ ] 8.27 Create admin AI dashboard with usage analytics
  - [ ] 8.28 Build AI quality review queue for admin approval
  - [ ] 8.29 Implement AI settings interface (toggle features, adjust creativity, customize persona)
  - [ ] 8.30 Add auto-approval rules for trusted AI outputs
  - [ ] 8.31 Create AI cost tracking and budget management
  - [ ] 8.32 Implement AI feedback loop for continuous improvement
  - [ ] 8.33 Build prompt optimization system for token efficiency
  - [ ] 8.34 Add AI-powered multi-channel message generation (WhatsApp/Messenger optimized)
  - [ ] 8.35 Create Smart Reply system (3-5 quick response options)
  - [ ] 8.36 Implement AI response confidence indicator
  - [ ] 8.37 Build channel-specific AI formatting (concise for WhatsApp, rich for Messenger)
  - [ ] 8.38 Add AI conversation summarization feature
  - [ ] 8.39 Implement multi-language support in AI responses
  - [ ] 8.40 Create AI safety filters and quality checks

- [ ] 9.0 3D Effects, Animations & Visual Effects
  - [ ] 9.1 Install Three.js and React Three Fiber
  - [ ] 9.2 Install animation libraries (Framer Motion, GSAP, Anime.js)
  - [ ] 9.3 Install tsParticles for particle effects
  - [ ] 9.4 Create 3D scene loader utility in lib/3d/scene-loader.ts
  - [ ] 9.5 Build floating crystals component (amethyst, quartz, obsidian) with inner glow
  - [ ] 9.6 Create rotating ritual circle component with glowing runes
  - [ ] 9.7 Implement animated 3D candles with flickering flames
  - [ ] 9.8 Build volumetric smoke/mist effects using shader materials
  - [ ] 9.9 Create floating spirit orbs with bloom post-processing
  - [ ] 9.10 Implement ancient grimoire 3D model with page-turning animation
  - [ ] 9.11 Build 3D spell type icons (heart with vines, runed shield, golden coin, etc.)
  - [ ] 9.12 Create particle system configuration for smoke, mist, dust motes
  - [ ] 9.13 Implement scroll-triggered animations (runes glow on viewport entry)
  - [ ] 9.14 Build page transition effects (dissolve with particle dispersion)
  - [ ] 9.15 Create card hover animations (lift and rotate with shadow depth)
  - [ ] 9.16 Implement form submission animations (particle burst, energy ripples)
  - [ ] 9.17 Build badge unlock animation (3D badge materialization with light rays)
  - [ ] 9.18 Create loading states with mystical animations (spinning ritual circle, candle flicker)
  - [ ] 9.19 Implement cursor trail effects (sparkle particles)
  - [ ] 9.20 Build button glow and particle emission on hover
  - [ ] 9.21 Create ink-well fill effect for form inputs
  - [ ] 9.22 Implement checkbox to glowing rune transformation
  - [ ] 9.23 Build parallax scroll effects with foreground/background layers
  - [ ] 9.24 Create ambient background animations (flickering candlelight, rotating constellations)
  - [ ] 9.25 Implement mobile-optimized versions (Spline exports, reduced particles)
  - [ ] 9.26 Add progressive enhancement based on device capabilities
  - [ ] 9.27 Create performance monitoring for animations (FPS tracking)
  - [ ] 9.28 Implement Intersection Observer for off-screen animation pausing
  - [ ] 9.29 Build reduce-motion media query support
  - [ ] 9.30 Add lazy loading for Three.js scenes
  - [ ] 9.31 Optimize 3D models (LOD, texture compression)
  - [ ] 9.32 Create fallback static images for low-end devices
  - [ ] 9.33 Implement GPU acceleration for all animations

- [ ] 10.0 Services & Booking Management
  - [ ] 10.1 Create service catalog data structure with all offerings
  - [ ] 10.2 Build service model schema in MongoDB
  - [ ] 10.3 Implement service API endpoints (CRUD operations)
  - [ ] 10.4 Create service detail pages with pricing reveal on click
  - [ ] 10.5 Build spell request form (multi-step with validation)
  - [ ] 10.6 Implement consultation booking system with calendar integration
  - [ ] 10.7 Add Google Calendar / iCal sync functionality
  - [ ] 10.8 Create availability management for admin
  - [ ] 10.9 Build consultation type configuration (duration, pricing, buffer time)
  - [ ] 10.10 Implement booking confirmation emails
  - [ ] 10.11 Add consultation reminders (24 hours before, 1 hour before)
  - [ ] 10.12 Create rescheduling functionality with 24-hour notice requirement
  - [ ] 10.13 Build cancellation system with refund logic
  - [ ] 10.14 Implement no-show tracking
  - [ ] 10.15 Create spell status workflow (Pending → In Progress → Completed)
  - [ ] 10.16 Build automated status update notifications
  - [ ] 10.17 Implement spell completion request for testimonials
  - [ ] 10.18 Add lunar phase calculation and display
  - [ ] 10.19 Create optimal timing recommendations based on moon phases
  - [ ] 10.20 Build service recommendation engine
  - [ ] 10.21 Implement package deals and bundle pricing logic
  - [ ] 10.22 Create subscription service management
  - [ ] 10.23 Add service usage tracking for analytics
  - [ ] 10.24 Build seasonal pricing adjustments interface
  - [ ] 10.25 Implement service catalog CMS for admin updates

- [ ] 11.0 Testing, Optimization & Deployment
  - [ ] 11.1 Write unit tests for all API endpoints
  - [ ] 11.2 Create component tests for critical UI components
  - [ ] 11.3 Write integration tests for authentication flow
  - [ ] 11.4 Test payment processing with Stripe test mode
  - [ ] 11.5 Test AI generation with various inputs and edge cases
  - [ ] 11.6 Verify multi-channel messaging integration (WhatsApp, Messenger)
  - [ ] 11.7 Test real-time features (messaging, notifications)
  - [ ] 11.8 Perform cross-browser testing (Chrome, Safari, Firefox, Edge)
  - [ ] 11.9 Conduct mobile responsiveness testing on multiple devices
  - [ ] 11.10 Test 3D animations and performance on low-end devices
  - [ ] 11.11 Verify accessibility with screen readers and keyboard navigation
  - [ ] 11.12 Run Lighthouse audits and optimize to 90+ score
  - [ ] 11.13 Optimize images (convert to WebP/AVIF, compress)
  - [ ] 11.14 Compress 3D models and textures (KTX2, Basis Universal)
  - [ ] 11.15 Implement lazy loading for all heavy assets
  - [ ] 11.16 Add service worker for offline functionality
  - [ ] 11.17 Configure caching strategies for static assets
  - [ ] 11.18 Set up monitoring and error tracking (Sentry or similar)
  - [ ] 11.19 Configure production environment variables
  - [ ] 11.20 Set up continuous integration/continuous deployment (CI/CD)
  - [ ] 11.21 Deploy to production hosting (Vercel recommended for Next.js)
  - [ ] 11.22 Configure custom domain and SSL certificate
  - [ ] 11.23 Set up database backups and recovery procedures
  - [ ] 11.24 Configure rate limiting for API endpoints
  - [ ] 11.25 Implement security headers (CSP, HSTS, etc.)
  - [ ] 11.26 Set up analytics (Google Analytics or alternative)
  - [ ] 11.27 Configure webhook endpoints for production (Stripe, WhatsApp, Messenger)
  - [ ] 11.28 Test production deployment thoroughly
  - [ ] 11.29 Create user documentation and help guides
  - [ ] 11.30 Prepare admin training materials
  - [ ] 11.31 Set up ongoing maintenance schedule
  - [ ] 11.32 Create backup and disaster recovery plan

---

## Notes

### Implementation Priority

1. Start with Project Setup & Infrastructure (Task 1.0)
2. Build Authentication system early (Task 3.0) as it's required by both dashboards
3. Implement Landing Page (Task 2.0) for marketing and user acquisition
4. Develop User Dashboard (Task 4.0) before Admin Dashboard to understand user workflows
5. Build Payment System (Task 7.0) early to enable monetization
6. Integrate AI features (Task 8.0) progressively as other features are completed
7. Add 3D effects (Task 9.0) incrementally to avoid overwhelming initial development
8. Testing and optimization (Task 11.0) should be ongoing throughout development, not just at the end

### Key Dependencies

- MongoDB must be configured before building any database models
- BetterAuth must be set up before implementing any protected routes
- Stripe setup is required before payment features can be tested
- OpenAI API access is needed before AI features can be developed
- WhatsApp/Messenger API credentials required before messaging integration
- **shadcn/ui components must be installed and configured** (already done in Task 1.5) before building dashboards

### shadcn/ui Component Usage Guidelines

- **Prioritize shadcn/ui components** for all dashboard UI elements (Tasks 4.0 and 5.0)
- **Customize shadcn components** with ancient theme styling (parchment backgrounds, weathered borders, mystical colors)
- **Never use default shadcn styling** - always apply the ancient aesthetic (UnifrakturMaguntia/Crimson Text fonts, aged textures)
- **Common component mappings:**
  - Data display: Table, Card, Badge, Avatar, ScrollArea
  - Forms: Form, Input, Textarea, Select, Checkbox, RadioGroup, Switch
  - Navigation: Tabs, Sidebar, Command, DropdownMenu, Sheet (mobile menu)
  - Feedback: Dialog, Alert, Toast, Progress
  - Layout: Accordion, Separator, AspectRatio
  - Data visualization: Integrate Chart.js/Recharts with shadcn Card containers
- **Maintain ancient aesthetic** even when using modern UI patterns from shadcn
- **No glassmorphism or modern gradients** - use textured overlays and solid colors instead

### Performance Considerations

- Lazy load all 3D scenes and heavy animations
- Use progressive enhancement for animations based on device capabilities
- Implement service worker for offline support and faster load times
- Compress all images and 3D assets
- Target Lighthouse score of 90+ on mobile devices

### Design Reminders

- **NO left curved borders on cards** - This is "AI slop" design
- Use ancient fonts (UnifrakturMaguntia, Crimson Text, EB Garamond)
- Maintain parchment/leather texture backgrounds throughout
- Ensure all animations feel mystical and organic (smoke, candlelight, not modern glows)
- Keep AI integration completely hidden from users
- All prices hidden until user shows interest in a service
