
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GraduationCap, Plus, Trash } from "lucide-react";
import { Control, UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { CVFormValues } from "./types";

interface EducationFormProps {
  control: Control<CVFormValues>;
  getValues: UseFormGetValues<CVFormValues>;
  setValue: UseFormSetValue<CVFormValues>;
}

const EducationForm = ({ control, getValues, setValue }: EducationFormProps) => {
  // Add education entry
  const addEducation = () => {
    const currentEducation = getValues("education");
    setValue("education", [
      ...currentEducation,
      {
        degree: "",
        institution: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  // Remove education entry
  const removeEducation = (index: number) => {
    const currentEducation = getValues("education");
    setValue(
      "education",
      currentEducation.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="space-y-6 pt-6">
      {getValues("education").map((_, index) => (
        <div key={index} className="space-y-4 p-6 border rounded-lg border-blue-100 bg-blue-50/50 relative">
          <button
            type="button"
            onClick={() => removeEducation(index)}
            className="absolute top-3 right-3 text-red-400 hover:text-red-600 transition-colors"
            disabled={getValues("education").length <= 1}
          >
            <Trash size={18} />
          </button>
          
          <h3 className="font-medium text-primary flex items-center">
            <GraduationCap className="w-4 h-4 mr-2" />
            Education {index + 1}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={control}
              name={`education.${index}.degree`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700">Degree</FormLabel>
                  <FormControl>
                    <Input placeholder="Bachelor of Science in Computer Science" {...field} className="border-blue-200 focus-visible:ring-blue-400" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`education.${index}.institution`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700">Institution</FormLabel>
                  <FormControl>
                    <Input placeholder="University of Technology" {...field} className="border-blue-200 focus-visible:ring-blue-400" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={control}
              name={`education.${index}.location`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700">Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Boston, MA" {...field} className="border-blue-200 focus-visible:ring-blue-400" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`education.${index}.startDate`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700">Start Date</FormLabel>
                  <FormControl>
                    <Input placeholder="Sep 2016" {...field} className="border-blue-200 focus-visible:ring-blue-400" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`education.${index}.endDate`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700">End Date</FormLabel>
                  <FormControl>
                    <Input placeholder="May 2020" {...field} className="border-blue-200 focus-visible:ring-blue-400" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={control}
            name={`education.${index}.description`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-700">Description (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Relevant coursework, achievements, etc."
                    className="min-h-20 border-blue-200 focus-visible:ring-blue-400"
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
        onClick={addEducation}
        className="w-full border-dashed border-blue-300 text-primary hover:bg-blue-50 transition-colors"
      >
        <Plus className="mr-2 h-4 w-4" /> Add More Education
      </Button>
    </div>
  );
};

export default EducationForm;
