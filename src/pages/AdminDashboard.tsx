
import { useState, useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { toast } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdminSidebar from "@/components/dashboard/AdminSidebar";
import AdminOverview from "@/components/dashboard/AdminOverview";
import AdminUserManagement from "@/components/dashboard/AdminUserManagement";
import AdminContentManagement from "@/components/dashboard/AdminContentManagement";
import AdminSettings from "@/components/dashboard/AdminSettings";

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

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    // In a real app, you would check with a token or session
    // For this demo, we're using localStorage
    const isAdminAuth = localStorage.getItem("isAdminAuthenticated") === "true";
    setIsAuthenticated(isAdminAuth);
    setIsLoading(false);
    
    if (!isAdminAuth) {
      navigate("/admin/login");
    }
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
          <AdminSidebar />
          <div className="flex-1 flex flex-col">
            <DashboardHeader onLogout={handleLogout} title="Admin Dashboard" />
            <main className="flex-1 overflow-auto bg-muted/20 p-6">
              <Routes>
                <Route index element={<Navigate to="overview" replace />} />
                <Route path="overview" element={<AdminOverview />} />
                <Route path="users" element={<AdminUserManagement />} />
                <Route path="content" element={<AdminContentManagement />} />
                <Route path="settings" element={<AdminSettings />} />
              </Routes>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </QueryClientProvider>
  );
};

export default AdminDashboard;
