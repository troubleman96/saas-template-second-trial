"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Save } from "lucide-react";

export default function SettingsGeneralPage() {
  const [workspaceName, setWorkspaceName] = useState("Default Team");
  const [siteName, setSiteName] = useState("Dashboard");

  return (
    <div className="space-y-6">
      <div className="layer-card">
        <div className="layer-card-header">
          <h3>General Settings</h3>
        </div>
        <div className="layer-card-body space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-[var(--coollabs-subtle)]">
              Workspace Name
            </label>
            <input
              type="text"
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
              className="input max-w-md"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-[var(--coollabs-subtle)]">
              Site Name
            </label>
            <input
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="input max-w-md"
            />
          </div>
          <button
            onClick={() => toast.success("Settings saved")}
            className="button button-primary"
          >
            <Save className="h-4 w-4" />
            Save Changes
          </button>
        </div>
      </div>

      <div className="layer-card">
        <div className="layer-card-header">
          <h3>Appearance</h3>
        </div>
        <div className="layer-card-body space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-[var(--coollabs-subtle)]">
              Default Page Width
            </label>
            <select className="select input max-w-md">
              <option value="full">Full width</option>
              <option value="centered">Centered</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
