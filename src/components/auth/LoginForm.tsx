
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useLocation } from "react-router-dom";
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
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Spinner } from "@/components/ui/spinner";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

export const LoginForm = () => {
  const { signIn, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();
  
  // Get the page they tried to visit before being redirected to login
  const from = location.state?.from || "/";

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      await signIn(data.email, data.password);
      // Redirect happens in the AuthContext
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-none shadow-md bg-white/80 backdrop-blur-sm">
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                        disabled={loading || isSubmitting}
                      />
                    </FormControl>
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
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
                        disabled={loading || isSubmitting} 
                      />
                    </FormControl>
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                      disabled={loading || isSubmitting}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  <div className="flex justify-end mt-1">
                    <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full py-6 bg-gradient-to-r from-primary via-indigo-500 to-purple-600 hover:from-primary/90 hover:to-purple-500 transition-all duration-300"
              disabled={loading || isSubmitting}
            >
              {loading || isSubmitting ? (
                <div className="flex items-center gap-2">
                  <Spinner size="sm" /> 
                  <span>Signing in...</span>
                </div>
              ) : "Sign In"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
