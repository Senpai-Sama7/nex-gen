import { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';

const locations = ['Houston', 'Katy', 'Sugar Land', 'The Woodlands', 'Pearland', 'Cypress', 'Spring', 'Pasadena'];
const industries = ['metal fabrication', 'oilfield services', 'HVAC', 'plumbing', 'medical practice', 'construction'];

const SocialProofToast = () => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState({ location: '', industry: '' });

  useEffect(() => {
    const showToast = () => {
      const location = locations[Math.floor(Math.random() * locations.length)];
      const industry = industries[Math.floor(Math.random() * industries.length)];
      setMessage({ location, industry });
      setShow(true);
      setTimeout(() => setShow(false), 4000);
    };

    // First toast after 15 seconds
    const initialTimer = setTimeout(showToast, 15000);
    // Then every 30-45 seconds
    const interval = setInterval(showToast, 30000 + Math.random() * 15000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-24 left-6 z-40 max-w-xs bg-white dark:bg-dark-100 border border-gray-200 dark:border-white/10 rounded-xl shadow-lg p-4 animate-in slide-in-from-left-4 duration-300">
      <div className="flex items-start gap-3">
        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-opensans text-sm text-gray-900 dark:text-white">
            A <strong>{message.industry}</strong> company in <strong>{message.location}</strong> just requested a quote
          </p>
          <p className="font-opensans text-xs text-gray-500 dark:text-white/50 mt-1">
            Just now
          </p>
        </div>
      </div>
    </div>
  );
};

export default SocialProofToast;
