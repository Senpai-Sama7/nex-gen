import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Factory, Home, Stethoscope, Wrench, ArrowUpRight, type LucideIcon } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Industry {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  image: string;
  icon: LucideIcon;
  color: string;
}

const industries: Industry[] = [
  {
    id: 'metal',
    title: 'Metal Fabrication',
    subtitle: '& Oilfield Services',
    description:
      'Industrial-strength websites for fabrication shops, welding services, and oilfield repair companies. Showcase your capabilities with project galleries, equipment lists, and instant quote requests.',
    features: [
      'Project Portfolio Galleries',
      'Equipment & Capability Showcases',
      'Instant Quote Request Forms',
      'Certification & Safety Display',
      'Client Portal Integration',
    ],
    image: '/project-metalforge.jpg',
    icon: Factory,
    color: '#ff6e00',
  },
  {
    id: 'oilfield',
    title: 'Oilfield Repair',
    subtitle: '& Heavy Machinery',
    description:
      'Rugged, reliable digital presence for oilfield service companies. Highlight your 24/7 emergency response, field service capabilities, and industry certifications.',
    features: [
      'Emergency Service Highlight',
      'Field Service Scheduling',
      'Equipment Documentation',
      'Safety Record Display',
      'Rapid Response Contact',
    ],
    image: '/project-oilfield.jpg',
    icon: Wrench,
    color: '#ff8c00',
  },
  {
    id: 'home',
    title: 'Home Services',
    subtitle: 'HVAC, Plumbing & Electrical',
    description:
      'Trust-building websites for residential service providers. Convert visitors with online booking, service area maps, and customer reviews that establish credibility.',
    features: [
      'Online Booking System',
      'Service Area Mapping',
      'Customer Review Integration',
      'Before/After Galleries',
      'Maintenance Plan Signups',
    ],
    image: '/project-homeservices.jpg',
    icon: Home,
    color: '#ffa500',
  },
  {
    id: 'medical',
    title: 'Medical Providers',
    subtitle: 'Clinics & Healthcare Practices',
    description:
      'HIPAA-conscious websites for medical practices. Patient-friendly design with online appointment booking, provider profiles, and secure patient portal integration.',
    features: [
      'Online Appointment Booking',
      'Provider Profile Pages',
      'Patient Portal Integration',
      'Insurance Information',
      'HIPAA-Compliant Forms',
    ],
    image: '/project-medical.jpg',
    icon: Stethoscope,
    color: '#00b4d8',
  },
];

const Industries = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards stagger animation
      const cards = cardsRef.current?.querySelectorAll('.industry-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 80, opacity: 0, rotateY: -15 },
          {
            y: 0,
            opacity: 1,
            rotateY: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => {
      scrollTriggersRef.current.forEach(st => st.kill());
      scrollTriggersRef.current = [];
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="industries"
      ref={sectionRef}
      className="relative min-h-screen w-full py-24 lg:py-32 bg-gray-50 dark:bg-black transition-colors duration-500"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white dark:from-black dark:via-dark-100 dark:to-black z-0" />

      <div className="relative z-10 w-full px-6 lg:px-12 xl:px-24">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-16 lg:mb-24">
          <span className="inline-block px-4 py-1.5 bg-orange/10 border border-orange/30 rounded-full text-orange font-opensans text-sm mb-6">
            Industries We Serve
          </span>
          <h2 className="font-teko text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            TAILORED FOR YOUR
            <span className="gradient-text"> BUSINESS</span>
          </h2>
          <p className="font-opensans text-lg text-gray-600 dark:text-white/60 max-w-2xl mx-auto">
            We understand the unique challenges of your industry. Our websites
            are designed to speak directly to your customers and convert visits
            into valuable leads.
          </p>
        </div>

        {/* Industry Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            const isActive = activeIndex === index;

            return (
              <div
                key={industry.id}
                className={`industry-card group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 ${
                  isActive ? 'ring-2 ring-orange' : ''
                }`}
                onMouseEnter={() => setActiveIndex(index)}
                style={{ perspective: '1000px' }}
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={industry.image}
                    alt={industry.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
                </div>

                {/* Content */}
                <div className="relative z-10 p-8 lg:p-10 min-h-[400px] lg:min-h-[450px] flex flex-col justify-between">
                  {/* Top Section */}
                  <div>
                    {/* Icon & Title */}
                    <div className="flex items-start justify-between mb-6">
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundColor: `${industry.color}20` }}
                      >
                        <Icon
                          size={28}
                          className="text-orange"
                          strokeWidth={1.5}
                        />
                      </div>
                      <div
                        className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ backgroundColor: `${industry.color}30` }}
                      >
                        <ArrowUpRight size={20} className="text-orange" strokeWidth={1.5} />
                      </div>
                    </div>

                    <h3 className="font-teko text-3xl lg:text-4xl font-bold text-white mb-2">
                      {industry.title}
                    </h3>
                    <p
                      className="font-teko text-xl mb-4"
                      style={{ color: industry.color }}
                    >
                      {industry.subtitle}
                    </p>
                    <p className="font-opensans text-white/70 text-sm leading-relaxed mb-6">
                      {industry.description}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2">
                    {industry.features.slice(0, 3).map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-white/60"
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: industry.color }}
                        />
                        <span className="font-opensans text-sm">{feature}</span>
                      </div>
                    ))}
                    <div className="text-white/40 font-opensans text-sm pl-3.5">
                      +{industry.features.length - 3} more features
                    </div>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${industry.color}20, transparent 70%)`,
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="font-opensans text-gray-500 dark:text-white/50 mb-6">
            Don't see your industry? We work with businesses across all sectors.
          </p>
          <button
            onClick={() => {
              const section = document.getElementById('contact');
              if (section) {
                gsap.to(window, {
                  duration: 1.2,
                  scrollTo: { y: section, offsetY: 0 },
                  ease: 'power3.inOut',
                });
              }
            }}
            className="inline-flex items-center gap-2 px-6 py-3 border border-orange text-orange font-opensans font-semibold rounded-lg hover:bg-orange hover:text-white transition-all duration-300"
          >
            Let's Discuss Your Project
            <ArrowUpRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Industries;
