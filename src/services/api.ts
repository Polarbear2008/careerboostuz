
// Base API service for fetching data from the server
// In a real application, this would point to your actual API

// Base URL for API calls (replace with your actual API URL in production)
const API_BASE_URL = 'https://api.example.com';

// For demo purposes, we're simulating API responses with a delay
const SIMULATE_NETWORK_DELAY = true;
const NETWORK_DELAY_MS = 800; // milliseconds

// Helper function to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to make API requests with error handling
async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    // In a real application, this would be a fetch to your actual API
    // For demonstration, we're returning mock data with a delay
    
    if (SIMULATE_NETWORK_DELAY) {
      await delay(NETWORK_DELAY_MS);
    }
    
    // Simulate API responses based on the endpoint
    const mockResponse = getMockData<T>(endpoint);
    return mockResponse;
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error);
    throw error;
  }
}

// Mock data provider function
function getMockData<T>(endpoint: string): T {
  // This function provides mock data for demonstration purposes
  // In a real application, this would be replaced with actual API calls
  
  if (endpoint.includes('/dashboard/overview')) {
    return {
      stats: {
        totalEarnings: 14000,
        activeProjects: 8,
        completedProjects: 24,
        activeClients: 12
      },
      projectsData: [
        { month: 'Jan', completed: 4, ongoing: 2 },
        { month: 'Feb', completed: 3, ongoing: 4 },
        { month: 'Mar', completed: 5, ongoing: 3 },
        { month: 'Apr', completed: 7, ongoing: 1 },
        { month: 'May', completed: 2, ongoing: 5 },
        { month: 'Jun', completed: 6, ongoing: 2 },
      ],
      earningsData: [
        { month: 'Jan', earnings: 1800 },
        { month: 'Feb', earnings: 2200 },
        { month: 'Mar', earnings: 1900 },
        { month: 'Apr', earnings: 2800 },
        { month: 'May', earnings: 2100 },
        { month: 'Jun', earnings: 3200 },
      ]
    } as unknown as T;
  }
  
  if (endpoint.includes('/projects')) {
    return {
      projects: [
        {
          id: "p1",
          title: "E-commerce Website Redesign",
          client: {
            name: "Jane Cooper",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          },
          status: "in progress",
          deadline: "2023-11-30",
          budget: "$2,500",
          progress: 75,
          category: "Web Design"
        },
        {
          id: "p2",
          title: "Mobile App Development",
          client: {
            name: "Robert Fox",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          },
          status: "pending",
          deadline: "2023-12-15",
          budget: "$5,000",
          progress: 20,
          category: "App Development"
        },
        {
          id: "p3",
          title: "Brand Identity Design",
          client: {
            name: "Esther Howard",
            avatar: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          },
          status: "completed",
          deadline: "2023-10-10",
          budget: "$1,800",
          progress: 100,
          category: "Branding"
        },
        {
          id: "p4",
          title: "SEO Optimization",
          client: {
            name: "Cameron Williamson",
            avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          },
          status: "in progress",
          deadline: "2023-11-20",
          budget: "$1,200",
          progress: 60,
          category: "Marketing"
        }
      ]
    } as unknown as T;
  }
  
  if (endpoint.includes('/earnings')) {
    return {
      stats: {
        totalEarnings: 25500,
        availableBalance: 8700,
        currentMonth: 3100,
        previousMonthPercentage: 8.7,
        lastYearPercentage: 15.3,
        lastWithdrawal: "2023-10-25",
      },
      monthlyEarnings: [
        { month: 'Jan', earnings: 1200 },
        { month: 'Feb', earnings: 1500 },
        { month: 'Mar', earnings: 1800 },
        { month: 'Apr', earnings: 1300 },
        { month: 'May', earnings: 2000 },
        { month: 'Jun', earnings: 2100 },
        { month: 'Jul', earnings: 1900 },
        { month: 'Aug', earnings: 2400 },
        { month: 'Sep', earnings: 2700 },
        { month: 'Oct', earnings: 2500 },
        { month: 'Nov', earnings: 2800 },
        { month: 'Dec', earnings: 3100 },
      ],
      earningsByCategory: [
        { name: 'Web Development', value: 8500, color: '#8884d8' },
        { name: 'UI/UX Design', value: 5500, color: '#82ca9d' },
        { name: 'Mobile Apps', value: 3800, color: '#ffc658' },
        { name: 'Branding', value: 2200, color: '#ff8042' },
      ],
      recentPayments: [
        { id: 'INV-001', date: '2023-11-15', client: 'Acme Inc.', project: 'Website Redesign', amount: '$2,500' },
        { id: 'INV-002', date: '2023-11-10', client: 'GlobalTech', project: 'Mobile App UI', amount: '$1,800' },
        { id: 'INV-003', date: '2023-11-05', client: 'EcoSystems', project: 'Brand Identity', amount: '$1,200' },
        { id: 'INV-004', date: '2023-10-28', client: 'BetaWorks', project: 'E-commerce Platform', amount: '$3,500' },
        { id: 'INV-005', date: '2023-10-20', client: 'CreativeMinds', project: 'Marketing Campaign', amount: '$950' },
      ]
    } as unknown as T;
  }
  
  // Default fallback response
  return {} as T;
}

// API service functions
export const dashboardApi = {
  // Get dashboard overview data
  getDashboardOverview: () => 
    apiRequest<DashboardOverviewData>('/dashboard/overview'),
  
  // Get projects data
  getProjects: () => 
    apiRequest<ProjectsData>('/projects'),
  
  // Get earnings data
  getEarnings: () => 
    apiRequest<EarningsData>('/earnings'),
};

// Type definitions for API responses
export interface DashboardOverviewData {
  stats: {
    totalEarnings: number;
    activeProjects: number;
    completedProjects: number;
    activeClients: number;
  };
  projectsData: Array<{
    month: string;
    completed: number;
    ongoing: number;
  }>;
  earningsData: Array<{
    month: string;
    earnings: number;
  }>;
}

export interface ProjectsData {
  projects: Array<{
    id: string;
    title: string;
    client: {
      name: string;
      avatar: string;
    };
    status: 'completed' | 'in progress' | 'pending';
    deadline: string;
    budget: string;
    progress: number;
    category: string;
  }>;
}

export interface EarningsData {
  stats: {
    totalEarnings: number;
    availableBalance: number;
    currentMonth: number;
    previousMonthPercentage: number;
    lastYearPercentage: number;
    lastWithdrawal: string;
  };
  monthlyEarnings: Array<{
    month: string;
    earnings: number;
  }>;
  earningsByCategory: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  recentPayments: Array<{
    id: string;
    date: string;
    client: string;
    project: string;
    amount: string;
  }>;
}
