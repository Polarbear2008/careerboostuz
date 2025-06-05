
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "./navbar/Logo";
import { DesktopNav } from "./navbar/DesktopNav";
import { MobileMenu } from "./navbar/MobileMenu";
import { AuthButtons } from "./navbar/AuthButtons";
import { LanguageSelector } from "./navbar/LanguageSelector";
import { useIsMobile } from "@/hooks/use-mobile";
import { useScroll } from "@/hooks/use-scroll";
import { useLanguage } from "@/context/useLanguage";

export const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const isScrolled = useScroll({ threshold: 10 });

  // Close mobile menu when switching to desktop view
  useEffect(() => {
    if (!isMobile && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobile, isMobileMenuOpen]);

  const { language } = useLanguage();

  return (
    <>
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-7xl">
        <div className={cn(
          "transition-all duration-300 ease-in-out rounded-full mx-auto",
          isScrolled 
            ? "bg-white/95 backdrop-blur-md border border-gray-200 shadow-lg" 
            : "bg-white/90 backdrop-blur-sm border border-gray-100 shadow-md"
        )}>
          <div className="page-container">
            <div className="flex items-center justify-between h-16 px-6">
              <div className="flex items-center">
                <Logo />
                <div className="hidden lg:flex ml-8">
                  <DesktopNav />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="hidden lg:flex items-center space-x-1">
                  <LanguageSelector />
                  <AuthButtons />
                </div>
                
                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                  className={cn(
                    "lg:hidden p-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50",
                    isMobileMenuOpen 
                      ? "bg-primary/10 text-primary" 
                      : "text-gray-600 hover:bg-gray-100"
                  )}
                >
                  {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
};

export default NavBar;
