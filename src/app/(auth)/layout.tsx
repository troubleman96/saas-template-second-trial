export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="auth-shell">
      <div className="auth-shell-content">
        <div className="auth-card">
          {children}
        </div>
      </div>
    </div>
  );
}
