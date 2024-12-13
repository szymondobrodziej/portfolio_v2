import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import ApiAnimation from '../components/ApiAnimation';
import EtlAnimation from '../components/EtlAnimation/EtlAnimation';

const Hero = () => {
  const { t, language } = useLanguage();

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 px-4 pb-32 pt-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <motion.div
            key={`intro-${language}`}
            className="mb-12 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-4">
              <motion.p
                className="text-xl text-primary-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {t('hero.greetings')}
              </motion.p>
              
              <motion.h1
                className="text-5xl font-bold text-white md:text-6xl lg:text-7xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {t('hero.name')}
              </motion.h1>
              
              <motion.h2
                className="text-2xl font-medium text-gray-400 md:text-3xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {t('hero.role')}
              </motion.h2>
              
              <motion.p
                className="mx-auto max-w-2xl text-lg text-gray-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {t('hero.description')}
              </motion.p>
            </div>

            <motion.div
              className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <a
                href="#contact"
                className="rounded-lg bg-primary-500 px-8 py-3 text-lg font-medium text-white transition-colors hover:bg-primary-600"
              >
                {t('hero.contact')}
              </a>
              <a
                href="#projects"
                className="rounded-lg border border-gray-700 bg-transparent px-8 py-3 text-lg font-medium text-white transition-colors hover:bg-gray-800"
              >
                {t('hero.projects')}
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* API and ETL Animations */}
        <motion.div
          className="relative mx-auto max-w-5xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* API Animation */}
          <div className="relative z-10">
            <ApiAnimation />
          </div>
          
          {/* ETL Animation */}
          <div className="relative z-10 mt-16">
            <EtlAnimation />
          </div>
          
          {/* Background Glow Effects */}
          <motion.div
            className="absolute -top-20 left-1/4 h-40 w-40 rounded-full bg-primary-500/20 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-20 right-1/4 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 transform text-center text-gray-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p className="mb-2">{t('hero.scroll')}</p>
          <motion.div
            className="h-6 w-4 rounded-full border-2 border-gray-400"
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <motion.div
              className="mx-auto h-2 w-1 rounded-full bg-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
