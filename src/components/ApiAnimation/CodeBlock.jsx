import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const CodeBlock = ({ code, language = 'json', title }) => {
  const { isDark } = useTheme();

  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    },
    exit: { opacity: 0, y: -20 }
  };

  const lineVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  };

  const lines = code.split('\n');

  return (
    <motion.div
      className="relative rounded-lg overflow-hidden"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {title && (
        <div className="px-4 py-2 bg-gray-800 text-gray-200 font-mono text-sm border-b border-gray-700">
          {title}
        </div>
      )}
      <div className={`p-4 font-mono text-sm ${
        isDark ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-800'
      }`}>
        {lines.map((line, index) => (
          <motion.div
            key={index}
            variants={lineVariants}
            className="flex"
          >
            <span className="select-none opacity-50 w-8 text-right pr-4">
              {index + 1}
            </span>
            <span className="flex-1">
              {line.length === 0 ? <>&nbsp;</> : line}
            </span>
          </motion.div>
        ))}
      </div>
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            'linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)',
            'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 100%)',
            'linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)',
          ],
          backgroundSize: ['200% 200%', '200% 200%', '200% 200%'],
          backgroundPosition: ['-100% -100%', '0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </motion.div>
  );
};

export default CodeBlock;
