
import { useEffect } from "react";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import JobCategories from "@/components/home/JobCategories";
import FeaturedFreelancers from "@/components/home/FeaturedFreelancers";
import HowItWorks from "@/components/home/HowItWorks";
import { RecentJobs } from "@/components/home/RecentJobs";
import { useLanguage } from "@/context/LanguageContext";

const Index = () => {
  const { t } = useLanguage();
  
  // For demo purposes
  const recentJobs = [
    {
      id: "j1",
      title: "Senior React Developer Needed for E-commerce Platform",
      company: "TechSolutions Inc.",
      location: "Remote",
      description: "Looking for an experienced React developer to lead the frontend development of our e-commerce platform. The ideal candidate will have experience with Redux, GraphQL, and modern React patterns.",
      budget: "$80-100/hr",
      skills: ["React", "Redux", "GraphQL", "TypeScript", "E-commerce"],
      postedAt: "2 days ago"
    },
    {
      id: "j2",
      title: "Brand Identity Design for Tech Startup",
      company: "InnovateTech",
      location: "Remote",
      description: "We're a new tech startup looking for a talented designer to create our brand identity including logo, color palette, typography, and basic brand guidelines.",
      budget: "$2,000-3,000",
      skills: ["Logo Design", "Branding", "Identity Design", "Adobe Creative Suite"],
      postedAt: "1 day ago"
    },
    {
      id: "j3",
      title: "Content Writer for SaaS Blog Articles",
      company: "SaaSify",
      location: "Remote",
      description: "Seeking a skilled content writer to create engaging, SEO-optimized blog articles related to SaaS, productivity, and remote work. Must have experience writing for B2B tech audiences.",
      budget: "$50-70/hr",
      skills: ["Content Writing", "SEO", "B2B", "SaaS", "Technology"],
      postedAt: "3 days ago"
    }
  ];

  // Smooth scroll to sections
  useEffect(() => {
    const handleScrollToHash = () => {
      const { hash } = window.location;
      if (hash) {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    handleScrollToHash();
    window.addEventListener("hashchange", handleScrollToHash);
    
    return () => {
      window.removeEventListener("hashchange", handleScrollToHash);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        <Hero />
        
        <JobCategories />
        
        <section className="section-padding">
          <div className="page-container">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10 animate-slideDown">
              <div>
                <h2 className="text-3xl font-bold mb-3">{t("jobs.title")}</h2>
                <p className="text-muted-foreground">{t("jobs.subtitle")}</p>
              </div>
              <a href="/find-work" className="group inline-flex items-center text-primary font-medium">
                {t("jobs.browseAll")}
                <svg 
                  viewBox="0 0 24 24" 
                  className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
            
            <RecentJobs />
          </div>
        </section>
        
        <FeaturedFreelancers />
        
        <HowItWorks />
        
        <section className="section-padding bg-primary/5 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-30">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl animate-float" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '1s' }} />
          </div>
          
          <div className="page-container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fadeIn">{t("cta.title")}</h2>
              <p className="text-lg text-muted-foreground mb-8 animate-fadeIn" style={{ animationDelay: '100ms' }}>
                {t("cta.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slideUp" style={{ animationDelay: '200ms' }}>
                <a href="/signup" className="inline-flex items-center justify-center rounded-lg px-8 py-3 font-medium bg-gradient-to-r from-primary to-secondary text-white shadow-sm hover:opacity-90 transition-opacity">
                  {t("cta.signupFree")}
                </a>
                <a href="#how-it-works" className="inline-flex items-center justify-center rounded-lg px-8 py-3 font-medium border border-foreground/10 bg-background/80 backdrop-blur-sm shadow-sm hover:bg-foreground/5 transition-colors">
                  {t("cta.learnMore")}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
