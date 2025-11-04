# Implementation Task List: Spell Caster Platform

Generated from: `prd.md`
Date: November 4, 2025

## Relevant Files

### Core Configuration

- `package.json` - Project dependencies and scripts
- `next.config.js` - Next.js 15 configuration, image optimization, API routes
- `tailwind.config.ts` - Custom ancient theme configuration with colors, fonts, animations
- `.env.local` - Environment variables for APIs (OpenAI, Stripe, WhatsApp, Messenger, MongoDB)
- `tsconfig.json` - TypeScript configuration
- `.copilot-instructions.md` - AI assistant guidelines for the AI instructions ancient mystical design

### App Structure (Next.js 15 App Router)

- `app/layout.tsx` - Root layout with ancient fonts, metadata, providers
- `app/page.tsx` - Landing page with hero, services, testimonials
- `app/globals.css` - Global styles with custom CSS variables for ancient theme
- `app/(auth)/login/page.tsx` - Login page
- `app/(auth)/register/page.tsx` - Registration page
- `app/(dashboard)/dashboard/page.tsx` - User dashboard overview
- `app/(dashboard)/dashboard/spells/page.tsx` - My Spells page
- `app/(dashboard)/dashboard/messages/page.tsx` - Multi-channel messaging
- `app/(dashboard)/dashboard/consultations/page.tsx` - Consultations calendar
- `app/(dashboard)/dashboard/journal/page.tsx` - Spiritual journal
- `app/(dashboard)/dashboard/progress/page.tsx` - Spiritual progress tracker
- `app/(dashboard)/dashboard/payments/page.tsx` - Payments & billing
- `app/(dashboard)/dashboard/profile/page.tsx` - Profile & settings
- `app/(admin)/admin/page.tsx` - Admin dashboard overview
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

- `app/api/auth/[...betterauth]/route.ts` - BetterAuth authentication endpoints
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
- `app/api/users/route.ts` - User management endpoints
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

### Components (Feature-Specific)

- `components/hero-section.tsx` - 3D animated hero with crystals and candles
- `components/services-grid.tsx` - Service cards with 3D icons
- `components/testimonials-carousel.tsx` - Rotating testimonials
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
- `lib/db/models/user.ts` - User model schema
- `lib/db/models/spell.ts` - Spell model schema
- `lib/db/models/consultation.ts` - Consultation model schema
- `lib/db/models/message.ts` - Message model schema
- `lib/db/models/payment.ts` - Payment model schema
- `lib/db/models/testimonial.ts` - Testimonial model schema
- `lib/auth/auth.config.ts` - BetterAuth configuration
- `lib/auth/session.ts` - Session management utilities
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
  - [ ] 1.10 Install testing libraries (Jest, React Testing Library)

- [ ] 2.0 Landing Page & Public Pages Implementation
  - [ ] 2.1 Create root layout with ancient font imports and metadata
  - [ ] 2.2 Design and implement hero section with headline and CTA buttons
  - [ ] 2.3 Integrate 3D hero background (floating crystals, candles, ritual circle) using Three.js/React Three Fiber
  - [ ] 2.4 Implement particle effects (smoke, mist, floating orbs) using tsParticles
  - [ ] 2.5 Create service cards grid showcasing all spiritual services (Love, Protection, Wealth, Readings, Energy Work, etc.)
  - [ ] 2.6 Style service cards with parchment texture, hand-drawn borders, NO left curved borders
  - [ ] 2.7 Add 3D animated spell icons for each service type
  - [ ] 2.8 Implement About section with healer story and philosophy
  - [ ] 2.9 Create testimonials carousel with rotating client stories
  - [ ] 2.10 Build Call-to-Action section ("Join the Circle")
  - [ ] 2.11 Design and implement footer with contact info, social icons, security badges
  - [ ] 2.12 Add scroll-triggered animations (runes glow as they enter viewport)
  - [ ] 2.13 Implement mobile responsive design with adaptive animations
  - [ ] 2.14 Add mystical loading states with ancient-themed skeletons
  - [ ] 2.15 Optimize images and 3D assets for performance (WebP, AVIF, compressed textures)

