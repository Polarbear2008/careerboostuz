import { useParams } from 'react-router-dom';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Star, MapPin, Briefcase, Mail, Globe, Phone } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

// Type for the query result
type QueryResult = {
  data: FreelancerProfile | null | undefined;
  isLoading: boolean;
};

// Define a simple type for the experience data
interface Experience {
  role?: string;
  company?: string;
  start_date?: string;
  end_date?: string | null;
  description?: string;
}

// Define the shape of the profile data from the database
interface ProfileData {
  id: string;
  first_name: string | null;
  last_name: string | null;
  username?: string | null;
  avatar_url: string | null;
  bio: string | null;
  location: string | null;
  github?: string | null;
  linkedin?: string | null;
  created_at: string;
  updated_at: string;
  [key: string]: unknown; // For any additional fields
}

// Define the shape of the freelancer-specific data from the database
interface FreelancerData {
  user_id: string;
  skills?: string[] | null;
  rating?: number | null;
  hourly_rate?: number | string | null;
  experience?: Experience[] | null;
  [key: string]: unknown; // For any additional fields
}

// Define a simplified freelancer profile type with a more flexible structure
type FreelancerProfile = {
  // Required fields with basic types
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  avatar_url: string;
  bio: string;
  location: string;
  created_at: string;
  updated_at: string;
  
  // Arrays with basic types
  skills: string[];
  experience: Array<{
    id?: string;
    title: string;
    company: string;
    start_date: string;
    end_date?: string;
    description?: string;
  }>;
  
  // Primitive types
  rating: number;
  
  // Optional fields
  username?: string;
  github?: string;
  linkedin?: string;
  hourly_rate?: number;
  
  // Allow any additional properties to prevent type errors
  [key: string]: unknown;
};

// Type guard to check if an object is a valid FreelancerProfile
function isFreelancerProfile(obj: unknown): obj is FreelancerProfile {
  if (typeof obj !== 'object' || obj === null) return false;
  
  const profile = obj as Record<string, unknown>;
  
  return (
    typeof profile.id === 'string' &&
    typeof profile.user_id === 'string' &&
    typeof profile.first_name === 'string' &&
    typeof profile.last_name === 'string' &&
    typeof profile.avatar_url === 'string' &&
    typeof profile.bio === 'string' &&
    typeof profile.location === 'string' &&
    Array.isArray(profile.skills) &&
    typeof profile.rating === 'number' &&
    (profile.hourly_rate === undefined || typeof profile.hourly_rate === 'number') &&
    Array.isArray(profile.experience) &&
    typeof profile.created_at === 'string' &&
    typeof profile.updated_at === 'string'
  );
}

