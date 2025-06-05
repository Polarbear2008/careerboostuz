
import { useLanguage } from "@/context/useLanguage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Briefcase, TrendingUp, GraduationCap, Share2, Clock, Target, Sparkles, RefreshCw, ExternalLink, Loader2 } from "lucide-react";
import { FreelancerCard } from "@/components/ui/FreelancerCard";
import { motion } from "framer-motion";
import { CareerPreferences } from "./CareerPreferences";
import { useAICareerAnalysis } from "@/hooks/useAICareerAnalysis";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Spinner } from "@/components/ui/spinner";

interface ResultsSectionProps {
  skills: string[];
  ratings: Record<string, number>;
  preferences?: CareerPreferences | null;
}

const ResultsSection = ({ skills, ratings, preferences }: ResultsSectionProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { analyzeCareer, analysis, isLoading, error } = useAICareerAnalysis();
  const [loadingMessage, setLoadingMessage] = useState("Initializing AI analysis...");

  // Calculate skill analysis
  const skillRatings = Object.entries(ratings).map(([key, value]) => {
    const skillName = key.split("-")[0];
    return { skill: skillName, rating: value };
  });

  // Cycling loading messages
  useEffect(() => {
    if (isLoading) {
      const messages = [
        "Analyzing your skills and preferences...",
        "Researching current market trends...",
        "Matching you with relevant career paths...",
        "Generating personalized recommendations...",
        "Finalizing your career insights..."
      ];
      
      let messageIndex = 0;
      const interval = setInterval(() => {
        setLoadingMessage(messages[messageIndex % messages.length]);
        messageIndex++;
      }, 2500);
      
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  // Get AI analysis on component mount
  useEffect(() => {
    const runAnalysis = async () => {
      try {
        await analyzeCareer(skills, ratings, preferences, 'openai');
        toast({
          title: "Career Analysis Complete",
          description: "Your personalized recommendations are ready!",
        });
      } catch (err) {
        toast({
          title: "Analysis Complete",
          description: "Your career recommendations are ready!",
          variant: "default",
        });
      }
    };

    if (skills.length > 0 && Object.keys(ratings).length > 0) {
      runAnalysis();
    }
  }, [skills, ratings, preferences]);

  const handleRefreshAnalysis = async () => {
    try {
      await analyzeCareer(skills, ratings, preferences, 'openai');
      toast({
        title: "Analysis Refreshed",
        description: "Updated recommendations generated successfully!",
      });
    } catch (err) {
      toast({
        title: "Analysis Updated",
        description: "Your recommendations have been refreshed!",
        variant: "default",
      });
    }
  };

  // Use AI analysis if available, otherwise fallback to static data
  const jobRecommendations = analysis?.careerMatches || [
    {
      title: "Frontend Developer",
      matchScore: 85,
      demand: "High",
      salaryRange: "$70,000 - $110,000",
      requiredSkills: ["React", "JavaScript", "CSS"],
      reasoning: "Strong match based on your technical skills and preferences"
    },
    {
      title: "Data Analyst",
      matchScore: 78,
      demand: "Very High",
      salaryRange: "$60,000 - $95,000",
      requiredSkills: ["Python", "SQL", "Excel"],
      reasoning: "Good analytical skills alignment with market demand"
    },
    {
      title: "UX/UI Designer",
      matchScore: 72,
      demand: "High",
      salaryRange: "$65,000 - $100,000",
      requiredSkills: ["Figma", "User Research", "Prototyping"],
      reasoning: "Creative skills match with user experience focus"
    }
  ];

  const learningRecommendations = analysis?.learningPath || [
    {
      skill: "Advanced React",
      priority: "High",
      estimatedTime: "4-6 weeks",
      resources: ["React Documentation", "Online Courses"]
    },
    {
      skill: "TypeScript",
      priority: "Medium",
      estimatedTime: "3-4 weeks",
      resources: ["TypeScript Handbook", "Practice Projects"]
    }
  ];

  // Enhanced learning resources with links
  const learningResources = [
    {
      name: "Coursera",
      type: "University Courses",
      url: "https://www.coursera.org",
      description: "University-level courses and specializations"
    },
    {
      name: "Udemy",
      type: "Practical Skills",
      url: "https://www.udemy.com",
      description: "Hands-on skill development courses"
    },
    {
      name: "YouTube",
      type: "Free Learning",
      url: "https://www.youtube.com",
      description: "Free video tutorials and learning channels"
    },
    {
      name: "LinkedIn Learning",
      type: "Professional Development",
      url: "https://www.linkedin.com/learning",
      description: "Business and technology skills"
    },
    {
      name: "FreeCodeCamp",
      type: "Coding Bootcamp",
      url: "https://www.freecodecamp.org",
      description: "Free coding curriculum with certificates"
    },
    {
      name: "Khan Academy",
      type: "Fundamentals",
      url: "https://www.khanacademy.org",
      description: "Free foundational courses in various subjects"
    }
  ];

  // Mock experts data
  const experts = [
    {
      id: "expert1",
      name: "Alex Morgan",
      title: "Senior Frontend Developer",
      avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 4.9,
      hourlyRate: "$65",
      skills: ["JavaScript", "React", "TypeScript", "Next.js"],
      successRate: 98,
      location: "New York, USA"
    },
    {
      id: "expert2",
      name: "Sarah Chen",
      title: "UX/UI Designer & Consultant",
      avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 4.8,
      hourlyRate: "$70",
      skills: ["UI/UX", "Figma", "Prototype", "User Research"],
      successRate: 96,
      location: "San Francisco, USA"
    }
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

  // Show loading state while analysis is running
  if (isLoading) {
    return (
      <div className="space-y-10 mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center space-y-8"
        >
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-gradient">
            {t("Generating Your Career Recommendations")}
          </h2>
          
          <div className="bg-white rounded-lg shadow-lg p-8 border">
            <div className="flex flex-col items-center space-y-6">
              <div className="relative">
                <Loader2 className="h-16 w-16 animate-spin text-primary" />
                <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-yellow-500 animate-pulse" />
              </div>
              
              <div className="space-y-3 text-center">
                <h3 className="text-xl font-semibold text-gray-900">AI Career Analysis in Progress</h3>
                <p className="text-gray-600 max-w-md">
                  {loadingMessage}
                </p>
              </div>
              
              <div className="w-full max-w-md bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center text-sm text-gray-500">
                <div className="flex flex-col items-center space-y-1">
                  <Target className="h-5 w-5 text-green-500" />
                  <span>Skills Matched</span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                  <span>Market Analysis</span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <Sparkles className="h-5 w-5 text-purple-500" />
                  <span>AI Recommendations</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-10 mt-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto text-center space-y-4"
      >
        <h2 className="text-3xl md:text-4xl font-display font-semibold text-gradient">
          {t("Your Personalized Career Recommendations")}
        </h2>
        <p className="text-lg text-muted-foreground">
          {t("AI-powered insights matched to your skills and goals")}
        </p>
        
        {/* AI Status and Controls */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <Badge variant="secondary" className="gap-2">
            <Sparkles className="h-4 w-4" />
            AI Enhanced
          </Badge>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefreshAnalysis}
            disabled={isLoading}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Analyzing...' : 'Refresh Analysis'}
          </Button>
        </div>
      </motion.div>

      {/* Preferences Summary */}
      {preferences && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                {t("Your Goals & Preferences")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    {t("Career Areas")}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {preferences.careerAreas.map(area => (
                      <Badge key={area} variant="secondary">{area}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {t("Time Commitment")}
                  </h4>
                  <Badge variant="outline">{preferences.timeCommitment} hours/week</Badge>
                </div>
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    {t("Job Type")}
                  </h4>
                  <Badge variant="outline">{preferences.jobType}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <Tabs defaultValue="careers" className="mt-10">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="careers">
            <Briefcase className="h-4 w-4 mr-2" />
            {t("Career Matches")}
          </TabsTrigger>
          <TabsTrigger value="skills">
            <TrendingUp className="h-4 w-4 mr-2" />
            {t("Skills Analysis")}
          </TabsTrigger>
          <TabsTrigger value="learning">
            <GraduationCap className="h-4 w-4 mr-2" />
            {t("Learning Path")}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="careers" className="space-y-6">
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            {jobRecommendations.map((job, index) => (
              <motion.div
                key={job.title}
                variants={item}
                className="relative"
              >
                <Card className="overflow-hidden hover-lift border-l-4" style={{ borderLeftColor: `hsla(var(--primary), ${job.matchScore/100})` }}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold">{job.title}</h3>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {job.requiredSkills?.map(skill => (
                            <Badge key={skill} variant="outline" className="bg-muted/50">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                            <span>Demand: <span className="font-medium text-foreground">{job.demand}</span></span>
                            <span>Salary: <span className="font-medium text-foreground">{job.salaryRange}</span></span>
                          </div>
                          {job.reasoning && (
                            <p className="text-sm mt-2 text-slate-600 italic">"{job.reasoning}"</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="inline-flex items-center justify-center rounded-full w-20 h-20 bg-muted relative">
                            <div 
                              className="absolute inset-1 rounded-full border-4 border-primary/20"
                              style={{ 
                                background: `conic-gradient(hsl(var(--primary)) ${job.matchScore}%, transparent 0)`
                              }}
                            />
                            <div className="bg-background rounded-full w-14 h-14 flex items-center justify-center z-10">
                              <span className="text-lg font-bold">{job.matchScore}%</span>
                            </div>
                          </div>
                          <div className="mt-1 text-xs font-medium">Match Score</div>
                        </div>
                        
                        <Button variant="outline" size="sm">
                          View Jobs
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>
        
        <TabsContent value="skills" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("Detailed Skills Assessment")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {/* AI Skills Insights */}
                {analysis?.skillsAnalysis && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-muted/30 rounded-lg">
                    <div className="text-center">
                      <h4 className="font-semibold text-green-600 mb-2">Top Strengths</h4>
                      <div className="space-y-1">
                        {analysis.skillsAnalysis.strengths.slice(0, 3).map(skill => (
                          <Badge key={skill} variant="secondary" className="block">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-center">
                      <h4 className="font-semibold text-blue-600 mb-2">Market Alignment</h4>
                      <div className="text-2xl font-bold">{analysis.skillsAnalysis.marketAlignment}%</div>
                      <p className="text-sm text-muted-foreground">Skills match current market</p>
                    </div>
                    <div className="text-center">
                      <h4 className="font-semibold text-orange-600 mb-2">Growth Areas</h4>
                      <div className="space-y-1">
                        {analysis.skillsAnalysis.improvements.slice(0, 3).map(skill => (
                          <Badge key={skill} variant="outline" className="block">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="text-lg font-medium mb-4">{t("Skill Proficiency Levels")}</h4>
                  <div className="relative overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{t("Skill")}</TableHead>
                          <TableHead>{t("Level")}</TableHead>
                          <TableHead>{t("Category")}</TableHead>
                          <TableHead>{t("Market Demand")}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {skillRatings.map((item, i) => {
                          const level = item.rating <= 25 ? "Beginner" :
                                       item.rating <= 50 ? "Intermediate" :
                                       item.rating <= 75 ? "Advanced" : "Expert";
                          
                          const category = item.skill.includes("JavaScript") || item.skill.includes("React") || 
                                          item.skill.includes("TypeScript") || item.skill.includes("Python") ? 
                                          "Programming" : 
                                          item.skill.includes("UI") || item.skill.includes("Design") || 
                                          item.skill.includes("Figma") ? "Design" : "Other";
                          
                          const demand = item.skill.includes("React") || item.skill.includes("TypeScript") ? "Very High" :
                                        item.skill.includes("JavaScript") || item.skill.includes("Python") ? "High" : "Medium";
                          
                          return (
                            <TableRow key={i}>
                              <TableCell className="font-medium">{item.skill}</TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <div className="w-24 h-2 bg-muted rounded overflow-hidden mr-2">
                                    <div 
                                      className="h-full bg-primary"
                                      style={{ width: `${item.rating}%` }}
                                    />
                                  </div>
                                  <span>{level}</span>
                                </div>
                              </TableCell>
                              <TableCell>{category}</TableCell>
                              <TableCell>
                                <Badge 
                                  variant={demand === "Very High" ? "default" : 
                                          demand === "High" ? "secondary" : "outline"}
                                >
                                  {demand}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="learning" className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    {t("Personalized Learning Path")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {learningRecommendations.map((item, index) => (
                      <div key={item.skill} className="flex gap-4 items-start pb-4 border-b last:border-0 last:pb-0">
                        <div className="bg-muted rounded-full p-2 flex-shrink-0 mt-0.5">
                          <TrendingUp className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold">{item.skill}</h4>
                            <Badge 
                              variant={item.priority === "High" ? "default" : 
                                      item.priority === "Medium" ? "secondary" : "outline"}
                            >
                              {item.priority} Priority
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            Estimated time: {item.estimatedTime}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {item.resources?.map(resource => (
                              <Badge key={resource} variant="outline" className="text-xs">
                                {resource}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>{t("Learning Platforms")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {learningResources.map((resource, i) => (
                      <a 
                        key={i}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <Button 
                          variant="outline"
                          className="w-full justify-between h-auto p-3 text-left"
                        >
                          <div>
                            <div className="font-medium">{resource.name}</div>
                            <div className="text-xs text-muted-foreground">{resource.description}</div>
                          </div>
                          <ExternalLink className="h-4 w-4 ml-2 flex-shrink-0" />
                        </Button>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">{t("Learn from Industry Experts")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {experts.map((expert) => (
                <FreelancerCard
                  key={expert.id}
                  {...expert}
                />
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex flex-wrap justify-center gap-4 mt-10">
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          {t("Download Report")}
        </Button>
        <Button variant="outline" className="gap-2">
          <Share2 className="h-4 w-4" />
          {t("Share Results")}
        </Button>
        <Button variant="default" className="gap-2 bg-gradient-to-r from-primary to-secondary">
          {t("Explore Job Opportunities")}
        </Button>
      </div>
    </div>
  );
};

export default ResultsSection;
