
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface BenefitItemProps {
  children: ReactNode;
}

const BenefitItem = ({ children }: BenefitItemProps) => (
  <li className="flex items-start gap-2">
    <div className="h-5 w-5 rounded-full bg-white/25 flex-shrink-0 mt-0.5"></div>
    <span>{children}</span>
  </li>
);

interface GradientPanelProps {
  title: string;
  subtitle: string;
  benefits: string[];
  benefitsTitle: string;
  gradientDirection: "br" | "tl";
}

export const GradientPanel = ({
  title,
  subtitle,
  benefits,
  benefitsTitle,
  gradientDirection,
}: GradientPanelProps) => {
  const gradientClass = gradientDirection === "br" 
    ? "bg-gradient-to-br from-primary/90 via-indigo-500 to-purple-600" 
    : "bg-gradient-to-tl from-purple-600 via-indigo-500 to-primary/90";
  
  return (
    <div className={`hidden lg:flex lg:w-1/2 ${gradientClass} p-12 relative`}>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg width=%2730%27 height=%2730%27 viewBox=%270 0 30 30%27 fill=%27none%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cpath d=%27M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z%27 fill=%27rgba(255,255,255,0.15)%27%3E%3C/path%3E%3C/svg%3E')] opacity-20"></div>
      <div className="relative z-10 flex flex-col justify-between h-full text-white">
        <div>
          <h1 className="text-4xl font-bold">{title}</h1>
          <p className="mt-4 text-lg opacity-90">{subtitle}</p>
        </div>
        
        <motion.div 
          className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold mb-3">{benefitsTitle}</h3>
          <ul className="space-y-3">
            {benefits.map((benefit, index) => (
              <BenefitItem key={index}>{benefit}</BenefitItem>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
};
