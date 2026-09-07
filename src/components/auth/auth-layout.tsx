import Link from "next/link";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="auth-shell">
      <div className="auth-shell-content">
        <div className="auth-card">
          <div className="auth-card-heading">
            <Link href="/" className="text-sm font-semibold tracking-tight">
              Dashboard
            </Link>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
