
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  Shield, 
  Globe, 
  Database, 
  BellRing, 
  Server, 
  FileText,
  Save
} from "lucide-react";
import { useState } from "react";

const AdminSettings = () => {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Freelance Platform",
    siteDescription: "Connect freelancers with job opportunities worldwide",
    contactEmail: "admin@example.com",
    maxFileUploadSize: "10"
  });

  const handleGeneralSettingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGeneralSettings({
      ...generalSettings,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <h1 className="text-3xl font-bold">Settings</h1>
      <p className="text-muted-foreground">
        Configure system settings and preferences for the entire platform
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar with setting categories */}
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-0">
              <nav className="flex flex-col">
                <a 
                  href="#general" 
                  className="flex items-center gap-2 p-4 hover:bg-muted transition-colors border-l-2 border-primary"
                >
                  <Settings className="h-4 w-4" />
                  <span>General</span>
                </a>
                <a 
                  href="#security" 
                  className="flex items-center gap-2 p-4 hover:bg-muted transition-colors border-l-2 border-transparent"
                >
                  <Shield className="h-4 w-4" />
                  <span>Security</span>
                </a>
                <a 
                  href="#api" 
                  className="flex items-center gap-2 p-4 hover:bg-muted transition-colors border-l-2 border-transparent"
                >
                  <Globe className="h-4 w-4" />
                  <span>API Settings</span>
                </a>
                <a 
                  href="#database" 
                  className="flex items-center gap-2 p-4 hover:bg-muted transition-colors border-l-2 border-transparent"
                >
                  <Database className="h-4 w-4" />
                  <span>Database</span>
                </a>
                <a 
                  href="#notifications" 
                  className="flex items-center gap-2 p-4 hover:bg-muted transition-colors border-l-2 border-transparent"
                >
                  <BellRing className="h-4 w-4" />
                  <span>Notifications</span>
                </a>
                <a 
                  href="#backups" 
                  className="flex items-center gap-2 p-4 hover:bg-muted transition-colors border-l-2 border-transparent"
                >
                  <Server className="h-4 w-4" />
                  <span>Backups</span>
                </a>
                <a 
                  href="#logs" 
                  className="flex items-center gap-2 p-4 hover:bg-muted transition-colors border-l-2 border-transparent"
                >
                  <FileText className="h-4 w-4" />
                  <span>Logs</span>
                </a>
              </nav>
            </CardContent>
          </Card>
        </div>
        
        {/* Main settings area */}
        <div className="md:col-span-2 space-y-6">
          {/* General Settings */}
          <Card id="general">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                <CardTitle>General Settings</CardTitle>
              </div>
              <CardDescription>
                Basic configuration for your website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input 
                    id="siteName" 
                    name="siteName"
                    value={generalSettings.siteName} 
                    onChange={handleGeneralSettingChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Input 
                    id="siteDescription" 
                    name="siteDescription"
                    value={generalSettings.siteDescription} 
                    onChange={handleGeneralSettingChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input 
                    id="contactEmail" 
                    name="contactEmail"
                    type="email" 
                    value={generalSettings.contactEmail} 
                    onChange={handleGeneralSettingChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="maxFileUploadSize">Max File Upload Size (MB)</Label>
                  <Input 
                    id="maxFileUploadSize" 
                    name="maxFileUploadSize"
                    type="number" 
                    value={generalSettings.maxFileUploadSize} 
                    onChange={handleGeneralSettingChange}
                  />
                </div>
                
                <div className="pt-2">
                  <Button className="gap-2">
                    <Save className="h-4 w-4" />
                    Save Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Security Settings */}
          <Card id="security">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <CardTitle>Security Settings</CardTitle>
              </div>
              <CardDescription>
                Configure security options for your website
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
                  </div>
                  <Badge>Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Login Rate Limiting</p>
                    <p className="text-sm text-muted-foreground">Prevent brute force attacks</p>
                  </div>
                  <Badge>Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Session Timeout</p>
                    <p className="text-sm text-muted-foreground">Auto logout after inactivity</p>
                  </div>
                  <span className="text-sm font-medium">30 minutes</span>
                </div>
                <div className="pt-2">
                  <Button variant="outline">Configure Security Settings</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* System Status */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                <CardTitle>System Status</CardTitle>
              </div>
              <CardDescription>
                Overview of system performance and status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Server Status</p>
                    <p className="text-sm text-muted-foreground">Web and application servers</p>
                  </div>
                  <Badge className="bg-green-500">Operational</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Database Status</p>
                    <p className="text-sm text-muted-foreground">Primary and replica databases</p>
                  </div>
                  <Badge className="bg-green-500">Operational</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Storage Status</p>
                    <p className="text-sm text-muted-foreground">File storage system</p>
                  </div>
                  <Badge className="bg-amber-500">Degraded</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Last Backup</p>
                    <p className="text-sm text-muted-foreground">Database and file backups</p>
                  </div>
                  <span className="text-sm font-medium">2 hours ago</span>
                </div>
                <div className="pt-2">
                  <Button variant="outline">View Detailed Status</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
