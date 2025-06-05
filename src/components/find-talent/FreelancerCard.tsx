
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Star, MapPin, Award, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { FreelancerProfileDialog } from "./FreelancerProfileDialog";

interface FreelancerCardProps {
  freelancer: {
    id: string;
    name: string;
    avatar: string;
    title: string;
    rating: number;
    hourlyRate: string;
    location: string;
    skills: string[];
    verified: boolean;
    totalJobs: number;
    successRate: string;
    experience: string;
    email: string;
    portfolio_url?: string;
    contact_details?: string;
  };
}

export const FreelancerCard = ({ freelancer }: FreelancerCardProps) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="h-full hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={freelancer.avatar} alt={freelancer.name} />
                <AvatarFallback>{freelancer.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{freelancer.name}</h3>
                      {freelancer.verified && (
                        <Badge variant="secondary" className="h-5 gap-1 text-xs bg-blue-100 text-blue-700">
                          <Award className="h-3 w-3" /> Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground">{freelancer.title}</p>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{freelancer.rating.toFixed(1)}</span>
                    <span className="text-muted-foreground">({freelancer.totalJobs})</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3">
                  <span className="text-sm text-primary font-medium">{freelancer.hourlyRate}/hr</span>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" /> {freelancer.location}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Award className="h-3.5 w-3.5" /> {freelancer.successRate} Success
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {freelancer.skills.slice(0, 5).map(skill => (
                    <Badge key={skill} variant="outline" className="font-normal">
                      {skill}
                    </Badge>
                  ))}
                  {freelancer.skills.length > 5 && (
                    <Badge variant="outline" className="font-normal">
                      +{freelancer.skills.length - 5} more
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="border-t py-3 flex justify-between">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsProfileOpen(true)}
            >
              View Profile
            </Button>
            <Button size="sm" className="gap-1.5">
              <MessageSquare className="h-4 w-4" /> Contact
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      <FreelancerProfileDialog
        freelancer={freelancer}
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </>
  );
};
