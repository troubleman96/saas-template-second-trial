export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "owner" | "admin" | "member";
}

export interface Team {
  id: string;
  name: string;
  members: User[];
}

export interface Application {
  id: string;
  name: string;
  description: string;
  status: "running" | "stopped" | "deploying" | "degraded" | "failed";
  type: string;
  url?: string;
  lastDeployed: string;
  server: string;
  branch: string;
}

export interface Server {
  id: string;
  name: string;
  ip: string;
  status: "running" | "stopped" | "degraded";
  os: string;
  cpu: number;
  memory: number;
  disk: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  timestamp: string;
}

export interface Alert {
  id: string;
  title: string;
  message: string;
  severity: "info" | "warning" | "error" | "critical";
  timestamp: string;
  acknowledged: boolean;
}

export const currentUser: User = {
  id: "1",
  name: "Alex Morgan",
  email: "alex@example.com",
  role: "owner",
};

export const teams: Team[] = [
  {
    id: "1",
    name: "Default Team",
    members: [
      currentUser,
      { id: "2", name: "Jordan Lee", email: "jordan@example.com", role: "admin" },
      { id: "3", name: "Sam Chen", email: "sam@example.com", role: "member" },
    ],
  },
];

export const applications: Application[] = [
  {
    id: "1",
    name: "web-app",
    description: "Main frontend application",
    status: "running",
    type: "Next.js",
    url: "https://web-app.example.com",
    lastDeployed: "2 hours ago",
    server: "prod-server-01",
    branch: "main",
  },
  {
    id: "2",
    name: "api-service",
    description: "REST API backend",
    status: "running",
    type: "Node.js",
    url: "https://api.example.com",
    lastDeployed: "5 hours ago",
    server: "prod-server-01",
    branch: "main",
  },
  {
    id: "3",
    name: "admin-dashboard",
    description: "Internal admin panel",
    status: "deploying",
    type: "React",
    lastDeployed: "Deploying...",
    server: "prod-server-02",
    branch: "staging",
  },
  {
    id: "4",
    name: "worker-service",
    description: "Background job processor",
    status: "stopped",
    type: "Python",
    lastDeployed: "3 days ago",
    server: "prod-server-02",
    branch: "main",
  },
  {
    id: "5",
    name: "landing-page",
    description: "Marketing site",
    status: "degraded",
    type: "Astro",
    url: "https://example.com",
    lastDeployed: "1 day ago",
    server: "prod-server-01",
    branch: "main",
  },
  {
    id: "6",
    name: "analytics-engine",
    description: "Event processing pipeline",
    status: "failed",
    type: "Go",
    lastDeployed: "6 hours ago",
    server: "prod-server-03",
    branch: "develop",
  },
];

export const servers: Server[] = [
  { id: "1", name: "prod-server-01", ip: "192.168.1.10", status: "running", os: "Ubuntu 22.04", cpu: 45, memory: 62, disk: 38 },
  { id: "2", name: "prod-server-02", ip: "192.168.1.11", status: "running", os: "Ubuntu 22.04", cpu: 72, memory: 81, disk: 55 },
  { id: "3", name: "prod-server-03", ip: "192.168.1.12", status: "degraded", os: "Debian 12", cpu: 91, memory: 88, disk: 74 },
];

export const notifications: Notification[] = [
  { id: "1", title: "Deploy complete", message: "web-app deployed successfully to production", type: "success", read: false, timestamp: "2 minutes ago" },
  { id: "2", title: "High CPU usage", message: "prod-server-03 CPU usage is at 91%", type: "warning", read: false, timestamp: "15 minutes ago" },
  { id: "3", title: "Build failed", message: "analytics-engine build failed on branch develop", type: "error", read: true, timestamp: "1 hour ago" },
  { id: "4", title: "Team member joined", message: "Sam Chen joined Default Team", type: "info", read: true, timestamp: "3 hours ago" },
  { id: "5", title: "SSL certificate expiring", message: "SSL certificate for api.example.com expires in 7 days", type: "warning", read: true, timestamp: "1 day ago" },
];

export const alerts: Alert[] = [
  { id: "1", title: "Server resource critical", message: "prod-server-03 memory usage at 88%. Consider scaling or migrating workloads.", severity: "critical", timestamp: "15 minutes ago", acknowledged: false },
  { id: "2", title: "Deployment failed", message: "analytics-engine failed to deploy. Check logs for details.", severity: "error", timestamp: "1 hour ago", acknowledged: false },
  { id: "3", title: "SSL certificate expiring", message: "Certificate for api.example.com expires in 7 days.", severity: "warning", timestamp: "1 day ago", acknowledged: true },
  { id: "4", title: "Scheduled maintenance", message: "Platform maintenance window: Saturday 2am-4am UTC.", severity: "info", timestamp: "2 days ago", acknowledged: true },
];

export const dashboardStats = {
  totalApplications: 6,
  runningApplications: 3,
  totalServers: 3,
  activeServers: 2,
  deploymentsToday: 4,
  failedDeployments: 1,
};
