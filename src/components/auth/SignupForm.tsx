
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, User, Mail, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { SocialLoginButtons } from "./SocialLoginButtons";
import { useAuth } from "@/context/AuthContext";
import { Spinner } from "@/components/ui/spinner";

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

export const SignupForm = () => {
  const { signUp, loading, checkExistingEmail } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  
  // When email field changes, check if it already exists
  const handleEmailChange = async (email: string) => {
    form.setValue("email", email);
    
    if (email && form.formState.touchedFields.email) {
      try {
        setIsCheckingEmail(true);
        const exists = await checkExistingEmail(email);
        setEmailExists(exists);
        if (exists) {
          form.setError("email", {
            type: "manual",
            message: "This email is already registered. Please sign in instead."
          });
        } else {
          form.clearErrors("email");
        }
      } catch (error) {
        console.error("Error checking email:", error);
      } finally {
        setIsCheckingEmail(false);
      }
    }
  };

  const onSubmit = async (data: FormValues) => {
    if (emailExists) {
      toast.error("This email is already registered. Please sign in instead.");
      return;
    }
    
    // Extract first name and last name from full name
    const nameParts = data.fullName.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";
    
    await signUp(data.email, data.password, firstName, lastName);
  };

  const password = form.watch("password");
  const passwordStrength = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
  };
  
  const passwordStrengthPercent = Object.values(passwordStrength).filter(Boolean).length * 33.33;

  return (
    <Card className="border-none shadow-md bg-white/80 backdrop-blur-sm">
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80">Full Name</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input 
                        placeholder="John Doe" 
                        className="pl-10 bg-white border-slate-200" 
                        {...field} 
                        disabled={loading}
                      />
                    </FormControl>
                    <User className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80">Email</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input 
                        placeholder="your@email.com" 
                        className="pl-10 bg-white border-slate-200" 
                        {...field} 
                        onChange={(e) => handleEmailChange(e.target.value)}
                        disabled={loading || isCheckingEmail}
                      />
                    </FormControl>
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                    {isCheckingEmail && (
                      <div className="absolute right-3 top-2.5">
                        <Spinner size="sm" />
                      </div>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80">Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••" 
                        className="pl-10 pr-10 bg-white border-slate-200" 
                        {...field}
                        disabled={loading} 
                      />
                    </FormControl>
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                      disabled={loading}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  <FormMessage />
                  
                  {/* Password strength indicator */}
                  {password.length > 0 && (
                    <div className="mt-2 space-y-2">
                      <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-300 ${
                            passwordStrengthPercent <= 33 ? 'bg-red-500' : 
                            passwordStrengthPercent <= 66 ? 'bg-yellow-500' : 
                            'bg-green-500'
                          }`}
                          style={{ width: `${passwordStrengthPercent}%` }}
                        ></div>
                      </div>
                      
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className={`h-3.5 w-3.5 ${passwordStrength.length ? 'text-green-500' : 'text-slate-300'}`} />
                          <span className={passwordStrength.length ? 'text-green-700' : 'text-slate-500'}>
                            At least 8 characters
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className={`h-3.5 w-3.5 ${passwordStrength.uppercase ? 'text-green-500' : 'text-slate-300'}`} />
                          <span className={passwordStrength.uppercase ? 'text-green-700' : 'text-slate-500'}>
                            At least one uppercase letter
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className={`h-3.5 w-3.5 ${passwordStrength.number ? 'text-green-500' : 'text-slate-300'}`} />
                          <span className={passwordStrength.number ? 'text-green-700' : 'text-slate-500'}>
                            At least one number
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80">Confirm Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input 
                        type={showConfirmPassword ? "text" : "password"} 
                        placeholder="••••••••" 
                        className="pl-10 pr-10 bg-white border-slate-200" 
                        {...field}
                        disabled={loading} 
                      />
                    </FormControl>
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                    <button 
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                      disabled={loading}
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full py-6 bg-gradient-to-r from-primary via-indigo-500 to-purple-600 hover:from-primary/90 hover:to-purple-500 transition-all duration-300"
              disabled={loading || isCheckingEmail || emailExists}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Spinner size="sm" /> 
                  <span>Creating Account...</span>
                </div>
              ) : "Create Account"}
            </Button>
            
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-slate-50 px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            
            <SocialLoginButtons />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
