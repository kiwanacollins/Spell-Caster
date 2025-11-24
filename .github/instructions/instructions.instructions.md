# Copilot Instructions for Your Spell Caster Platform

## Project Overview

This is a spiritual healing and spell casting platform called "Your Spell Caster" with an **ancient, magical, and mysterious aesthetic**. The design should evoke grimoires, medieval manuscripts, and mystical artifacts—NOT modern web design trends.

## Core Design Philosophy

### Theme: Ancient Mysticism

- **Ancient parchment aesthetic**: weathered, aged, mysterious
- **Dark, mysterious atmosphere**: Think candlelit chambers and moonlit ritual spaces
- **Candlelit atmosphere**: flickering flames, smoky ambiance, moonlit ritual spaces
- **Hand-drawn elements**: ink strokes, quill aesthetics, illuminated manuscripts
- **Mystical symbols**: pentacles, runes, Celtic knots, alchemical glyphs
- **NO gradients**: Use solid colors, textures, and layered opacity instead
- **NO glassmorphism or frosted glass effects**: Maintain a flat, textured look
- **NO modern UI elements**: Embrace ancient design motifs
- **Don't use emoji icons or graphics**: only hand-drawn or thematic icons (e.g., quill, candle, crystal ball) using react-icons or custom SVGs

### Typography: Ancient & Mystical Fonts

**Never use generic fonts like Arial, Inter, or Roboto**. This platform requires authentic ancient character:

**Primary Headings:**

- UnifrakturMaguntia (gothic blackletter)
- MedievalSharp (ancient gothic)
- Cinzel Decorative (classical ornate)

**Secondary Headings:**

- IM Fell English (classical serif with historical character)
- Philosopher (ancient wisdom)

**Body Text:**

- Crimson Text (old-style serif, readable with historical character)
- EB Garamond (classical readability)

**Mystical Accents:**

- Almendra SC (small caps for ritual text)

**Key principle**: Every font choice should feel like it belongs in an ancient grimoire or medieval manuscript.

### Color Palette: Ancient & Weathered

**Primary Colors:**

- Ancient Parchment: #F4E8D0
- Deep Charcoal: #1A1A1A
- Aged Bronze: #8B6F47

**Secondary Colors:**

- Mystical Amber: #CC8800
- Weathered Stone: #4A4A4A
- Moonlit Silver: #C0C0C0

**Accent Colors:**

- Enchanted Emerald: #2C5530
- Blood Moon Red: #8B0000
- Sacred Gold: #B8860B

**NO modern purple gradients or neon glows**. Use solid colors with texture overlays.

### Visual Style & Aesthetics

**Backgrounds:**

- Textured backgrounds: parchment, aged paper, stone tablets, weathered leather
- Layered textures for depth (never solid colors)
- Smoky particle effects and ethereal mist overlays
- Weathered appearance with subtle cracks and imperfections
- Sepia-toned imagery and vintage photograph effects

**Decorative Elements:**

- Hand-drawn mystical symbols and borders (pentacles, runes, Celtic knots)
- Wax seal elements and ancient scroll motifs
- Ancient manuscript illuminations and marginalia-inspired decorations
- Ink-stain and quill-stroke aesthetics
- Flickering candlelight effects (NOT neon glows)

**Interactive Elements:**

- Buttons glow with mystical energy (subtle, candlelight-like)
- Form inputs have ink-well fill effects
- Checkboxes become glowing runes when selected
- Hover effects: subtle lift with ancient shadow casting

### Motion & Animations

**Animation Philosophy:**

- Natural, organic movements (candle flickers, smoke swirls, mist drifts)
- Smooth but mystical transitions (fade, dissolve, flicker)
- High-impact moments: Page load with staggered reveals of mystical elements
- Use animation-delay for orchestrated sequences

**CSS-First Approach:**

- Prioritize CSS animations for HTML elements
- Use transform and opacity for GPU acceleration
- Implement will-change sparingly

**React/Advanced Animations:**

