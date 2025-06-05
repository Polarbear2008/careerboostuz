
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface FreelancerCardProps {
  id: string;
  name: string;
  title: string;
  avatarUrl: string;
  rating: number;
  hourlyRate: string;
  skills: string[];
  successRate: number;
  location: string;
  className?: string;
  style?: React.CSSProperties;
}

export const FreelancerCard = ({
  id,
  name,
  title,
  avatarUrl,
  rating,
  hourlyRate,
  skills,
  successRate,
  location,
  className,
  style,
}: FreelancerCardProps) => {
  return (
    <div 
      className={cn(
        "bg-card hover-lift rounded-lg border overflow-hidden transition-all p-6 animate-fadeIn",
        className
      )}
      style={style}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-muted">
            <img 
              src={avatarUrl} 
              alt={name} 
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg text-foreground truncate">
            {name}
          </h3>
          <p className="text-muted-foreground text-sm mt-0.5 truncate">
            {title}
          </p>
          
          <div className="flex items-center mt-1.5">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
              <span className="text-sm font-medium ml-1">{rating.toFixed(1)}</span>
            </div>
            <span className="mx-2 text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">{successRate}% Job Success</span>
            <span className="mx-2 text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">{location}</span>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-sm font-medium">{hourlyRate}/hr</div>
        </div>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-2">
        {skills.slice(0, 4).map((skill, index) => (
          <Badge 
            key={skill} 
            variant="outline"
            className={cn(
              "animate-fadeIn",
              "bg-muted/50 hover:bg-muted"
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {skill}
          </Badge>
        ))}
        {skills.length > 4 && (
          <Badge 
            variant="outline"
            className={cn(
              "animate-fadeIn",
              "bg-muted/50 hover:bg-muted"
            )}
            style={{ animationDelay: `${4 * 100}ms` }}
          >
            +{skills.length - 4} more
          </Badge>
        )}
      </div>
      
      <div className="mt-4 flex justify-end">
        <a 
          href={`/freelancers/${id}`} 
          className="text-sm font-medium text-primary hover:underline relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
        >
          View Profile
        </a>
      </div>
    </div>
  );
};

export default FreelancerCard;
