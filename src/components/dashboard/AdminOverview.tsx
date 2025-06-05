import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, BarChart } from "lucide-react";
import AdminPlatformOverview from "./AdminPlatformOverview";

const adminEmails = [
  "dilnoza.karimova01@gmail.com",
  "aziz_hamdamov@edu.uz",
  "liam.torres.careerboost@gmail.com",
  "shaxrizoda.tashkent2024@mail.ru",
  "samandar.devlog@outlook.com",
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

const AdminOverview = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="text-muted-foreground">
        Welcome to the admin dashboard. Here you can manage users, content, and settings.
      </p>
      
      {/* Platform Overview Section */}
      <AdminPlatformOverview />

      {/* Quick Actions Section */}
      <Card>
        <CardHeader>
          <CardTitle>Admin Quick Actions</CardTitle>
          <CardDescription>
            Common tasks you may want to perform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button action="Manage Users" icon={Users} />
            <Button action="Content Management" icon={FileText} />
            <Button action="View Statistics" icon={BarChart} />
          </div>
        </CardContent>
      </Card>
      
      {/* System Information */}
      <Card>
        <CardHeader>
          <CardTitle>System Information</CardTitle>
          <CardDescription>
            Overview of system status and performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">System Status:</span>
              <span className="font-medium text-green-600">Operational</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">API Status:</span>
              <span className="font-medium text-green-600">Operational</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Backup:</span>
              <span className="font-medium">2 hours ago</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Server Load:</span>
              <span className="font-medium">32%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Action Button Component
const Button = ({ action, icon: Icon }: { action: string, icon: React.FC<any> }) => {
  return (
    <div className="bg-muted/50 hover:bg-muted transition-colors duration-200 rounded-lg p-4 cursor-pointer">
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 rounded-full p-2 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div className="font-medium">{action}</div>
      </div>
    </div>
  );
};

export default AdminOverview;
