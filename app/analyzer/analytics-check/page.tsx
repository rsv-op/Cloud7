
"use client";

import React, { useState } from "react";

interface VerificationResponse {
  received: boolean;
  eventName: string;
  serverTimestamp: string;
  clientTimestamp: string;
  status: string;
}

export default function AnalyticsCheckPage() {
  const [status, setStatus] = useState<string>("idle");
  const [log, setLog] = useState<VerificationResponse | null>(null);
  const [error, setError] = useState<string>("");

  const triggerTestEvent = async () => {
    setStatus("testing");
    setError("");
    setLog(null);

    try {
      const payload = {
        eventName: "cloud7_telemetry_probe",
        timestamp: new Date().toISOString(),
        metadata: {
          platform: "android_web",
          environment: "production_verification",
        },
      };

      const res = await fetch("/api/analytics/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Telemetry validation endpoint failed");
      }

      setLog(data.verification);
      setStatus("verified");
    } catch (err: any) {
      setError(err?.message || "Connection failed");
      setStatus("failed");
    }
  };

  return (
    <main style={{ maxWidth: "800px", margin: "2rem auto", padding: "1.5rem", fontFamily: "sans-serif", color: "#f3f4f6" }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
        Analytics Verification Harness
      </h1>
      <p style={{ color: "#9ca3af", marginBottom: "1.5rem" }}>
        Send a test probe to verify that edge analytics and telemetry routing are operating without errors.
      </p>

      <button
        onClick={triggerTestEvent}
        disabled={status === "testing"}
        style={{
          background: status === "testing" ? "#4b5563" : "#2563eb",
          color: "#fff",
          border: "none",
          padding: "0.75rem 1.5rem",
          borderRadius: "6px",
          fontWeight: 600,
          cursor: status === "testing" ? "not-allowed" : "pointer",
        }}
      >
        {status === "testing" ? "Verifying..." : "Dispatch Test Analytics Probe"}
      </button>

      {error && (
        <div style={{ marginTop: "1.5rem", padding: "1rem", background: "#7f1d1d", color: "#fecaca", borderRadius: "6px" }}>
          {error}
        </div>
      )}

      {log && (
        <div style={{ marginTop: "1.5rem", padding: "1rem", background: "#111827", border: "1px solid #374151", borderRadius: "6px" }}>
          <h2 style={{ fontSize: "1.1rem", color: "#34d399", margin: "0 0 0.5rem 0" }}>✓ Pipeline Verified Active</h2>
          <pre style={{ margin: 0, fontSize: "0.875rem", color: "#d1d5db" }}>
            {JSON.stringify(log, null, 2)}
          </pre>
        </div>
      )}
    </main>
  );
}
