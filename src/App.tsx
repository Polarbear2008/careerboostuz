
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CreatorDashboard from "./pages/CreatorDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import AuthCallback from "./pages/AuthCallback";
import CVCreator from "./pages/CVCreator";
import CareerTest from "./pages/CareerTest";
import FindWork from "./pages/FindWork";
import FindTalent from "./pages/FindTalent";
import PostProject from "./pages/PostProject";
import UserProfile from "./pages/UserProfile";
import Help from "./pages/Help";
import About from "./pages/About";
import Community from "./pages/Community";
import Blog from "./pages/Blog";
import Enterprise from "./pages/Enterprise";
import SuccessStories from "./pages/SuccessStories";
import Leadership from "./pages/Leadership";
import Careers from "./pages/Careers";
import Press from "./pages/Press";
import Contact from "./pages/Contact";
import Agencies from "./pages/Agencies";
import Startups from "./pages/Startups";
import Discover from "./pages/Discover";
import Categories from "./pages/Categories";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import { useEffect } from "react";
import { supabase } from "./integrations/supabase/client";
import { useLocation, Navigate } from "react-router-dom";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    }
  }
});

const App = () => {
  // Keep the session check but don't show any UI based on it
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data && data.session) {
        console.log("Session exists on app load");
      }
    };
    
    checkSession();
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              {/* Redirect all other routes to 404 */}
              <Route path="*" element={<Navigate to="/404" replace />} />
              <Route path="/404" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
