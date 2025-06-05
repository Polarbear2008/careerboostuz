
import { useState } from "react";
import { Check, Filter, MoreHorizontal, Plus, Search, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface Client {
  id: string;
  name: string;
  company: string;
  avatar: string;
  email: string;
  location: string;
  status: 'active' | 'inactive' | 'pending';
  projects: number;
  totalSpent: string;
  lastProject: string;
  rating: number;
}

// Mock data for clients
const mockClients: Client[] = [
  {
    id: "c1",
    name: "Alex Morgan",
    company: "TechInnovate",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    email: "alex@techinnovate.com",
    location: "San Francisco, CA",
    status: "active",
    projects: 5,
    totalSpent: "$12,500",
    lastProject: "Company Website Redesign",
    rating: 5
  },
  {
    id: "c2",
    name: "Sarah Wilson",
    company: "GreenEarth Solutions",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    email: "sarah@greenearth.com",
    location: "Portland, OR",
    status: "active",
    projects: 3,
    totalSpent: "$7,800",
    lastProject: "Eco-Friendly Brand Identity",
    rating: 4
  },
  {
    id: "c3",
    name: "Michael Chen",
    company: "FutureFin",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    email: "michael@futurefin.com",
    location: "New York, NY",
    status: "pending",
    projects: 1,
    totalSpent: "$2,000",
    lastProject: "Financial App UI Design",
    rating: 4
  },
  {
    id: "c4",
    name: "Emma Rodriguez",
    company: "CreativeMinds Agency",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    email: "emma@creativeminds.com",
    location: "Austin, TX",
    status: "inactive",
    projects: 2,
    totalSpent: "$5,300",
    lastProject: "Marketing Campaign Assets",
    rating: 3
  },
  {
    id: "c5",
    name: "James Peterson",
    company: "HealthSync",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    email: "james@healthsync.com",
    location: "Boston, MA",
    status: "active",
    projects: 4,
    totalSpent: "$9,200",
    lastProject: "Healthcare Portal Development",
    rating: 5
  }
];

const ClientManagement = () => {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredClients = clients.filter(client => {
    // Filter by status
    if (filterStatus !== 'all' && client.status !== filterStatus) {
      return false;
    }
    
    // Filter by search query
    if (
      searchQuery && 
      !client.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !client.company.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !client.email.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    
    return true;
  });

  const getStatusIcon = (status: Client['status']) => {
    switch(status) {
      case 'active':
        return <Check className="h-4 w-4 text-green-500" />;
      case 'inactive':
        return <X className="h-4 w-4 text-red-500" />;
      case 'pending':
        return <Check className="h-4 w-4 text-amber-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: Client['status']) => {
    switch(status) {
      case 'active':
        return <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">Active</Badge>;
      case 'inactive':
        return <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">Inactive</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200">Pending</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Clients</h1>
        <Button className="shrink-0">
          <Plus className="h-4 w-4 mr-2" />
          Add New Client
        </Button>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search clients..." 
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
              <SelectItem value="all">All Clients</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Client cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <Card 
            key={client.id} 
            className="hover:shadow-soft transition-shadow"
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex gap-4 items-center">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={client.avatar} alt={client.name} />
                    <AvatarFallback>{client.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">{client.name}</h3>
                    <p className="text-sm text-muted-foreground">{client.company}</p>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-3 w-3 ${i < client.rating ? 'text-amber-500 fill-amber-500' : 'text-muted'}`} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>Contact Client</DropdownMenuItem>
                    <DropdownMenuItem>View Projects</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-500">Deactivate</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {getStatusIcon(client.status)}
                    <span className="text-sm font-medium">Status:</span>
                  </div>
                  <div>{getStatusBadge(client.status)}</div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Location:</span>
                  <span className="text-sm">{client.location}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Email:</span>
                  <a 
                    href={`mailto:${client.email}`} 
                    className="text-sm text-primary hover:underline truncate max-w-[150px]"
                  >
                    {client.email}
                  </a>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Projects:</span>
                  <span className="text-sm">{client.projects}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total Spent:</span>
                  <span className="text-sm font-semibold">{client.totalSpent}</span>
                </div>
                
                <div className="pt-2">
                  <p className="text-sm font-medium">Latest Project:</p>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                    {client.lastProject}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredClients.length === 0 && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No clients found matching your filters.</p>
        </div>
      )}
    </div>
  );
};

export default ClientManagement;