- Framer Motion for declarative animations
- GSAP + ScrollTrigger for complex scroll-based effects
- Anime.js for SVG path morphing (mystical symbols)

**Particle Effects:**

- tsParticles for smoke, mist, floating dust motes
- Limit particles: 50-100 on mobile, 200-300 on desktop
- Canvas-based effects for hero section only

**Key Animation Moments:**

1. **Page Load**: Mystical reveal with swirling mist/smoke
2. **Spell Cards**: Lift and rotate on hover with shadow depth
3. **Scroll Effects**: Runes and symbols glow as they enter viewport
4. **Form Submission**: Particle burst with energy wave ripples
5. **Badge Unlock**: 3D badge materializes with ancient light rays

### 3D Elements & Mystical Effects

**Hero Section:**

- Floating crystals (amethyst, quartz, obsidian) with inner glow
- Rotating ritual circles with pulsing runes
- Animated 3D candles with flickering flames
- Volumetric smoke/mist effects
- Ancient grimoire that opens with page-turning animation

**Interactive Elements:**

- 3D spell icons (heart with vines, runed shield, golden coin, crystal ball)
- Cards fan out when clicked
- Ancient artifacts as 3D props (chalice, wand, athame)

**Performance:**

- Progressive enhancement: Full 3D on desktop, lighter on mobile
- Lazy load Three.js scenes
- Use Spline exports for mobile (lightweight)
- Target Lighthouse 90+ on mobile

### Component Design Patterns

**Cards:**

- Weathered parchment or leather texture backgrounds
- Hand-drawn borders with mystical symbols in corners
- Aged, imperfect edges (no perfect rounded corners)
- **NO left curved borders or border-l accent lines** - This is generic "AI slop" design
- **NO colored left border bars** - Avoid the typical modern card pattern
- Instead: Use full irregular borders, corner flourishes, or wax seal embellishments
- Torn/weathered edges that feel authentic and handcrafted
- Subtle shadow casting like ancient manuscript pages
- Asymmetric decorative elements (corner runes, marginal notes, ink splatters)

**Forms:**

- Ink-well style inputs (text appears like quill writing)
- Wax seal submit buttons
- Ancient scroll aesthetic for multi-step forms
- Mystical validation messages (not generic errors)

**Navigation:**

- Ancient tome chapter markers
- Scroll motif for mobile menu
- Mystical runes as icons
- Candlelight hover effects

**Modals:**

- Ancient grimoire opening animation
- Parchment overlay with worn edges
- Wax seal close button
- Ethereal mist background

### AI Integration (Hidden from Users)

**Key Principle**: Users should NEVER know AI is involved. All AI features operate behind the scenes.

**When building AI features:**

- No loading states that say "AI is thinking"
- Use mystical loading messages: "Consulting the ancient texts...", "The spirits are speaking..."
- Admin reviews all AI content before user sees it
- Maintain mystical, authentic tone in all AI outputs
- Never expose API calls or AI-related UI to users

### Code Quality & Standards

**React/Next.js Best Practices:**

- Use Next.js 15 App Router
- Server Components by default, Client Components only when needed
- Implement proper loading states with mystical themed skeletons
- Error boundaries with ancient-themed error messages

**Styling:**

- Tailwind CSS with custom ancient theme configuration
- shadcn/ui components heavily customized (NOT default styling)
- CSS variables for color consistency
- Mobile-first responsive design

**Performance:**

- Lazy load 3D scenes and heavy animations
- Use Intersection Observer to pause off-screen animations
- Compress textures (KTX2, Basis Universal)
- Target metrics: FCP < 1.8s, TTI < 3.5s, Lighthouse 90+

**Accessibility:**

- Implement reduce-motion media query
- Ensure ancient fonts remain readable
- Proper ARIA labels with mystical language
- Keyboard navigation for all interactive elements

### What to AVOID

**DO NOT:**

