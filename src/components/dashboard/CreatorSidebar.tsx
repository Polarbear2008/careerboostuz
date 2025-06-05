
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
import { BarChart3, Briefcase, CreditCard, Home, LayoutDashboard, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const CreatorSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    return currentPath.includes(path);
  };

  const menuItems = [
    {
      title: "Overview",
      path: "/creator/dashboard/overview",
      icon: LayoutDashboard
    },
    {
      title: "Projects",
      path: "/creator/dashboard/projects",
      icon: Briefcase
    },
    {
      title: "Earnings",
      path: "/creator/dashboard/earnings",
      icon: CreditCard
    },
    {
      title: "Clients",
      path: "/creator/dashboard/clients",
      icon: Users
    }
  ];

  return (
    <Sidebar>
      <SidebarHeader className="py-6 px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <span className="text-primary-foreground font-bold">CC</span>
          </div>
          <span className="font-bold text-xl hidden md:inline">Creator Centre</span>
        </Link>
        <SidebarTrigger className="md:hidden" />
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
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

export default CreatorSidebar;
