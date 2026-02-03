import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, PenTool, Code, Rocket, type LucideIcon } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ProcessStep {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
  details: string[];
}

const processSteps: ProcessStep[] = [
  {
    number: '01',
    icon: Search,
    title: 'Discovery',
    description:
      'We dive deep into understanding your business, goals, target audience, and competitive landscape.',
    details: [
      'Business analysis & goal setting',
      'Competitor research',
      'User persona development',
      'Technical requirements gathering',
    ],
  },
  {
    number: '02',
    icon: PenTool,
    title: 'Design',
    description:
      'We create stunning, conversion-focused designs that reflect your brand and speak to your customers.',
    details: [
      'Wireframing & prototyping',
      'Visual design & branding',
      'User experience optimization',
      'Client feedback & refinement',
    ],
  },
  {
    number: '03',
    icon: Code,
    title: 'Development',
    description:
      'We build your website with clean, performant code using modern technologies and best practices.',
    details: [
      'Frontend & backend development',
      'Responsive implementation',
      'Performance optimization',
      'SEO & accessibility setup',
    ],
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Launch',
    description:
      'We deploy your website and provide ongoing support to ensure continued success.',
    details: [
      'Quality assurance testing',
      'Server deployment & setup',
      'Analytics & tracking integration',
      'Training & documentation',
    ],
  },
];

const Process = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
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

      // Steps animation with stagger
      const steps = stepsRef.current?.querySelectorAll('.process-step');
      if (steps) {
        steps.forEach((step, index) => {
          gsap.fromTo(
            step,
            { x: index % 2 === 0 ? -60 : 60, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: step,
                start: 'top 95%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }

      // Progress line animation
      if (progressRef.current) {
        gsap.fromTo(
          progressRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: stepsRef.current,
              start: 'top 70%',
              end: 'bottom 50%',
              scrub: 1,
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
      id="process"
      ref={sectionRef}
      className="relative min-h-screen w-full py-24 lg:py-32 bg-gray-50 dark:bg-black transition-colors duration-500"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-black dark:via-dark-100 dark:to-black z-0" />

      <div className="relative z-10 w-full px-6 lg:px-12 xl:px-24">
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 bg-orange/10 border border-orange/30 rounded-full text-orange font-opensans text-sm mb-6">
            How We Work
          </span>
          <h2 className="font-teko text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            OUR
            <span className="gradient-text"> PROCESS</span>
          </h2>
          <p className="font-opensans text-lg text-gray-600 dark:text-white/60 max-w-2xl mx-auto">
            A proven four-step approach that delivers exceptional results. From
            initial discovery to successful launch, we're with you every step.
          </p>
        </div>

        {/* Process Steps */}
        <div ref={stepsRef} className="relative max-w-5xl mx-auto">
          {/* Progress Line */}
          <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-white/10 hidden md:block">
            <div
              ref={progressRef}
              className="absolute inset-x-0 top-0 bg-orange origin-top"
              style={{ height: '100%' }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-16 lg:space-y-24">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`process-step relative flex flex-col md:flex-row items-start gap-8 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`flex-1 ${
                      isEven ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'
                    }`}
                  >
                    <div
                      className={`inline-flex items-center gap-4 mb-4 ${
                        isEven ? 'md:flex-row-reverse' : ''
                      }`}
                    >
                      <span className="font-teko text-6xl lg:text-7xl font-bold text-orange/30">
                        {step.number}
                      </span>
                      <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center">
                        <Icon size={24} className="text-orange" strokeWidth={1.5} />
                      </div>
                    </div>
                    <h3 className="font-teko text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                      {step.title}
                    </h3>
                    <p className="font-opensans text-gray-600 dark:text-white/60 leading-relaxed mb-6">
                      {step.description}
                    </p>
                    <ul
                      className={`space-y-2 ${
                        isEven ? 'md:text-right' : 'md:text-left'
                      }`}
                    >
                      {step.details.map((detail, i) => (
                        <li
                          key={i}
                          className={`flex items-center gap-2 text-gray-500 dark:text-white/50 text-sm ${
                            isEven ? 'md:flex-row-reverse' : ''
                          }`}
                        >
                          <span className="w-1.5 h-1.5 bg-orange rounded-full flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Center Node */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-16 h-16 items-center justify-center">
                    <div className="w-4 h-4 bg-orange rounded-full shadow-glow" />
                    <div className="absolute w-8 h-8 bg-orange/20 rounded-full animate-ping" />
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="flex-1 hidden md:block" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline Stats */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { value: '2-4', label: 'Weeks Discovery' },
            { value: '3-6', label: 'Weeks Design' },
            { value: '4-8', label: 'Weeks Development' },
            { value: '1', label: 'Week Launch' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-teko text-4xl lg:text-5xl font-bold text-orange mb-2">
                {stat.value}
              </div>
              <div className="font-opensans text-sm text-gray-500 dark:text-white/50">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
