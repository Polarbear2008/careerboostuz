
import * as React from "react";
import { createContext, useState, useEffect } from "react";
import { translations } from './translations';
import { Language, LanguageContextType } from './languageTypes';

// Create context with default values
export const LanguageContext = createContext<LanguageContextType>({
  language: "English",
  setLanguage: () => {},
  t: (key: string) => key,
});

// Provider component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("English");

  // Load language preference from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && ["English", "Uzbek", "Russian"].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("language", language);
    // Update document language attribute (always LTR)
    document.documentElement.lang = language === "English" ? "en" : language === "Uzbek" ? "uz" : "ru";
    document.documentElement.dir = "ltr";
    document.body.style.direction = "ltr";
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    // Fallback to English if translation doesn't exist
    if (translations[key] && translations[key]["English"]) {
      return translations[key]["English"];
    }
    // Return the key if no translation exists at all
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Re-export the useLanguage hook from the dedicated file
export { useLanguage } from './useLanguage';