- [ ] 3.0 Authentication & User Management System
  - [ ] 3.1 Install and configure BetterAuth for authentication
  - [ ] 3.2 Create authentication configuration file with providers (email/password, Google, Apple)
  - [ ] 3.3 Build login page with ancient themed form (ink-well inputs)
  - [ ] 3.4 Build registration page with mystical validation messages
  - [ ] 3.5 Implement forgot password flow with email reset
  - [ ] 3.6 Create session management utilities and middleware
  - [ ] 3.7 Build protected route wrapper for dashboard pages
  - [ ] 3.8 Implement logout functionality
  - [ ] 3.9 Create user profile schema in MongoDB (name, email, birth date, location, spiritual profile)
  - [ ] 3.10 Build API endpoints for user CRUD operations
  - [ ] 3.11 Implement two-factor authentication (2FA) setup
  - [ ] 3.12 Create login history tracking and active sessions management
  - [ ] 3.13 Add social login integration (Google, Apple) with account linking

- [ ] 4.0 User Dashboard (Client Portal) Implementation
  - [ ] 4.1 Create dashboard layout with sidebar navigation and ancient tome styling
  - [ ] 4.2 Build Overview/Home page with personalized welcome message
  - [ ] 4.3 Implement Energy Reading Widget (0-100% animated progress meter with mystical styling)
  - [ ] 4.4 Create Quick Stats Cards (Active Spells, Upcoming Consultations, Unread Messages, Spiritual Points)
  - [ ] 4.5 Build Recent Activity Feed with real-time notifications
  - [ ] 4.6 Add Quick Action Buttons ("Request New Spell", "Book Consultation", "Message Healer")
  - [ ] 4.7 Implement Spiritual Calendar with lunar phases and consultation dates
  - [ ] 4.8 Build My Spells page with filter/sort options (status, type, date)
  - [ ] 4.9 Create Spell Card component with 3D animated icons and status indicators
  - [ ] 4.10 Implement Detailed Spell View modal with ritual timeline and healer notes
  - [ ] 4.11 Add Spell History Archive with success tracking
  - [ ] 4.12 Build multi-channel Messages page (In-App, WhatsApp, Messenger unified inbox)
  - [ ] 4.13 Implement real-time chat interface with read receipts and typing indicators
  - [ ] 4.14 Add file attachment support (images, documents) and voice message recording
  - [ ] 4.15 Create message categories and threading (spell-specific, general, urgent)
  - [ ] 4.16 Build Consultations page with calendar view (monthly/weekly/daily)
  - [ ] 4.17 Implement consultation booking interface with time slot selection
  - [ ] 4.18 Add pre-consultation questionnaire and preparation instructions
  - [ ] 4.19 Create Past Consultations view with session notes and ratings
  - [ ] 4.20 Build Spiritual Journal with rich text editor and mystical styling
  - [ ] 4.21 Implement Manifestation Tracker and Dream Journal features
  - [ ] 4.22 Add Guided Prompts for daily reflection and moon rituals
  - [ ] 4.23 Create Spiritual Progress page with energy alignment graph
  - [ ] 4.24 Implement Badges & Achievements system with 3D unlock animations
  - [ ] 4.25 Build Spiritual Level System (Novice → Master) with perks
  - [ ] 4.26 Create Payments & Billing page with transaction history
  - [ ] 4.27 Implement Stripe payment method management (add/remove cards)
  - [ ] 4.28 Add invoice downloads and receipt generation
  - [ ] 4.29 Build subscription management interface for recurring services
  - [ ] 4.30 Create Profile & Settings page with personal information editing
  - [ ] 4.31 Implement notification preferences (email, SMS, push, per channel)
  - [ ] 4.32 Add accessibility settings (dark mode, font size, reduce motion)
  - [ ] 4.33 Build Referrals & Community section with unique referral links
  - [ ] 4.34 Create Resources & Learning library with articles and videos
  - [ ] 4.35 Implement responsive mobile menu with ancient scroll motif

