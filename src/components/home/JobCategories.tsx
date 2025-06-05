
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

interface Category {
  id: string;
  name: string;
  count: number;
  icon: React.ReactNode;
}

export const JobCategories = () => {
  const { t } = useLanguage();
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  
  const categories: Category[] = [
    {
      id: "design",
      name: "Design & Creative",
      count: categoryCounts.design || 0,
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"></path>
          <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
          <path d="M12 2v2"></path>
          <path d="M12 22v-2"></path>
          <path d="M20 12h-2"></path>
          <path d="M4 12h2"></path>
          <path d="M3.93 3.93l1.41 1.41"></path>
          <path d="M18.66 18.66l-1.41-1.41"></path>
          <path d="M3.93 20.07l1.41-1.41"></path>
          <path d="M18.66 5.34l-1.41 1.41"></path>
        </svg>
      ),
    },
    {
      id: "webdev",
      name: "Development & IT",
      count: categoryCounts.webdev || 0,
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      ),
    },
    {
      id: "marketing",
      name: "Marketing",
      count: categoryCounts.marketing || 0,
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20V10"></path>
          <path d="M18 20V4"></path>
          <path d="M6 20v-6"></path>
        </svg>
      ),
    },
    {
      id: "writing",
      name: "Writing & Translation",
      count: categoryCounts.writing || 0,
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
          <path d="M2 2l7.586 7.586"></path>
          <circle cx="11" cy="11" r="2"></circle>
        </svg>
      ),
    },
    {
      id: "admin",
      name: "Admin & Customer Support",
      count: categoryCounts.admin || 0,
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      ),
    },
    {
      id: "finance",
      name: "Finance & Accounting",
      count: categoryCounts.finance || 0,
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="16"></line>
          <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>
      ),
    },
    {
      id: "legal",
      name: "Legal",
      count: categoryCounts.legal || 0,
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      ),
    },
    {
      id: "engineering",
      name: "Engineering & Architecture",
      count: categoryCounts.engineering || 0,
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
          <polyline points="2 17 12 22 22 17"></polyline>
          <polyline points="2 12 12 17 22 12"></polyline>
        </svg>
      ),
    },
  ];

  useEffect(() => {
    const fetchCategoryCounts = async () => {
      try {
        const { data: projects, error } = await supabase
          .from("projects")
          .select("category");
        
        if (error) {
          console.error("Error fetching category counts:", error);
          return;
        }

        // Count projects by category
        const counts: Record<string, number> = {};
        projects?.forEach(project => {
          const category = project.category || 'other';
          counts[category] = (counts[category] || 0) + 1;
        });

        setCategoryCounts(counts);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryCounts();
  }, []);

  return (
    <section className="section-padding">
      <div className="page-container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10 animate-slideDown">
          <div>
            <h2 className="text-3xl font-bold mb-3">{t("categories.title")}</h2>
            <p className="text-muted-foreground">{t("categories.subtitle")}</p>
          </div>
          <a href="/find-work" className="group inline-flex items-center text-primary font-medium">
            {t("categories.viewAll")}
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <a
              key={category.id}
              href={`/find-work?category=${category.id}`}
              className="group p-6 rounded-lg border hover-lift transition-all bg-card animate-fadeIn"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                {category.icon}
              </div>
              <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                {category.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {loading ? "Loading..." : `${category.count.toLocaleString()} ${t("categories.opportunities")}`}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobCategories;
