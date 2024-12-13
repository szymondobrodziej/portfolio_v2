import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const ThemeSwitcher = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="flex items-center space-x-1 rounded-full bg-white px-3 py-1 text-sm font-medium text-gray-700 shadow-md transition-colors hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className="material-icons text-base">
        {isDark ? 'light_mode' : 'dark_mode'}
      </span>
    </motion.button>
  );
};

export default ThemeSwitcher;
