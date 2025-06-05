
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight } from "lucide-react";

const Blog = () => {
  const posts = [
    {
      title: "10 Essential Skills Every Freelancer Needs in 2024",
      excerpt: "Discover the most in-demand skills that will help you thrive in the evolving freelance landscape.",
      author: "Sarah Johnson",
      date: "March 10, 2024",
      category: "Career Development",
      readTime: "5 min read",
      image: "/placeholder.svg"
    },
    {
      title: "How to Build Long-Term Client Relationships",
      excerpt: "Learn proven strategies for turning one-time projects into lasting business partnerships.",
      author: "Mike Chen",
      date: "March 8, 2024",
      category: "Business Growth",
      readTime: "7 min read",
      image: "/placeholder.svg"
    },
    {
      title: "The Future of Remote Work: Trends and Predictions",
      excerpt: "Explore what the future holds for remote work and how freelancers can prepare for upcoming changes.",
      author: "Emily Rodriguez",
      date: "March 5, 2024",
      category: "Industry Insights",
      readTime: "6 min read",
      image: "/placeholder.svg"
    },
    {
      title: "Pricing Your Services: A Complete Guide",
      excerpt: "Master the art of pricing your freelance services to maximize your earnings while staying competitive.",
      author: "David Kim",
      date: "March 3, 2024",
      category: "Finance",
      readTime: "8 min read",
      image: "/placeholder.svg"
    },
    {
      title: "Building a Personal Brand as a Freelancer",
      excerpt: "Learn how to create a strong personal brand that attracts clients and sets you apart from the competition.",
      author: "Lisa Thompson",
      date: "March 1, 2024",
      category: "Marketing",
      readTime: "6 min read",
      image: "/placeholder.svg"
    },
    {
      title: "Tools and Software Every Freelancer Should Know",
      excerpt: "Discover essential tools that can boost your productivity and help you deliver better results to clients.",
      author: "Alex Wilson",
      date: "February 28, 2024",
      category: "Productivity",
      readTime: "4 min read",
      image: "/placeholder.svg"
    }
  ];

  const categories = ["All", "Career Development", "Business Growth", "Industry Insights", "Finance", "Marketing", "Productivity"];

  return (
    <>
      <NavBar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 to-secondary/5 py-20">
          <div className="page-container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">CareerBoost Blog</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Insights, tips, and stories to help you succeed in your freelance career
              </p>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 border-b">
          <div className="page-container">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button key={category} variant="outline" size="sm">
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-16">
          <div className="page-container">
            <div className="max-w-4xl mx-auto mb-16">
              <Badge className="mb-4">Featured</Badge>
              <Card className="overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="aspect-video lg:aspect-auto bg-muted"></div>
                  <CardHeader className="lg:p-8">
                    <Badge variant="secondary" className="w-fit mb-2">Career Development</Badge>
                    <CardTitle className="text-2xl mb-4">10 Essential Skills Every Freelancer Needs in 2024</CardTitle>
                    <CardDescription className="text-base mb-4">
                      Discover the most in-demand skills that will help you thrive in the evolving freelance landscape. From technical abilities to soft skills, learn what clients are looking for.
                    </CardDescription>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        Sarah Johnson
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        March 10, 2024
                      </div>
                      <div>5 min read</div>
                    </div>
                    <Button className="w-fit">
                      Read Article <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardHeader>
                </div>
              </Card>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.slice(1).map((post, index) => (
                <Card key={index} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-muted"></div>
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-2">{post.category}</Badge>
                    <CardTitle className="group-hover:text-primary transition-colors">{post.title}</CardTitle>
                    <CardDescription>{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {post.author}
                      </div>
                      <div>{post.readTime}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">Load More Posts</Button>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 bg-muted">
          <div className="page-container">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
              <p className="text-muted-foreground mb-8">
                Subscribe to our newsletter and never miss the latest insights and tips for freelancers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-1 px-4 py-2 rounded-lg border bg-background"
                />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default Blog;
