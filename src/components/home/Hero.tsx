import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/shared/SearchBar";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Link, useNavigate } from "react-router-dom";

export const Hero = () => {
  const [activeTab, setActiveTab] = useState<"talent" | "projects">("talent");
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const handleSearch = (searchValue: string) => {
    if (activeTab === "talent") {
      // Navigate to find talent page with search query
      navigate(`/find-talent?search=${encodeURIComponent(searchValue)}`);
    } else {
      // Navigate to find work page with search query
      navigate(`/find-work?search=${encodeURIComponent(searchValue)}`);
    }
  };
  
  return (
    <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-32">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-secondary/10 rounded-full filter blur-3xl" />
      </div>
      
      <div className="page-container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="animate-fadeIn">
            <span className="inline-block px-3 py-1 rounded-full text-sm bg-muted font-medium mb-6">
              {t("hero.tagline")}
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              {t("hero.heading.1")}{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                {t("hero.heading.2")}
              </span>{" "}
              {t("hero.heading.3")}
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t("hero.description")}
            </p>
          </div>
          
          <div className="animate-slideUp delay-100">
            <div className="bg-white/80 backdrop-blur-sm shadow-soft rounded-2xl p-2 mb-8 inline-flex">
              <Button
                variant={activeTab === "talent" ? "default" : "ghost"}
                onClick={() => setActiveTab("talent")}
                className="rounded-xl"
              >
                {t("hero.findTalent")}
              </Button>
              <Button
                variant={activeTab === "projects" ? "default" : "ghost"}
                onClick={() => setActiveTab("projects")}
                className="rounded-xl"
              >
                {t("hero.findProjects")}
              </Button>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <SearchBar 
                placeholder={activeTab === "talent" 
                  ? t("hero.searchTalent") 
                  : t("hero.searchProjects")
                }
                className="mb-4"
                onSearch={handleSearch}
              />
              
              <div className="flex flex-wrap gap-2 justify-center mt-4">
                <span className="text-sm text-muted-foreground">{t("hero.popular")}</span>
                {activeTab === "talent" ? (
                  <>
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="h-auto p-0"
                      onClick={() => handleSearch("Web Development")}
                    >
                      Web Development
                    </Button>
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="h-auto p-0"
                      onClick={() => handleSearch("UI/UX Design")}
                    >
                      UI/UX Design
                    </Button>
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="h-auto p-0"
                      onClick={() => handleSearch("Data Science")}
                    >
                      Data Science
                    </Button>
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="h-auto p-0"
                      onClick={() => handleSearch("Content Writing")}
                    >
                      Content Writing
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="h-auto p-0"
                      onClick={() => handleSearch("Mobile App")}
                    >
                      Mobile App
                    </Button>
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="h-auto p-0"
                      onClick={() => handleSearch("Website Redesign")}
                    >
                      Website Redesign
                    </Button>
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="h-auto p-0"
                      onClick={() => handleSearch("Logo Design")}
                    >
                      Logo Design
                    </Button>
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="h-auto p-0"
                      onClick={() => handleSearch("Marketing")}
                    >
                      Marketing
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-8 animate-slideUp delay-200">
            <Link to="/find-work">
              <Button className="gradient-btn">
                Browse All Jobs <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 animate-slideUp delay-200 flex flex-col sm:flex-row items-center justify-center gap-3">
            <span className="flex items-center text-sm">
              <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-primary" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </span>
              {t("hero.verified")}
            </span>
            <span className="hidden sm:block">•</span>
            <span className="flex items-center text-sm">
              <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-primary" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </span>
              {t("hero.securePayments")}
            </span>
            <span className="hidden sm:block">•</span>
            <span className="flex items-center text-sm">
              <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-primary" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </span>
              {t("hero.support")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
