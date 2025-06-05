
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";

const SuccessStories = () => {
  const stories = [
    {
      name: "Sarah Martinez",
      role: "Full-Stack Developer",
      company: "TechStartup Inc.",
      story: "CareerBoost helped me transition from a traditional 9-to-5 job to freelancing. Within 6 months, I was earning 40% more and had the flexibility to work from anywhere.",
      earnings: "$120K+ earned",
      projects: "45+ projects completed",
      rating: 4.9,
      image: "/placeholder.svg"
    },
    {
      name: "James Wilson",
      role: "UI/UX Designer",
      company: "Creative Agency",
      story: "The platform connected me with high-quality clients who valued my work. I've built long-term relationships that have sustained my freelance career for over 2 years.",
      earnings: "$85K+ earned",
      projects: "32+ projects completed",
      rating: 5.0,
      image: "/placeholder.svg"
    },
    {
      name: "Maria Rodriguez",
      role: "Content Writer",
      company: "Marketing Solutions",
      story: "Starting with small projects, I gradually built my reputation on CareerBoost. Now I work with Fortune 500 companies and have a steady stream of clients.",
      earnings: "$60K+ earned",
      projects: "78+ projects completed",
      rating: 4.8,
      image: "/placeholder.svg"
    }
  ];

  return (
    <>
      <NavBar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 to-secondary/5 py-20">
          <div className="page-container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Success Stories</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Real stories from freelancers who transformed their careers with CareerBoost
              </p>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-16">
          <div className="page-container">
            <div className="space-y-12">
              {stories.map((story, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <CardHeader>
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-16 h-16 bg-muted rounded-full"></div>
                          <div>
                            <CardTitle className="text-xl">{story.name}</CardTitle>
                            <CardDescription>{story.role}</CardDescription>
                            <div className="flex items-center gap-1 mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-4 w-4 ${i < Math.floor(story.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                />
                              ))}
                              <span className="text-sm text-muted-foreground ml-1">{story.rating}</span>
                            </div>
                          </div>
                        </div>
                        <Quote className="h-8 w-8 text-primary/20 mb-4" />
                        <CardDescription className="text-base leading-relaxed">
                          {story.story}
                        </CardDescription>
                      </CardHeader>
                    </div>
                    <div className="bg-muted p-6 flex flex-col justify-center">
                      <div className="space-y-4">
                        <div>
                          <div className="text-2xl font-bold text-primary">{story.earnings}</div>
                          <div className="text-sm text-muted-foreground">Total Earnings</div>
                        </div>
                        <div>
                          <div className="text-xl font-semibold">{story.projects}</div>
                          <div className="text-sm text-muted-foreground">Projects Completed</div>
                        </div>
                        <Badge variant="secondary">{story.company}</Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-muted">
          <div className="page-container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Platform Success Metrics</h2>
              <p className="text-muted-foreground">Numbers that speak for our community's success</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">$50M+</div>
                <div className="text-muted-foreground">Total Earnings</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">98%</div>
                <div className="text-muted-foreground">Client Satisfaction</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">4.9/5</div>
                <div className="text-muted-foreground">Average Rating</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">90%</div>
                <div className="text-muted-foreground">Return Clients</div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default SuccessStories;
