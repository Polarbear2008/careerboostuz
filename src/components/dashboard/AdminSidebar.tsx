
import { Link, useLocation } from "react-router-dom";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarTrigger, 
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";
import { 
  Home, 
  LayoutDashboard, 
  Settings, 
  Users, 
  FileText,
  BarChart,
  Database,
  Globe,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    return currentPath.includes(path);
  };

  const menuItems = [
    {
      title: "Dashboard",
      path: "/admin/dashboard/overview",
      icon: LayoutDashboard
    },
    {
      title: "User Management",
      path: "/admin/dashboard/users",
      icon: Users
    },
    {
      title: "Content Management",
      path: "/admin/dashboard/content",
      icon: FileText
    },
    {
      title: "Settings",
      path: "/admin/dashboard/settings",
      icon: Settings
    }
  ];

  const analyticsItems = [
    {
      title: "Website Statistics",
      path: "/admin/dashboard/analytics/website",
      icon: BarChart
    },
    {
      title: "User Activities",
      path: "/admin/dashboard/analytics/users",
      icon: Users
    }
  ];

  const systemItems = [
    {
      title: "System Settings",
      path: "/admin/dashboard/system/settings",
      icon: Settings
    },
    {
      title: "Database",
      path: "/admin/dashboard/system/database",
      icon: Database
    },
    {
      title: "API Management",
      path: "/admin/dashboard/system/api",
      icon: Globe
    },
    {
      title: "Security",
      path: "/admin/dashboard/system/security",
      icon: Shield
    }
  ];

  return (
    <Sidebar>
      <SidebarHeader className="py-6 px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <span className="text-primary-foreground font-bold">AD</span>
          </div>
          <span className="font-bold text-xl hidden md:inline">Admin Panel</span>
        </Link>
        <SidebarTrigger className="md:hidden" />
      </SidebarHeader>
      
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel>General</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={item.path}
                      className={isActive(item.path) ? 
                        "text-primary font-medium" : 
                        "text-muted-foreground hover:text-foreground transition-colors"
                      }
                    >
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Analytics</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {analyticsItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={item.path}
                      className={isActive(item.path) ? 
                        "text-primary font-medium" : 
                        "text-muted-foreground hover:text-foreground transition-colors"
                      }
                    >
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={item.path}
                      className={isActive(item.path) ? 
                        "text-primary font-medium" : 
                        "text-muted-foreground hover:text-foreground transition-colors"
                      }
                    >
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="px-4 py-4 border-t">
        <div className="flex flex-col gap-2">
          <Button variant="outline" className="w-full justify-start" asChild>
            <Link to="/">
              <Home className="mr-2 size-4" />
              Back to Homepage
            </Link>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
