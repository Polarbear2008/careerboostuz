
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Filter, 
  MoreHorizontal, 
  Plus, 
  Search 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { dashboardApi } from "@/services/api";

// Import Project type from our API service
import type { ProjectsData } from "@/services/api";
type Project = ProjectsData['projects'][0];

const ProjectsManagement = () => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Fetch projects data
  const { data, isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: dashboardApi.getProjects
  });

  // Filter projects based on status and search query
  const filteredProjects = data?.projects.filter(project => {
    // Filter by status
    if (filterStatus !== 'all' && project.status !== filterStatus) {
      return false;
    }
    
    // Filter by search query
    if (
      searchQuery && 
      !project.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !project.client.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    
    return true;
  }) || [];

  const getStatusIcon = (status: Project['status']) => {
    switch(status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'in progress':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: Project['status']) => {
    switch(status) {
      case 'completed':
        return <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">Completed</Badge>;
      case 'in progress':
        return <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200">In Progress</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">Pending</Badge>;
      default:
        return null;
    }
  };

  if (isLoading) {
    return <ProjectsManagementSkeleton />;
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-lg text-center">
        <h2 className="text-xl font-semibold text-red-600 dark:text-red-400">Error loading projects</h2>
        <p className="mt-2 text-red-500 dark:text-red-300">
          Please try refreshing the page or contact support if the problem persists.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Button className="shrink-0">
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search projects..." 
            className="pl-10 w-full sm:w-80"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select
            value={filterStatus}
            onValueChange={setFilterStatus}
          >
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="in progress">In Progress</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Project cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card 
            key={project.id} 
            className="p-5 hover:shadow-soft transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className="flex gap-3 items-center">
                <Avatar>
                  <AvatarImage src={project.client.avatar} alt={project.client.name} />
                  <AvatarFallback>{project.client.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{project.title}</h3>
                  <p className="text-sm text-muted-foreground">{project.client.name}</p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Details</DropdownMenuItem>
                  <DropdownMenuItem>Edit Project</DropdownMenuItem>
                  <DropdownMenuItem>Contact Client</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {getStatusIcon(project.status)}
                  <span className="text-sm font-medium">Status:</span>
                </div>
                <div>{getStatusBadge(project.status)}</div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Deadline:</span>
                <span className="text-sm">
                  {new Date(project.deadline).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Budget:</span>
                <span className="text-sm font-semibold">{project.budget}</span>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Progress:</span>
                  <span className="text-sm font-semibold">{project.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="pt-2">
                <Badge variant="outline" className="bg-muted/50">
                  {project.category}
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {filteredProjects.length === 0 && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No projects found matching your filters.</p>
        </div>
      )}
    </div>
  );
};

// Loading skeleton for projects
const ProjectsManagementSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Skeleton className="h-10 w-32" />
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <Skeleton className="h-10 w-full sm:w-80" />
        <Skeleton className="h-10 w-full sm:w-40" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="p-5">
            <div className="flex justify-between items-start">
              <div className="flex gap-3 items-center">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div>
                  <Skeleton className="h-5 w-36 mb-2" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
            
            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-24" />
              </div>
              
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-32" />
              </div>
              
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-12" />
                </div>
                <Skeleton className="h-2 w-full rounded-full" />
              </div>
              
              <div className="pt-2">
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectsManagement;
