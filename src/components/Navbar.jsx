import { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher';
import { navLinks } from '../constants';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-lg dark:bg-gray-900/80' : 'bg-transparent'
      }`}
    >
      <div className="container-padding mx-auto">
        <div className="flex h-16 items-center justify-between">
          <ScrollLink
            to="hero"
            spy={true}
            smooth={true}
            offset={-100}
            duration={500}
            className="cursor-pointer"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-bold gradient-text"
            >
              szymon-dobrodziej
            </motion.div>
          </ScrollLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navLinks.map((link) => (
              <ScrollLink
                key={link.id}
                to={link.id}
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                className="cursor-pointer text-sm font-medium text-gray-600 transition-colors hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400"
              >
                {t(link.title)}
              </ScrollLink>
            ))}
            <div className="flex items-center space-x-4">
              <ThemeSwitcher />
              <LanguageSwitcher />
            </div>
          </div>

          {/* Mobile Navigation Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <ThemeSwitcher />
            <LanguageSwitcher />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400"
              aria-label="Toggle mobile menu"
            >
              <span className="material-icons">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden"
            >
              <div className="space-y-4 px-4 pb-6">
                {navLinks.map((link) => (
                  <ScrollLink
                    key={link.id}
                    to={link.id}
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={500}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block cursor-pointer text-sm font-medium text-gray-600 transition-colors hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400"
                  >
                    {t(link.title)}
                  </ScrollLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
