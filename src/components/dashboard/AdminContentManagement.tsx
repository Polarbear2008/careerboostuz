
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, FileText, FilePlus, Edit, Trash2, Eye, Clock } from "lucide-react";

const AdminContentManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock content data
  const contentItems = [
    { 
      id: 1, 
      title: "Getting Started with CV Creation", 
      type: "Article", 
      author: "John Doe",
      status: "Published",
      dateModified: "2023-11-15",
      views: 1245
    },
    { 
      id: 2, 
      title: "Tips for Professional Job Hunting", 
      type: "Guide", 
      author: "Jane Smith",
      status: "Published",
      dateModified: "2023-11-10",
      views: 892
    },
    { 
      id: 3, 
      title: "Career Switching in 2023", 
      type: "Video", 
      author: "Mike Johnson",
      status: "Draft",
      dateModified: "2023-11-05",
      views: 0
    },
    { 
      id: 4, 
      title: "Mastering Job Interviews", 
      type: "Course", 
      author: "Sarah Williams",
      status: "Published",
      dateModified: "2023-10-28",
      views: 3567
    },
    { 
      id: 5, 
      title: "Resume vs CV: The Ultimate Guide", 
      type: "Article", 
      author: "Alex Turner",
      status: "Under Review",
      dateModified: "2023-10-20",
      views: 124
    }
  ];

  const filteredContent = contentItems.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Published":
        return <Badge className="bg-green-500">Published</Badge>;
      case "Draft":
        return <Badge variant="outline">Draft</Badge>;
      case "Under Review":
        return <Badge className="bg-amber-500">Under Review</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Content Management</h1>
        <Button className="gap-2 self-start">
          <FilePlus className="h-4 w-4" />
          Create New Content
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>All Content</CardTitle>
          <CardDescription>
            Manage articles, guides, videos, and other content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search content..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="border rounded-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Title</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Type</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Author</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Last Modified</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-muted-foreground">Views</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredContent.map((item) => (
                    <tr key={item.id} className="hover:bg-muted/30">
                      <td className="px-4 py-3 text-sm flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="font-medium">{item.title}</span>
                      </td>
                      <td className="px-4 py-3 text-sm">{item.type}</td>
                      <td className="px-4 py-3 text-sm">{item.author}</td>
                      <td className="px-4 py-3 text-sm">
                        {getStatusBadge(item.status)}
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {item.dateModified}
                      </td>
                      <td className="px-4 py-3 text-sm text-center">
                        <div className="flex items-center justify-center">
                          <Eye className="h-3 w-3 mr-1 text-muted-foreground" />
                          {item.views.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredContent.length === 0 && (
                <div className="px-4 py-6 text-center">
                  <p className="text-muted-foreground">No content found</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminContentManagement;
