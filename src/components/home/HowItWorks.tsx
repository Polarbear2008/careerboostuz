
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

export const HowItWorks = () => {
  const { t } = useLanguage();
  
  const steps = [
    {
      number: "01",
      titleKey: "howItWorks.step1.title",
      descriptionKey: "howItWorks.step1.description",
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
    },
    {
      number: "02",
      titleKey: "howItWorks.step2.title",
      descriptionKey: "howItWorks.step2.description",
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      number: "03",
      titleKey: "howItWorks.step3.title",
      descriptionKey: "howItWorks.step3.description",
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      number: "04",
      titleKey: "howItWorks.step4.title",
      descriptionKey: "howItWorks.step4.description",
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="section-padding">
      <div className="page-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">{t("howItWorks.title")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("howItWorks.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative animate-fadeIn"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="p-6 rounded-lg border bg-card hover-lift h-full flex flex-col">
                <div className="mb-6 flex items-center justify-between">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    {step.icon}
                  </div>
                  <span className="text-3xl font-bold text-muted-foreground/20">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{t(step.titleKey)}</h3>
                <p className="text-muted-foreground flex-grow">{t(step.descriptionKey)}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-muted-foreground/30">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button className="shadow-soft bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity px-8" size="lg">
            {t("howItWorks.getStarted")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
