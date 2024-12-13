import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
      className="flex items-center space-x-1 rounded-full bg-white px-3 py-1 text-sm font-medium text-gray-700 shadow-md transition-colors hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
    >
      <span className="material-icons text-base">language</span>
      <span>{language === 'en' ? 'PL' : 'EN'}</span>
    </motion.button>
  );
};

export default LanguageSwitcher;
