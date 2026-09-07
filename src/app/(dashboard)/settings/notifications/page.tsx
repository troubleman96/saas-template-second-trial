"use client";

import { useState } from "react";
import { Mail, MessageSquare, Webhook } from "lucide-react";

export default function SettingsNotificationsPage() {
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [slackEnabled, setSlackEnabled] = useState(false);
  const [discordEnabled, setDiscordEnabled] = useState(false);

  const channels = [
    {
      id: "email",
      name: "Email",
      description: "Receive notifications via email.",
      icon: Mail,
      enabled: emailEnabled,
      toggle: () => setEmailEnabled(!emailEnabled),
    },
    {
      id: "slack",
      name: "Slack",
      description: "Post notifications to a Slack channel.",
      icon: MessageSquare,
      enabled: slackEnabled,
      toggle: () => setSlackEnabled(!slackEnabled),
    },
    {
      id: "discord",
      name: "Discord",
      description: "Post notifications to a Discord webhook.",
      icon: Webhook,
      enabled: discordEnabled,
      toggle: () => setDiscordEnabled(!discordEnabled),
    },
  ];

  const eventTypes = [
    { id: "deploy.success", label: "Deployment succeeded", category: "Deployments" },
    { id: "deploy.failed", label: "Deployment failed", category: "Deployments" },
    { id: "deploy.started", label: "Deployment started", category: "Deployments" },
    { id: "server.high_cpu", label: "High CPU usage", category: "Servers" },
    { id: "server.high_memory", label: "High memory usage", category: "Servers" },
    { id: "server.disk_low", label: "Low disk space", category: "Servers" },
    { id: "ssl.expiring", label: "SSL certificate expiring", category: "Security" },
    { id: "team.member_joined", label: "Team member joined", category: "Team" },
  ];

  return (
    <div className="mt-8 flex w-full max-w-none flex-col gap-6 lg:mt-3">
      {/* Notification Channels */}
      <section className="application-settings-section">
        <div className="application-settings-section-header">
          <div>
            <h2>Notification channels</h2>
            <p>Configure where notifications are delivered.</p>
          </div>
        </div>
        <div className="application-settings-section-body">
          <div className="flex flex-col gap-2">
            {channels.map((channel) => {
              const Icon = channel.icon;
              return (
                <div
                  key={channel.id}
                  className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white p-3 dark:border-white/[0.06] dark:bg-[var(--coollabs-base)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-full bg-neutral-100 dark:bg-white/[0.07]">
                      <Icon className="size-4 text-neutral-500 dark:text-[var(--color-fg-dim)]" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-black dark:text-[var(--color-fg)]">
                        {channel.name}
                      </div>
                      <div className="text-xs text-neutral-500 dark:text-[var(--color-fg-dim)]">
                        {channel.description}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className={`h-6 w-11 rounded-full transition-colors ${
                      channel.enabled
                        ? "bg-[var(--color-accent)]"
                        : "bg-neutral-300 dark:bg-white/10"
                    }`}
                    onClick={channel.toggle}
                    aria-label={`Toggle ${channel.name}`}
                  >
                    <span
                      className={`block size-4.5 rounded-full bg-white shadow-sm transition-transform ${
                        channel.enabled ? "translate-x-5.5" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Email Settings */}
      {emailEnabled && (
        <section className="application-settings-section">
          <div className="application-settings-section-header">
            <div>
              <h2>Email settings</h2>
              <p>Configure the email address that notifications are sent from.</p>
            </div>
          </div>
          <div className="application-settings-section-body grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--coollabs-subtle)]">
                From name
              </label>
              <input type="text" defaultValue="SaaS Platform" className="input" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--coollabs-subtle)]">
                From email
              </label>
              <input type="email" defaultValue="noreply@example.com" className="input" />
            </div>
          </div>
        </section>
      )}

      {/* Slack Settings */}
      {slackEnabled && (
        <section className="application-settings-section">
          <div className="application-settings-section-header">
            <div>
              <h2>Slack settings</h2>
              <p>Connect your Slack workspace to receive notifications.</p>
            </div>
          </div>
          <div className="application-settings-section-body grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--coollabs-subtle)]">
                Webhook URL
              </label>
              <input type="url" className="input" placeholder="https://hooks.slack.com/services/..." />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--coollabs-subtle)]">
                Channel
              </label>
              <input type="text" className="input" placeholder="#deployments" />
            </div>
          </div>
        </section>
      )}

      {/* Discord Settings */}
      {discordEnabled && (
        <section className="application-settings-section">
          <div className="application-settings-section-header">
            <div>
              <h2>Discord settings</h2>
              <p>Connect Discord to receive notifications via webhook.</p>
            </div>
          </div>
          <div className="application-settings-section-body">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--coollabs-subtle)]">
                Webhook URL
              </label>
              <input type="url" className="input max-w-lg" placeholder="https://discord.com/api/webhooks/..." />
            </div>
          </div>
        </section>
      )}

      {/* Event Preferences */}
      <section className="application-settings-section">
        <div className="application-settings-section-header">
          <div>
            <h2>Event preferences</h2>
            <p>Choose which events trigger notifications.</p>
          </div>
        </div>
        <div className="application-settings-section-body">
          {["Deployments", "Servers", "Security", "Team"].map((category) => (
            <div key={category} className="mb-4 last:mb-0">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--coollabs-subtle)]">
                {category}
              </h3>
              <div className="flex flex-col gap-1.5">
                {eventTypes
                  .filter((e) => e.category === category)
                  .map((event) => (
                    <label
                      key={event.id}
                      className="flex items-center gap-3 rounded-lg border border-transparent px-2 py-1.5 transition-colors hover:bg-neutral-50 dark:hover:bg-white/[0.03]"
                    >
                      <input
                        type="checkbox"
                        defaultChecked
                        className="size-4 rounded border-neutral-300 text-[var(--color-accent)] focus:ring-[var(--color-accent)] dark:border-white/20"
                      />
                      <span className="text-sm text-black dark:text-[var(--color-fg)]">
                        {event.label}
                      </span>
                    </label>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
