import { useEffect, useRef, lazy, Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Hero from './sections/Hero';
import Navigation from './components/Navigation';
import ParticleField from './components/ParticleField';
import IntroOverlay from './components/IntroOverlay';
import FloatingCTA from './components/FloatingCTA';
import ExitIntentPopup from './components/ExitIntentPopup';
import SocialProofToast from './components/SocialProofToast';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import { useTheme } from './hooks/useTheme';
import './App.css';

// Lazy load below-fold sections
const Industries = lazy(() => import('./sections/Industries'));
const Approach = lazy(() => import('./sections/Approach'));
const Services = lazy(() => import('./sections/Services'));
const Process = lazy(() => import('./sections/Process'));
const Testimonials = lazy(() => import('./sections/Testimonials'));
const About = lazy(() => import('./sections/About'));
const FAQ = lazy(() => import('./sections/FAQ'));
const Contact = lazy(() => import('./sections/Contact'));

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const SectionFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-orange border-t-transparent rounded-full animate-spin" />
  </div>
);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const { mounted } = useTheme();
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);
  const [introComplete, setIntroComplete] = useState(false);

  // Check current path for routing
  const path = window.location.pathname;
  const isPrivacyPolicy = path === '/privacy-policy';
  const isTermsOfService = path === '/terms-of-service';
  const isSitemap = path === '/sitemap.xml';

  // Redirect sitemap.xml to the actual sitemap file
  if (isSitemap) {
    window.location.href = '/sitemap.xml';
    return null;
  }

  // Render standalone pages without the main layout
  if (isPrivacyPolicy) {
    return <PrivacyPolicy />;
  }

  if (isTermsOfService) {
    return <TermsOfService />;
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>('.snap-section');
      
      sections.forEach((section) => {
        const st = ScrollTrigger.create({
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => {
            gsap.to(window, {
              duration: 1,
              scrollTo: { y: section, offsetY: 0 },
              ease: 'power2.inOut',
            });
          },
        });
        scrollTriggersRef.current.push(st);
      });
    }, mainRef);

    return () => {
      scrollTriggersRef.current.forEach(st => st.kill());
      scrollTriggersRef.current = [];
      ctx.revert();
    };
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-10 h-10 bg-orange rounded-lg flex items-center justify-center">
          <span className="font-teko text-2xl font-bold text-white">N</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {!introComplete && <IntroOverlay onComplete={() => setIntroComplete(true)} />}
      <FloatingCTA />
      <ExitIntentPopup />
      <SocialProofToast />
      <div ref={mainRef} className="relative min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white overflow-x-hidden transition-colors duration-500">
        {/* Background Particle Field */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Canvas
            camera={{ position: [0, 0, 50], fov: 75 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true }}
          >
            <ParticleField />
          </Canvas>
        </div>

        {/* Noise Overlay */}
        <div className="fixed inset-0 z-[1] pointer-events-none noise-overlay" />

        {/* Navigation */}
        <Navigation />

        {/* Main Content */}
        <main className="relative z-10">
          <Hero />
          <Suspense fallback={<SectionFallback />}>
            <Industries />
            <Approach />
            <Services />
            <Process />
            <Testimonials />
            <About />
            <FAQ />
            <Contact />
          </Suspense>
        </main>
      </div>
    </>
  );
}

export default App;
