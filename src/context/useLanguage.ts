
import { useContext } from 'react';
import { LanguageContext } from './LanguageContext';
import { LanguageContextType } from './languageTypes';

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext) as LanguageContextType;
