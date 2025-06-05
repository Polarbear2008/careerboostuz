
import { motion } from "framer-motion";
import { Shield, Clock, Users, Award } from "lucide-react";

export const BenefitsSection = () => {
  const benefits = [
    {
      icon: <Shield className="h-10 w-10 text-blue-500" />,
      title: "Secure Hiring",
      description: "Our platform ensures secure transactions and protected communication for all your hiring needs."
    },
    {
      icon: <Clock className="h-10 w-10 text-blue-500" />,
      title: "Save Time",
      description: "Quickly find pre-vetted professionals who match your project requirements and timeline."
    },
    {
      icon: <Users className="h-10 w-10 text-blue-500" />,
      title: "Quality Talent",
      description: "Connect with skilled professionals who have passed our rigorous verification process."
    },
    {
      icon: <Award className="h-10 w-10 text-blue-500" />,
      title: "Satisfaction Guaranteed",
      description: "We stand behind the quality of work delivered by professionals on our platform."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="page-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Our Platform</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find the perfect match for your project with our curated talent pool and powerful matching algorithm.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-50"
            >
              <div className="mb-4 p-3 rounded-full bg-blue-50">{benefit.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
