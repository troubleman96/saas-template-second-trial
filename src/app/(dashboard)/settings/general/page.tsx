"use client";

export default function SettingsGeneralPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Instance Settings */}
      <section className="application-settings-section">
        <div className="application-settings-section-header">
          <div>
            <h2>Instance settings</h2>
            <p>Configure your instance name and general settings.</p>
          </div>
        </div>
        <div className="application-settings-section-body grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--coollabs-subtle)]">
              Instance name
            </label>
            <input type="text" defaultValue="My SaaS" className="input" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--coollabs-subtle)]">
              Default page
            </label>
            <select className="select">
              <option>Dashboard</option>
              <option>Applications</option>
              <option>Projects</option>
            </select>
          </div>
        </div>
      </section>

      {/* Server Timezone */}
      <section className="application-settings-section">
        <div className="application-settings-section-header">
          <div>
            <h2>Server timezone</h2>
            <p>The timezone used for scheduling and log timestamps.</p>
          </div>
        </div>
        <div className="application-settings-section-body">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--coollabs-subtle)]">
              Timezone
            </label>
            <select className="select max-w-sm">
              <option>UTC</option>
              <option>America/New_York</option>
              <option>Europe/London</option>
              <option>Asia/Tokyo</option>
            </select>
          </div>
        </div>
      </section>
    </div>
  );
}
