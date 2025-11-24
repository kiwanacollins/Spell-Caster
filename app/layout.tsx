import type { Metadata } from 'next';
import './globals.css';
import { fontClasses } from '@/styles/fonts';
import '@/lib/env'; // Validate environment variables on app start

export const metadata: Metadata = {
  title: 'Your Spell Caster - Spiritual Healing & Mystical Services',
  description:
    'Ancient wisdom meets modern healing. Experience authentic spiritual services, energy work, and sacred rituals from a professional healer.',
  keywords:
    'spell casting, spiritual healing, energy work, tarot readings, consultations, mystical services',
  authors: [{ name: 'Your Spell Caster' }],
  openGraph: {
    title: 'Your Spell Caster - Spiritual Healing & Mystical Services',
    description: 'Experience authentic spiritual services and sacred rituals.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1A1A1A" />
      </head>
      <body className={`${fontClasses} antialiased overflow-x-hidden`} style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
