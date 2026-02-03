import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Code2,
  Palette,
  TrendingUp,
  Box,
  Shield,
  Clock,
  Check,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
}

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
}

interface RetainerPlan {
  name: string;
  price: string;
  period: string;
  features: string[];
  highlighted?: boolean;
}

const services: Service[] = [
  {
    icon: Code2,
    title: 'Custom Development',
    description:
      'Hand-coded websites built from scratch. No templates, no compromises. Every line optimized for performance and conversions.',
    features: [
      'Clean, semantic HTML5',
      'Modern React/TypeScript stack',
      'Mobile-first responsive design',
      'SEO-optimized structure',
    ],
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description:
      'User-centered design that guides visitors toward action. Intuitive navigation and compelling visuals that build trust.',
    features: [
      'Wireframing & prototyping',
      'Brand-aligned visual design',
      'Conversion-focused layouts',
      'Accessibility compliance',
    ],
  },
  {
    icon: TrendingUp,
    title: 'SEO & Marketing',
    description:
      'Get found by customers searching for your services. Local SEO optimization and performance tuning for better rankings.',
    features: [
      'Local SEO optimization',
      'Google Business integration',
      'Performance optimization',
      'Analytics setup & tracking',
    ],
  },
  {
    icon: Box,
    title: '3D Integration',
    description:
      'Stand out with immersive 3D experiences. Product showcases, interactive elements, and memorable visual effects.',
    features: [
      'Three.js integration',
      'Interactive 3D elements',
      'Product visualizations',
      'Custom shader effects',
    ],
  },
];

const pricingPlans: PricingPlan[] = [
  {
    name: 'Starter',
    price: '$2,500',
    period: 'one-time',
    description: 'Perfect for small businesses getting started online.',
    features: [
      '5-page custom website',
      'Mobile responsive design',
      'Contact form integration',
      'Basic SEO setup',
      '2 rounds of revisions',
      '30-day support',
    ],
    cta: 'Get Started',
  },
  {
    name: 'Professional',
    price: '$5,500',
    period: 'one-time',
    description: 'Comprehensive solution for growing businesses.',
    features: [
      '10-page custom website',
      'Advanced animations',
      'Blog & content management',
      'Google Analytics integration',
      'Social media integration',
      '4 rounds of revisions',
      '60-day support',
    ],
    highlighted: true,
    cta: 'Most Popular',
  },
  {
    name: 'Enterprise',
    price: '$12,000+',
    period: 'starting',
    description: 'Full-featured solution with ongoing partnership.',
    features: [
      'Unlimited pages',
      'Custom functionality',
      '3D elements & animations',
      'E-commerce integration',
      'Client portal features',
      'Unlimited revisions',
      '90-day support',
    ],
    cta: 'Contact Us',
  },
];

