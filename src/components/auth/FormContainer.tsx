
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

interface FormContainerProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  alternativeLinkText: string;
  alternativeLinkTo: string;
  alternativeLinkLabel: string;
  termsAndPolicyText?: boolean;
}

export const FormContainer = ({
  children,
  title,
  subtitle,
  alternativeLinkText,
  alternativeLinkTo,
  alternativeLinkLabel,
  termsAndPolicyText = true,
}: FormContainerProps) => {
  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-slate-50">
      <motion.div 
        className="w-full max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground">
            {alternativeLinkText}{" "}
            <Link to={alternativeLinkTo} className="font-medium text-primary hover:underline">
              {alternativeLinkLabel}
            </Link>
          </p>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-muted-foreground mt-2">{subtitle}</p>
        </div>
        
        {children}
        
        {termsAndPolicyText && (
          <p className="text-center text-xs text-muted-foreground mt-6">
            By signing in, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>
          </p>
        )}
      </motion.div>
    </div>
  );
};
