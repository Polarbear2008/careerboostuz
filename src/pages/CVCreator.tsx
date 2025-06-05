import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Award, 
  FileText,
  CheckCircle2,
  Eye,
  ArrowLeft,
  Download,
  SparkleIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Import our custom components
import PersonalInfoForm from "@/components/cv-creator/PersonalInfoForm";
import ExperienceForm from "@/components/cv-creator/ExperienceForm";
import EducationForm from "@/components/cv-creator/EducationForm";
import SkillsForm from "@/components/cv-creator/SkillsForm";
import CVPreview from "@/components/cv-creator/CVPreview";
import CVSectionCard from "@/components/cv-creator/CVSectionCard";
import { CVFormValues, cvFormSchema } from "@/components/cv-creator/types";

// New animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

const CVCreator = () => {
  const [activeTab, setActiveTab] = useState("edit");
  const [skills, setSkills] = useState<string[]>([]);
  const [currentSkill, setCurrentSkill] = useState("");

  // Initialize form with default values
  const form = useForm<CVFormValues>({
    resolver: zodResolver(cvFormSchema),
    defaultValues: {
      personalInfo: {
        fullName: "",
        jobTitle: "",
        email: "",
        phone: "",
        location: "",
        website: "",
        summary: "",
      },
      experience: [
        {
          title: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          current: false,
          description: "",
        },
      ],
      education: [
        {
          degree: "",
          institution: "",
          location: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
      skills: [],
    },
  });

  // Watch form values for preview
  const formValues = form.watch();

  // Handle form submission
  const onSubmit = (data: CVFormValues) => {
    console.log("CV Data:", data);
    toast.success("CV created successfully! Ready to download.");
    setActiveTab("preview");
  };

  return (
    <div className="min-h-screen cv-form-bg pattern-bg pt-24 pb-16">
      {/* Back to Home button positioned in top-left corner */}
      <div className="fixed top-20 left-4 z-10">
        <Button 
          variant="outline" 
          size="sm" 
          className="shadow-sm bg-white/80 backdrop-blur-sm hover:bg-white" 
          asChild
        >
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
          </Link>
        </Button>
      </div>

      <div className="container px-4 mx-auto">
        <motion.div 
          className="text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-2 text-gradient bg-gradient-to-r from-primary to-indigo-600">
            Professional CV Creator
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Create a standout CV in minutes. Fill in your details, add your experience and skills, then download your professional CV instantly.
          </p>
          <div className="flex justify-center items-center space-x-1 mt-2 text-xs text-slate-500">
            <SparkleIcon className="h-3.5 w-3.5 text-amber-500" />
            <span>Trusted by over 10,000 professionals</span>
          </div>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2 p-1 bg-blue-100/70 rounded-full backdrop-blur-sm">
              <TabsTrigger 
                value="edit" 
                className="rounded-full data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all duration-200 text-slate-600"
              >
                <FileText className="w-4 h-4 mr-2" />
                Edit CV
              </TabsTrigger>
              <TabsTrigger 
                value="preview" 
                className="rounded-full data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm transition-all duration-200 text-slate-600"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="edit">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <motion.div 
                  className="space-y-8"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div variants={itemVariants}>
                    <CVSectionCard 
                      icon={User} 
                      title="Personal Information" 
                      description="Let's start with your personal and contact details"
                    >
                      <PersonalInfoForm control={form.control} />
                    </CVSectionCard>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <CVSectionCard 
                      icon={Briefcase} 
                      title="Work Experience" 
                      description="Highlight your professional journey and achievements"
                    >
                      <ExperienceForm 
                        control={form.control} 
                        getValues={form.getValues} 
                        setValue={form.setValue} 
                      />
                    </CVSectionCard>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <CVSectionCard 
                      icon={GraduationCap} 
                      title="Education" 
                      description="Share your educational background and qualifications"
                    >
                      <EducationForm 
                        control={form.control} 
                        getValues={form.getValues} 
                        setValue={form.setValue} 
                      />
                    </CVSectionCard>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <CVSectionCard 
                      icon={Award} 
                      title="Skills" 
                      description="Showcase your technical and professional expertise"
                    >
                      <SkillsForm
                        skills={skills}
                        setSkills={setSkills}
                        currentSkill={currentSkill}
                        setCurrentSkill={setCurrentSkill}
                        setValue={form.setValue}
                        formErrors={form.formState.errors}
                      />
                    </CVSectionCard>
                  </motion.div>

                  <motion.div 
                    className="flex justify-center pt-4"
                    variants={itemVariants}
                  >
                    <Button 
                      type="submit" 
                      className="gradient-btn px-8 py-6 text-base flex items-center space-x-2 group"
                    >
                      <CheckCircle2 className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" /> 
                      <span>Generate My Professional CV</span>
                    </Button>
                  </motion.div>
                </motion.div>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="preview">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <CVPreview formValues={formValues} skills={skills} />
              
              <div className="flex justify-center mt-8">
                <Button 
                  onClick={() => setActiveTab("edit")}
                  variant="outline" 
                  className="mr-4 border-blue-200 text-blue-700 hover:bg-blue-50"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" /> 
                  Back to Edit
                </Button>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CVCreator;