export const FreelancerProfile = () => {
  const { id } = useParams<{ id: string }>();

  // Define a simplified query function with explicit return type
  const fetchFreelancerProfile = async (): Promise<FreelancerProfile | null> => {
    if (!id) return null;
    
    try {
      // Fetch profile data with a simpler query
      const profileQuery = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();

      if (profileQuery.error) throw profileQuery.error;
      if (!profileQuery.data) return null;

      const profileData = profileQuery.data;

      // Fetch freelancer data with a simpler query
      const freelancerQuery = await supabase
        .from('freelancers')
        .select('*')
        .eq('user_id', id)
        .single();

      // Only log non-404 errors
      if (freelancerQuery.error && freelancerQuery.error.code !== 'PGRST116') {
        console.error('Error fetching freelancer data:', freelancerQuery.error);
      }

      const freelancerData = freelancerQuery.data;

      // Helper function to safely parse hourly rate
      const parseHourlyRate = (rate: unknown): number | undefined => {
        if (typeof rate === 'number') return rate;
        if (typeof rate === 'string') {
          const parsed = parseFloat(rate);
          return isNaN(parsed) ? undefined : parsed;
        }
        return undefined;
      };

      // Create a base profile with required fields
      const baseProfile: Record<string, unknown> = {
        id: profileData.id,
        user_id: id,
        first_name: profileData.first_name || '',
        last_name: profileData.last_name || '',
        avatar_url: profileData.avatar_url || '',
        bio: profileData.bio || '',
        location: profileData.location || '',
        created_at: profileData.created_at,
        updated_at: profileData.updated_at,
        skills: Array.isArray(freelancerData?.skills) ? freelancerData.skills : [],
        rating: typeof freelancerData?.rating === 'number' ? freelancerData.rating : 0,
        experience: Array.isArray(freelancerData?.experience) ? freelancerData.experience : []
      };

      // Add optional fields if they exist
      if ('username' in profileData) baseProfile.username = profileData.username;
      if ('github' in profileData) baseProfile.github = profileData.github;
      if ('linkedin' in profileData) baseProfile.linkedin = profileData.linkedin;
      if ('hourly_rate' in (freelancerData || {})) {
        baseProfile.hourly_rate = parseHourlyRate(freelancerData?.hourly_rate);
      }

      // Type assertion to FreelancerProfile
      return baseProfile as unknown as FreelancerProfile;
    } catch (error) {
      console.error('Error in freelancer profile query:', error);
      return null;
    }
  };

  // Use the query function with the QueryResult type
  const { data: freelancer, isLoading } = useQuery({
    queryKey: ['freelancer', id],
    queryFn: fetchFreelancerProfile,
    enabled: !!id, // Only run the query if we have an ID
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2, // Retry failed requests twice
  }) as unknown as QueryResult; // Type assertion to our custom QueryResult

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Sidebar Skeleton */}
            <div className="md:w-1/3 space-y-6">
              <Skeleton className="h-64 w-full rounded-lg" />
              <Skeleton className="h-32 w-full rounded-lg" />
            </div>
            
            {/* Right Content Skeleton */}
            <div className="md:w-2/3 space-y-6">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-32 w-full rounded-lg" />
              <Skeleton className="h-32 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!freelancer) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Freelancer not found</h1>
          <p className="text-muted-foreground">The freelancer you are looking for does not exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Sidebar */}
          <div className="md:w-1/3 space-y-6">
            <Card className="text-center p-6">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage 
                  src={freelancer.avatar_url} 
                  alt={`${freelancer.first_name || ''} ${freelancer.last_name || ''}`.trim() || 'User'} 
                />
                <AvatarFallback>
                  {`${freelancer.first_name?.charAt(0) || ''}${freelancer.last_name?.charAt(0) || ''}` || 'U'}
                </AvatarFallback>
              </Avatar>
              <h1 className="text-2xl font-bold">{`${freelancer.first_name || ''} ${freelancer.last_name || ''}`.trim() || 'Anonymous'}</h1>
              <p className="text-muted-foreground mb-4">Freelancer</p>
              
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-medium ml-1">
                    {freelancer.rating ? `${Number(freelancer.rating).toFixed(1)}/5.0` : 'No ratings'}
                  </span>
                </div>
                {freelancer.hourly_rate && (
                  <div className="ml-4 text-sm text-muted-foreground">
                    ${freelancer.hourly_rate}/hr
                  </div>
                )}
              </div>
              
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {(() => {
                  const skills = Array.isArray(freelancer.skills) 
                    ? freelancer.skills 
                    : typeof freelancer.skills === 'string' 
                      ? [freelancer.skills] 
                      : [];
                  
                  return skills.length > 0 ? (
                    <>
                      {skills.slice(0, 5).map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {String(skill)}
                        </Badge>
                      ))}
                      {skills.length > 5 && (
                        <Badge variant="outline">+{skills.length - 5} more</Badge>
                      )}
                    </>
                  ) : (
                    <span className="text-sm text-muted-foreground">No skills listed</span>
                  );
                })()}
              </div>
              
              <Button className="w-full">Contact Me</Button>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {freelancer.location && (
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{freelancer.location}</span>
                  </div>
                )}
                
                {freelancer.github && (
                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <a 
                      href={`https://github.com/${freelancer.github}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      GitHub: {freelancer.github}
                    </a>
                  </div>
                )}
                {freelancer.linkedin && (
                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <a 
                      href={freelancer.linkedin.startsWith('http') ? freelancer.linkedin : `https://${freelancer.linkedin}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      LinkedIn Profile
                    </a>
                  </div>
                )}
                
                {freelancer.github && (
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a 
                      href={`https://github.com/${freelancer.github}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Contact via GitHub
                    </a>
                  </div>
                )}
                
                {freelancer.linkedin && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <a 
                      href={freelancer.linkedin.startsWith('http') ? freelancer.linkedin : `https://${freelancer.linkedin}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Contact via LinkedIn
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="md:w-2/3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About Me</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {freelancer.bio || 'No bio available.'}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(freelancer.skills) && freelancer.skills.length > 0 ? (
                    freelancer.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {String(skill)}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-muted-foreground">No skills listed</span>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Experience</CardTitle>
              </CardHeader>
              <CardContent>
                {Array.isArray(freelancer.experience) && freelancer.experience.length > 0 ? (
                  <div className="space-y-4">
                    {freelancer.experience.map((exp, index) => (
                      <div key={index} className="border-l-2 border-primary pl-4 py-1">
                        <h3 className="font-medium">{exp.role || 'Role not specified'}</h3>
                        <p className="text-sm text-muted-foreground">
                          {exp.company || 'Company not specified'} • {exp.start_date || 'Start date not specified'} - {exp.end_date || 'Present'}
                        </p>
                        {exp.description && (
                          <p className="mt-1 text-sm">{exp.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No experience listed.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerProfile;
