
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Target, Star } from "lucide-react";
import { useLanguage } from "@/context/useLanguage";
import { motion } from "framer-motion";

interface SkillsAnalysisProps {
  skills: string[];
  ratings: Record<string, number>;
}

const SkillsAnalysis = ({ skills, ratings }: SkillsAnalysisProps) => {
  const { t } = useLanguage();

  // Calculate skill analysis
  const skillAnalysis = Object.entries(ratings).map(([key, value]) => {
    const skillName = key.split("-")[0];
    return { skill: skillName, rating: value };
  });

  const averageRating = skillAnalysis.reduce((acc, curr) => acc + curr.rating, 0) / skillAnalysis.length;
  
  // Categorize skills
  const strongSkills = skillAnalysis.filter(s => s.rating >= 75).sort((a, b) => b.rating - a.rating);
  const improvementSkills = skillAnalysis.filter(s => s.rating < 50).sort((a, b) => a.rating - b.rating);
  
  // Mock in-demand skills based on current market trends
  const inDemandSkills = [
    { name: "React", demand: 95, growth: "+23%" },
    { name: "Python", demand: 92, growth: "+18%" },
    { name: "TypeScript", demand: 88, growth: "+31%" },
    { name: "UI/UX", demand: 85, growth: "+15%" },
    { name: "Data Analysis", demand: 82, growth: "+27%" },
    { name: "Machine Learning", demand: 78, growth: "+42%" }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="space-y-8 mt-8"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <h2 className="text-3xl font-display font-semibold text-gradient">
          {t("Your Skills Analysis")}
        </h2>
        <p className="text-lg text-muted-foreground">
          {t("Detailed breakdown of your strengths and areas for improvement")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Overall Score */}
        <motion.div variants={item}>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold mb-2 text-primary">
                {Math.round(averageRating)}%
              </div>
              <p className="text-sm text-muted-foreground">Overall Skill Level</p>
              <div className="mt-3">
                <Progress value={averageRating} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Strong Skills Count */}
        <motion.div variants={item}>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold mb-2 text-green-600">
                {strongSkills.length}
              </div>
              <p className="text-sm text-muted-foreground">Strong Skills</p>
              <Star className="h-6 w-6 mx-auto mt-2 text-yellow-500" />
            </CardContent>
          </Card>
        </motion.div>

        {/* Skills to Improve */}
        <motion.div variants={item}>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold mb-2 text-orange-600">
                {improvementSkills.length}
              </div>
              <p className="text-sm text-muted-foreground">Skills to Improve</p>
              <Target className="h-6 w-6 mx-auto mt-2 text-orange-500" />
            </CardContent>
          </Card>
        </motion.div>

        {/* Market Alignment */}
        <motion.div variants={item}>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold mb-2 text-blue-600">
                {Math.round((skills.filter(s => inDemandSkills.some(d => d.name === s)).length / skills.length) * 100)}%
              </div>
              <p className="text-sm text-muted-foreground">Market Aligned</p>
              <TrendingUp className="h-6 w-6 mx-auto mt-2 text-blue-500" />
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Strengths */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <TrendingUp className="h-5 w-5" />
                {t("Your Top Strengths")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {strongSkills.slice(0, 5).map((skill, index) => (
                  <div key={skill.skill} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-lg font-semibold text-green-600">#{index + 1}</div>
                      <div>
                        <div className="font-medium">{skill.skill}</div>
                        <div className="text-sm text-muted-foreground">
                          {skill.rating >= 90 ? "Expert" : skill.rating >= 75 ? "Advanced" : "Proficient"} Level
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {skill.rating}%
                    </Badge>
                  </div>
                ))}
                {strongSkills.length === 0 && (
                  <p className="text-muted-foreground text-center py-4">
                    {t("Complete more assessments to identify your strengths")}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Areas for Improvement */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-600">
                <TrendingDown className="h-5 w-5" />
                {t("Areas for Growth")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {improvementSkills.slice(0, 5).map((skill, index) => (
                  <div key={skill.skill} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-lg font-semibold text-orange-600">#{index + 1}</div>
                      <div>
                        <div className="font-medium">{skill.skill}</div>
                        <div className="text-sm text-muted-foreground">
                          Focus on foundational concepts
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-orange-200 text-orange-800">
                      {skill.rating}%
                    </Badge>
                  </div>
                ))}
                {improvementSkills.length === 0 && (
                  <p className="text-muted-foreground text-center py-4">
                    {t("Great job! All your skills are at good levels")}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Market Demand Insights */}
      <motion.div variants={item}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              {t("Market Demand Insights")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {inDemandSkills.map((skill) => (
                <div key={skill.name} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{skill.name}</h4>
                    <Badge variant={skills.includes(skill.name) ? "default" : "outline"}>
                      {skills.includes(skill.name) ? "You have this" : "Learn this"}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Market Demand</span>
                      <span className="font-medium">{skill.demand}%</span>
                    </div>
                    <Progress value={skill.demand} className="h-2" />
                    <div className="text-sm text-green-600 font-medium">
                      {skill.growth} growth this year
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default SkillsAnalysis;
