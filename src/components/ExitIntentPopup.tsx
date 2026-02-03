import { useEffect, useState } from 'react';
import { X, Gift } from 'lucide-react';

const ExitIntentPopup = () => {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 10 && !dismissed) {
        setShow(true);
      }
    };

    // Delay enabling to avoid triggering immediately
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [dismissed]);

  const handleClose = () => {
    setShow(false);
    setDismissed(true);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-dark-100 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-orange to-orange-600 p-6 text-center">
          <Gift className="w-12 h-12 text-white mx-auto mb-3" />
          <h3 className="font-teko text-3xl font-bold text-white">WAIT! FREE GIFT</h3>
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          <h4 className="font-teko text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Get Your Free Website Audit
          </h4>
          <p className="font-opensans text-gray-600 dark:text-white/70 text-sm mb-6">
            We'll analyze your current site and show you exactly how to get more leads. No strings attached.
          </p>

          <a
            href="mailto:ceo@douglasmitchell.info?subject=Free Website Audit Request"
            onClick={handleClose}
            className="block w-full py-3 bg-orange text-white font-opensans font-semibold rounded-xl hover:bg-orange-600 transition-colors mb-3"
          >
            Yes, Audit My Website
          </a>
          <button
            onClick={handleClose}
            className="font-opensans text-sm text-gray-400 hover:text-gray-600 dark:hover:text-white/60"
          >
            No thanks, I don't want more leads
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExitIntentPopup;
