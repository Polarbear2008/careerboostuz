
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowRight, Target, Clock, Briefcase } from "lucide-react";
import { useLanguage } from "@/context/useLanguage";
import { motion } from "framer-motion";

interface CareerPreferencesProps {
  onComplete: (preferences: CareerPreferences) => void;
}

export interface CareerPreferences {
  careerAreas: string[];
  timeCommitment: string;
  jobType: string;
}

const CareerPreferences = ({ onComplete }: CareerPreferencesProps) => {
  const { t } = useLanguage();
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [timeCommitment, setTimeCommitment] = useState("");
  const [jobType, setJobType] = useState("");

  const careerAreas = [
    { name: "Technology", icon: "💻", color: "from-blue-500 to-indigo-600" },
    { name: "Design", icon: "🎨", color: "from-purple-500 to-pink-600" },
    { name: "Marketing", icon: "📊", color: "from-orange-500 to-red-600" },
    { name: "Data Science", icon: "📈", color: "from-green-500 to-teal-600" },
    { name: "Business", icon: "🏢", color: "from-amber-500 to-yellow-600" },
    { name: "Healthcare", icon: "🏥", color: "from-red-500 to-pink-600" },
    { name: "Education", icon: "📚", color: "from-indigo-500 to-purple-600" },
    { name: "Finance", icon: "💰", color: "from-emerald-500 to-green-600" }
  ];

  const timeOptions = [
    { value: "1-5", label: "1-5 hours per week" },
    { value: "6-10", label: "6-10 hours per week" },
    { value: "11-20", label: "11-20 hours per week" },
    { value: "20+", label: "20+ hours per week" }
  ];

  const jobTypes = [
    { value: "full-time", label: "Full-time Job" },
    { value: "part-time", label: "Part-time Job" },
    { value: "internship", label: "Internship" },
    { value: "freelance", label: "Freelance Work" },
    { value: "exploring", label: "Just Exploring" }
  ];

  const toggleArea = (area: string) => {
    if (selectedAreas.includes(area)) {
      setSelectedAreas(selectedAreas.filter(a => a !== area));
    } else if (selectedAreas.length < 3) {
      setSelectedAreas([...selectedAreas, area]);
    }
  };

  const handleSubmit = () => {
    onComplete({
      careerAreas: selectedAreas,
      timeCommitment,
      jobType
    });
  };

  const isComplete = selectedAreas.length > 0 && timeCommitment && jobType;

  return (
    <div className="space-y-8 mt-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto text-center space-y-4"
      >
        <h2 className="text-3xl font-display font-semibold">{t("Tell Us About Your Goals")}</h2>
        <p className="text-lg text-muted-foreground">
          {t("Help us personalize your career recommendations by sharing your preferences.")}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Career Areas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              {t("Career Areas")}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {t("Select up to 3 areas you're interested in")}
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {careerAreas.map((area) => (
                <button
                  key={area.name}
                  onClick={() => toggleArea(area.name)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedAreas.includes(area.name)
                      ? 'border-primary bg-primary/10'
                      : 'border-muted hover:border-muted-foreground/30'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-1">{area.icon}</div>
                    <div className="text-sm font-medium">{area.name}</div>
                  </div>
                </button>
              ))}
            </div>
            {selectedAreas.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedAreas.map((area) => (
                  <Badge key={area} variant="secondary">
                    {area}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Time Commitment */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              {t("Time Commitment")}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {t("How much time can you dedicate to skill growth?")}
            </p>
          </CardHeader>
          <CardContent>
            <RadioGroup value={timeCommitment} onValueChange={setTimeCommitment}>
              {timeOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Job Type */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              {t("Job Type")}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {t("What type of opportunity are you seeking?")}
            </p>
          </CardHeader>
          <CardContent>
            <RadioGroup value={jobType} onValueChange={setJobType}>
              {jobTypes.map((type) => (
                <div key={type.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={type.value} id={type.value} />
                  <Label htmlFor={type.value} className="flex-1 cursor-pointer">
                    {type.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center mt-12">
        <Button
          size="lg"
          onClick={handleSubmit}
          disabled={!isComplete}
          className="gap-2 text-lg px-8 py-6 rounded-full bg-gradient-to-r from-primary via-secondary to-primary bg-size-200 hover:bg-pos-100 transition-all duration-500"
        >
          {t("Continue to Assessment")}
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default CareerPreferences;
