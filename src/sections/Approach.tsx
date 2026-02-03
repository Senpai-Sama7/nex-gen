import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Bot, TrendingUp, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const strategies = [
  {
    icon: Search,
    title: 'Search Engine Optimization',
    subtitle: 'Get Found on Google',
    description: 'We implement schema.org structured data, semantic HTML, and technical SEO so search engines understand exactly what you do and who you serve.',
    benefits: ['Higher Google rankings', 'Rich search results', 'Local pack visibility'],
  },
  {
    icon: Bot,
    title: 'Generative Engine Optimization',
    subtitle: 'Get Recommended by AI',
    description: 'When customers ask ChatGPT or Claude "Who\'s the best contractor in Houston?", your business needs to be in the answer. We optimize for AI recommendation systems.',
    benefits: ['AI assistant citations', 'Voice search answers', 'Future-proof visibility'],
  },
  {
    icon: TrendingUp,
    title: 'Authority Building',
    subtitle: 'Prove Your Expertise',
    description: 'AI systems recommend businesses they trust. We help you build verifiable authority through reviews, certifications, and industry presence.',
    benefits: ['Trust signals', 'Social proof', 'Competitive edge'],
  },
];

const stats = [
  { value: '70%', label: 'of B2B buyers use AI assistants for research' },
  { value: '3x', label: 'more leads from AI-recommended businesses' },
  { value: '90%', label: 'of searches never go past page 1' },
];

const Approach = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      const cards = cardsRef.current?.querySelectorAll('.strategy-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
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

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="approach"
      ref={sectionRef}
      className="relative w-full py-24 lg:py-32 bg-gray-50 dark:bg-dark-100/30 transition-colors duration-500"
    >
      <div className="relative z-10 w-full px-6 lg:px-12 xl:px-24">
        {/* Header */}
        <div ref={headingRef} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-orange/10 border border-orange/30 rounded-full text-orange font-opensans text-sm mb-6">
            Beyond Traditional Web Design
          </span>
          <h2 className="font-teko text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            VISIBILITY <span className="gradient-text">STRATEGY</span>
          </h2>
          <p className="font-opensans text-lg text-gray-600 dark:text-white/60 max-w-3xl mx-auto">
            A beautiful website means nothing if customers can't find you. We build sites optimized 
            for both <strong>search engines</strong> and <strong>AI assistants</strong>—the two ways 
            modern customers discover businesses.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="flex flex-wrap justify-center gap-8 lg:gap-16 mb-16 p-6 bg-white dark:bg-black/50 rounded-2xl border border-gray-200 dark:border-white/10">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-teko text-4xl lg:text-5xl font-bold text-orange">{stat.value}</div>
              <div className="font-opensans text-sm text-gray-500 dark:text-white/50 max-w-[180px]">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Strategy Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {strategies.map((strategy, index) => {
            const Icon = strategy.icon;
            return (
              <div
                key={index}
                className="strategy-card p-8 bg-white dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-2xl hover:border-orange/50 transition-all duration-500"
              >
                <div className="w-14 h-14 bg-orange/10 rounded-xl flex items-center justify-center mb-6">
                  <Icon size={28} className="text-orange" strokeWidth={1.5} />
                </div>
                
                <div className="text-orange font-opensans text-sm font-semibold mb-1">
                  {strategy.subtitle}
                </div>
                <h3 className="font-teko text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {strategy.title}
                </h3>
                <p className="font-opensans text-gray-600 dark:text-white/60 text-sm leading-relaxed mb-6">
                  {strategy.description}
                </p>
                
                <div className="space-y-2">
                  {strategy.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-orange rounded-full" />
                      <span className="font-opensans text-sm text-gray-500 dark:text-white/50">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Explanation */}
        <div className="mt-16 p-8 bg-gradient-to-r from-orange/10 to-orange/5 border border-orange/20 rounded-2xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-orange/20 rounded-full flex items-center justify-center">
                <Globe size={32} className="text-orange" />
              </div>
            </div>
            <div>
              <h4 className="font-teko text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Why This Matters for Your Business
              </h4>
              <p className="font-opensans text-gray-600 dark:text-white/70 leading-relaxed">
                The way customers find businesses is changing. Today, they don't just Google—they ask AI assistants 
                for recommendations. <strong>Businesses that appear in AI answers get 3x more qualified leads</strong> because 
                they come pre-vetted. We build your website AND your digital authority so you show up everywhere 
                customers are looking—now and in the future.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Approach;
