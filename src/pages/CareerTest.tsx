
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/useLanguage";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import CareerTestHeader from "@/components/career-test/CareerTestHeader";
import CareerTestProgress from "@/components/career-test/CareerTestProgress";
import QuestionCard from "@/components/career-test/QuestionCard";
import SkillsAssessment from "@/components/career-test/SkillsAssessment";
import CareerPreferences, { CareerPreferences as CareerPreferencesType } from "@/components/career-test/CareerPreferences";
import SkillsAnalysis from "@/components/career-test/SkillsAnalysis";
import ResultsSection from "@/components/career-test/ResultsSection";
import { useToast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

type TestStage = "intro" | "preferences" | "skills" | "questions" | "skillsAnalysis" | "results";

const CareerTest = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [stage, setStage] = useState<TestStage>("intro");
  const [progress, setProgress] = useState(0);
  const [preferences, setPreferences] = useState<CareerPreferencesType | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const questionsRef = useRef<HTMLDivElement>(null);
  
  const handleStartTest = () => {
    setStage("preferences");
    setProgress(10);
    toast({
      title: t("Welcome to your career assessment"),
      description: t("Let's start by understanding your career goals"),
    });
  };

  const handlePreferencesComplete = (prefs: CareerPreferencesType) => {
    setPreferences(prefs);
    setStage("skills");
    setProgress(25);
    toast({
      title: t("Preferences saved"),
      description: t("Now let's identify your skills and interests"),
    });
  };

  const handleSkillsComplete = (skills: string[]) => {
    setSelectedSkills(skills);
    setStage("questions");
    setProgress(40);
    toast({
      title: t("Skills selected"),
      description: t("Now let's assess your proficiency levels"),
    });
  };

  const handleQuestionSubmit = (questionId: string, rating: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: rating
    }));
    
    // Update progress based on questions answered
    const questionsCount = selectedSkills.length;
    const answeredCount = Object.keys(answers).length + 1;
    const progressValue = 40 + (answeredCount / questionsCount) * 30;
    setProgress(Math.min(progressValue, 70));
    
    // If all questions are answered, show skills analysis first
    if (answeredCount >= questionsCount) {
      setTimeout(() => {
        setStage("skillsAnalysis");
        setProgress(85);
        toast({
          title: t("Assessment completed"),
          description: t("Here's your detailed skills analysis"),
        });
      }, 500);
    }
  };

  const handleSkillsAnalysisNext = () => {
    setStage("results");
    setProgress(100);
    toast({
      title: t("Generating career recommendations"),
      description: t("AI is analyzing your profile for personalized career matches"),
    });
  };

  // Scroll to questions when stage changes
  useEffect(() => {
    if (stage === "questions" && questionsRef.current) {
      setTimeout(() => {
        questionsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [stage]);

  const slideVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="page-container relative">
          <CareerTestProgress progress={progress} />
          
          <AnimatePresence mode="wait">
            {stage === "intro" && (
              <motion.div
                key="intro"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={slideVariants}
                transition={{ duration: 0.4 }}
              >
                <CareerTestHeader onStart={handleStartTest} />
              </motion.div>
            )}

            {stage === "preferences" && (
              <motion.div
                key="preferences"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={slideVariants}
                transition={{ duration: 0.4 }}
              >
                <CareerPreferences onComplete={handlePreferencesComplete} />
              </motion.div>
            )}
            
            {stage === "skills" && (
              <motion.div
                key="skills"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={slideVariants}
                transition={{ duration: 0.4 }}
              >
                <SkillsAssessment onComplete={handleSkillsComplete} />
              </motion.div>
            )}
            
            {stage === "questions" && (
              <motion.div
                key="questions"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={slideVariants}
                transition={{ duration: 0.4 }}
                ref={questionsRef}
                className="space-y-8 mt-8"
              >
                <h2 className="text-2xl md:text-3xl font-display font-semibold text-center">
                  {t("Rate your experience level")}
                </h2>
                <p className="text-center text-muted-foreground max-w-2xl mx-auto">
                  {t("For each selected skill, indicate your proficiency level from novice to expert.")}
                </p>
                <div className="grid gap-6">
                  {selectedSkills.map((skill, index) => (
                    <QuestionCard
                      key={`${skill}-${index}`}
                      questionId={`${skill}-${index}`}
                      skill={skill}
                      onSubmit={handleQuestionSubmit}
                      isAnswered={!!answers[`${skill}-${index}`]}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {stage === "skillsAnalysis" && (
              <motion.div
                key="skillsAnalysis"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={slideVariants}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                <SkillsAnalysis skills={selectedSkills} ratings={answers} />
                <div className="flex justify-center mt-8">
                  <Button onClick={handleSkillsAnalysisNext} size="lg" className="gap-2">
                    Get AI Career Recommendations
                  </Button>
                </div>
              </motion.div>
            )}
            
            {stage === "results" && (
              <motion.div
                key="results"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={slideVariants}
                transition={{ duration: 0.4 }}
              >
                <ResultsSection 
                  skills={selectedSkills} 
                  ratings={answers}
                  preferences={preferences}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CareerTest;
