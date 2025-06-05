
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
}

export const RecentJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentJobs = async () => {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(3);
        
        if (error) {
          throw error;
        }
        
        setJobs(data || []);
      } catch (err) {
        console.error("Error fetching recent jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentJobs();
  }, []);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No recent jobs available.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {jobs.map((job, index) => (
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
          className="animate-slideUp"
          style={{ animationDelay: `${index * 100}ms` }}
        />
      ))}
    </div>
  );
};
