
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, GraduationCap, Briefcase, CalendarDays, MessageSquare } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Table, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";

const usageStats = [
  {
    title: "Registered Users",
    value: 428,
    icon: <Users className="h-5 w-5" />,
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "Resumes Created",
    value: 195,
    icon: <FileText className="h-5 w-5" />,
    color: "bg-green-100 text-green-700",
  },
  {
    title: "Career Tests Completed",
    value: 122,
    icon: <GraduationCap className="h-5 w-5" />,
    color: "bg-purple-100 text-purple-700",
  },
  {
    title: "Job Applications Submitted",
    value: 301,
    icon: <Briefcase className="h-5 w-5" />,
    color: "bg-amber-100 text-amber-700",
  },
  {
    title: "Registered Employers",
    value: 11,
    icon: <Users className="h-5 w-5" />,
    color: "bg-pink-100 text-pink-700",
  },
  {
    title: "Active Job Listings",
    value: 24,
    icon: <Briefcase className="h-5 w-5" />,
    color: "bg-teal-100 text-teal-700",
  },
  {
    title: "Scholarships Listed",
    value: 6,
    icon: <GraduationCap className="h-5 w-5" />,
    color: "bg-orange-100 text-orange-700",
  },
  {
    title: "Mentorship Sessions Requested",
    value: 9,
    icon: <MessageSquare className="h-5 w-5" />,
    color: "bg-cyan-100 text-cyan-700",
  },
];

const ageDistributionData = [
  { age: "17–18", percent: 18 },
  { age: "19–21", percent: 54 },
  { age: "22–25", percent: 23 },
  { age: "26+", percent: 5 },
];

const searchedTerms = [
  "IT Internship",
  "Resume Examples",
  "Scholarship for Medical Students",
  "Summer Jobs in Tashkent",
  "Marketing Internships",
];

const AdminPlatformOverview = () => (
  <section className="space-y-8">
    {/* Platform Usage Overview */}
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">📈 Platform Usage Overview</CardTitle>
        <CardDescription>Key metrics for CareerBoost usage</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {usageStats.map((stat) => (
            <div key={stat.title} className="flex flex-col items-start bg-muted/40 rounded-lg p-4 min-w-[140px]">
              <div className={`rounded-full p-2 mb-2 ${stat.color}`}>
                {stat.icon}
              </div>
              <span className="font-medium text-sm text-muted-foreground">{stat.title}</span>
              <span className="text-xl font-bold mt-1">{stat.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>

    {/* Age Distribution */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">📊 Age Distribution</CardTitle>
          <CardDescription>Percentage of users per age group</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={ageDistributionData} layout="vertical" margin={{ top: 8, left: 18, right: 18, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} tickFormatter={tick => `${tick}%`}/>
              <YAxis dataKey="age" type="category" />
              <Tooltip formatter={value => `${value}%`} />
              <Bar dataKey="percent" fill="#6366f1" radius={[5, 5, 5, 5]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 flex flex-col gap-1">
            {ageDistributionData.map(({age, percent}) => (
              <span key={age} className="text-sm text-muted-foreground">{age}: <span className="font-semibold">{percent}%</span></span>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Searched Terms Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">📍 Top Searched Terms</CardTitle>
          <CardDescription>Most frequently searched on CareerBoost</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="font-semibold">#</TableCell>
                <TableCell className="font-semibold">Search Term</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {searchedTerms.map((term, idx) => (
                <TableRow key={term}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{term}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  </section>
);

export default AdminPlatformOverview;
