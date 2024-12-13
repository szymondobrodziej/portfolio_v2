import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const DataFlow = ({ currentStep, showError, isPlaying }) => {
  const { isDark } = useTheme();

  const getStepColor = (step) => {
    const colors = {
      extract: 'rgb(59, 130, 246)', // blue-500
      transform: 'rgb(168, 85, 247)', // purple-500
      load: 'rgb(34, 197, 94)' // green-500
    };
    return colors[step] || colors.extract;
  };

  const renderDataPackets = (step) => {
    if (!isPlaying) return null;

    return Array.from({ length: 3 }).map((_, i) => (
      <motion.div
        key={i}
        initial={{ scale: 0, x: '0%', opacity: 0 }}
        animate={{ 
          scale: [0, 1, 1, 0],
          x: ['0%', '33%', '66%', '100%'],
          opacity: [0, 1, 1, 0]
        }}
        transition={{
          duration: 3,
          delay: i * 0.5,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          position: 'absolute',
          left: '20%',
          top: `${45 + (i * 5)}%`,
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: getStepColor(step),
          filter: 'drop-shadow(0 0 4px currentColor)'
        }}
      />
    ));
  };

  const renderErrorParticles = () => {
    if (!showError) return null;

    return Array.from({ length: 8 }).map((_, i) => (
      <motion.div
        key={i}
        initial={{ scale: 1, x: '50%', y: '50%', opacity: 1 }}
        animate={{
          scale: 0,
          x: ['50%', `${50 + Math.cos(i * Math.PI / 4) * 100}%`],
          y: ['50%', `${50 + Math.sin(i * Math.PI / 4) * 100}%`],
          opacity: 0
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatDelay: 0.5
        }}
        style={{
          position: 'absolute',
          left: '40%',
          top: '20%',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: 'rgb(239, 68, 68)', // red-500
          filter: 'drop-shadow(0 0 2px currentColor)'
        }}
      />
    ));
  };

  const renderProcessingIndicator = () => {
    if (currentStep !== 1 || !isPlaying) return null;

    return (
      <motion.div
        className="absolute left-[40%] top-[35%] h-20 w-20"
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 100 100" className="h-full w-full text-purple-500">
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            strokeDasharray="251.2"
            animate={{
              strokeDashoffset: [251.2, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.circle
            cx="50"
            cy="50"
            r="30"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            strokeDasharray="188.4"
            animate={{
              strokeDashoffset: [0, 188.4]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </svg>
      </motion.div>
    );
  };

  return (
    <div className="relative h-full w-full">
      {/* Source Systems */}
      <div className="absolute left-[5%] top-[20%] flex flex-col space-y-2">
        <motion.div
          animate={{
            scale: currentStep === 0 ? 1.1 : 1,
            opacity: currentStep === 0 ? 1 : 0.5,
            boxShadow: currentStep === 0 ? '0 0 15px rgba(59, 130, 246, 0.5)' : 'none'
          }}
          className="h-8 w-32 rounded-md bg-blue-100 p-2 text-center text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
        >
          PostgreSQL
        </motion.div>
        <motion.div
          animate={{
            scale: currentStep === 0 ? 1.1 : 1,
            opacity: currentStep === 0 ? 1 : 0.5,
            boxShadow: currentStep === 0 ? '0 0 15px rgba(59, 130, 246, 0.5)' : 'none'
          }}
          className="h-8 w-32 rounded-md bg-blue-100 p-2 text-center text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
        >
          MongoDB
        </motion.div>
        <motion.div
          animate={{
            scale: currentStep === 0 ? 1.1 : 1,
            opacity: currentStep === 0 ? 1 : 0.5,
            boxShadow: currentStep === 0 ? '0 0 15px rgba(59, 130, 246, 0.5)' : 'none'
          }}
          className="h-8 w-32 rounded-md bg-blue-100 p-2 text-center text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
        >
          S3 Bucket
        </motion.div>
      </div>

      {/* Transform */}
      <motion.div
        animate={{
          scale: currentStep === 1 ? 1.1 : 1,
          opacity: currentStep === 1 ? 1 : 0.5,
          boxShadow: currentStep === 1 ? '0 0 15px rgba(168, 85, 247, 0.5)' : 'none'
        }}
        className="absolute left-[40%] top-[35%] h-20 w-32 rounded-md bg-purple-100 p-2 text-center dark:bg-purple-900/30"
      >
        <div className="mb-1 text-xs font-medium text-purple-700 dark:text-purple-300">
          Transform
        </div>
        {renderProcessingIndicator()}
      </motion.div>

      {/* Target Systems */}
      <div className="absolute right-[5%] top-[20%] flex flex-col space-y-2">
        <motion.div
          animate={{
            scale: currentStep === 2 ? 1.1 : 1,
            opacity: currentStep === 2 ? 1 : 0.5,
            boxShadow: currentStep === 2 ? '0 0 15px rgba(34, 197, 94, 0.5)' : 'none'
          }}
          className="h-8 w-32 rounded-md bg-green-100 p-2 text-center text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300"
        >
          Data Warehouse
        </motion.div>
        <motion.div
          animate={{
            scale: currentStep === 2 ? 1.1 : 1,
            opacity: currentStep === 2 ? 1 : 0.5,
            boxShadow: currentStep === 2 ? '0 0 15px rgba(34, 197, 94, 0.5)' : 'none'
          }}
          className="h-8 w-32 rounded-md bg-green-100 p-2 text-center text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300"
        >
          Data Lake
        </motion.div>
        <motion.div
          animate={{
            scale: currentStep === 2 ? 1.1 : 1,
            opacity: currentStep === 2 ? 1 : 0.5,
            boxShadow: currentStep === 2 ? '0 0 15px rgba(34, 197, 94, 0.5)' : 'none'
          }}
          className="h-8 w-32 rounded-md bg-green-100 p-2 text-center text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300"
        >
          Redis Cache
        </motion.div>
      </div>

      {/* Connection Lines */}
      <svg
        className="absolute inset-0 h-full w-full"
        style={{ zIndex: -1 }}
      >
        {/* Extract to Transform Lines */}
        <motion.path
          d="M 150,80 L 300,120"
          stroke={isDark ? '#4B5563' : '#E5E7EB'}
          strokeWidth="2"
          fill="none"
          strokeDasharray="4 4"
          animate={{
            stroke: currentStep === 0 ? getStepColor('extract') : (isDark ? '#4B5563' : '#E5E7EB')
          }}
        />
        <motion.path
          d="M 150,120 L 300,120"
          stroke={isDark ? '#4B5563' : '#E5E7EB'}
          strokeWidth="2"
          fill="none"
          strokeDasharray="4 4"
          animate={{
            stroke: currentStep === 0 ? getStepColor('extract') : (isDark ? '#4B5563' : '#E5E7EB')
          }}
        />
        <motion.path
          d="M 150,160 L 300,120"
          stroke={isDark ? '#4B5563' : '#E5E7EB'}
          strokeWidth="2"
          fill="none"
          strokeDasharray="4 4"
          animate={{
            stroke: currentStep === 0 ? getStepColor('extract') : (isDark ? '#4B5563' : '#E5E7EB')
          }}
        />

        {/* Transform to Load Lines */}
        <motion.path
          d="M 450,120 L 600,80"
          stroke={isDark ? '#4B5563' : '#E5E7EB'}
          strokeWidth="2"
          fill="none"
          strokeDasharray="4 4"
          animate={{
            stroke: currentStep === 2 ? getStepColor('load') : (isDark ? '#4B5563' : '#E5E7EB')
          }}
        />
        <motion.path
          d="M 450,120 L 600,120"
          stroke={isDark ? '#4B5563' : '#E5E7EB'}
          strokeWidth="2"
          fill="none"
          strokeDasharray="4 4"
          animate={{
            stroke: currentStep === 2 ? getStepColor('load') : (isDark ? '#4B5563' : '#E5E7EB')
          }}
        />
        <motion.path
          d="M 450,120 L 600,160"
          stroke={isDark ? '#4B5563' : '#E5E7EB'}
          strokeWidth="2"
          fill="none"
          strokeDasharray="4 4"
          animate={{
            stroke: currentStep === 2 ? getStepColor('load') : (isDark ? '#4B5563' : '#E5E7EB')
          }}
        />
      </svg>

      {/* Animated Elements */}
      {renderDataPackets(currentStep === 0 ? 'extract' : currentStep === 1 ? 'transform' : 'load')}
      {renderErrorParticles()}
    </div>
  );
};

export default DataFlow;
