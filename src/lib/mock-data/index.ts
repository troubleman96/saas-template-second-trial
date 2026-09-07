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
  git_repository?: string;
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

export interface Source {
  id: string;
  name: string;
  type: "github" | "gitlab" | "bitbucket" | "gitea" | "other";
  organization: string;
  url: string;
  status: "connected" | "disconnected" | "error";
  repositories: number;
  lastSync: string;
}

export interface Destination {
  id: string;
  name: string;
  type: "docker" | "kubernetes" | "swarm" | "coolify";
  description: string;
  status: "running" | "stopped" | "degraded";
  server: string;
  port: number;
}

export interface StorageProvider {
  id: string;
  name: string;
  type: string;
  bucket: string;
  region: string;
  endpoint: string;
  status: "connected" | "disconnected" | "error";
}

export interface SharedVariable {
  id: string;
  key: string;
  value: string;
  scopedTo: string;
  updatedAt: string;
}

export interface TeamTag {
  id: string;
  name: string;
  color: string;
  resources: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  applications: number;
  environments: string[];
  updatedAt: string;
}

export interface SshKey {
  id: string;
  name: string;
  fingerprint: string;
  createdAt: string;
  publicKey: string;
}

export interface ApiToken {
  id: string;
  name: string;
  token: string;
  createdAt: string;
  lastUsed: string;
  permissions: string[];
}

export const sources: Source[] = [
  { id: "1", name: "GitHub", type: "github", organization: "acme-corp", url: "https://github.com/acme-corp", status: "connected", repositories: 24, lastSync: "5 minutes ago" },
  { id: "2", name: "GitLab", type: "gitlab", organization: "acme-labs", url: "https://gitlab.com/acme-labs", status: "connected", repositories: 12, lastSync: "1 hour ago" },
  { id: "3", name: "Bitbucket", type: "bitbucket", organization: "acme", url: "https://bitbucket.org/acme", status: "disconnected", repositories: 0, lastSync: "3 days ago" },
];

export const destinations: Destination[] = [
  { id: "1", name: "Local Docker", type: "docker", description: "Local Docker socket", status: "running", server: "prod-server-01", port: 2375 },
  { id: "2", name: "Production Docker", type: "docker", description: "Production Docker engine", status: "running", server: "prod-server-02", port: 2376 },
  { id: "3", name: "Coolify Instance", type: "coolify", description: "Default Coolify instance", status: "running", server: "local", port: 8000 },
  { id: "4", name: "Staging Swarm", type: "swarm", description: "Docker swarm cluster", status: "degraded", server: "prod-server-03", port: 2377 },
];

export const storageProviders: StorageProvider[] = [
  { id: "1", name: "Main Bucket", type: "S3", bucket: "acme-assets", region: "eu-west-1", endpoint: "s3.eu-west-1.amazonaws.com", status: "connected" },
  { id: "2", name: "Backup Storage", type: "MinIO", bucket: "acme-backups", region: "local", endpoint: "minio.internal:9000", status: "connected" },
  { id: "3", name: "Archive Bucket", type: "Cloudflare R2", bucket: "acme-archive", region: "auto", endpoint: "r2.cloudflarestorage.com", status: "error" },
];

export const sharedVariables: SharedVariable[] = [
  { id: "1", key: "DATABASE_URL", value: "postgres://user:${PASSWORD}@db:5432/app", scopedTo: "All", updatedAt: "2 days ago" },
  { id: "2", key: "REDIS_URL", value: "redis://cache:6379", scopedTo: "Production", updatedAt: "1 week ago" },
  { id: "3", key: "STRIPE_SECRET_KEY", value: "sk_live_••••••••", scopedTo: "All", updatedAt: "1 month ago" },
  { id: "4", key: "FEATURE_FLAGS", value: '{"beta":true}', scopedTo: "Staging", updatedAt: "3 hours ago" },
];

export const teamTags: TeamTag[] = [
  { id: "1", name: "production", color: "#ef4444", resources: 6 },
  { id: "2", name: "staging", color: "#eab308", resources: 4 },
  { id: "3", name: "api", color: "#22c55e", resources: 5 },
  { id: "4", name: "frontend", color: "#6b16ed", resources: 3 },
  { id: "5", name: "database", color: "#3b82f6", resources: 2 },
];

export const projects: Project[] = [
  { id: "1", name: "Core Platform", description: "Main SaaS platform with API and web app", applications: 4, environments: ["production", "staging", "development"], updatedAt: "2 hours ago" },
  { id: "2", name: "Marketing Site", description: "Public marketing and landing pages", applications: 2, environments: ["production"], updatedAt: "1 day ago" },
  { id: "3", name: "Internal Tools", description: "Internal admin and ops tooling", applications: 3, environments: ["production", "staging"], updatedAt: "3 days ago" },
];

export const sshKeys: SshKey[] = [
  { id: "1", name: "Deploy Key", fingerprint: "SHA256:AbC123def456", createdAt: "2 months ago", publicKey: "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAA..." },
  { id: "2", name: "CI Runner", fingerprint: "SHA256:GhI789jkl012", createdAt: "1 month ago", publicKey: "ssh-rsa AAAAB3NzaC1yc2EAAAADAQAB..." },
];

export const apiTokens: ApiToken[] = [
  { id: "1", name: "CLI Token", token: "cl_••••••••••••", createdAt: "3 months ago", lastUsed: "2 days ago", permissions: ["read", "write"] },
  { id: "2", name: "CI Deploy Token", token: "ci_••••••••••••", createdAt: "2 weeks ago", lastUsed: "4 hours ago", permissions: ["deploy"] },
  { id: "3", name: "Read-Only Token", token: "ro_••••••••••••", createdAt: "5 days ago", lastUsed: "1 hour ago", permissions: ["read"] },
];

export const dashboardStats = {
  totalApplications: 6,
  runningApplications: 3,
  totalServers: 3,
  activeServers: 2,
  deploymentsToday: 4,
  failedDeployments: 1,
  running: 3,
  stopped: 2,
};
