
import { motion } from "framer-motion";

export const StatsSection = () => {
  const stats = [
    { value: "10K+", label: "Professional Freelancers" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "24h", label: "Average Response Time" },
    { value: "85%", label: "Repeat Hiring Rate" },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="page-container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl bg-white shadow-soft"
            >
              <p className="text-3xl font-bold text-primary mb-2">{stat.value}</p>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
