import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.pageYOffset / totalScroll) * 100;
      setScrollProgress(currentProgress);
      setShowScrollButton(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <div className="fixed right-0 top-0 z-40 h-1 w-full bg-gray-200 dark:bg-gray-800">
        <motion.div
          className="h-full bg-primary-500"
          style={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      <AnimatePresence>
        {showScrollButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-primary-500 text-white shadow-lg transition-colors hover:bg-primary-600"
            aria-label="Scroll to top"
          >
            <svg 
              className="h-6 w-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 10l7-7m0 0l7 7m-7-7v18" 
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default ScrollProgress;
