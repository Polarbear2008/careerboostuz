
import { useRef, useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FreelancerCard } from "@/components/ui/FreelancerCard";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface Freelancer {
  id: string;
  full_name: string;
  experience: string;
  avatar_url: string | null;
  rating: number | null;
  hourly_rate: string;
  skills: string;
  success_rate: number | null;
  location: string | null;
}

export const FeaturedFreelancers = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [freelancers, setFreelancers] = useState<Freelancer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        const { data, error } = await supabase
          .from("freelancers")
          .select("*")
          .order("rating", { ascending: false })
          .limit(8);
        
        if (error) {
          throw error;
        }
        
        setFreelancers(data || []);
      } catch (err) {
        console.error("Error fetching freelancers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFreelancers();
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <section className="section-padding bg-muted/50">
        <div className="page-container">
          <div className="flex justify-center items-center h-32">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    );
  }

  if (freelancers.length === 0) {
    return (
      <section className="section-padding bg-muted/50">
        <div className="page-container">
          <div className="text-center py-10">
            <p className="text-muted-foreground">No freelancers available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-muted/50">
      <div className="page-container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10 animate-slideDown">
          <div>
            <h2 className="text-3xl font-bold mb-3">Top Freelancers</h2>
            <p className="text-muted-foreground">Highly-rated professionals ready for your next project</p>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={scrollLeft}
              className="rounded-full transition-transform hover:scale-105"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={scrollRight}
              className="rounded-full transition-transform hover:scale-105"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div 
          ref={scrollContainerRef}
          className="flex space-x-5 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {freelancers.map((freelancer, index) => (
            <div 
              key={freelancer.id} 
              className="min-w-[350px] md:min-w-[400px] flex-shrink-0 snap-start"
            >
              <FreelancerCard 
                id={freelancer.id}
                name={freelancer.full_name}
                title={freelancer.experience}
                avatarUrl={freelancer.avatar_url || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"}
                rating={freelancer.rating || 4.5}
                hourlyRate={freelancer.hourly_rate}
                skills={freelancer.skills.split(',').map(skill => skill.trim())}
                successRate={freelancer.success_rate || 95}
                location={freelancer.location || "Remote"}
                className="animate-slideInLeft"
                style={{ animationDelay: `${index * 150}ms` }}
              />
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center animate-slideUp" style={{ animationDelay: '300ms' }}>
          <Button
            onClick={() => window.location.href = '/find-talent'}
            className="shadow-sm px-8 transition-transform hover:scale-105"
            size="lg"
          >
            Browse All Freelancers
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedFreelancers;
