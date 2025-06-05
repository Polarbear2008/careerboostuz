
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sparkles, X, Plus, Hash } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { CVFormValues } from "./types";
import { motion } from "framer-motion";

interface SkillsFormProps {
  skills: string[];
  setSkills: Dispatch<SetStateAction<string[]>>;
  currentSkill: string;
  setCurrentSkill: Dispatch<SetStateAction<string>>;
  setValue: UseFormSetValue<CVFormValues>;
  formErrors: Record<string, any>;
}

// Predefined skill categories for suggestions
const skillCategories = [
  { name: "Technical", skills: ["JavaScript", "React", "TypeScript", "Node.js", "Python", "HTML/CSS"] },
  { name: "Design", skills: ["UI/UX", "Figma", "Adobe Photoshop", "Graphic Design", "Wireframing"] },
  { name: "Soft Skills", skills: ["Leadership", "Communication", "Problem Solving", "Teamwork", "Time Management"] }
];

const SkillsForm = ({ 
  skills, 
  setSkills, 
  currentSkill, 
  setCurrentSkill, 
  setValue,
  formErrors
}: SkillsFormProps) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Add skill
  const addSkill = (skill: string = currentSkill) => {
    if (skill.trim() !== "" && !skills.includes(skill.trim())) {
      const updatedSkills = [...skills, skill.trim()];
      setSkills(updatedSkills);
      setValue("skills", updatedSkills);
      setCurrentSkill("");
    }
  };

  // Remove skill
  const removeSkill = (skill: string) => {
    const updatedSkills = skills.filter((s) => s !== skill);
    setSkills(updatedSkills);
    setValue("skills", updatedSkills);
  };

  // Toggle category
  const toggleCategory = (category: string) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  return (
    <div className="space-y-4 pt-6">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            placeholder="Add a skill (e.g., JavaScript)"
            value={currentSkill}
            onChange={(e) => setCurrentSkill(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addSkill();
              }
            }}
            className="pl-10 cv-input-field"
          />
          <Sparkles className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-400" />
        </div>
        <Button 
          type="button" 
          onClick={() => addSkill()}
          className="bg-blue-500 hover:bg-blue-600 transition-colors"
        >
          <Plus className="mr-1 h-4 w-4" /> Add
        </Button>
      </div>

      {/* Skill Categories */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Hash className="h-3.5 w-3.5" />
          <span>Categories:</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {skillCategories.map((category) => (
            <Button
              key={category.name}
              type="button"
              variant="outline"
              size="sm"
              className={`text-xs border-blue-200 ${
                activeCategory === category.name 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-slate-600 hover:bg-blue-50'
              }`}
              onClick={() => toggleCategory(category.name)}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {activeCategory && (
          <motion.div 
            className="mt-2 p-3 bg-blue-50/80 rounded-lg border border-blue-100"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-xs text-slate-500 mb-2">
              Click to add common {activeCategory.toLowerCase()} skills:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {skillCategories
                .find(cat => cat.name === activeCategory)?.skills
                .filter(skill => !skills.includes(skill))
                .map((skill) => (
                  <Badge 
                    key={skill}
                    className="bg-white text-slate-700 hover:bg-blue-100 cursor-pointer transition-colors"
                    onClick={() => addSkill(skill)}
                  >
                    <Plus className="mr-1 h-3 w-3" /> 
                    {skill}
                  </Badge>
                ))}
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Added Skills */}
      {skills.length > 0 ? (
        <motion.div 
          className="flex flex-wrap gap-2 mt-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.05
              }
            }
          }}
        >
          {skills.map((skill, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 }
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 text-blue-700 px-3 py-2 rounded-full flex items-center gap-2 hover:from-blue-500/20 hover:to-indigo-500/20 transition-colors">
                <Sparkles size={14} className="text-blue-500" />
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="text-blue-400 hover:text-blue-600 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <p className="text-slate-500 text-sm mt-2">No skills added yet. Add your first skill above.</p>
      )}
      {formErrors.skills && (
        <p className="text-destructive text-sm">{formErrors.skills.message}</p>
      )}
    </div>
  );
};

export default SkillsForm;
