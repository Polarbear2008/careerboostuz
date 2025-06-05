
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase, Plus, Trash } from "lucide-react";
import { Control, UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { CVFormValues } from "./types";

interface ExperienceFormProps {
  control: Control<CVFormValues>;
  getValues: UseFormGetValues<CVFormValues>;
  setValue: UseFormSetValue<CVFormValues>;
}

const ExperienceForm = ({ control, getValues, setValue }: ExperienceFormProps) => {
  // Add experience entry
  const addExperience = () => {
    const currentExperience = getValues("experience");
    setValue("experience", [
      ...currentExperience,
      {
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      },
    ]);
  };

  // Remove experience entry
  const removeExperience = (index: number) => {
    const currentExperience = getValues("experience");
    setValue(
      "experience",
      currentExperience.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="space-y-6 pt-6">
      {getValues("experience").map((_, index) => (
        <div key={index} className="space-y-4 p-6 border rounded-lg border-blue-100 bg-blue-50/50 relative">
          <button
            type="button"
            onClick={() => removeExperience(index)}
            className="absolute top-3 right-3 text-red-400 hover:text-red-600 transition-colors"
            disabled={getValues("experience").length <= 1}
          >
            <Trash size={18} />
          </button>
          
          <h3 className="font-medium text-primary flex items-center">
            <Briefcase className="w-4 h-4 mr-2" />
            Position {index + 1}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={control}
              name={`experience.${index}.title`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700">Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Software Engineer" {...field} className="border-blue-200 focus-visible:ring-blue-400" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`experience.${index}.company`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700">Company</FormLabel>
                  <FormControl>
                    <Input placeholder="Acme Inc." {...field} className="border-blue-200 focus-visible:ring-blue-400" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={control}
              name={`experience.${index}.location`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700">Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Remote" {...field} className="border-blue-200 focus-visible:ring-blue-400" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`experience.${index}.startDate`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700">Start Date</FormLabel>
                  <FormControl>
                    <Input placeholder="Jan 2020" {...field} className="border-blue-200 focus-visible:ring-blue-400" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`experience.${index}.endDate`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700">End Date</FormLabel>
                  <FormControl>
                    <Input placeholder="Present" {...field} className="border-blue-200 focus-visible:ring-blue-400" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={control}
            name={`experience.${index}.description`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-700">Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your responsibilities and achievements"
                    className="min-h-24 border-blue-200 focus-visible:ring-blue-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      ))}
      
      <Button
        type="button"
        variant="outline"
        onClick={addExperience}
        className="w-full border-dashed border-blue-300 text-primary hover:bg-blue-50 transition-colors"
      >
        <Plus className="mr-2 h-4 w-4" /> Add More Experience
      </Button>
    </div>
  );
};

export default ExperienceForm;
