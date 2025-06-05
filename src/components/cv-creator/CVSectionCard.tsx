
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface CVSectionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  children: ReactNode;
}

const CVSectionCard = ({ icon: Icon, title, description, children }: CVSectionCardProps) => {
  return (
    <Card className="border-none shadow-md bg-white/90 backdrop-blur-sm cv-section-card gradient-border">
      <CardHeader className="cv-section-header pb-4">
        <CardTitle className="flex items-center text-primary">
          <Icon className="w-5 h-5 mr-2" />
          {title}
        </CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="relative">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default CVSectionCard;