const retainerPlans: RetainerPlan[] = [
  {
    name: 'Essential Care',
    price: '$199',
    period: '/month',
    features: [
      'Monthly security updates',
      'Performance monitoring',
      'Backup & restore',
      'Email support',
      'Content updates (2 hrs)',
    ],
  },
  {
    name: 'Growth Partner',
    price: '$499',
    period: '/month',
    features: [
      'Everything in Essential',
      'Priority support',
      'SEO monitoring',
      'Monthly analytics report',
      'Content updates (5 hrs)',
      'A/B testing setup',
    ],
    highlighted: true,
  },
  {
    name: 'Full Service',
    price: '$999',
    period: '/month',
    features: [
      'Everything in Growth',
      'Dedicated account manager',
      'Unlimited content updates',
      'Monthly strategy calls',
      'New feature development',
      '24/7 emergency support',
    ],
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'build' | 'maintain'>('build');
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

      // Services cards animation
      const serviceCards = servicesRef.current?.querySelectorAll('.service-card');
      if (serviceCards) {
        gsap.fromTo(
          serviceCards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: servicesRef.current,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Pricing cards animation
      const pricingCards = pricingRef.current?.querySelectorAll('.pricing-card');
      if (pricingCards) {
        gsap.fromTo(
          pricingCards,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: pricingRef.current,
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
      id="services"
      ref={sectionRef}
      className="relative min-h-screen w-full py-24 lg:py-32 bg-white dark:bg-black transition-colors duration-500"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-white dark:bg-black z-0" />
      <div className="absolute inset-0 bg-gradient-radial from-orange/5 via-transparent to-transparent z-0" />

      <div className="relative z-10 w-full px-6 lg:px-12 xl:px-24">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-orange/10 border border-orange/30 rounded-full text-orange font-opensans text-sm mb-6">
            What We Offer
          </span>
          <h2 className="font-teko text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            SERVICES &
            <span className="gradient-text"> PRICING</span>
          </h2>
          <p className="font-opensans text-lg text-gray-600 dark:text-white/60 max-w-2xl mx-auto">
            From initial build to ongoing maintenance, we're your complete digital
            partner. Choose the package that fits your business needs.
          </p>
        </div>

        {/* Services Grid */}
        <div
          ref={servicesRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="service-card group p-6 lg:p-8 bg-white dark:bg-dark-100/50 border border-gray-200 dark:border-white/10 rounded-2xl hover:border-orange/50 transition-all duration-500 card-hover shadow-sm dark:shadow-none"
              >
                <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange/20 transition-colors duration-300">
                  <Icon size={24} className="text-orange" strokeWidth={1.5} />
                </div>
                <h3 className="font-teko text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="font-opensans text-gray-600 dark:text-white/60 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-gray-500 dark:text-white/50 text-sm"
                    >
                      <Check size={14} className="text-orange flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Pricing Section */}
        <div className="mb-12">
          {/* Tab Switcher */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1 bg-gray-100 dark:bg-dark-100 rounded-xl border border-gray-200 dark:border-white/10">
              <button
                onClick={() => setActiveTab('build')}
                className={`px-6 py-3 rounded-lg font-opensans font-semibold text-sm transition-all duration-300 ${
                  activeTab === 'build'
                    ? 'bg-orange text-white'
                    : 'text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Website Build
              </button>
              <button
                onClick={() => setActiveTab('maintain')}
                className={`px-6 py-3 rounded-lg font-opensans font-semibold text-sm transition-all duration-300 ${
                  activeTab === 'maintain'
                    ? 'bg-orange text-white'
                    : 'text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Monthly Retainer
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div
            ref={pricingRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          >
            {activeTab === 'build'
              ? pricingPlans.map((plan, index) => (
                  <div
                    key={index}
                    className={`pricing-card relative p-8 rounded-2xl transition-all duration-500 ${
                      plan.highlighted
                        ? 'bg-orange/10 border-2 border-orange scale-105 z-10'
                        : 'bg-white dark:bg-dark-100/50 border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/30'
                    }`}
                  >
                    {plan.highlighted && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-orange text-white font-opensans text-xs font-bold rounded-full">
                        Most Popular
                      </div>
                    )}

                    <div className="text-center mb-8">
                      <h3 className="font-teko text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {plan.name}
                      </h3>
                      <div className="flex items-baseline justify-center gap-1 mb-3">
                        <span className="font-teko text-5xl font-bold text-orange">
                          {plan.price}
                        </span>
                        <span className="font-opensans text-gray-500 dark:text-white/50 text-sm">
                          {plan.period}
                        </span>
                      </div>
                      <p className="font-opensans text-gray-500 dark:text-white/50 text-sm">
                        {plan.description}
                      </p>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-gray-600 dark:text-white/70 text-sm"
                        >
                          <div className="w-5 h-5 rounded-full bg-orange/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check size={12} className="text-orange" />
                          </div>
                          {feature}
                        </li>
                      ))}
                    </ul>

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
                      className={`w-full py-3 rounded-lg font-opensans font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                        plan.highlighted
                          ? 'bg-orange text-white hover:bg-orange-600'
                          : 'bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20'
                      }`}
                    >
                      {plan.cta}
                      <ArrowRight size={16} />
                    </button>
                  </div>
                ))
              : retainerPlans.map((plan, index) => (
                  <div
                    key={index}
                    className={`pricing-card relative p-8 rounded-2xl transition-all duration-500 ${
                      plan.highlighted
                        ? 'bg-orange/10 border-2 border-orange scale-105 z-10'
                        : 'bg-white dark:bg-dark-100/50 border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/30'
                    }`}
                  >
                    {plan.highlighted && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-orange text-white font-opensans text-xs font-bold rounded-full">
                        Best Value
                      </div>
                    )}

                    <div className="text-center mb-8">
                      <h3 className="font-teko text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {plan.name}
                      </h3>
                      <div className="flex items-baseline justify-center gap-1 mb-3">
                        <span className="font-teko text-5xl font-bold text-orange">
                          {plan.price}
                        </span>
                        <span className="font-opensans text-gray-500 dark:text-white/50 text-sm">
                          {plan.period}
                        </span>
                      </div>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-gray-600 dark:text-white/70 text-sm"
                        >
                          <div className="w-5 h-5 rounded-full bg-orange/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check size={12} className="text-orange" />
                          </div>
                          {feature}
                        </li>
                      ))}
                    </ul>

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
                      className={`w-full py-3 rounded-lg font-opensans font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                        plan.highlighted
                          ? 'bg-orange text-white hover:bg-orange-600'
                          : 'bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20'
                      }`}
                    >
                      Get Started
                      <ArrowRight size={16} />
                    </button>
                  </div>
                ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-8 mt-16 pt-8 border-t border-gray-200 dark:border-white/10">
          {[
            { icon: Shield, label: 'Secure & Reliable' },
            { icon: Clock, label: 'Fast Turnaround' },
            { icon: Check, label: 'Satisfaction Guaranteed' },
          ].map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div key={index} className="flex items-center gap-3 text-gray-500 dark:text-white/50">
                <Icon size={20} className="text-orange" strokeWidth={1.5} />
                <span className="font-opensans text-sm">{badge.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
