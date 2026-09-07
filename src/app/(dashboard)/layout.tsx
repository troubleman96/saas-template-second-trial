import { SidebarProvider } from "@/lib/sidebar-context";
import { NotificationProvider } from "@/lib/notification-context";
import { Sidebar } from "@/components/layout/sidebar";
import { TopBar } from "@/components/layout/topbar";
import { CommandPalette } from "@/components/layout/command-palette";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <NotificationProvider>
        <TopBar />
        <Sidebar />
        <CommandPalette />
        <main className="min-h-screen bg-[var(--background)] px-5 py-6 sm:px-8 lg:px-10 lg:pt-[calc(3rem+1.75rem)] lg:pb-10 lg:ml-56 transition-[margin] duration-200">
          <div className="w-full max-w-none">{children}</div>
        </main>
      </NotificationProvider>
    </SidebarProvider>
  );
}
