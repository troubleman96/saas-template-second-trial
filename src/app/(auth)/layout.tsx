import { AuthLayout } from "@/components/auth/auth-layout";

export default function AuthPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthLayout>{children}</AuthLayout>;
}
