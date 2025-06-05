
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface CareerTestProgressProps {
  progress: number;
}

const CareerTestProgress = ({ progress }: CareerTestProgressProps) => {
  // Determine the current stage based on progress
  const getStage = () => {
    if (progress === 0) return "start";
    if (progress < 25) return "starting";
    if (progress < 95) return "questions";
    return "complete";
  };
  
  const stage = getStage();
  const stageLabels = {
    start: "Ready to begin",
    starting: "Getting started",
    questions: "Rating skills",
    complete: "Assessment complete"
  };

  return (
    <div className="sticky top-20 z-10 py-4 bg-background/80 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-2">
        <motion.span 
          className="text-sm font-medium text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={stage}
        >
          {progress > 0 ? `${Math.floor(progress)}% Complete` : 'Ready to begin'}
        </motion.span>
        
        <motion.div
          className="flex items-center gap-2 text-sm font-medium"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          key={stage}
        >
          <span 
            className={`px-3 py-1 rounded-full ${
              stage === 'complete' 
                ? 'bg-primary/20 text-primary' 
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {stageLabels[stage]}
          </span>
          
          {stage === 'complete' && (
            <CheckCircle className="h-4 w-4 text-primary fill-primary/20" />
          )}
        </motion.div>
      </div>
      
      <div className="relative">
        <motion.div
          initial={{ scaleX: progress > 0 ? (progress - 5) / 100 : 0 }}
          animate={{ scaleX: progress / 100 }}
          transition={{ 
            duration: 0.5, 
            ease: "easeOut" 
          }}
          style={{ transformOrigin: "left" }}
          className="relative z-10"
        >
          <Progress value={progress} className="h-2 relative overflow-hidden">
            {progress > 0 && (
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary bg-size-200"
                animate={{ 
                  backgroundPosition: ['0% 0%', '100% 0%'] 
                }}
                transition={{ 
                  duration: 3, 
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            )}
          </Progress>
        </motion.div>
        
        {/* Progress Milestones */}
        <div className="flex justify-between mt-1 px-1">
          {[0, 25, 50, 75, 100].map((milestone) => (
            <motion.div 
              key={milestone}
              className="relative"
              initial={{ opacity: 0.3 }}
              animate={{ 
                opacity: progress >= milestone ? 1 : 0.3,
                scale: progress >= milestone ? 1 : 0.8
              }}
              transition={{ duration: 0.3 }}
            >
              <div 
                className={`w-1 h-1 rounded-full ${
                  progress >= milestone ? 'bg-primary' : 'bg-muted-foreground'
                }`}
              />
              <span className="absolute -left-2 -bottom-4 text-[0.65rem] text-muted-foreground">
                {milestone}%
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareerTestProgress;
