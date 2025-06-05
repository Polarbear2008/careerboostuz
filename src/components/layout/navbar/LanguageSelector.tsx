
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/useLanguage";
import { Language } from "@/context/languageTypes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  const languages: {code: Language, label: string}[] = [
    { code: "English", label: "English" },
    { code: "Uzbek", label: "Uzbek" },
    { code: "Russian", label: "Russian" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-foreground/80 hover:text-primary transition-colors relative rounded-full hover:bg-white/70 hover:shadow-sm"
        >
          <Globe className="h-5 w-5 transition-transform hover:rotate-12 duration-300" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse shadow-sm" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="animate-fadeIn w-36 overflow-hidden p-1 bg-white/90 backdrop-blur-md border border-white/50 shadow-elegant">
        {languages.map((lang) => (
          <DropdownMenuItem 
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={cn(
              "cursor-pointer transition-all duration-200 rounded-md my-0.5",
              language === lang.code 
                ? "bg-gradient-to-r from-primary/15 to-secondary/15 font-medium text-primary" 
                : "hover:bg-white hover:shadow-sm hover:text-primary"
            )}
          >
            <span className="flex items-center gap-2">
              {lang.label}
              {language === lang.code && (
                <span className="h-1.5 w-1.5 rounded-full bg-primary/80"></span>
              )}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
