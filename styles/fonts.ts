/**
 * Ancient Mystical Fonts Configuration
 *
 * Imports all custom fonts for the Spell Caster platform
 * These fonts evoke grimoires, medieval manuscripts, and mystical artifacts
 *
 * Font families:
 * - Primary Headings: UnifrakturMaguntia (gothic blackletter)
 * - Secondary Headings: IM Fell English, Cinzel Decorative
 * - Body Text: Crimson Text, EB Garamond
 * - Mystical Accents: Almendra SC (small caps)
 */

import {
  Crimson_Text,
  EB_Garamond,
  UnifrakturMaguntia,
  Cinzel_Decorative,
  IM_Fell_English,
  Philosopher,
  Almendra_SC,
} from 'next/font/google';

/**
 * Primary heading font - Gothic blackletter aesthetic
 * Used for main titles and dramatic text elements
 */
export const unifraktur = UnifrakturMaguntia({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-unifraktur',
  display: 'swap',
});

/**
 * Classical ornate heading font
 * Used for secondary headings and decorative titles
 */
export const cinzel = Cinzel_Decorative({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
});

/**
 * Primary body text - Old-style serif with historical character
 * Used for main content and readable sections
 */
export const crimsonText = Crimson_Text({
  weight: ['400', '600'],
  subsets: ['latin'],
  variable: '--font-crimson',
  display: 'swap',
});

/**
 * Secondary body font - Classical readability with historical character
 * Used for alternative content sections
 */
export const garamond = EB_Garamond({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-garamond',
  display: 'swap',
});

/**
 * Classical serif heading font
 * Used for section headers and prominent text
 */
export const imFellEnglish = IM_Fell_English({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-fell-english',
  display: 'swap',
});

/**
 * Philosophical and wisdom-oriented font
 * Used for inspirational quotes and spiritual guidance text
 */
export const philosopher = Philosopher({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-philosopher',
  display: 'swap',
});

/**
 * Small caps font for ritual and mystical text
 * Used for labels, mystical phrases, and emphasis
 */
export const almendraSC = Almendra_SC({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-almendra',
  display: 'swap',
});

/**
 * Combined font classes for use in layouts
 * Apply to root element to make all fonts available via CSS variables
 */
export const fontClasses = [
  unifraktur.className,
  cinzel.className,
  crimsonText.className,
  garamond.className,
  imFellEnglish.className,
  philosopher.className,
  almendraSC.className,
].join(' ');

/**
 * Font variables for CSS
 * These are automatically available in CSS when font classes are applied
 */
export const fontVariables = {
  '--font-unifraktur': unifraktur.style.fontFamily,
  '--font-cinzel': cinzel.style.fontFamily,
  '--font-crimson': crimsonText.style.fontFamily,
  '--font-garamond': garamond.style.fontFamily,
  '--font-fell-english': imFellEnglish.style.fontFamily,
  '--font-philosopher': philosopher.style.fontFamily,
  '--font-almendra': almendraSC.style.fontFamily,
};
