
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FileText, Compass, Users, Briefcase, FilePlus, User, LogIn, UserPlus } from "lucide-react";
import { useLanguage } from "@/context/useLanguage";
import { useAuth } from "@/context/AuthContext";

interface MobileMenuProps {
  isOpen: boolean;
  onClose?: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { language, setLanguage, t } = useLanguage();
  const { user, signOut } = useAuth();

  if (!isOpen) return null;

  return (
    <div 
      className="lg:hidden fixed inset-0 top-16 bg-white/95 backdrop-blur-md shadow-md animate-slideDown overflow-y-auto"
      onClick={onClose}
    >
      <div className="flex flex-col p-5 space-y-5" onClick={e => e.stopPropagation()}>
        <Link 
          to="/find-talent" 
          className="flex items-center gap-3 py-3 px-5 rounded-lg text-base font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow-sm"
          onClick={onClose}
        >
          <Users className="h-5 w-5" />
          {t("nav.findTalent")}
        </Link>
        
        <Link 
          to="/find-work" 
          className="flex items-center gap-3 py-3 px-5 rounded-lg text-base font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow-sm"
          onClick={onClose}
        >
          <Briefcase className="h-5 w-5" />
          {t("nav.findWork")}
        </Link>
        
        <Link 
          to="/post-project" 
          className="flex items-center gap-3 py-3 px-5 rounded-lg text-base font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow-sm"
          onClick={onClose}
        >
          <FilePlus className="h-5 w-5" />
          Post a Project
        </Link>
        
        <Link 
          to="/cv-creator" 
          className="flex items-center gap-3 py-3 px-5 rounded-lg text-base font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow-sm"
          onClick={onClose}
        >
          <FileText className="h-5 w-5" />
          CV Creator
        </Link>
        
        <Link 
          to="/career-test" 
          className="flex items-center gap-3 py-3 px-5 rounded-lg text-base font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow-sm"
          onClick={onClose}
        >
          <Compass className="h-5 w-5" />
          {t("nav.careerTest")}
        </Link>
        
        {/* Language selector in mobile menu */}
        <div className="py-3 border-t border-gray-100">
          <p className="text-base text-muted-foreground mb-3">{t("nav.language")}</p>
          <div className="flex gap-3">
            <button 
              onClick={() => setLanguage("English")}
              className={cn(
                "py-2 px-4 rounded-md text-base font-medium transition-colors",
                language === "English" 
                  ? "bg-primary/10 text-primary" 
                  : "hover:bg-muted"
              )}
            >
              English
            </button>
            <button 
              onClick={() => setLanguage("Uzbek")}
              className={cn(
                "py-2 px-4 rounded-md text-base font-medium transition-colors",
                language === "Uzbek" 
                  ? "bg-primary/10 text-primary" 
                  : "hover:bg-muted"
              )}
            >
              Uzbek
            </button>
            <button 
              onClick={() => setLanguage("Russian")}
              className={cn(
                "py-2 px-4 rounded-md text-base font-medium transition-colors",
                language === "Russian" 
                  ? "bg-primary/10 text-primary" 
                  : "hover:bg-muted"
              )}
            >
              Russian
            </button>
          </div>
        </div>
        
        <div className="pt-4 flex flex-col space-y-3">
          {user ? (
            <>
              <Button 
                variant="outline" 
                className="w-full justify-start font-medium text-base py-6"
                asChild
              >
                <Link 
                to="/profile" 
                className="flex items-center gap-2"
                onClick={onClose}
              >
                  <User className="h-5 w-5" />
                  Profile
                </Link>
              </Button>
              <Button 
                className="w-full justify-start font-medium shadow-soft bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-base py-6"
                onClick={() => {
                  signOut();
                  onClose?.();
                }}
              >
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline" 
                className="w-full justify-start font-medium text-base py-6"
                asChild
              >
                <Link 
                  to="/login" 
                  className="flex items-center gap-2"
                  onClick={onClose}
                >
                  <LogIn className="h-5 w-5" />
                  {t("nav.login")}
                </Link>
              </Button>
              <Button 
                className="w-full justify-start font-medium shadow-soft bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-base py-6"
                asChild
              >
                <Link 
                  to="/signup" 
                  className="flex items-center gap-2"
                  onClick={onClose}
                >
                  <UserPlus className="h-5 w-5" />
                  {t("nav.signup")}
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
