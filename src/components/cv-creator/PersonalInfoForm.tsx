
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { User, Phone, Mail, MapPin, Globe, Info, Briefcase } from "lucide-react";
import { Control } from "react-hook-form";
import { CVFormValues } from "./types";
import { motion } from "framer-motion";

interface PersonalInfoFormProps {
  control: Control<CVFormValues>;
}

const PersonalInfoForm = ({ control }: PersonalInfoFormProps) => {
  return (
    <div className="space-y-6 pt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="personalInfo.fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-700 flex items-center">
                <User className="w-3.5 h-3.5 mr-1.5 text-blue-500" /> Full Name
              </FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} className="cv-input-field" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="personalInfo.jobTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-700 flex items-center">
                <Briefcase className="w-3.5 h-3.5 mr-1.5 text-blue-500" /> Job Title
              </FormLabel>
              <FormControl>
                <Input placeholder="Software Developer" {...field} className="cv-input-field" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="personalInfo.email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-700 flex items-center">
                <Mail className="w-3.5 h-3.5 mr-1.5 text-blue-500" /> Email
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input placeholder="john@example.com" {...field} className="pl-10 cv-input-field" />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="personalInfo.phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-700 flex items-center">
                <Phone className="w-3.5 h-3.5 mr-1.5 text-blue-500" /> Phone
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input placeholder="+1 (555) 123-4567" {...field} className="pl-10 cv-input-field" />
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="personalInfo.location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-700 flex items-center">
                <MapPin className="w-3.5 h-3.5 mr-1.5 text-blue-500" /> Location
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input placeholder="New York, NY" {...field} className="pl-10 cv-input-field" />
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="personalInfo.website"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-700 flex items-center">
                <Globe className="w-3.5 h-3.5 mr-1.5 text-blue-500" /> Website/Portfolio
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input placeholder="https://yourwebsite.com" {...field} className="pl-10 cv-input-field" />
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name="personalInfo.summary"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-slate-700 flex items-center">
              <Info className="w-3.5 h-3.5 mr-1.5 text-blue-500" /> Professional Summary
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="A brief summary of your professional background and goals"
                className="min-h-24 cv-input-field"
                {...field}
              />
            </FormControl>
            <motion.p 
              className="text-xs text-slate-500 mt-1 ml-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Pro tip: Keep your summary concise (3-5 sentences) and highlight your most relevant skills and achievements.
            </motion.p>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default PersonalInfoForm;
