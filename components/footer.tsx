'use client';

import Link from 'next/link';
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaPinterestP,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaLock,
  FaCreditCard,
} from 'react-icons/fa';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: FaFacebookF, href: 'https://facebook.com', label: 'Facebook' },
    { icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: FaPinterestP, href: 'https://pinterest.com', label: 'Pinterest' },
  ];

  const serviceLinks = [
    { name: 'Love Spells', href: '/services/love-spells' },
    { name: 'Protection Magic', href: '/services/protection' },
    { name: 'Wealth Attraction', href: '/services/wealth' },
    { name: 'Spiritual Readings', href: '/services/readings' },
    { name: 'Energy Healing', href: '/services/energy-healing' },
  ];

  const resourceLinks = [
    { name: 'Blog', href: '/blog' },
    { name: 'Spiritual Guides', href: '/guides' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'About', href: '/about' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Refund Policy', href: '/refund-policy' },
    { name: 'Cookie Policy', href: '/cookies' },
  ];

  return (
    <footer
      className="relative mt-20 border-t-2 border-mystical-amber/30"
      style={{
        backgroundImage: 'url(/textures/parchment-dark.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
      }}
    >
      {/* Mystical top border decoration */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-mystical-gold to-transparent opacity-50" />

      <div className="relative w-full max-w-none px-6 py-16">
        <div className="container mx-auto max-w-7xl">
          {/* Main footer content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand & Contact Column */}
          <div className="space-y-6">
            <div>
              <h3
                className="text-5xl font-bold mb-4 text-white"
                style={{
                  fontFamily: 'var(--font-unifraktur)',
                  textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
                }}
              >
                Mystic Healing
              </h3>
              <p
                className="text-white text-xl leading-relaxed"
                style={{ textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}
              >
                Ancient wisdom meets modern spiritual practice. Transforming
                lives through sacred rituals and divine guidance since 2010.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-white hover:text-mystical-gold transition-colors">
                <FaEnvelope className="text-white text-2xl" style={{ filter: 'drop-shadow(1px 1px 1px #000) drop-shadow(-1px -1px 1px #000)' }} />
                <a href="mailto:hello@mysticheraling.com" className="text-xl" style={{ textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}>
                  hello@mysticheraling.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-white hover:text-mystical-gold transition-colors">
                <FaPhone className="text-white text-2xl" style={{ filter: 'drop-shadow(1px 1px 1px #000) drop-shadow(-1px -1px 1px #000)' }} />
                <a href="tel:+1234567890" className="text-xl" style={{ textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}>
                  +1 (234) 567-890
                </a>
              </div>
              <div className="flex items-start gap-3 text-white">
                <FaMapMarkerAlt className="text-white text-2xl mt-1" style={{ filter: 'drop-shadow(1px 1px 1px #000) drop-shadow(-1px -1px 1px #000)' }} />
                <span className="text-xl" style={{ textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}>
                  123 Mystic Lane
                  <br />
                  Salem, MA 01970
                </span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-mystical-purple/30 border border-white/30 flex items-center justify-center text-white hover:bg-mystical-gold hover:text-ink-950 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] hover:scale-110"
                >
                  <social.icon className="text-lg" />
                </a>
              ))}
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4
              className="text-3xl font-bold mb-6 text-white"
              style={{
                fontFamily: 'var(--font-cinzel)',
                textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
              }}
            >
              Our Services
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white hover:text-mystical-gold transition-colors text-xl flex items-center gap-2 group"
                    style={{ textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}
                  >
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      ✦
                    </span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4
              className="text-3xl font-bold mb-6 text-white"
              style={{
                fontFamily: 'var(--font-cinzel)',
                textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
              }}
            >
              Resources
            </h4>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white hover:text-mystical-gold transition-colors text-xl flex items-center gap-2 group"
                    style={{ textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}
                  >
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      ✦
                    </span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4
              className="text-3xl font-bold mb-6 text-white"
              style={{
                fontFamily: 'var(--font-cinzel)',
                textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
              }}
            >
              Legal
            </h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white hover:text-mystical-gold transition-colors text-xl flex items-center gap-2 group"
                    style={{ textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}
                  >
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      ✦
                    </span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mystical divider */}
        <div className="mb-8 flex items-center justify-center gap-4">
          <div className="h-px w-32 bg-linear-to-r from-transparent to-white/50" />
          <span className="text-white text-2xl">✦</span>
          <div className="h-px w-32 bg-linear-to-l from-transparent to-white/50" />
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-mystical-gold/20">
          {/* Copyright */}
          <p
            className="text-white text-xl text-center md:text-left"
            style={{ textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}
          >
            © {currentYear} Mystic Healing. All rights reserved. Blessed be.
          </p>

          {/* Security Badges */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-white">
              <FaShieldAlt className="text-white text-2xl" style={{ filter: 'drop-shadow(1px 1px 1px #000) drop-shadow(-1px -1px 1px #000)' }} />
              <span className="text-lg" style={{ textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}>SSL Secure</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <FaLock className="text-white text-2xl" style={{ filter: 'drop-shadow(1px 1px 1px #000) drop-shadow(-1px -1px 1px #000)' }} />
              <span className="text-lg" style={{ textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}>Privacy Protected</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <FaCreditCard className="text-white text-2xl" style={{ filter: 'drop-shadow(1px 1px 1px #000) drop-shadow(-1px -1px 1px #000)' }} />
              <span className="text-lg" style={{ textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}>Secure Payments</span>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Bottom mystical border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-mystical-amber to-transparent opacity-30" />
    </footer>
  );
}
