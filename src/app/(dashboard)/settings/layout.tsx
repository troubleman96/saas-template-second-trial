import { SettingLayout } from "@/components/settings/settings-layout";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SettingLayout>{children}</SettingLayout>;
}
