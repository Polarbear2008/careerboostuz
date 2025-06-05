
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Award, MessageSquare, Mail, ExternalLink, Clock, Phone } from "lucide-react";

interface FreelancerProfileDialogProps {
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
  isOpen: boolean;
  onClose: () => void;
}

export const FreelancerProfileDialog = ({ 
  freelancer, 
  isOpen, 
  onClose 
}: FreelancerProfileDialogProps) => {
  
  const handleContactNow = () => {
    if (!freelancer.contact_details) {
      // Fallback to email if no contact details
      window.open(`mailto:${freelancer.email}`, '_blank');
      return;
    }

    const contactInfo = freelancer.contact_details.toLowerCase();
    
    // Check if it's a phone number (contains digits and phone-related patterns)
    if (/(\+?\d{1,4}[-.\s]?)?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}/.test(contactInfo) || contactInfo.includes('phone') || contactInfo.includes('tel')) {
      // Extract phone number from contact details
      const phoneMatch = freelancer.contact_details.match(/(\+?\d{1,4}[-.\s]?)?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}/);
      const phoneNumber = phoneMatch ? phoneMatch[0].replace(/[-.\s()]/g, '') : '';
      if (phoneNumber) {
        window.open(`tel:${phoneNumber}`, '_self');
      }
    }
    // Check if it's a Telegram link or username
    else if (contactInfo.includes('telegram') || contactInfo.includes('t.me') || contactInfo.includes('@')) {
      let telegramUrl = '';
      if (contactInfo.includes('t.me')) {
        // Already a full Telegram link
        const linkMatch = freelancer.contact_details.match(/(https?:\/\/)?(t\.me\/[^\s]+)/);
        telegramUrl = linkMatch ? `https://${linkMatch[2]}` : '';
      } else if (contactInfo.includes('@')) {
        // Username format @username
        const usernameMatch = freelancer.contact_details.match(/@(\w+)/);
        telegramUrl = usernameMatch ? `https://t.me/${usernameMatch[1]}` : '';
      } else if (contactInfo.includes('telegram')) {
        // Extract username after "telegram"
        const usernameMatch = freelancer.contact_details.match(/telegram[:\s]*@?(\w+)/i);
        telegramUrl = usernameMatch ? `https://t.me/${usernameMatch[1]}` : '';
      }
      
      if (telegramUrl) {
        window.open(telegramUrl, '_blank');
      }
    }
    // Check if it's a WhatsApp number
    else if (contactInfo.includes('whatsapp') || contactInfo.includes('wa.me')) {
      let whatsappUrl = '';
      if (contactInfo.includes('wa.me')) {
        const linkMatch = freelancer.contact_details.match(/(https?:\/\/)?(wa\.me\/[^\s]+)/);
        whatsappUrl = linkMatch ? `https://${linkMatch[2]}` : '';
      } else {
        const phoneMatch = freelancer.contact_details.match(/(\+?\d{1,4}[-.\s]?)?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}/);
        const phoneNumber = phoneMatch ? phoneMatch[0].replace(/[-.\s()]/g, '') : '';
        whatsappUrl = phoneNumber ? `https://wa.me/${phoneNumber}` : '';
      }
      
      if (whatsappUrl) {
        window.open(whatsappUrl, '_blank');
      }
    }
    // Check if it's a general URL
    else if (contactInfo.includes('http') || contactInfo.includes('www.')) {
      const urlMatch = freelancer.contact_details.match(/(https?:\/\/[^\s]+|www\.[^\s]+)/);
      const url = urlMatch ? urlMatch[0] : '';
      if (url) {
        const finalUrl = url.startsWith('http') ? url : `https://${url}`;
        window.open(finalUrl, '_blank');
      }
    }
    // Check if it's an email
    else if (contactInfo.includes('@') && contactInfo.includes('.')) {
      const emailMatch = freelancer.contact_details.match(/[\w.-]+@[\w.-]+\.\w+/);
      const email = emailMatch ? emailMatch[0] : '';
      if (email) {
        window.open(`mailto:${email}`, '_blank');
      }
    }
    // Fallback to email if no recognizable pattern
    else {
      window.open(`mailto:${freelancer.email}`, '_blank');
    }
  };

  const getContactIcon = () => {
    if (!freelancer.contact_details) return <Mail className="h-4 w-4" />;
    
    const contactInfo = freelancer.contact_details.toLowerCase();
    
    if (contactInfo.includes('telegram') || contactInfo.includes('t.me')) {
      return <MessageSquare className="h-4 w-4" />;
    } else if (contactInfo.includes('phone') || contactInfo.includes('tel') || /\d{3,}/.test(contactInfo)) {
      return <Phone className="h-4 w-4" />;
    } else if (contactInfo.includes('whatsapp')) {
      return <MessageSquare className="h-4 w-4" />;
    } else if (contactInfo.includes('http') || contactInfo.includes('www.')) {
      return <ExternalLink className="h-4 w-4" />;
    } else {
      return <Mail className="h-4 w-4" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Freelancer Profile</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={freelancer.avatar} alt={freelancer.name} />
              <AvatarFallback>{freelancer.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold">{freelancer.name}</h2>
                    {freelancer.verified && (
                      <Badge variant="secondary" className="h-6 gap-1 text-xs bg-blue-100 text-blue-700">
                        <Award className="h-3 w-3" /> Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground text-lg">{freelancer.title}</p>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">{freelancer.hourlyRate}/hr</div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{freelancer.rating.toFixed(1)}</span>
                    <span className="text-muted-foreground">({freelancer.totalJobs} jobs)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-1">
                <MapPin className="h-4 w-4" /> Location
              </div>
              <div className="font-medium">{freelancer.location}</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-1">
                <Award className="h-4 w-4" /> Success Rate
              </div>
              <div className="font-medium">{freelancer.successRate}</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-1">
                <Clock className="h-4 w-4" /> Total Jobs
              </div>
              <div className="font-medium">{freelancer.totalJobs}</div>
            </div>
          </div>

          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3">About</h3>
            <p className="text-muted-foreground leading-relaxed">{freelancer.experience}</p>
          </div>

          {/* Skills Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {freelancer.skills.map(skill => (
                <Badge key={skill} variant="outline" className="font-normal">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{freelancer.email}</span>
              </div>
              {freelancer.contact_details && (
                <div className="flex items-start gap-2">
                  {getContactIcon()}
                  <span className="text-sm">{freelancer.contact_details}</span>
                </div>
              )}
              {freelancer.portfolio_url && (
                <div className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  <a 
                    href={freelancer.portfolio_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    View Portfolio
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            <Button className="flex-1 gap-2" onClick={handleContactNow}>
              {getContactIcon()} Contact Now
            </Button>
            <Button variant="outline" className="flex-1">
              Save Profile
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
