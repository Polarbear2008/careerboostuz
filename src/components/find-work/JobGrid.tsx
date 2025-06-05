
import { useEffect, useState } from "react";
import { JobCard } from "@/components/ui/JobCard";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface Job {
  id: string;
  title: string;
  company: string | null;
  location: string | null;
  description: string;
  budget: string;
  skills: string;
  created_at: string | null;
  category: string | null;
  contact_details: string | null;
}

interface JobGridProps {
  searchTerm?: string;
  filters?: Record<string, any>;
}

export const JobGrid = ({ searchTerm = "", filters = {} }: JobGridProps) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        
        // Start with the base query
        let query = supabase.from("projects").select("*");
        
        // Apply search filter if provided
        if (searchTerm) {
          query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,skills.ilike.%${searchTerm}%`);
        }
        
        // Apply additional filters
        if (filters.category) {
          query = query.eq("category", filters.category);
        }
        
        if (filters.location) {
          query = query.eq("location", filters.location);
        }
        
        // Order by creation date (newest first)
        query = query.order("created_at", { ascending: false });
        
        const { data, error } = await query;
        
        if (error) {
          throw error;
        }
        
        setJobs(data || []);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to load jobs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
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

  if (jobs.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-lg">No jobs found matching your criteria.</p>
        <p className="mt-2 text-muted-foreground">Try adjusting your filters or search terms.</p>
      </div>
    );
  }

  const formatTimeAgo = (dateString: string | null) => {
    if (!dateString) return "Recently posted";
    
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Less than an hour ago";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return "1 day ago";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks === 1) return "1 week ago";
    return `${diffInWeeks} weeks ago`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          id={job.id}
          title={job.title}
          company={job.company || "Company"}
          location={job.location || "Remote"}
          description={job.description}
          budget={job.budget}
          skills={job.skills.split(',').map(skill => skill.trim())}
          postedAt={formatTimeAgo(job.created_at)}
        />
      ))}
    </div>
  );
};
