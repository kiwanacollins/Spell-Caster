'use client';
import Link from 'next/link';
import { Service } from '@/lib/services/service-data';
import { 
  GiSpellBook, 
  GiMoon, 
  GiCandles, 
  GiCrystalBall,
  GiCheckeredDiamond,
  GiStarShuriken 
} from 'react-icons/gi';
import { IoCheckmarkCircle, IoTimeOutline, IoShieldCheckmark } from 'react-icons/io5';
import { WhatsAppButton } from '@/components/whatsapp-button';
import { MessengerButton } from '@/components/messenger-button';

interface ServiceDetailClientProps {
  service: Service;
}

export default function ServiceDetailClient({ service }: ServiceDetailClientProps) {

  // Map comprehensive service data to component's expected details structure
  const getServiceDetails = () => {
    return {
      energyLevel: service.energyLevel,
      moonPhase: service.moonPhase,
      duration: service.ritualDetails.duration,
      lunarPhase: service.ritualDetails.lunarPhase,
      fullDescription: service.fullDescription,
      benefits: service.benefits,
      materials: service.ritualDetails.materials,
      timeline: service.whatToExpect.timeline,
      preparation: service.preparation,
    };
  };

  const details = getServiceDetails();

  return (
    <main className="min-h-screen overflow-x-hidden bg-ink-900">
      {/* Parchment Paper Container */}
      <div className="relative w-full flex justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div
          className="relative w-full max-w-[1400px] shadow-2xl"
          style={{
            backgroundImage: `url(/textures/parchment-light.webp)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            minHeight: '100vh',
          }}
        >
          {/* Paper edge shadow for depth */}
          <div className="absolute inset-0 shadow-[0_0_60px_rgba(0,0,0,0.5)]" style={{ pointerEvents: 'none' }} />
          
          {/* Content Container */}
          <div className="relative z-10 px-4 sm:px-8 lg:px-16 py-8 sm:py-12">
            {/* Breadcrumb Navigation */}
            <nav className="mb-8 font-serif text-sm text-ink-700">
              <Link href="/" className="hover:text-mystical-bronze transition-colors">
                Home
              </Link>
              <span className="mx-2">→</span>
              <Link href="/#services" className="hover:text-mystical-bronze transition-colors">
                Sacred Services
              </Link>
              <span className="mx-2">→</span>
              <span className="text-ink-900">{service.title}</span>
            </nav>

            {/* Service Header */}
            <div className="mb-12 text-center">
              {/* Category Badge */}
              <div className="mb-4">
                <span className="inline-block px-4 py-1 bg-mystical-amber/10 border border-mystical-amber/30 rounded-ritual font-serif text-sm text-mystical-bronze uppercase tracking-wider">
                  {service.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-gothic text-5xl sm:text-6xl md:text-7xl text-ink-900 mb-6">
                {service.title}
              </h1>

              {/* Decorative divider */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px w-24 bg-linear-to-r from-transparent to-mystical-bronze" />
                <span className="text-mystical-bronze text-2xl">✦</span>
                <div className="h-px w-24 bg-linear-to-l from-transparent to-mystical-bronze" />
              </div>

              {/* Short Description */}
              <p className="font-serif text-xl sm:text-2xl text-ink-800 max-w-3xl mx-auto leading-relaxed">
                {service.shortDescription}
              </p>

              {/* Energy & Moon Phase */}
              <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
                <div className="flex items-center gap-2">
                  <GiMoon className="w-6 h-6 text-mystical-amber" />
                  <span className="font-serif text-ink-700">
                    {details.energyLevel} Energy
                  </span>
                </div>
                <span className="text-mystical-bronze">•</span>
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{details.moonPhase}</span>
                  <span className="font-serif text-ink-700">
                    {details.lunarPhase}
                  </span>
                </div>
              </div>
            </div>

            {/* Sacred Overview Section */}
            <section className="mb-16">
              <div className="relative rounded-ritual overflow-hidden border-2 border-amber-600/40 bg-linear-to-b from-amber-50/80 to-amber-100/60 shadow-[0_8px_32px_rgba(0,0,0,0.15)]">
                {/* Corner decorations */}
                <div className="absolute top-0 left-0 w-16 h-16">
                  <div className="absolute top-3 left-3 w-10 h-10 border-t-2 border-l-2 border-amber-700/60" />
                </div>
                <div className="absolute top-0 right-0 w-16 h-16">
                  <div className="absolute top-3 right-3 w-10 h-10 border-t-2 border-r-2 border-amber-700/60" />
                </div>
                <div className="absolute bottom-0 left-0 w-16 h-16">
                  <div className="absolute bottom-3 left-3 w-10 h-10 border-b-2 border-l-2 border-amber-700/60" />
                </div>
                <div className="absolute bottom-0 right-0 w-16 h-16">
                  <div className="absolute bottom-3 right-3 w-10 h-10 border-b-2 border-r-2 border-amber-700/60" />
                </div>

                <div className="relative p-8 sm:p-12">
                  <h2 className="font-cinzel text-3xl sm:text-4xl text-ink-900 mb-6 flex items-center justify-center gap-3">
                    <GiSpellBook className="w-8 h-8 text-mystical-bronze" />
                    Sacred Overview
                  </h2>
                  
                  <p className="font-serif text-lg text-ink-800 mb-8 leading-relaxed max-w-4xl mx-auto">
                    {details.fullDescription}
                  </p>

                  <h3 className="font-cinzel text-2xl text-ink-900 mb-6 text-center">
                    Spiritual Benefits
                  </h3>
                  
                  <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
                    {details.benefits.map((benefit: string, index: number) => (
                      <div key={index} className="flex items-start gap-3 bg-parchment-100/40 p-4 rounded-ritual">
                        <IoCheckmarkCircle className="w-6 h-6 text-mystical-bronze shrink-0 mt-1" />
                        <span className="font-serif text-ink-800">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Ritual Details Section */}
            <section className="mb-16">
              <div className="relative rounded-ritual overflow-hidden border-2 border-amber-600/40 bg-linear-to-b from-amber-50/80 to-amber-100/60 shadow-[0_8px_32px_rgba(0,0,0,0.15)]">
                {/* Corner decorations */}
                <div className="absolute top-0 left-0 w-16 h-16">
                  <div className="absolute top-3 left-3 w-10 h-10 border-t-2 border-l-2 border-amber-700/60" />
                </div>
                <div className="absolute top-0 right-0 w-16 h-16">
                  <div className="absolute top-3 right-3 w-10 h-10 border-t-2 border-r-2 border-amber-700/60" />
                </div>
                <div className="absolute bottom-0 left-0 w-16 h-16">
                  <div className="absolute bottom-3 left-3 w-10 h-10 border-b-2 border-l-2 border-amber-700/60" />
                </div>
                <div className="absolute bottom-0 right-0 w-16 h-16">
                  <div className="absolute bottom-3 right-3 w-10 h-10 border-b-2 border-r-2 border-amber-700/60" />
                </div>

                <div className="relative p-8 sm:p-12">
                  <h2 className="font-cinzel text-3xl sm:text-4xl text-ink-900 mb-8 flex items-center justify-center gap-3">
                    <GiCandles className="w-8 h-8 text-mystical-bronze" />
                    Ritual Details
                  </h2>

                  <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Duration & Timeline */}
                    <div className="bg-parchment-100/40 p-6 rounded-ritual">
                      <h3 className="font-cinzel text-xl text-ink-900 mb-4 flex items-center gap-2">
                        <IoTimeOutline className="w-6 h-6 text-mystical-bronze" />
                        Duration & Timeline
                      </h3>
                      <p className="font-serif text-ink-700 mb-4">
                        <strong>Duration:</strong> {details.duration}
                      </p>
                      <p className="font-serif text-ink-700">
                        <strong>Timeline:</strong> {details.timeline}
                      </p>
                    </div>

                    {/* Sacred Materials */}
                    <div className="bg-parchment-100/40 p-6 rounded-ritual">
                      <h3 className="font-cinzel text-xl text-ink-900 mb-4">
                        Sacred Materials
                      </h3>
                      <ul className="space-y-2">
                        {details.materials.map((material: string, index: number) => (
                          <li key={index} className="flex items-center gap-2">
                            <GiStarShuriken className="w-4 h-4 text-mystical-bronze" />
                            <span className="font-serif text-ink-700">
                              {material}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Preparation Section */}
            <section className="mb-16">
              <div className="relative rounded-ritual overflow-hidden border-2 border-amber-600/40 bg-linear-to-b from-amber-50/80 to-amber-100/60 shadow-[0_8px_32px_rgba(0,0,0,0.15)]">
                {/* Corner decorations */}
                <div className="absolute top-0 left-0 w-16 h-16">
                  <div className="absolute top-3 left-3 w-10 h-10 border-t-2 border-l-2 border-amber-700/60" />
                </div>
                <div className="absolute top-0 right-0 w-16 h-16">
                  <div className="absolute top-3 right-3 w-10 h-10 border-t-2 border-r-2 border-amber-700/60" />
                </div>
                <div className="absolute bottom-0 left-0 w-16 h-16">
                  <div className="absolute bottom-3 left-3 w-10 h-10 border-b-2 border-l-2 border-amber-700/60" />
                </div>
                <div className="absolute bottom-0 right-0 w-16 h-16">
                  <div className="absolute bottom-3 right-3 w-10 h-10 border-b-2 border-r-2 border-amber-700/60" />
                </div>

                <div className="relative p-8 sm:p-12">
                  <h2 className="font-cinzel text-3xl sm:text-4xl text-ink-900 mb-8 flex items-center justify-center gap-3">
                    <IoShieldCheckmark className="w-8 h-8 text-mystical-bronze" />
                    How to Prepare
                  </h2>
                  
                  <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
                    {details.preparation.map((item: string, index: number) => (
                      <div key={index} className="flex items-start gap-3 bg-parchment-100/40 p-4 rounded-ritual">
                        <GiCheckeredDiamond className="w-5 h-5 text-mystical-bronze shrink-0 mt-1" />
                        <span className="font-serif text-ink-800">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Call to Action Section */}
            <section className="mb-16">
              <div className="relative rounded-ritual overflow-hidden border-2 border-amber-600/40 bg-linear-to-b from-amber-50/80 to-amber-100/60 shadow-[0_8px_32px_rgba(0,0,0,0.15)]">
                {/* Corner decorations */}
                <div className="absolute top-0 left-0 w-16 h-16">
                  <div className="absolute top-3 left-3 w-10 h-10 border-t-2 border-l-2 border-amber-700/60" />
                </div>
                <div className="absolute top-0 right-0 w-16 h-16">
                  <div className="absolute top-3 right-3 w-10 h-10 border-t-2 border-r-2 border-amber-700/60" />
                </div>
                <div className="absolute bottom-0 left-0 w-16 h-16">
                  <div className="absolute bottom-3 left-3 w-10 h-10 border-b-2 border-l-2 border-amber-700/60" />
                </div>
                <div className="absolute bottom-0 right-0 w-16 h-16">
                  <div className="absolute bottom-3 right-3 w-10 h-10 border-b-2 border-r-2 border-amber-700/60" />
                </div>

                <div className="relative p-8 sm:p-12 text-center">
                  <h2 className="font-cinzel text-3xl sm:text-4xl text-ink-900 mb-6">
                    Ready to Begin Your Journey?
                  </h2>
                  
                  <p className="font-serif text-lg text-ink-800 mb-8 max-w-2xl mx-auto leading-relaxed">
                    Contact the healer directly to request this sacred service and receive personalized spiritual guidance.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href={`https://wa.me/15185607836?text=${encodeURIComponent(`Hello! I'm interested in the ${service.title} service. Can you tell me more?`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative inline-block"
                    >
                      <div className="relative px-8 py-4 text-white font-cinzel text-lg rounded-ritual border-2 border-green-700 bg-green-600 transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:bg-green-700 overflow-hidden group">
                        <div className="relative z-10 flex items-center justify-center gap-2">
                          <GiCrystalBall className="w-6 h-6" />
                          WhatsApp the Healer
                        </div>
                      </div>
                    </a>

                    <a
                      href={`https://m.me/852523554609766?text=${encodeURIComponent(`Hello! I'm interested in the ${service.title} service. Can you tell me more?`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative inline-block"
                    >
                      <div className="relative px-8 py-4 text-white font-cinzel text-lg rounded-ritual border-2 border-blue-700 bg-blue-600 transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:bg-blue-700 overflow-hidden group">
                        <span className="relative z-10">Message on Facebook</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Trust Footer */}
            <div className="text-center py-8 border-t-2 border-amber-600/30">
              <div className="flex flex-wrap items-center justify-center gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <IoShieldCheckmark className="w-6 h-6 text-mystical-bronze" />
                  <span className="font-serif text-ink-800">
                    Safe & Confidential
                  </span>
                </div>
                <span className="text-mystical-bronze">•</span>
                <span className="font-serif text-ink-800">
                  15+ Years Experience
                </span>
                <span className="text-mystical-bronze">•</span>
                <span className="font-serif text-ink-800">
                  Pure White Light Magic
                </span>
              </div>
              <p className="font-serif text-sm text-ink-700 max-w-2xl mx-auto italic">
                This service is performed with pure intention and white light energy. Results may vary based on individual circumstances and spiritual readiness.
              </p>
            </div>

            {/* Back to Services Link */}
            <div className="text-center mt-8">
              <Link
                href="/#services"
                className="font-serif text-mystical-bronze hover:text-mystical-amber transition-colors inline-flex items-center gap-2"
              >
                <span>←</span>
                Back to All Services
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Contact Button */}
      <WhatsAppButton message={`Hello! I'm interested in the ${service.title} service. Can you tell me more?`} />
      
      {/* Facebook Messenger Contact Button */}
      <MessengerButton message={`Hello! I'm interested in the ${service.title} service. Can you tell me more?`} />
    </main>
  );
}
