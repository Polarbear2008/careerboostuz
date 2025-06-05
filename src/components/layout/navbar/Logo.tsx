
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/useLanguage";

export const Logo = () => {
  const { language } = useLanguage();
  
  // Determine which logo to use based on language
  const getLogoPath = () => {
    switch(language) {
      case 'Russian':
        return '/careerboost-logo-ru.png';
      case 'Uzbek':
        return '/careerboost-logo-uz.png';
      default:
        return '/careerboost-logo.png';
    }
  };

  return (
    <Link 
      to="/" 
      className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 rounded-xl transition-all duration-300 p-1.5 -m-1.5 mr-2"
      aria-label="Home"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300" />
        <img 
          src={getLogoPath()} 
          alt="" 
          className="relative z-10 h-9 w-auto transition-all duration-300 group-hover:scale-110"
          aria-hidden="true"
          onError={(e) => {
            // Fallback to default logo if language-specific logo doesn't exist
            if (e.currentTarget.src !== '/careerboost-logo.png') {
              e.currentTarget.src = '/careerboost-logo.png';
            }
          }}
        />
      </div>
    </Link>
  );
};
