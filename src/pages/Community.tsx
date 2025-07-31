
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Users, Calendar, BookOpen, Award, Heart, MessageSquareText, ArrowRight } from "lucide-react";

const Community = () => {
  const events = [
    {
      title: "Freelancer Networking Meetup",
      date: "March 15, 2024",
      time: "6:00 PM - 8:00 PM",
      location: "Virtual Event",
      description: "Connect with fellow freelancers and share experiences"
    },
    {
      title: "Skills Workshop: Advanced React",
      date: "March 22, 2024",
      time: "2:00 PM - 4:00 PM",
      location: "Online",
      description: "Master advanced React concepts with expert instructors"
    },
    {
      title: "Client Success Stories Panel",
      date: "March 29, 2024",
      time: "7:00 PM - 8:30 PM",
      location: "Virtual Event",
      description: "Learn from successful client-freelancer partnerships"
    }
  ];

  const features = [
    {
      icon: <MessageCircle className="h-12 w-12 text-primary" />,
      title: "Forums & Discussions",
      description: "Join conversations on industry trends, best practices, and project collaboration"
    },
    {
      icon: <Calendar className="h-12 w-12 text-primary" />,
      title: "Events & Workshops",
      description: "Attend virtual and in-person events to learn new skills and network"
    },
    {
      icon: <BookOpen className="h-12 w-12 text-primary" />,
      title: "Learning Resources",
      description: "Access free courses, guides, and tutorials to advance your career"
    },
    {
      icon: <Award className="h-12 w-12 text-primary" />,
      title: "Recognition Programs",
      description: "Get recognized for your contributions and achievements in the community"
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Community</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Connect with fellow freelancers, share knowledge, and grow together in our Telegram community
              </p>
              <a 
                href="https://t.me/careerboost_uz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button size="lg" className="group">
                  <MessageSquareText className="mr-2 h-5 w-5" />
                  Join Our Telegram
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16">
          <div className="page-container">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center mb-16">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">15K+</div>
                <div className="text-muted-foreground">Community Members</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <div className="text-muted-foreground">Monthly Events</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">1K+</div>
                <div className="text-muted-foreground">Learning Resources</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-muted-foreground">Community Support</div>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
          </div>
        </section>

        {/* Telegram CTA Section */}
        <section className="py-16 bg-primary/5">
          <div className="page-container">
            <div className="bg-gradient-to-r from-primary to-primary/90 rounded-2xl p-8 md:p-12 text-white">
              <div className="max-w-4xl mx-auto text-center">
                <MessageSquareText className="h-12 w-12 mx-auto mb-6 text-white/90" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Telegram Community</h2>
                <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                  Connect with other professionals, share opportunities, and stay updated with the latest news and events in our exclusive Telegram group.
                </p>
                <a 
                  href="https://t.me/careerboost_uz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button 
                    size="lg" 
                    variant="secondary" 
                    className="group bg-white text-primary hover:bg-white/90 font-medium"
                  >
                    <MessageSquareText className="mr-2 h-5 w-5" />
                    Join @careerboost_uz
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="page-container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Why Join Our Community?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Be part of a growing network of talented professionals and access exclusive resources on Telegram
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {events.map((event, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    <CardDescription>{event.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {event.date}
                      </div>
                      <div>{event.time}</div>
                      <div>{event.location}</div>
                    </div>
                    <Button variant="outline" className="w-full">Register</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="page-container">
            <div className="max-w-3xl mx-auto text-center">
              <Heart className="h-16 w-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">Ready to Join?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Become part of a thriving community that supports your professional growth
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg">Join Community</Button>
                <Button variant="outline" size="lg">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default Community;
