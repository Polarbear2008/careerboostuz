
import { useEffect, useState } from "react";
import { FreelancerCard } from "@/components/find-talent/FreelancerCard";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface Freelancer {
  id: string;
  full_name: string;
  skills: string;
  avatar_url: string;
  hourly_rate: string;
  rating: number;
  success_rate: number;
  location: string;
  experience: string;
  portfolio_url: string | null;
  email: string;
  contact_details: string | null;
}

interface FreelancerGridProps {
  searchTerm?: string;
  filters?: Record<string, any>;
}

export const FreelancerGrid = ({ searchTerm = "", filters = {} }: FreelancerGridProps) => {
  const [freelancers, setFreelancers] = useState<Freelancer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        setLoading(true);
        
        // Start with the base query
        let query = supabase.from("freelancers").select("*");
        
        // Apply search filter if provided
        if (searchTerm) {
          query = query.or(`full_name.ilike.%${searchTerm}%,skills.ilike.%${searchTerm}%`);
        }
        
        // Apply additional filters
        if (filters.location) {
          query = query.eq("location", filters.location);
        }
        
        const { data, error } = await query;
        
        if (error) {
          throw error;
        }
        
        setFreelancers(data || []);
      } catch (err) {
        console.error("Error fetching freelancers:", err);
        setError("Failed to load freelancers. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchFreelancers();
  }, [searchTerm, filters]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">{error}</p>
        <p className="mt-2 text-muted-foreground">Please try again later.</p>
      </div>
    );
  }

  if (freelancers.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-lg">No freelancers found matching your criteria.</p>
        <p className="mt-2 text-muted-foreground">Try adjusting your filters or search terms.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {freelancers.map((freelancer) => (
        <FreelancerCard
          key={freelancer.id}
          freelancer={{
            id: freelancer.id,
            name: freelancer.full_name,
            avatar: freelancer.avatar_url,
            title: freelancer.experience.split('.')[0], // Use first sentence of experience as title
            rating: freelancer.rating,
            hourlyRate: `$${freelancer.hourly_rate}`,
            location: freelancer.location,
            skills: freelancer.skills.split(',').map(skill => skill.trim()),
            verified: Math.random() > 0.5, // Random verification status for demo
            totalJobs: Math.floor(Math.random() * 50) + 1, // Random job count for demo
            successRate: `${freelancer.success_rate}%`,
            experience: freelancer.experience,
            email: freelancer.email,
            portfolio_url: freelancer.portfolio_url || undefined,
            contact_details: freelancer.contact_details || undefined,
          }}
        />
      ))}
    </div>
  );
};
