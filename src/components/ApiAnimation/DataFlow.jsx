import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';

const DataFlow = ({ isPlaying, showError, isProcessing }) => {
  const { isDark } = useTheme();
  const { t } = useLanguage();

  const pathVariants = {
    initial: { pathLength: 0 },
    animate: {
      pathLength: 1,
      transition: {
        duration: isPlaying ? 2 : 0,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
      }
    }
  };

  const particleVariants = {
    initial: { x: '0%', scale: 1, opacity: 1 },
    animate: {
      x: '100%',
      scale: [1, 0.8, 0.8, 1],
      opacity: [1, 0.6, 0.6, 1],
      transition: {
        duration: isPlaying ? 4 : 0,
        ease: "linear",
        repeat: Infinity,
        times: [0, 0.4, 0.6, 1]
      }
    }
  };

  const errorParticleVariants = {
    initial: { x: '0%', y: 0, scale: 1, opacity: 1, background: 'transparent' },
    animate: {
      x: ['0%', '50%', '50%', '0%'],
      y: [0, -10, 10, 0],
      scale: [1, 0.8, 0.8, 1],
      opacity: [1, 0.6, 0.6, 0],
      background: [
        'radial-gradient(circle, rgba(239, 68, 68, 0.5) 0%, transparent 70%)',
        'radial-gradient(circle, rgba(239, 68, 68, 0.3) 0%, transparent 60%)',
        'radial-gradient(circle, rgba(239, 68, 68, 0.2) 0%, transparent 50%)',
        'radial-gradient(circle, transparent 0%, transparent 0%)'
      ],
      transition: {
        duration: isPlaying ? 2 : 0,
        ease: "easeInOut",
        repeat: Infinity
      }
    }
  };

  const serverIconVariants = {
    initial: { scale: 1 },
    processing: {
      scale: [1, 1.05, 1],
      transition: {
        duration: isPlaying ? 1 : 0,
        repeat: Infinity
      }
    }
  };

  const dataPacketVariants = {
    initial: { 
      opacity: 1,
      scale: 1,
      background: 'transparent'
    },
    animate: {
      opacity: [1, 0.6, 0.6, 1],
      scale: [1, 0.8, 0.8, 1],
      background: [
        'radial-gradient(circle, rgba(59, 130, 246, 0.5) 0%, transparent 70%)',
        'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 60%)',
        'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 50%)',
        'radial-gradient(circle, transparent 0%, transparent 0%)'
      ],
      transition: {
        duration: isPlaying ? 2 : 0,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  return (
    <div className="relative h-40 sm:h-60 w-full overflow-hidden rounded-lg bg-gray-50 p-2 sm:p-4 dark:bg-gray-700/50">
      {/* Connection Lines */}
      <svg
        className="absolute h-full w-full"
        viewBox="0 0 800 200"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main Data Path */}
        <motion.path
          d="M 100,100 C 300,100 500,100 700,100"
          stroke={isDark ? '#4B5563' : '#E5E7EB'}
          strokeWidth="2"
          strokeDasharray="4 4"
          variants={pathVariants}
          initial="initial"
          animate={isPlaying ? "animate" : "initial"}
        />

        {/* Response Path */}
        <motion.path
          d="M 700,140 C 500,140 300,140 100,140"
          stroke={isDark ? '#4B5563' : '#E5E7EB'}
          strokeWidth="2"
          strokeDasharray="4 4"
          variants={pathVariants}
          initial="initial"
          animate={isPlaying ? "animate" : "initial"}
        />

        {/* Additional Connection Lines */}
        {isPlaying && !showError && (
          <>
            <motion.path
              d="M 400,100 L 400,140"
              stroke={isDark ? '#4B5563' : '#E5E7EB'}
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </>
        )}
      </svg>

      {/* Data Packets */}
      {isPlaying && !showError && (
        <>
          {/* Request Packets */}
          <motion.div
            className={`absolute left-[12.5%] top-[45%] flex items-center space-x-1`}
            variants={particleVariants}
            initial="initial"
            animate="animate"
          >
            <motion.div
              className={`h-3 w-3 rounded-full ${
                isProcessing ? 'bg-blue-500' : 'bg-green-500'
              }`}
              variants={dataPacketVariants}
            />
            <motion.div
              className={`h-2 w-2 rounded-full ${
                isProcessing ? 'bg-blue-400' : 'bg-green-400'
              }`}
              variants={dataPacketVariants}
            />
            <motion.div
              className={`h-1 w-1 rounded-full ${
                isProcessing ? 'bg-blue-300' : 'bg-green-300'
              }`}
              variants={dataPacketVariants}
            />
          </motion.div>

          {/* Response Packets */}
          <motion.div
            className={`absolute right-[12.5%] top-[65%] flex items-center space-x-1`}
            variants={particleVariants}
            initial="initial"
            animate={{
              x: '-100%',
              transition: {
                duration: 4,
                ease: "linear",
                repeat: Infinity
              }
            }}
          >
            <motion.div
              className={`h-3 w-3 rounded-full ${
                isProcessing ? 'bg-blue-500' : 'bg-green-500'
              }`}
              variants={dataPacketVariants}
            />
            <motion.div
              className={`h-2 w-2 rounded-full ${
                isProcessing ? 'bg-blue-400' : 'bg-green-400'
              }`}
              variants={dataPacketVariants}
            />
            <motion.div
              className={`h-1 w-1 rounded-full ${
                isProcessing ? 'bg-blue-300' : 'bg-green-300'
              }`}
              variants={dataPacketVariants}
            />
          </motion.div>
        </>
      )}

      {/* Error Visualization */}
      {isPlaying && showError && (
        <>
          <motion.div
            className="absolute left-[40%] top-[45%] flex items-center space-x-2"
            variants={errorParticleVariants}
            initial="initial"
            animate="animate"
          >
            <motion.div className="h-4 w-4 rounded-full bg-red-500" />
            <motion.div
              className="whitespace-nowrap rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-600 dark:bg-red-900/30 dark:text-red-400"
            >
              {t('animation.error.status')}
            </motion.div>
          </motion.div>
          <motion.div
            className="absolute left-[45%] top-[55%] flex items-center space-x-2"
            variants={errorParticleVariants}
            initial="initial"
            animate="animate"
            transition={{
              delay: 0.2
            }}
          >
            <motion.div className="h-3 w-3 rounded-full bg-red-400" />
          </motion.div>
          <motion.div
            className="absolute left-[50%] top-[50%] flex items-center space-x-2"
            variants={errorParticleVariants}
            initial="initial"
            animate="animate"
            transition={{
              delay: 0.4
            }}
          >
            <motion.div className="h-2 w-2 rounded-full bg-red-300" />
          </motion.div>
        </>
      )}

      {/* Client Icon */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2">
        <motion.div
          className={`flex h-16 w-16 items-center justify-center rounded-lg ${
            showError
              ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
              : isProcessing
              ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
              : 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
          }`}
          animate={{
            scale: [1, 1.05, 1],
            transition: { duration: 2, repeat: Infinity }
          }}
        >
          <svg
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </motion.div>
      </div>

      {/* Server Icon */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2">
        <motion.div
          className={`flex h-16 w-16 items-center justify-center rounded-lg ${
            showError
              ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
              : isProcessing
              ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
              : 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
          }`}
          variants={serverIconVariants}
          initial="initial"
          animate={isProcessing ? "processing" : "initial"}
        >
          <svg
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
            />
          </svg>
        </motion.div>

        {/* Processing Indicator */}
        {isProcessing && !showError && (
          <motion.div
            className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-white"
            style={{
              background: 'radial-gradient(circle at center, rgba(59, 130, 246, 1) 0%, rgba(59, 130, 246, 0.8) 100%)'
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <motion.div
              className="h-3 w-3 rounded-full border-2 border-white border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </motion.div>
        )}
      </div>

      {/* Processing Status */}
      {isProcessing && !showError && (
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <div className="flex items-center space-x-2 rounded-full bg-blue-100 px-3 py-1 dark:bg-blue-900/30">
            <motion.div
              className="h-2 w-2 rounded-full bg-blue-500"
              animate={{ 
                scale: [1, 1.5, 1],
                background: [
                  'rgba(59, 130, 246, 1)',
                  'rgba(59, 130, 246, 0.8)',
                  'rgba(59, 130, 246, 1)'
                ]
              }}
              transition={{ 
                duration: 1, 
                repeat: Infinity,
                times: [0, 0.5, 1]
              }}
            />
            <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
              {t('animation.processing')}
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DataFlow;
