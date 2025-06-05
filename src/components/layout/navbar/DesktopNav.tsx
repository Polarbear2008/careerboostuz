import { Link } from "react-router-dom";
import { Briefcase, Compass, FileText, PlusCircle, Users } from "lucide-react";
import { useLanguage } from "@/context/useLanguage";
import { cn } from "@/lib/utils";

export const DesktopNav = () => {
  const { t, language } = useLanguage();
  const isEnglish = language === "English";
  
  // Navigation items with full text for all languages
  const navItems = [
    { 
      to: "/find-talent", 
      icon: Users, 
      text: t("nav.findTalent.full"),
      fullText: t("nav.findTalent.full")
    },
    { 
      to: "/find-work", 
      icon: Briefcase, 
      text: t("nav.findWork.full"),
      fullText: t("nav.findWork.full")
    },
    { 
      to: "/post-project", 
      icon: PlusCircle, 
      text: t("nav.postJob.full"),
      fullText: t("nav.postJob.full")
    },
    { 
      to: "/cv-creator", 
      icon: FileText, 
      text: t("nav.cvCreator.full"),
      fullText: t("nav.cvCreator.full")
    },
    { 
      to: "/career-test", 
      icon: Compass, 
      text: t("nav.careerTest.full"),
      fullText: t("nav.careerTest.full")
    }
  ];
  
  return (
    <nav className="flex items-center space-x-1">
      {navItems.map((item) => (
        <Link 
          key={item.to}
          to={item.to} 
          className={cn(
            "group px-3 py-2.5 text-sm font-medium rounded-md transition-all duration-200 flex items-center space-x-2",
            "text-gray-700 hover:text-primary hover:bg-gray-50",
            "relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5",
            "after:bg-primary after:transition-all after:duration-300 hover:after:w-4/5",
            !isEnglish && "has-tooltip"
          )}
          title={!isEnglish ? item.fullText : undefined}
        >
          <item.icon className="h-4 w-4 flex-shrink-0" />
          <span className="whitespace-nowrap">{item.text}</span>
        </Link>
      ))}
    </nav>
  );
};
