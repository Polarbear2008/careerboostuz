
import { GraduationCap, TrendingUp, Lightbulb, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/useLanguage";
import { motion } from "framer-motion";

interface CareerTestHeaderProps {
  onStart: () => void;
}

const CareerTestHeader = ({ onStart }: CareerTestHeaderProps) => {
  const { t } = useLanguage();

  return (
    <div className="py-12 space-y-16">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <h1 className="text-5xl md:text-6xl font-display font-bold tracking-tight">
            <span className="text-gradient bg-gradient-to-r from-primary via-secondary to-primary bg-size-200">
              {t("Discover Your")}
            </span>
            <br />
            <span className="relative">
              {t("Perfect Career Path")}
              <motion.svg
                width="100%"
                height="8"
                viewBox="0 0 300 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-0 -bottom-2 w-full opacity-70"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.7 }}
                transition={{ duration: 1, delay: 1 }}
              >
                <path
                  d="M1 5.5C20 2.5 40 7.5 60 6.5C80 5.5 100 1.5 120 3.5C140 5.5 160 7 180 5.5C200 4 220 1.5 240 1.5C260 1.5 280 4 299 6"
                  stroke="url(#paint0_linear)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear"
                    x1="1"
                    y1="4"
                    x2="299"
                    y2="4"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="hsl(var(--primary))" />
                    <stop offset="0.5" stopColor="hsl(var(--secondary))" />
                    <stop offset="1" stopColor="hsl(var(--primary))" />
                  </linearGradient>
                </defs>
              </motion.svg>
            </span>
          </h1>
        </motion.div>
        
        <motion.p 
          className="text-xl text-muted-foreground max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {t("Our advanced career assessment helps you identify your strengths, potential growth areas, and matches you with the ideal career paths and skills to develop.")}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            size="lg" 
            onClick={onStart}
            className="mt-6 text-lg px-10 py-7 rounded-full bg-gradient-to-r from-primary via-secondary to-primary bg-size-200 hover:bg-pos-100 transition-all duration-500 shadow-lg hover:shadow-xl"
          >
            {t("Start Your Career Assessment")}
          </Button>
        </motion.div>
      </div>
      
      <motion.div 
        className="grid md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8 }}
      >
        {[
          {
            icon: <GraduationCap className="h-12 w-12" />,
            color: "from-blue-500/90 to-indigo-600/90",
            title: t("Skill Assessment"),
            description: t("Evaluate your current skills and expertise levels across different domains.")
          },
          {
            icon: <TrendingUp className="h-12 w-12" />,
            color: "from-purple-500/90 to-pink-600/90",
            title: t("Growth Opportunities"),
            description: t("Identify high-demand skills that complement your existing abilities.")
          },
          {
            icon: <Lightbulb className="h-12 w-12" />,
            color: "from-orange-500/90 to-amber-600/90",
            title: t("Career Recommendations"),
            description: t("Get personalized job recommendations that match your unique skill profile.")
          }
        ].map((feature, index) => (
          <motion.div
            key={index}
            className="relative group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 + index * 0.2 }}
            whileHover={{ y: -5 }}
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r blur-sm opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                 style={{ background: `linear-gradient(to right, ${feature.color.split(' ')[1]}, ${feature.color.split(' ')[3]})` }} />
            
            <div className="relative h-full bg-card border border-border/50 backdrop-blur-sm p-8 rounded-2xl">
              <div className="flex flex-col h-full items-center text-center space-y-4">
                <div className={`p-4 rounded-full bg-gradient-to-r ${feature.color} text-white`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div 
        className="flex justify-center pt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="h-6 w-6 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CareerTestHeader;
