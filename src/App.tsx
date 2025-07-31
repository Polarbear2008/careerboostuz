
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
import BlogPost from "./pages/BlogPost";
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
import FreelancerProfile from "./pages/FreelancerProfile";
import { Badge } from "./components/ui/badge";
import { useEffect } from "react";
import { supabase } from "./integrations/supabase/client";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    }
  }
});

const App = () => {
  // Ensure session persistence is properly configured
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
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard/*" element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/login" element={<UserLogin />} />
              <Route path="/signup" element={<UserSignup />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              } />
              <Route path="/creator/dashboard/*" element={
                <ProtectedRoute>
                  <CreatorDashboard />
                </ProtectedRoute>
              } />
              <Route path="/cv-creator" element={<CVCreator />} />
              <Route path="/career-test" element={<CareerTest />} />
              <Route path="/find-work" element={<FindWork />} />
              <Route path="/find-talent" element={<FindTalent />} />
              <Route path="/post-project" element={<PostProject />} />
              
              {/* Public Pages */}
              <Route path="/help" element={<Help />} />
              <Route path="/about" element={<About />} />
              <Route path="/community" element={<Community />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/enterprise" element={<Enterprise />} />
              <Route path="/success-stories" element={<SuccessStories />} />
              <Route path="/leadership" element={<Leadership />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/press" element={<Press />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/agencies" element={<Agencies />} />
              <Route path="/startups" element={<Startups />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/cookies" element={<Cookies />} />
              <Route path="/freelancers/:id" element={<FreelancerProfile />} />
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </TooltipProvider>
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
