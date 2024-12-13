import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const StatusBadge = ({ status, code }) => {
  const { isDark } = useTheme();

  const getStatusColor = () => {
    if (code >= 500) return '#ef4444'; // red
    if (code >= 400) return '#f59e0b'; // amber
    if (code >= 300) return '#3b82f6'; // blue
    return '#22c55e'; // green
  };

  const ringVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.8, 0.4, 0.8],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    exit: { scale: 0.8, opacity: 0 }
  };

  const textVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  return (
    <motion.div
      className="relative flex items-center justify-center"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={status}
          className="relative"
        >
          {/* Outer ring */}
          <motion.div
            className="absolute inset-0"
            style={{
              border: `2px solid ${getStatusColor()}`,
              borderRadius: '9999px',
            }}
            variants={ringVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          />

          {/* Inner circle */}
          <motion.div
            className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: isDark ? 'rgba(31, 41, 55, 0.8)' : 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(4px)',
              border: `2px solid ${getStatusColor()}`,
            }}
          >
            <motion.span
              className="text-2xl"
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {status === 'error' ? '❌' : status === 'processing' ? '⚡️' : '✅'}
            </motion.span>
          </motion.div>

          {/* Status code */}
          {code && (
            <motion.div
              className="absolute -bottom-8 left-1/2 transform -translate-x-1/2"
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <span className={`px-2 py-1 rounded text-sm font-mono ${
                isDark ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-800'
              }`}>
                {code}
              </span>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default StatusBadge;
