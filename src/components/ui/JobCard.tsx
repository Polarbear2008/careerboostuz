
import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  budget: string;
  skills: string[];
  postedAt: string;
  className?: string;
  variant?: "default" | "compact";
  style?: React.CSSProperties;
  onApply?: (id: string) => void;
  applied?: boolean;
  onSave?: (id: string) => void;
  saved?: boolean;
  contactDetails?: string;
}

export const JobCard = ({
  id,
  title,
  company,
  location,
  description,
  budget,
  skills,
  postedAt,
  className,
  variant = "default",
  style,
  onApply,
  applied = false,
  onSave,
  saved = false,
  contactDetails,
}: JobCardProps) => {
  const [isFavorite, setIsFavorite] = useState(saved);
  const [showContactDialog, setShowContactDialog] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    if (onSave) {
      onSave(id);
    }
  };

  const handleApply = () => {
    if (contactDetails) {
      setShowContactDialog(true);
    } else if (onApply) {
      onApply(id);
    } else {
      // Default behavior if no handler provided
      toast.success(`Applied to: ${title}`);
    }
  };

  return (
    <div 
      className={cn(
        "bg-card hover-lift rounded-lg border overflow-hidden transition-all",
        variant === "compact" ? "p-4" : "p-6",
        className
      )}
      style={style}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className={cn(
            "font-semibold text-foreground hover:text-primary transition-colors",
            variant === "compact" ? "text-lg" : "text-xl"
          )}>
            {title}
          </h3>
          <div className="flex flex-wrap gap-2 mt-1.5">
            <span className="text-muted-foreground text-sm">{company}</span>
            <span className="text-muted-foreground text-sm">•</span>
            <span className="text-muted-foreground text-sm">{location}</span>
          </div>
        </div>

        <button 
          onClick={toggleFavorite}
          className={cn(
            "text-muted-foreground hover:text-primary transition-colors p-1.5 rounded-full hover:bg-primary/5",
            isFavorite && "text-primary"
          )}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={cn("h-5 w-5 transition-transform hover:scale-110", isFavorite && "fill-current animate-pulse")} />
        </button>
      </div>

      {variant === "default" && (
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{description}</p>
      )}

      <div className="flex flex-wrap gap-2 mb-4">
        {skills.slice(0, variant === "compact" ? 3 : 5).map((skill, index) => (
          <Badge 
            key={skill} 
            variant="outline"
            className={cn(
              "animate-fadeIn",
              "bg-muted/50 hover:bg-muted"
            )}
            style={{ animationDelay: `${index * 75}ms` }}
          >
            {skill}
          </Badge>
        ))}
        {skills.length > (variant === "compact" ? 3 : 5) && (
          <Badge 
            variant="outline"
            className={cn(
              "animate-fadeIn",
              "bg-muted/50 hover:bg-muted"
            )}
            style={{ animationDelay: `${(variant === "compact" ? 3 : 5) * 75}ms` }}
          >
            +{skills.length - (variant === "compact" ? 3 : 5)} more
          </Badge>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div>
          <span className="text-sm font-medium">{budget}</span>
          <div className="text-xs text-muted-foreground mt-0.5">
            Posted {postedAt}
          </div>
        </div>

        <Button 
          size={variant === "compact" ? "sm" : "default"}
          className={cn(
            "shadow-sm transition-transform hover:scale-105",
            applied && "bg-green-600 hover:bg-green-700"
          )}
          onClick={handleApply}
        >
          {applied ? "Applied" : "Apply Now"}
        </Button>
      </div>

      {/* Contact Details Dialog */}
      <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>How to Apply</DialogTitle>
            <DialogDescription>
              Contact information for <span className="font-medium">{title}</span> at <span className="font-medium">{company}</span>
            </DialogDescription>
          </DialogHeader>
          
          <div className="p-4 border rounded-md bg-muted/30">
            {contactDetails ? (
              <div className="break-words whitespace-pre-wrap">{contactDetails}</div>
            ) : (
              <p className="text-muted-foreground">No contact details provided. Please reach out to the employer directly.</p>
            )}
          </div>
          
          <div className="flex justify-between mt-4">
            <Button variant="outline" onClick={() => setShowContactDialog(false)}>Close</Button>
            {onApply && (
              <Button onClick={() => {
                onApply(id);
                setShowContactDialog(false);
                toast.success(`Application for "${title}" marked as applied`);
              }}>
                Mark as Applied
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JobCard;
