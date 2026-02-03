import { useEffect, useState } from 'react';
import { Phone } from 'lucide-react';

const FloatingCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <a
      href="tel:+18329477028"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 bg-orange text-white font-opensans font-semibold rounded-full shadow-lg shadow-orange/30 hover:bg-orange-600 hover:scale-105 transition-all duration-300 animate-in slide-in-from-bottom-4"
    >
      <Phone size={18} />
      <span className="hidden sm:inline">Free Consultation</span>
    </a>
  );
};

export default FloatingCTA;
