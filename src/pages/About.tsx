import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, Award, Globe } from "lucide-react";
const About = () => {
  const values = [{
    icon: <Users className="h-12 w-12 text-primary" />,
    title: "Community First",
    description: "We believe in building a strong, supportive community where freelancers and clients can thrive together."
  }, {
    icon: <Target className="h-12 w-12 text-primary" />,
    title: "Quality Focus",
    description: "We're committed to maintaining high standards and helping professionals deliver exceptional work."
  }, {
    icon: <Award className="h-12 w-12 text-primary" />,
    title: "Innovation",
    description: "We continuously evolve our platform with cutting-edge technology to serve our users better."
  }, {
    icon: <Globe className="h-12 w-12 text-primary" />,
    title: "Global Impact",
    description: "Connecting talent worldwide to create opportunities and drive economic growth everywhere."
  }];
  return <>
      <NavBar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 to-secondary/5 py-20">
          <div className="page-container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About CareerBoost</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Empowering professionals and businesses to achieve their goals through innovative freelance solutions
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="page-container">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                CareerBoost was founded with a simple yet powerful vision: to create a world where talent has no boundaries. 
                We connect skilled professionals with businesses that need their expertise, fostering innovation and growth 
                across the global economy. Our platform breaks down geographical barriers and creates opportunities for 
                meaningful work and successful partnerships.
              </p>
            </div>

            {/* Values */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {values.map((value, index) => <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="mx-auto mb-4">{value.icon}</div>
                    <CardTitle>{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{value.description}</CardDescription>
                  </CardContent>
                </Card>)}
            </div>

            {/* Stats */}
            <div className="bg-muted rounded-2xl p-8 mb-16">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">10K+</div>
                  <div className="text-muted-foreground">Active Freelancers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">5K+</div>
                  <div className="text-muted-foreground">Happy Clients</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">25K+</div>
                  <div className="text-muted-foreground">Projects Completed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">50+</div>
                  <div className="text-muted-foreground">Countries</div>
                </div>
              </div>
            </div>

            {/* Story */}
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Our Story</h2>
              <div className="prose prose-lg mx-auto text-muted-foreground">
                <p>CareerBoost began in 2024 when our founders recognized a growing need for flexible work solutions in an increasingly digital world. </p>
                <p>
                  Today, we're proud to be at the forefront of the freelance revolution, providing tools 
                  and resources that help independent professionals build successful careers while enabling 
                  businesses to access top-tier talent on demand.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>;
};
export default About;