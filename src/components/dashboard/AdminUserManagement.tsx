import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  User, 
  UserPlus, 
  Edit, 
  Trash2, 
  Shield, 
  CheckCircle, 
  XCircle 
} from "lucide-react";

const AdminUserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Provided admin and user emails
  const adminEmail = "samandar.devlog@outlook.com";
  const userEmails = [
    "dilnoza.karimova01@gmail.com",
    "aziz_hamdamov@edu.uz",
    "liam.torres.careerboost@gmail.com",
    "shaxrizoda.tashkent2024@mail.ru",
    "zuleyha_brightfuture@inbox.uz",
    "michael.chen.internship@gmail.com",
    "kamron.bek_resume@edu.uz",
    "nilufar.careerboost.user@gmail.com",
    "joshua.web3intern@outlook.com",
    "oybek_karimov23@inbox.uz",
    "arianna.mentorship2025@gmail.com",
    "nodira.talaba@edu.uz",
    "john.smith.uxstudent@gmail.com",
    "diyor_ish_izlayapti@inbox.uz",
  ];

  // Mock user data: one admin, rest are users
  const users = [
    // The admin
    {
      id: 1,
      name: adminEmail.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
      email: adminEmail,
      role: "Admin",
      status: "Active",
      lastActive: "Just now"
    },
    // The rest (Users)
    ...userEmails.map((email, idx) => ({
      id: idx + 2,
      name: email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
      email,
      role: "User",
      status: "Active",
      lastActive: "Just now"
    })),
    // Existing mock users
    { 
      id: 100, 
      name: "Jane Smith", 
      email: "jane@example.com", 
      role: "Editor", 
      status: "Active",
      lastActive: "1 day ago" 
    },
    { 
      id: 101, 
      name: "Mike Johnson", 
      email: "mike@example.com", 
      role: "User", 
      status: "Inactive",
      lastActive: "1 week ago" 
    },
    { 
      id: 102, 
      name: "Sarah Williams", 
      email: "sarah@example.com", 
      role: "User", 
      status: "Active",
      lastActive: "3 hours ago" 
    },
    { 
      id: 103, 
      name: "Alex Turner", 
      email: "alex@example.com", 
      role: "Editor", 
      status: "Active",
      lastActive: "Just now" 
    }
  ];

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">User Management</h1>
        <Button className="gap-2 self-start">
          <UserPlus className="h-4 w-4" />
          Add New User
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Users</CardTitle>
          <CardDescription>
            Manage and configure user accounts and permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
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
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Email</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Role</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Last Active</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-muted/30">
                      <td className="px-4 py-3 text-sm flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        {user.name}
                      </td>
                      <td className="px-4 py-3 text-sm">{user.email}</td>
                      <td className="px-4 py-3 text-sm">
                        <Badge variant={user.role === "Admin" ? "default" : 
                                user.role === "Editor" ? "secondary" : "outline"}>
                          {user.role === "Admin" && <Shield className="h-3 w-3 mr-1" />}
                          {user.role}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span className="flex items-center">
                          {user.status === "Active" ? (
                            <>
                              <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                              <span className="text-green-600">Active</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="h-3 w-3 mr-1 text-gray-400" />
                              <span className="text-gray-500">Inactive</span>
                            </>
                          )}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground">{user.lastActive}</td>
                      <td className="px-4 py-3 text-sm text-right">
                        <div className="flex items-center justify-end gap-2">
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
              
              {filteredUsers.length === 0 && (
                <div className="px-4 py-6 text-center">
                  <p className="text-muted-foreground">No users found</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUserManagement;