- Use modern gradients (especially purple/pink/blue)
- Create generic, clean, minimalist designs
- Use rounded corners everywhere (prefer irregular, aged edges)
- **Use left curved borders or border-l accent bars on cards** - This is the most common AI slop pattern
- **Add colored left border strips to cards** - Typical generic modern design
- Implement neon glows or modern glow effects
- Use generic loading spinners
- Show AI-related UI or terminology to users
- Use standard form validation messages
- Create perfect, symmetrical layouts (embrace organic imperfection)
- Default to Sans-serif fonts
- Use bright, saturated colors 
- Use the typical "card with left accent border" pattern seen everywhere

### Creative Direction

**Always ask yourself:**

- Does this feel like it belongs in an ancient grimoire?
- Would a medieval scribe recognize this aesthetic?
- Is the mystical atmosphere maintained?
- Does this surprise and delight with its uniqueness?
- Have I avoided "AI slop" generic design?

**When in doubt:**

- Add more texture
- Increase the mystical atmosphere
- Make it feel more ancient and weathered
- Add subtle imperfections (authenticity over perfection)

### Messaging Integration

**WhatsApp & Messenger:**

- Seamlessly integrate messaging channels
- Use mystical language in notifications
- AI-powered responses maintain healer's voice
- Admin always reviews before sending
- Channel-optimized formatting (WhatsApp: concise, Messenger: rich media)

### Final Note

This is NOT a typical modern web app. Every design decision should reinforce the ancient, magical, mysterious atmosphere. Be bold, be creative, and create an experience that transports users to a world of ancient spiritual wisdom and mystical practices.

---

## Task List Management

Guidelines for managing task lists in markdown files to track progress on completing the PRD.

### Task Implementation Protocol

- **One sub-task at a time:** Do **NOT** start the next sub-task until you ask the user for permission and they say "yes" or "y"
- **Completion protocol:**
  1. When you finish a **sub-task**, immediately mark it as completed by changing `[ ]` to `[✓]`.
  2. If **all** subtasks underneath a parent task are now `[✓]`, also mark the **parent task** as completed `[✓]`.
- Stop after each sub-task and wait for the user's go-ahead before proceeding.

### Task List Maintenance

1. **Update the task list as you work:**
   - Mark tasks and subtasks as completed (`[✓]`) per the protocol above.
   - Add new tasks as they emerge during implementation.
   - Keep the task list file synchronized with actual progress.

2. **Maintain the "Relevant Files" section:**
   - List every file created or modified during implementation.
   - Give each file a one-line description of its purpose.
   - Update descriptions if file purposes change.
   - Remove files that are no longer relevant.

### AI Workflow Instructions

When working with task lists (`tasks/tasks-prd.md`), you must:

1. **Before starting work:**
   - Check the task list to identify the next incomplete sub-task.
   - Verify no other sub-tasks are marked as in-progress.
   - Confirm with user before beginning implementation.

2. **During implementation:**
   - Focus exclusively on the current sub-task.
   - Do not jump ahead to other tasks.
   - Track all files created or modified.

3. **After completing a sub-task:**
   - Immediately update the task list file.
   - Mark the completed sub-task as `[✓]`.
   - If all sibling sub-tasks are complete, mark the parent task as `[✓]`.
   - Update the "Relevant Files" section with any new or modified files.
   - Add any newly discovered tasks to the appropriate section.
   - Stop and wait for user approval before proceeding.

4. **Progress reporting:**
   - Briefly summarize what was completed.
   - Mention any files created or modified.
   - Ask "Ready to proceed to the next sub-task?" and wait for "yes" or "y".
   - **DO NOT create separate documentation files** to summarize completed work.
   - All progress tracking happens in the task list file only.

5. **Task discovery:**
   - If you discover a sub-task is more complex than anticipated, break it down further.
   - Add the new sub-tasks to the list with appropriate numbering (e.g., 1.1.1, 1.1.2).
   - Inform the user about the updated task breakdown.

### After a task dont create a documentation file
### After completing a tasks ask the developer to type yes / y to continue to the next sub tasks / task
