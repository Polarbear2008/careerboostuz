
import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  questionId: string;
  skill: string;
  onSubmit: (questionId: string, rating: number) => void;
  isAnswered: boolean;
}

const QuestionCard = ({ questionId, skill, onSubmit, isAnswered }: QuestionCardProps) => {
  const [rating, setRating] = useState(0);
  const [hoveredLevel, setHoveredLevel] = useState<number | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  const experienceLabels = [
    { value: 0, label: "Novice", description: "Little to no experience", color: "from-gray-500 to-gray-600" },
    { value: 25, label: "Beginner", description: "Basic understanding, some practice", color: "from-blue-500 to-blue-600" },
    { value: 50, label: "Intermediate", description: "Working knowledge, regular usage", color: "from-green-500 to-green-600" },
    { value: 75, label: "Advanced", description: "Deep knowledge, significant experience", color: "from-purple-500 to-purple-600" },
    { value: 100, label: "Expert", description: "Mastery, can teach others", color: "from-orange-500 to-orange-600" }
  ];

  const getCurrentLevel = () => {
    if (rating <= 12) return 0;
    if (rating <= 37) return 25;
    if (rating <= 62) return 50;
    if (rating <= 87) return 75;
    return 100;
  };

  const currentLevel = getCurrentLevel();
  const currentLevelData = experienceLabels.find(l => l.value === currentLevel);

  const handleSubmit = () => {
    onSubmit(questionId, rating);
  };

  useEffect(() => {
    if (rating > 0 && !hasInteracted) {
      setHasInteracted(true);
    }
  }, [rating, hasInteracted]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className={cn(
        "overflow-hidden transition-all duration-500 hover:shadow-md",
        isAnswered ? "border-primary/20 bg-gradient-to-b from-primary/5 to-transparent" : ""
      )}>
        <CardHeader>
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              {skill}
              {isAnswered && (
                <CheckCircle className="h-5 w-5 text-primary fill-primary/20" />
              )}
            </h3>
            <AnimatePresence>
              {isAnswered && (
                <motion.span 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={cn(
                    "text-sm font-medium px-3 py-1 rounded-full",
                    `bg-gradient-to-r ${currentLevelData?.color} text-white`
                  )}
                >
                  {currentLevelData?.label}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <p className="text-muted-foreground mb-6">
                Rate your experience level with {skill}:
              </p>
              
              <div className="pt-4 relative">
                <Slider
                  value={[rating]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(values) => setRating(values[0])}
                  disabled={isAnswered}
                  className={cn(
                    "py-4",
                    hasInteracted && currentLevelData ? `[&>.slider-thumb]:bg-gradient-to-r ${currentLevelData.color}` : ""
                  )}
                />
                
                <AnimatePresence>
                  {hasInteracted && !isAnswered && (
                    <motion.div 
                      className="absolute right-0 top-0 -mt-6"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                    >
                      <div className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium text-white",
                        `bg-gradient-to-r ${currentLevelData?.color}`
                      )}>
                        {rating}%
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            <div className="flex justify-between">
              {experienceLabels.map((level) => (
                <div 
                  key={level.value}
                  className={cn(
                    "text-center transition-all duration-300 cursor-pointer rounded-lg px-2 py-1 -mx-2",
                    currentLevel === level.value && hasInteracted ? `bg-gradient-to-r ${level.color} text-white` : "",
                    hoveredLevel === level.value ? "bg-muted" : "",
                    "relative group"
                  )}
                  onMouseEnter={() => setHoveredLevel(level.value)}
                  onMouseLeave={() => setHoveredLevel(null)}
                  onClick={() => !isAnswered && setRating(level.value)}
                >
                  <div className="text-xs font-medium">
                    {level.label}
                  </div>
                  
                  {/* Level indicator line */}
                  <div className={cn(
                    "absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-0.5 h-2",
                    currentLevel === level.value && hasInteracted ? `bg-gradient-to-b ${level.color}` : "bg-muted",
                  )} />
                </div>
              ))}
            </div>
            
            <AnimatePresence>
              {(hoveredLevel !== null || (currentLevel !== 0 && hasInteracted)) && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className={cn(
                    "rounded-lg p-4 text-sm",
                    hoveredLevel !== null 
                      ? `bg-gradient-to-r from-${experienceLabels.find(l => l.value === hoveredLevel)?.color.split(' ')[1]}/10 to-${experienceLabels.find(l => l.value === hoveredLevel)?.color.split(' ')[3]}/10` 
                      : `bg-gradient-to-r from-${currentLevelData?.color.split(' ')[1]}/10 to-${currentLevelData?.color.split(' ')[3]}/10`
                  )}
                >
                  <p className="text-foreground">
                    {experienceLabels.find(l => l.value === (hoveredLevel !== null ? hoveredLevel : currentLevel))?.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          {!isAnswered && (
            <Button 
              onClick={handleSubmit} 
              disabled={rating === 0}
              className={cn(
                "gap-2 group transition-all duration-300",
                hasInteracted && currentLevelData 
                  ? `bg-gradient-to-r ${currentLevelData.color} hover:opacity-90 text-white` 
                  : "bg-secondary hover:bg-secondary/90"
              )}
            >
              Submit
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default QuestionCard;
