import { createContext, useContext, useState } from 'react';
import { translations } from '../constants/translations';

const LanguageContext = createContext(null);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === null) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'pl' : 'en');
  };

  const t = (key) => {
    try {
      const keys = key.split('.');
      let value = translations[language];
      for (const k of keys) {
        if (value === undefined) break;
        value = value[k];
      }
      if (value === undefined) {
        console.warn(`Translation missing for key: ${key}`);
        return key;
      }
      return value;
    } catch (error) {
      console.warn(`Error getting translation for key: ${key}`, error);
      return key;
    }
  };

  const value = {
    language,
    toggleLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
