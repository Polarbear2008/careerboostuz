
import { useState, useEffect } from "react";
import { JobGrid } from "@/components/find-work/JobGrid";
import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import { useSearchParams } from "react-router-dom";

const FindWork = () => {
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams] = useSearchParams();
  
  // Get search term and category from URL parameters on component mount
  useEffect(() => {
    const urlSearchTerm = searchParams.get('search');
    const urlCategory = searchParams.get('category');
    
    if (urlSearchTerm) {
      setSearchTerm(urlSearchTerm);
    }
    
    if (urlCategory) {
      setFilters(prev => ({ ...prev, category: urlCategory }));
    }
  }, [searchParams]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Search functionality is handled by JobGrid component
  };

  return (
    <>
      <NavBar />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 to-secondary/5 py-20">
          <div className="page-container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Find Your Next <span className="text-primary">Project</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Discover amazing opportunities from clients around the world
              </p>
              
              {/* Search Bar */}
              <form onSubmit={handleSearchSubmit} className="relative max-w-xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Search for projects, skills, or keywords..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-3 rounded-full border bg-background shadow-sm"
                  />
                </div>
              </form>
            </div>
          </div>
        </section>
        
        {/* Jobs Section */}
        <section className="py-16 bg-white">
          <div className="page-container">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Available Projects</h2>
            </div>
            
            <JobGrid 
              searchTerm={searchTerm}
              filters={filters}
            />
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default FindWork;
