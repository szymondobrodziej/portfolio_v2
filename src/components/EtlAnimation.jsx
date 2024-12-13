import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

const EtlAnimation = () => {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const etlSteps = [
    {
      id: 'extract',
      title: 'Extract',
      description: 'Extracting data from various sources',
      duration: 2000,
      color: 'rgb(59, 130, 246)', // blue-500
    },
    {
      id: 'transform',
      title: 'Transform',
      description: 'Processing and transforming data',
      duration: 2500,
      color: 'rgb(16, 185, 129)', // green-500
    },
    {
      id: 'load',
      title: 'Load',
      description: 'Loading data into target system',
      duration: 2000,
      color: 'rgb(245, 158, 11)', // yellow-500
    }
  ];

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % etlSteps.length);
    }, etlSteps[currentStep].duration);

    return () => clearInterval(interval);
  }, [currentStep, isPlaying]);

  return (
    <div className="relative mx-auto max-w-4xl rounded-xl bg-white/5 p-8 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-6 text-center"
      >
        <h3 className="text-2xl font-bold text-white">ETL Pipeline</h3>
        <p className="text-gray-400">Data Processing Workflow</p>
      </motion.div>

      <div className="relative flex justify-between">
        {etlSteps.map((step, index) => (
          <motion.div
            key={step.id}
            className="relative flex w-1/3 flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <motion.div
              className="mb-4 flex h-16 w-16 items-center justify-center rounded-full"
              style={{
                backgroundColor: currentStep === index ? step.color : 'rgba(255, 255, 255, 0.1)',
                boxShadow: currentStep === index ? `0 0 20px ${step.color}` : 'none'
              }}
            >
              <motion.div
                className="h-8 w-8"
                animate={{
                  scale: currentStep === index ? [1, 1.2, 1] : 1,
                  opacity: currentStep === index ? 1 : 0.5,
                }}
                transition={{
                  duration: 1,
                  repeat: currentStep === index ? Infinity : 0,
                  repeatType: "reverse"
                }}
              >
                {/* Step Icon */}
                {step.id === 'extract' && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                )}
                {step.id === 'transform' && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                )}
                {step.id === 'load' && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                )}
              </motion.div>
            </motion.div>

            <motion.h4
              className="mb-2 text-lg font-semibold text-white"
              animate={{
                opacity: currentStep === index ? 1 : 0.5,
              }}
            >
              {step.title}
            </motion.h4>

            <motion.p
              className="text-center text-sm text-gray-400"
              animate={{
                opacity: currentStep === index ? 1 : 0.5,
              }}
            >
              {step.description}
            </motion.p>

            {index < etlSteps.length - 1 && (
              <motion.div
                className="absolute right-0 top-1/3 h-0.5 w-1/2 -translate-y-1/2 transform"
                style={{
                  background: `linear-gradient(to right, ${etlSteps[index].color}, ${etlSteps[index + 1].color})`,
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              />
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        className="absolute bottom-4 right-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <button
          className="rounded-full p-2 text-gray-400 hover:text-white"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </button>
      </motion.div>
    </div>
  );
};

export default EtlAnimation;
