
import { useState, useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import CreatorSidebar from "@/components/dashboard/CreatorSidebar";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import ProjectsManagement from "@/components/dashboard/ProjectsManagement";
import EarningsStats from "@/components/dashboard/EarningsStats";
import ClientManagement from "@/components/dashboard/ClientManagement";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { toast } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a dashboard-specific query client with custom settings
const dashboardQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

const CreatorDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const authStatus = localStorage.getItem("isAdminAuthenticated");
    
    if (authStatus === "true") {
      setIsAuthenticated(true);
    } else {
      // Redirect to login page with a toast message
      toast.error("Please login to access the dashboard", {
        id: "auth-required",
      });
      navigate("/admin/login");
    }
    
    setIsLoading(false);
  }, [navigate]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <QueryClientProvider client={dashboardQueryClient}>
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <CreatorSidebar />
          <div className="flex-1 flex flex-col">
            <DashboardHeader onLogout={handleLogout} />
            <main className="flex-1 overflow-auto bg-muted/20 p-6">
              <Routes>
                <Route index element={<Navigate to="overview" replace />} />
                <Route path="overview" element={<DashboardOverview />} />
                <Route path="projects" element={<ProjectsManagement />} />
                <Route path="earnings" element={<EarningsStats />} />
                <Route path="clients" element={<ClientManagement />} />
              </Routes>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </QueryClientProvider>
  );
};

export default CreatorDashboard;
