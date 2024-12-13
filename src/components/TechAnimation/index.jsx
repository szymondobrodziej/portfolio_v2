import { Suspense } from 'react';
import { motion } from 'framer-motion';
import Scene from './Scene';

const LoadingFallback = () => (
  <div className="flex h-[600px] w-full items-center justify-center">
    <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-primary-500" />
  </div>
);

const TechAnimation = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative w-full"
    >
      <Suspense fallback={<LoadingFallback />}>
        <Scene />
      </Suspense>
      
      {/* Gradient Overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-transparent to-white/20" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-white/20" />
      
      {/* Tech Labels */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="grid grid-cols-3 gap-8">
          {['React', 'Node.js', 'Python', 'TypeScript', 'JavaScript'].map((tech) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: Math.random() }}
              className="text-center"
            >
              <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                {tech}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TechAnimation;