- [ ] 5.0 Admin Dashboard (Healer Portal) Implementation
  - [ ] 5.1 Create admin layout with enhanced navigation and permissions check
  - [ ] 5.2 Build Admin Overview page with key metrics dashboard
  - [ ] 5.3 Implement real-time activity feed for new requests, messages, bookings
  - [ ] 5.4 Create Quick Stats Cards (completion rate, satisfaction, revenue, subscriptions)
  - [ ] 5.5 Build Calendar Overview with today's consultations and week view
  - [ ] 5.6 Implement Revenue Snapshot with earnings breakdown
  - [ ] 5.7 Create User Management page with searchable directory
  - [ ] 5.8 Build User Profile View (admin) with complete history and internal notes
  - [ ] 5.9 Implement user actions (suspend, refund, grant credits, delete account)
  - [ ] 5.10 Add user segmentation and tagging (VIP, at-risk, high-engagement)
  - [ ] 5.11 Build bulk user operations and communication tools
  - [ ] 5.12 Create Spell Management page with request queue
  - [ ] 5.13 Implement spell status filters and priority flags
  - [ ] 5.14 Build Spell Detail View (admin) with all user information
  - [ ] 5.15 Create spell action controls (accept/decline, update status, add notes)
  - [ ] 5.16 Implement photo/video upload for ritual progress updates
  - [ ] 5.17 Build Spell Templates system for common requests
  - [ ] 5.18 Add Spell Analytics (completion rate, average time, revenue by type)
  - [ ] 5.19 Implement bulk spell operations (status updates, exports, assignments)
  - [ ] 5.20 Create Consultation Management page with calendar system
  - [ ] 5.21 Implement drag-and-drop rescheduling and color-coded events
  - [ ] 5.22 Build consultation detail view with user notes and payment status
  - [ ] 5.23 Add session notes interface (post-consultation) with visibility toggle
  - [ ] 5.24 Create consultation settings (types, pricing, buffer time, cancellation policy)
  - [ ] 5.25 Implement consultation analytics (bookings, ratings, revenue, no-shows)
  - [ ] 5.26 Build Testimonials Management page with approval queue
  - [ ] 5.27 Implement testimonial actions (approve, reject, feature, reply publicly)
  - [ ] 5.28 Add testimonial analytics (average rating, sentiment analysis)
  - [ ] 5.29 Create Payments & Financial Management page with revenue dashboard
  - [ ] 5.30 Build transaction list with filtering and export capabilities
  - [ ] 5.31 Implement payment actions (refunds, resend receipts, mark as paid)
  - [ ] 5.32 Add financial reports generation (custom date ranges, tax documentation)
  - [ ] 5.33 Build pricing management interface for service updates
  - [ ] 5.34 Create discount code and promotional offer management
  - [ ] 5.35 Implement subscription management with churn tracking
  - [ ] 5.36 Build Analytics & Insights page with traffic metrics
  - [ ] 5.37 Add user behavior analytics and journey mapping
  - [ ] 5.38 Implement goal tracking and conversion funnels
  - [ ] 5.39 Create custom reports builder with scheduled reports
  - [ ] 5.40 Build CMS interface for service pages and blog articles
  - [ ] 5.41 Add media library with upload and organization tools
  - [ ] 5.42 Implement landing page management with A/B testing
  - [ ] 5.43 Create FAQ and email template management
  - [ ] 5.44 Build Settings & Configuration page with business settings
  - [ ] 5.45 Implement notification settings and team management (if applicable)
  - [ ] 5.46 Add integration settings (Stripe, Calendar APIs, Analytics)
  - [ ] 5.47 Build backup & security management interface
  - [ ] 5.48 Create system health monitoring dashboard

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
