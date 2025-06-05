
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/useLanguage";
import { Search, LogIn, UserPlus, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { SearchBar } from "@/components/shared/SearchBar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export const AuthButtons = () => {
  const { t } = useLanguage();
  const { user, signOut, loading } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await signOut();
    setIsSigningOut(false);
  };

  const handleSearch = (searchValue: string) => {
    console.log("Searching for:", searchValue);
    // Here you can implement the actual search functionality
    // For now, just close the dialog
    setIsSearchOpen(false);
  };
  
  // Show loading state while authentication status is determined
  if (loading) {
    return (
      <div className="hidden lg:flex items-center gap-3">
        <div className="h-9 w-20 bg-gray-200 animate-pulse rounded-full"></div>
      </div>
    );
  }
  
  // If user is logged in, show profile and logout buttons
  if (user) {
    return (
      <div className="hidden lg:flex items-center gap-3">
        <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
          <DialogTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full hover:bg-white/70 hover:shadow-sm text-foreground/80 hover:text-primary transition-colors"
            >
              <Search className="h-5 w-5 transition-transform hover:scale-105 duration-200" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Search</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <SearchBar 
                placeholder="Search for skills, services, or professionals..."
                onSearch={handleSearch}
              />
            </div>
          </DialogContent>
        </Dialog>
        
        <Button 
          variant="ghost" 
          className="font-medium hover:bg-white/70 hover:shadow-sm rounded-full relative overflow-hidden group" 
          asChild
        >
          <Link to="/profile" className="flex items-center gap-1.5">
            <User className="h-4 w-4 group-hover:text-primary transition-colors duration-200" />
            <span className="relative z-10 group-hover:text-primary transition-colors duration-200">
              Profile
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full"></span>
          </Link>
        </Button>
        <Button 
          className="font-medium shadow-elegant bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 rounded-full"
          onClick={handleSignOut}
          disabled={isSigningOut}
        >
          <div className="flex items-center gap-1.5 group">
            <LogOut className="h-4 w-4 transition-transform group-hover:scale-110 duration-300" />
            <span className="transition-transform group-hover:translate-x-0.5 duration-300">
              {isSigningOut ? "Signing out..." : "Log out"}
            </span>
          </div>
        </Button>
      </div>
    );
  }
  
  // Default: user is not logged in
  return (
    <div className="hidden lg:flex items-center gap-3">
      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full hover:bg-white/70 hover:shadow-sm text-foreground/80 hover:text-primary transition-colors"
          >
            <Search className="h-5 w-5 transition-transform hover:scale-105 duration-200" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Search</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <SearchBar 
              placeholder="Search for skills, services, or professionals..."
              onSearch={handleSearch}
            />
          </div>
        </DialogContent>
      </Dialog>
      
      <Button 
        variant="ghost" 
        className="font-medium hover:bg-white/70 hover:shadow-sm rounded-full relative overflow-hidden group" 
        asChild
      >
        <Link to="/login" className="flex items-center gap-1.5">
          <LogIn className="h-4 w-4 group-hover:text-primary transition-colors duration-200" />
          <span className="relative z-10 group-hover:text-primary transition-colors duration-200">
            {t("nav.login")}
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full"></span>
        </Link>
      </Button>
      <Button 
        className="font-medium shadow-elegant bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 rounded-full" 
        asChild
      >
        <Link to="/signup" className="flex items-center gap-1.5 group">
          <UserPlus className="h-4 w-4 transition-transform group-hover:scale-110 duration-300" />
          <span className="transition-transform group-hover:translate-x-0.5 duration-300">
            {t("nav.signup")}
          </span>
        </Link>
      </Button>
    </div>
  );
};
