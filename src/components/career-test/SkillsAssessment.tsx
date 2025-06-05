
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, X, ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/useLanguage";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

interface SkillsAssessmentProps {
  onComplete: (skills: string[]) => void;
}

const SkillsAssessment = ({ onComplete }: SkillsAssessmentProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showAnimation, setShowAnimation] = useState(false);

  // Sample skills, in a real app these would come from an API/database
  const skillCategories = [
    {
      name: t("Programming"),
      icon: "💻",
      color: "from-blue-500 to-indigo-600",
      skills: ["JavaScript", "React", "Python", "Node.js", "TypeScript", "Java", "PHP", "Swift", "Ruby", "C#", "Vue.js"]
    },
    {
      name: t("Design"),
      icon: "🎨",
      color: "from-purple-500 to-pink-600",
      skills: ["UI/UX", "Graphic Design", "Figma", "Adobe XD", "Photoshop", "Illustrator", "Animation", "Typography"]
    },
    {
      name: t("Marketing"),
      icon: "📊",
      color: "from-orange-500 to-red-600",
      skills: ["SEO", "Social Media", "Content Writing", "Email Marketing", "Analytics", "PPC", "Brand Strategy"]
    },
    {
      name: t("Data"),
      icon: "📈",
      color: "from-green-500 to-teal-600",
      skills: ["SQL", "Data Analysis", "Tableau", "Power BI", "Excel", "Python", "R", "Machine Learning"]
    },
    {
      name: t("Business"),
      icon: "🏢",
      color: "from-amber-500 to-yellow-600",
      skills: ["Project Management", "Leadership", "Communication", "Problem Solving", "Negotiation", "Sales"]
    }
  ];

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
      toast({
        title: t("Skill removed"),
        description: t(`${skill} has been removed from your selection`),
        variant: "default",
      });
    } else {
      if (selectedSkills.length < 5) {
        setSelectedSkills([...selectedSkills, skill]);
        setShowAnimation(true);
        setTimeout(() => setShowAnimation(false), 1500);
        
        toast({
          title: t("Skill added"),
          description: t(`${skill} has been added to your selection`),
          variant: "default",
        });
      } else {
        toast({
          title: t("Maximum skills reached"),
          description: t("You can select up to 5 skills. Remove some to add more."),
          variant: "destructive",
        });
      }
    }
  };

  const filteredCategories = searchTerm
    ? skillCategories.map(category => ({
        ...category,
        skills: category.skills.filter(skill =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })).filter(category => category.skills.length > 0)
    : skillCategories;

  return (
    <div className="space-y-8 mt-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto text-center space-y-4"
      >
        <h2 className="text-3xl font-display font-semibold">{t("Select Your Skills")}</h2>
        <p className="text-lg text-muted-foreground">
          {t("Choose up to 5 skills that you have experience with or are interested in developing.")}
        </p>
      </motion.div>

      {/* Categories Selector */}
      <div className="flex justify-center gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {skillCategories.map((category) => (
          <motion.button
            key={category.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory(activeCategory === category.name ? null : category.name)}
            className={cn(
              "px-4 py-3 rounded-xl flex items-center gap-2 min-w-max transition-all duration-300",
              activeCategory === category.name 
                ? `bg-gradient-to-r ${category.color} text-white shadow-lg` 
                : "bg-muted hover:bg-muted/80"
            )}
          >
            <span className="text-xl">{category.icon}</span>
            <span className="font-medium">{category.name}</span>
          </motion.button>
        ))}
      </div>

      <div className="relative max-w-lg mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
        <Input
          type="text"
          placeholder={t("Search for skills...")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 py-6 text-lg"
        />
        {searchTerm && (
          <button 
            onClick={() => setSearchTerm("")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="relative min-h-[300px]">
        {/* Selected Skills Display */}
        <AnimatePresence>
          {selectedSkills.length > 0 && (
            <motion.div 
              className="col-span-full mb-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="glass-card p-4 rounded-xl backdrop-blur-sm relative overflow-hidden">
                {showAnimation && (
                  <motion.div 
                    className="absolute inset-0 bg-primary/10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.5, 0] }}
                    transition={{ duration: 1.5 }}
                  />
                )}
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-sm font-medium mr-2">{t("Selected")} ({selectedSkills.length}/5):</span>
                  {selectedSkills.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                    >
                      <Badge 
                        variant="secondary"
                        className="pl-3 flex items-center gap-1 py-1.5 text-sm"
                      >
                        {skill}
                        <button 
                          onClick={() => toggleSkill(skill)} 
                          className="ml-1 rounded-full hover:bg-secondary/30 p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories
            .filter(category => !activeCategory || category.name === activeCategory)
            .map((category, catIndex) => (
            <motion.div 
              key={category.name} 
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: catIndex * 0.1 }}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{category.icon}</span>
                <h3 className="text-lg font-medium">{category.name}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: (catIndex * 0.1) + (skillIndex * 0.05) 
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Badge 
                      variant={selectedSkills.includes(skill) ? "default" : "outline"}
                      className={cn(
                        "text-sm py-2 px-3 cursor-pointer transition-all",
                        selectedSkills.includes(skill) 
                          ? `bg-gradient-to-r ${category.color} border-0 text-white hover:opacity-90` 
                          : "hover:bg-muted"
                      )}
                      onClick={() => toggleSkill(skill)}
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCategories.filter(category => !activeCategory || category.name === activeCategory).length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center text-center p-8"
          >
            <Sparkles className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">
              {searchTerm ? t("No skills match your search") : t("Select a category")}
            </h3>
            <p className="text-muted-foreground">
              {searchTerm 
                ? t("Try a different search term or category") 
                : t("Choose a skill category from above or use the search")
              }
            </p>
          </motion.div>
        )}
      </div>

      <div className="flex justify-center mt-12">
        <Button
          size="lg"
          onClick={() => onComplete(selectedSkills)}
          disabled={selectedSkills.length === 0}
          className="gap-2 text-lg px-8 py-6 rounded-full bg-gradient-to-r from-primary via-secondary to-primary bg-size-200 hover:bg-pos-100 transition-all duration-500"
        >
          {t("Continue")}
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default SkillsAssessment;
