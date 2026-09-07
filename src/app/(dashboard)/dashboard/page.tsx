import {
  AppWindow,
  Server,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { dashboardStats } from "@/lib/mock-data";

function StatCard({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: number | string;
  icon: React.ElementType;
  color: string;
}) {
  return (
    <div className="layer-card">
      <div className="layer-card-body flex items-center gap-4">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${color}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-xs text-[var(--coollabs-subtle)]">{label}</p>
        </div>
      </div>
    </div>
  );
}

function PlaceholderChart({ title }: { title: string }) {
  return (
    <div className="layer-card">
      <div className="layer-card-header">
        <h3>{title}</h3>
      </div>
      <div className="layer-card-body">
        <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-[var(--coollabs-line)]">
          <p className="text-sm text-[var(--coollabs-subtle)]">Chart placeholder</p>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-[var(--coollabs-subtle)]">
          Overview of your infrastructure and deployments.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Applications"
          value={dashboardStats.totalApplications}
          icon={AppWindow}
          color="bg-blue-500/10 text-blue-500"
        />
        <StatCard
          label="Running"
          value={dashboardStats.runningApplications}
          icon={CheckCircle}
          color="bg-green-500/10 text-green-500"
        />
        <StatCard
          label="Servers"
          value={dashboardStats.totalServers}
          icon={Server}
          color="bg-purple-500/10 text-purple-500"
        />
        <StatCard
          label="Failed Deploys"
          value={dashboardStats.failedDeployments}
          icon={XCircle}
          color="bg-red-500/10 text-red-500"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <PlaceholderChart title="Deployments" />
        <PlaceholderChart title="Resource Usage" />
      </div>

      <div className="layer-card">
        <div className="layer-card-header">
          <h3>Recent Activity</h3>
        </div>
        <div className="layer-card-body p-0">
          <div className="divide-y divide-[var(--coollabs-fill)]">
            {[
              { app: "web-app", action: "Deployed", time: "2 hours ago", status: "success" },
              { app: "api-service", action: "Restarted", time: "5 hours ago", status: "info" },
              { app: "analytics-engine", action: "Build failed", time: "6 hours ago", status: "error" },
              { app: "landing-page", action: "Health check degraded", time: "1 day ago", status: "warning" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      item.status === "success"
                        ? "bg-green-500"
                        : item.status === "error"
                        ? "bg-red-500"
                        : item.status === "warning"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                    }`}
                  />
                  <div>
                    <p className="text-sm font-medium">{item.app}</p>
                    <p className="text-xs text-[var(--coollabs-subtle)]">{item.action}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-[var(--coollabs-subtle)]">
                  <Clock className="h-3 w-3" />
                  {item.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
