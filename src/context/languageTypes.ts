
// Language types
export type Language = "English" | "Uzbek" | "Russian";

// Define translations interface
export interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

// Context type definition
export interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}
