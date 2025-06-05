
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Users, Shield, Zap, TrendingUp, Clock } from "lucide-react";

const Enterprise = () => {
  const features = [
    {
      icon: <Users className="h-12 w-12 text-primary" />,
      title: "Dedicated Account Manager",
      description: "Get personalized support from a dedicated account manager who understands your business needs."
    },
    {
      icon: <Shield className="h-12 w-12 text-primary" />,
      title: "Enterprise Security",
      description: "Advanced security features including SSO, compliance reporting, and data protection."
    },
    {
      icon: <Zap className="h-12 w-12 text-primary" />,
      title: "Priority Matching",
      description: "Get matched with top-tier talent faster with our priority matching algorithm."
    },
    {
      icon: <TrendingUp className="h-12 w-12 text-primary" />,
      title: "Analytics & Insights",
      description: "Comprehensive reporting and analytics to track performance and ROI."
    },
    {
      icon: <Clock className="h-12 w-12 text-primary" />,
      title: "24/7 Support",
      description: "Round-the-clock support to ensure your projects never miss a deadline."
    }
  ];

  const benefits = [
    "Access to pre-vetted enterprise-level freelancers",
    "Custom contract templates and legal support",
    "Bulk project management tools",
    "Integration with your existing workflow tools",
    "Custom onboarding for your team",
    "Flexible payment terms and invoicing"
  ];

  return (
    <>
      <NavBar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 to-secondary/5 py-20">
          <div className="page-container">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Enterprise Solutions</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Scale your business with enterprise-grade freelance talent management
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="px-8">Schedule Demo</Button>
                <Button variant="outline" size="lg" className="px-8">Contact Sales</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16">
          <div className="page-container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Enterprise Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Everything you need to manage freelance talent at scale
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {features.map((feature, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="mx-auto mb-4">{feature.icon}</div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Benefits */}
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-6">Why Choose Enterprise?</h3>
                  <ul className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8">
                  <h4 className="text-xl font-semibold mb-4">Ready to Get Started?</h4>
                  <p className="text-muted-foreground mb-6">
                    Join hundreds of enterprises that trust CareerBoost for their freelance talent needs.
                  </p>
                  <Button className="w-full">Request Demo</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 bg-muted">
          <div className="page-container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Enterprise Pricing</h2>
              <p className="text-muted-foreground">Custom solutions tailored to your business needs</p>
            </div>

            <div className="max-w-2xl mx-auto">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Custom Enterprise Plan</CardTitle>
                  <CardDescription>Tailored solutions for your organization</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-4xl font-bold mb-4">Contact Us</div>
                  <p className="text-muted-foreground mb-6">
                    Pricing based on your specific requirements and scale
                  </p>
                  <Button size="lg" className="w-full">Contact Sales Team</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default Enterprise;
