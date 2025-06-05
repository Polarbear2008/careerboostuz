
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/useLanguage";
import { motion } from "framer-motion";
import { useState } from "react";
import { FreelancerApplicationDialog } from "./FreelancerApplicationDialog";

export const HeroSection = () => {
  const { t } = useLanguage();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  return <section className="relative bg-gradient-to-br from-blue-600 to-indigo-700 py-20 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-24 w-96 h-96 bg-white/20 rounded-full blur-3xl" />
      </div>
      
      <div className="page-container relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <motion.h1 initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} className="text-4xl md:text-5xl font-bold mb-6">
            Discover Top Talent for Your Projects
          </motion.h1>
          
          <motion.p initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }} className="text-lg text-blue-100 mb-8">
            Connect with skilled professionals ready to bring your ideas to life. Find the perfect match for your project needs.
          </motion.p>
          
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.4
        }} className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50" onClick={() => window.location.href = "/post-project"}>
              Post a Project
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white hover:bg-white/10 text-amber-400"
              onClick={() => setIsDialogOpen(true)}
            >
              Be a freelancer
            </Button>
          </motion.div>
        </div>
      </div>
      
      <FreelancerApplicationDialog 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
      />
    </section>;
};
