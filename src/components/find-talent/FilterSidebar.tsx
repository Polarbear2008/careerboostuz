
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Filter as FilterIcon, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface FilterSidebarProps {
  onFilter: (filters: Record<string, any>) => void;
  isOpen: boolean;
  onClose: () => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

// Create interfaces for our filter data
interface Category {
  name: string;
  count: number;
}

interface Skill {
  name: string;
  count: number;
}

interface Location {
  name: string;
  count: number;
}

export const FilterSidebar = ({ 
  onFilter, 
  isOpen, 
  onClose, 
  searchTerm, 
  onSearchChange 
}: FilterSidebarProps) => {
  const [category, setCategory] = useState<string>("");
  const [hourlyRate, setHourlyRate] = useState<[number, number]>([10, 100]);
  const [skills, setSkills] = useState<Record<string, boolean>>({});
  const [location, setLocation] = useState<string>("");
  
  // State for dynamic filter data
  const [categories, setCategories] = useState<Category[]>([]);
  const [availableSkills, setAvailableSkills] = useState<Skill[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch real data for filters
  useEffect(() => {
    const fetchFilterData = async () => {
      setIsLoading(true);
      try {
        // Fetch projects to extract filter data
        const { data: projects, error } = await supabase
          .from('projects')
          .select('category, skills, location');
        
        if (error) throw error;
        
        if (projects) {
          // Process categories
          const categoryMap = new Map<string, number>();
          projects.forEach(project => {
            if (project.category) {
              const cat = project.category;
              categoryMap.set(cat, (categoryMap.get(cat) || 0) + 1);
            }
          });
          
          const formattedCategories = Array.from(categoryMap.entries()).map(([name, count]) => ({
            name,
            count
          }));
          setCategories(formattedCategories);
          
          // Process skills
          const skillsMap = new Map<string, number>();
          projects.forEach(project => {
            if (project.skills) {
              const skillsList = project.skills.split(',').map(s => s.trim());
              skillsList.forEach(skill => {
                skillsMap.set(skill, (skillsMap.get(skill) || 0) + 1);
              });
            }
          });
          
          const formattedSkills = Array.from(skillsMap.entries()).map(([name, count]) => ({
            name,
            count
          }));
          setAvailableSkills(formattedSkills);
          
          // Initialize skills state with dynamic data
          const initialSkills: Record<string, boolean> = {};
          formattedSkills.forEach(skill => {
            initialSkills[skill.name] = false;
          });
          setSkills(initialSkills);
          
          // Process locations
          const locationMap = new Map<string, number>();
          projects.forEach(project => {
            if (project.location) {
              const loc = project.location;
              locationMap.set(loc, (locationMap.get(loc) || 0) + 1);
            } else {
              // Default to Remote if no location
              locationMap.set("Remote", (locationMap.get("Remote") || 0) + 1);
            }
          });
          
          const formattedLocations = Array.from(locationMap.entries()).map(([name, count]) => ({
            name,
            count
          }));
          setLocations(formattedLocations);
        }
      } catch (error: any) {
        console.error("Error fetching filter data:", error);
        toast.error("Failed to load filter options");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFilterData();
  }, []);

  const handleSkillChange = (skill: string, checked: boolean) => {
    setSkills(prev => ({ ...prev, [skill]: checked }));
  };
  
  const handleClearAll = () => {
    setCategory("");
    setHourlyRate([10, 100]);
    
    // Reset skills based on current available skills
    const resetSkills: Record<string, boolean> = {};
    Object.keys(skills).forEach(skill => {
      resetSkills[skill] = false;
    });
    setSkills(resetSkills);
    
    setLocation("");
    onSearchChange("");
  };
  
  const handleApplyFilters = () => {
    const selectedSkills = Object.entries(skills)
      .filter(([, isSelected]) => isSelected)
      .map(([skill]) => skill);
      
    onFilter({
      category,
      hourlyRateMin: hourlyRate[0],
      hourlyRateMax: hourlyRate[1],
      skills: selectedSkills,
      location,
      searchTerm,
    });
    
    if (window.innerWidth < 1024) {
      onClose();
    }
  };
  
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside 
        className={`
          fixed lg:sticky top-0 lg:top-24 h-full lg:h-auto overflow-y-auto bg-white shadow-md z-40 
          w-80 transition-all duration-300 
          ${isOpen ? "left-0" : "-left-full"} 
          lg:left-0 lg:w-full lg:shadow-none lg:z-0 lg:bg-transparent
        `}
      >
        <div className="p-5">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <FilterIcon className="h-5 w-5" /> Filters
            </h3>
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="space-y-6">
            <div>
              <Label htmlFor="search-talent">Search by keyword</Label>
              <div className="relative mt-1.5">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="search-talent"
                  placeholder="E.g. JavaScript, Designer" 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <Label>Category</Label>
              <div className="space-y-1.5 mt-1.5">
                {isLoading ? (
                  <div className="text-sm text-muted-foreground">Loading categories...</div>
                ) : categories.length > 0 ? (
                  categories.map((cat) => (
                    <div key={cat.name} className="flex items-start gap-2">
                      <Checkbox 
                        id={`category-${cat.name}`}
                        checked={category === cat.name}
                        onCheckedChange={(checked) => setCategory(checked ? cat.name : "")} 
                      />
                      <Label htmlFor={`category-${cat.name}`} className="font-normal cursor-pointer flex justify-between w-full">
                        <span>{cat.name}</span>
                        <span className="text-xs text-muted-foreground bg-muted rounded-full px-2 py-0.5">
                          {cat.count}
                        </span>
                      </Label>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-muted-foreground">No categories available</div>
                )}
              </div>
            </div>
            
            <div>
              <Label>Hourly Rate (USD)</Label>
              <div className="mt-6 px-2">
                <Slider
                  defaultValue={[10, 100]}
                  max={200}
                  step={5}
                  value={hourlyRate}
                  onValueChange={(value) => setHourlyRate(value as [number, number])}
                />
                <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                  <span>${hourlyRate[0]}</span>
                  <span>${hourlyRate[1]}+</span>
                </div>
              </div>
            </div>
            
            <div>
              <Label>Skills</Label>
              <div className="space-y-1.5 mt-1.5 max-h-48 overflow-y-auto">
                {isLoading ? (
                  <div className="text-sm text-muted-foreground">Loading skills...</div>
                ) : availableSkills.length > 0 ? (
                  availableSkills.map((skill) => (
                    <div key={skill.name} className="flex items-start gap-2">
                      <Checkbox 
                        id={`skill-${skill.name}`}
                        checked={skills[skill.name] || false}
                        onCheckedChange={(checked) => handleSkillChange(skill.name, !!checked)} 
                      />
                      <Label htmlFor={`skill-${skill.name}`} className="font-normal cursor-pointer flex justify-between w-full">
                        <span>{skill.name}</span>
                        <span className="text-xs text-muted-foreground bg-muted rounded-full px-2 py-0.5">
                          {skill.count}
                        </span>
                      </Label>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-muted-foreground">No skills available</div>
                )}
              </div>
            </div>
            
            <div>
              <Label>Location</Label>
              <div className="space-y-1.5 mt-1.5">
                {isLoading ? (
                  <div className="text-sm text-muted-foreground">Loading locations...</div>
                ) : locations.length > 0 ? (
                  locations.map((loc) => (
                    <div key={loc.name} className="flex items-start gap-2">
                      <Checkbox 
                        id={`location-${loc.name}`}
                        checked={location === loc.name}
                        onCheckedChange={(checked) => setLocation(checked ? loc.name : "")} 
                      />
                      <Label htmlFor={`location-${loc.name}`} className="font-normal cursor-pointer flex justify-between w-full">
                        <span>{loc.name}</span>
                        <span className="text-xs text-muted-foreground bg-muted rounded-full px-2 py-0.5">
                          {loc.count}
                        </span>
                      </Label>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-muted-foreground">No locations available</div>
                )}
              </div>
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={handleClearAll}
              >
                Clear All
              </Button>
              <Button 
                className="flex-1"
                onClick={handleApplyFilters}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
