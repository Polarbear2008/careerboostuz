
import { useState, useEffect } from "react";
import { HeroSection } from "@/components/find-talent/HeroSection";
import { StatsSection } from "@/components/find-talent/StatsSection";
import { FilterSidebar } from "@/components/find-talent/FilterSidebar";
import { FreelancerGrid } from "@/components/find-talent/FreelancerGrid";
import { BenefitsSection } from "@/components/find-talent/BenefitsSection";
import { CTASection } from "@/components/find-talent/CTASection";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import { useSearchParams } from "react-router-dom";

const FindTalent = () => {
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams] = useSearchParams();
  
  // Get search term from URL parameters on component mount
  useEffect(() => {
    const urlSearchTerm = searchParams.get('search');
    if (urlSearchTerm) {
      setSearchTerm(urlSearchTerm);
    }
  }, [searchParams]);
  
  const handleFilter = (newFilters: Record<string, any>) => {
    setFilters(newFilters);
    console.log("Applied filters:", newFilters);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <>
      <NavBar />
      
      <main>
        <HeroSection />
        
        <StatsSection />
        
        <section className="py-16 bg-white">
          <div className="page-container">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Explore Talent</h2>
              <Button 
                variant="outline" 
                className="lg:hidden gap-2"
                onClick={() => setIsMobileFilterOpen(true)}
              >
                <Filter className="h-4 w-4" /> Filters
              </Button>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-72 shrink-0">
                <FilterSidebar 
                  onFilter={handleFilter} 
                  isOpen={isMobileFilterOpen}
                  onClose={() => setIsMobileFilterOpen(false)}
                  searchTerm={searchTerm}
                  onSearchChange={handleSearchChange}
                />
              </div>
              
              <div className="flex-1">
                <FreelancerGrid 
                  searchTerm={searchTerm}
                  filters={filters}
                />
              </div>
            </div>
          </div>
        </section>
        
        <BenefitsSection />
        
        <CTASection />
      </main>
      
      <Footer />
    </>
  );
};

export default FindTalent;
