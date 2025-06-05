
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Mail, Phone, HelpCircle } from "lucide-react";

const Help = () => {
  const faqs = [
    {
      question: "How do I get started on CareerBoost?",
      answer: "Simply sign up for a free account, complete your profile, and start browsing projects or posting your own project requirements."
    },
    {
      question: "How does payment work?",
      answer: "We use secure escrow payments. Funds are held safely until work is completed and approved by both parties."
    },
    {
      question: "What support do you offer?",
      answer: "We provide 24/7 customer support through chat, email, and phone. Our team is here to help with any questions or issues."
    },
    {
      question: "How do I build my reputation?",
      answer: "Complete projects successfully, maintain good communication, deliver quality work on time, and collect positive reviews from clients."
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Help & Support</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Get the help you need to succeed on CareerBoost
              </p>
            </div>
          </div>
        </section>

        {/* Contact Options */}
        <section className="py-16">
          <div className="page-container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <Card className="text-center">
                <CardHeader>
                  <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Live Chat</CardTitle>
                  <CardDescription>Chat with our support team in real-time</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Start Chat</Button>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Email Support</CardTitle>
                  <CardDescription>Get help via email within 24 hours</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">Send Email</Button>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Phone className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>Phone Support</CardTitle>
                  <CardDescription>Call us for immediate assistance</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">+1 (555) 123-4567</Button>
                </CardContent>
              </Card>
            </div>

            {/* FAQ Section */}
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <HelpCircle className="h-5 w-5 text-primary" />
                        {faq.question}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="max-w-2xl mx-auto mt-16">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Us</CardTitle>
                  <CardDescription>
                    Can't find what you're looking for? Send us a message and we'll get back to you.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder="Your Name" />
                    <Input placeholder="Your Email" type="email" />
                  </div>
                  <Input placeholder="Subject" />
                  <Textarea placeholder="Your Message" rows={4} />
                  <Button className="w-full">Send Message</Button>
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

export default Help;
