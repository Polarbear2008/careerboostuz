
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AreaChart, BarChart, Calendar, DollarSign, TrendingUp, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Area, 
  AreaChart as RechartsAreaChart, 
  Bar, 
  BarChart as RechartsBarChart, 
  CartesianGrid, 
  Legend, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts";
import { dashboardApi } from "@/services/api";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardOverview = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboardOverview'],
    queryFn: dashboardApi.getDashboardOverview
  });

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-lg text-center">
        <h2 className="text-xl font-semibold text-red-600 dark:text-red-400">Error loading dashboard data</h2>
        <p className="mt-2 text-red-500 dark:text-red-300">
          Please try refreshing the page or contact support if the problem persists.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Total Earnings" 
          value={`$${data?.stats.totalEarnings.toLocaleString()}`} 
          description="Last 30 days"
          trend="+12.5%"
          icon={<DollarSign className="h-4 w-4" />}
          trendUp={true}
        />
        <StatsCard 
          title="Active Projects" 
          value={data?.stats.activeProjects.toString() || "0"} 
          description="Currently in progress"
          trend="+2"
          icon={<BarChart className="h-4 w-4" />}
          trendUp={true}
        />
        <StatsCard 
          title="Completed Projects" 
          value={data?.stats.completedProjects.toString() || "0"} 
          description="All time"
          trend="+3"
          icon={<Calendar className="h-4 w-4" />}
          trendUp={true}
        />
        <StatsCard 
          title="Active Clients" 
          value={data?.stats.activeClients.toString() || "0"} 
          description="Repeat clients: 8"
          trend="+4"
          icon={<Users className="h-4 w-4" />}
          trendUp={true}
        />
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Project Statistics</CardTitle>
            <CardDescription>Completed vs Ongoing Projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={data?.projectsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completed" name="Completed" fill="#10b981" />
                  <Bar dataKey="ongoing" name="Ongoing" fill="#3b82f6" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Earnings Trend</CardTitle>
            <CardDescription>Last 6 months earnings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsAreaChart data={data?.earningsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`$${value}`, 'Earnings']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="earnings" 
                    name="Earnings" 
                    stroke="#8884d8" 
                    fill="#8884d8" 
                    fillOpacity={0.3} 
                  />
                </RechartsAreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Stat card component
interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  trend: string;
  trendUp: boolean;
  icon: React.ReactNode;
}

const StatsCard = ({ title, value, description, trend, trendUp, icon }: StatsCardProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
          <div className={`mr-2 p-1 rounded ${trendUp ? 'text-green-500 bg-green-100/50' : 'text-red-500 bg-red-100/50'}`}>
            {trendUp ? <TrendingUp className="h-3 w-3" /> : <TrendingUp className="h-3 w-3 transform rotate-180" />}
          </div>
          <p className={trendUp ? 'text-green-500 font-medium' : 'text-red-500 font-medium'}>
            {trend}
          </p>
          <p className="ml-2 text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

// Loading skeleton for the dashboard
const DashboardSkeleton = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>
      
      {/* Stats cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-16" />
                </div>
                <Skeleton className="h-10 w-10 rounded-full" />
              </div>
              <div className="mt-4 flex items-center">
                <Skeleton className="h-4 w-32 mr-2" />
                <Skeleton className="h-4 w-20" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Charts skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-60" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-80 w-full" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-60" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-80 w-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
