import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { 
  Briefcase, 
  FileText, 
  Clock, 
  DollarSign, 
  Calendar,
  Send,
  AtSign
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const projectSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  category: z.string().min(1, "Please select a category"),
  expertise: z.string().min(1, "Please select an expertise level"),
  skills: z.string().min(3, "Please enter required skills"),
  timeline: z.string().min(1, "Please select a timeline"),
  deadline: z.string().optional(),
  budgetType: z.string().min(1, "Please select a budget type"),
  budget: z.string().min(1, "Please enter a budget amount"),
  contactDetails: z.string().min(5, "Please enter contact details for applicants"),
  termsAgreed: z.boolean().refine(val => val === true, "You must agree to the terms")
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export const ProjectForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      expertise: "",
      skills: "",
      timeline: "",
      deadline: "",
      budgetType: "",
      budget: "",
      contactDetails: "",
      termsAgreed: false
    }
  });

  const onSubmit = async (values: ProjectFormValues) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to post a project",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Format the data for saving to Supabase
      const projectData = {
        title: values.title,
        description: values.description,
        skills: values.skills,
        budget: `${values.budgetType === 'fixed' ? 'Fixed: ' : 'Hourly: '}$${values.budget}`,
        deadline: values.deadline || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Default to 30 days from now
        user_id: user.id,
        // Added fields that match our newly created columns
        category: values.category,
        expertise_level: values.expertise,
        timeline: values.timeline,
        contact_details: values.contactDetails, // Store the new contact details
        company: "Your Company", // You could add a company field to the form if needed
        location: "Remote" // You could add a location field to the form if needed
      };

      const { error } = await supabase
        .from('projects')
        .insert(projectData);
      
      if (error) throw error;
      
      toast({
        title: "Project posted successfully!",
        description: "You'll start receiving proposals from qualified talent soon."
      });

      // Redirect to find-work page after successful submission
      navigate("/find-work");
      
    } catch (error: any) {
      console.error("Error posting project:", error);
      toast({
        title: "Failed to post project",
        description: error.message || "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-blue-500" />
              Project Details
            </CardTitle>
            <CardDescription>
              Provide the basic details about your project
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title</Label>
              <Input 
                id="title" 
                placeholder="E.g. Mobile App Development for E-commerce Platform"
                {...form.register("title")}
              />
              {form.formState.errors.title && (
                <p className="text-sm text-destructive">{form.formState.errors.title.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Project Description</Label>
              <Textarea 
                id="description" 
                placeholder="Describe your project, goals, and requirements in detail..." 
                rows={6}
                {...form.register("description")}
              />
              {form.formState.errors.description && (
                <p className="text-sm text-destructive">{form.formState.errors.description.message}</p>
              )}
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select onValueChange={(value) => form.setValue("category", value)}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="webdev">Web Development</SelectItem>
                    <SelectItem value="mobiledev">Mobile Development</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="writing">Writing & Translation</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="admin">Admin Support</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.category && (
                  <p className="text-sm text-destructive">{form.formState.errors.category.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="expertise">Required Expertise Level</Label>
                <Select onValueChange={(value) => form.setValue("expertise", value)}>
                  <SelectTrigger id="expertise">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">Entry Level</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.expertise && (
                  <p className="text-sm text-destructive">{form.formState.errors.expertise.message}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-500" />
              Skills & Requirements
            </CardTitle>
            <CardDescription>
              Specify required skills for your project
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="skills">Required Skills</Label>
              <Textarea 
                id="skills" 
                placeholder="Enter skills separated by commas (e.g. JavaScript, React, UI Design)" 
                rows={3}
                {...form.register("skills")}
              />
              {form.formState.errors.skills && (
                <p className="text-sm text-destructive">{form.formState.errors.skills.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label>Additional Requirements</Label>
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="flex items-start space-x-2">
                  <Checkbox id="req-portfolio" />
                  <Label htmlFor="req-portfolio" className="font-normal">Portfolio required</Label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox id="req-cover" />
                  <Label htmlFor="req-cover" className="font-normal">Cover letter required</Label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox id="req-native" />
                  <Label htmlFor="req-native" className="font-normal">Native language speaker</Label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox id="req-certified" />
                  <Label htmlFor="req-certified" className="font-normal">Certification required</Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              Timeline & Budget
            </CardTitle>
            <CardDescription>
              Define your project's timeline and budget
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="timeline">Project Duration</Label>
                <Select onValueChange={(value) => form.setValue("timeline", value)}>
                  <SelectTrigger id="timeline">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lessThanWeek">Less than a week</SelectItem>
                    <SelectItem value="1-2weeks">1-2 weeks</SelectItem>
                    <SelectItem value="1month">1 month</SelectItem>
                    <SelectItem value="1-3months">1-3 months</SelectItem>
                    <SelectItem value="3-6months">3-6 months</SelectItem>
                    <SelectItem value="6months+">6+ months</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.timeline && (
                  <p className="text-sm text-destructive">{form.formState.errors.timeline.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="deadline">Project Deadline</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="deadline" 
                    type="date" 
                    className="pl-10"
                    {...form.register("deadline")}
                  />
                </div>
              </div>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="budgetType">Budget Type</Label>
                <Select onValueChange={(value) => form.setValue("budgetType", value)}>
                  <SelectTrigger id="budgetType">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fixed">Fixed Price</SelectItem>
                    <SelectItem value="hourly">Hourly Rate</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.budgetType && (
                  <p className="text-sm text-destructive">{form.formState.errors.budgetType.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="budget">Budget Amount (USD)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="budget" 
                    type="number" 
                    placeholder="Enter amount" 
                    className="pl-10"
                    {...form.register("budget")}
                  />
                </div>
                {form.formState.errors.budget && (
                  <p className="text-sm text-destructive">{form.formState.errors.budget.message}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AtSign className="h-5 w-5 text-blue-500" />
              Contact Information
            </CardTitle>
            <CardDescription>
              Provide contact details for applicants
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="contactDetails">How to Apply</Label>
              <Textarea 
                id="contactDetails" 
                placeholder="Enter contact details, application link, or instructions for applicants..." 
                rows={3}
                {...form.register("contactDetails")}
              />
              {form.formState.errors.contactDetails && (
                <p className="text-sm text-destructive">{form.formState.errors.contactDetails.message}</p>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                This information will be shown to applicants when they click "Apply Now"
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Review & Post</CardTitle>
            <CardDescription>
              Review your project details before posting
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="termsAgreed" 
                onCheckedChange={(checked) => form.setValue("termsAgreed", checked === true)}
              />
              <Label htmlFor="termsAgreed" className="font-normal text-sm">
                I agree to the Terms of Service and understand that my project will be visible to potential freelancers
              </Label>
            </div>
            {form.formState.errors.termsAgreed && (
              <p className="text-sm text-destructive mt-2">{form.formState.errors.termsAgreed.message}</p>
            )}
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" className="gap-2" disabled={isSubmitting}>
              {isSubmitting ? (
                <>Processing...</>
              ) : (
                <>
                  <Send className="h-4 w-4" /> 
                  Post Project
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </form>
  );
};
