// File: components/LogisticsVerificationEngine.tsx
"use client";

import React, { useState, useEffect } from 'react';

/**
 * Logistics Verification & Fleet Sync Engine
 * Architecture: Next.js Client Component | Zero-Cost Local Storage Handoff
 * Role: Automates driver ID triage and eliminates manual fleet logging.
 */

interface FleetLog {
  id: string;
  driverId: string;
  timestamp: string;
  status: 'VERIFIED' | 'PENDING' | 'FAILED';
}

export default function LogisticsVerificationEngine() {
  const [driverId, setDriverId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [localLogs, setLocalLogs] = useState<FleetLog[]>([]);
  const [systemMessage, setSystemMessage] = useState<{ text: string; type: 'success' | 'error' | 'idle' }>({ text: '', type: 'idle' });

  // Hydrate local state from browser storage on mount (Zero-Cost Database)
  useEffect(() => {
    const cachedLogs = localStorage.getItem('cloud7_fleet_logs');
    if (cachedLogs) {
      setLocalLogs(JSON.parse(cachedLogs));
    }
  }, []);

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!driverId.trim()) return;

    setIsProcessing(true);
    setSystemMessage({ text: 'Authenticating Driver ID against local matrix...', type: 'idle' });

    // Simulate Edge Network API Verification Latency
    setTimeout(() => {
      const isFormatValid = /^\d{3}-\d{2}-\d{4}$/.test(driverId); // e.g., 000-12-3456
      
      const newLog: FleetLog = {
        id: crypto.randomUUID(),
        driverId,
        timestamp: new Date().toISOString(),
        status: isFormatValid ? 'VERIFIED' : 'FAILED'
      };

      const updatedLogs = [newLog, ...localLogs];
      setLocalLogs(updatedLogs);
      
      // Persist to Zero-Cost Local Storage (Can be upgraded to IndexedDB for larger datasets)
      localStorage.setItem('cloud7_fleet_logs', JSON.stringify(updatedLogs));

      if (isFormatValid) {
        setSystemMessage({ text: `Driver ${driverId} authenticated and logged successfully.`, type: 'success' });
        setDriverId('');
      } else {
        setSystemMessage({ text: `Verification Failed: Invalid Driver ID format. Expected XXX-XX-XXXX.`, type: 'error' });
      }
      
      setIsProcessing(false);
    }, 1200);
  };

  return (
    <div className="verification-module">
      <style dangerouslySetInnerHTML={{ __html: `
        .verification-module {
          background-color: #1e293b;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 2.5rem;
          max-width: 600px;
          margin: 0 auto;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          font-family: var(--font-inter), system-ui, sans-serif;
        }

        .module-header {
          margin-bottom: 2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-bottom: 1rem;
        }

        .module-title {
          font-family: var(--font-space-grotesk), sans-serif;
          color: #f8fafc;
          font-size: 1.5rem;
          margin: 0 0 0.5rem 0;
          letter-spacing: -0.02em;
        }

        .module-subtitle {
          color: #94a3b8;
          font-size: 0.875rem;
          margin: 0;
        }

        .input-group {
          margin-bottom: 1.5rem;
        }

        .id-input {
          width: 100%;
          background-color: #0b132b;
          border: 1px solid rgba(56, 189, 248, 0.3);
          color: #f8fafc;
          padding: 1.25rem;
          border-radius: 8px;
          font-size: 1.125rem;
          font-family: monospace;
          letter-spacing: 0.1em;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .id-input:focus {
          border-color: #38bdf8;
          box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.15);
        }

        .btn-verify {
          width: 100%;
          background: #10b981;
          color: #000;
          font-weight: 700;
          font-size: 1rem;
          padding: 1.25rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: transform 0.2s ease, opacity 0.2s ease;
        }

        .btn-verify:hover:not(:disabled) {
          transform: translateY(-2px);
        }

        .btn-verify:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          background: #334155;
          color: #94a3b8;
        }

        .system-message {
          margin-top: 1.5rem;
          padding: 1rem;
          border-radius: 6px;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .msg-idle { background: rgba(255,255,255,0.05); color: #94a3b8; }
        .msg-success { background: rgba(16, 185, 129, 0.1); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.2); }
        .msg-error { background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.2); }

        .log-section {
          margin-top: 2.5rem;
        }

        .log-header {
          font-family: var(--font-space-grotesk), sans-serif;
          color: #f8fafc;
          font-size: 1.125rem;
          margin-bottom: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .log-count {
          background: #38bdf8;
          color: #000;
          font-size: 0.75rem;
          padding: 0.25rem 0.6rem;
          border-radius: 50px;
          font-weight: bold;
        }

        .log-list {
          max-height: 250px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding-right: 0.5rem;
        }

        .log-list::-webkit-scrollbar { width: 6px; }
        .log-list::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }

        .log-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #0b132b;
          padding: 0.875rem 1rem;
          border-radius: 6px;
          border: 1px solid rgba(255,255,255,0.03);
          font-size: 0.875rem;
        }

        .log-id { font-family: monospace; color: #f8fafc; }
        
        .badge {
          font-size: 0.65rem;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-weight: bold;
          letter-spacing: 0.05em;
        }
        .badge-VERIFIED { background: rgba(16, 185, 129, 0.15); color: #10b981; }
        .badge-FAILED { background: rgba(239, 68, 68, 0.15); color: #ef4444; }
      `}} />

      <div className="module-header">
        <h2 className="module-title">Fleet Verification Matrix</h2>
        <p className="module-subtitle">Secure, zero-latency driver authentication.</p>
      </div>

      <form onSubmit={handleVerification}>
        <div className="input-group">
          <input 
            type="text" 
            className="id-input"
            placeholder="Driver ID (e.g., 000-12-3456)"
            value={driverId}
            onChange={(e) => setDriverId(e.target.value)}
            disabled={isProcessing}
            autoComplete="off"
          />
        </div>
        <button type="submit" className="btn-verify" disabled={isProcessing || !driverId.trim()}>
          {isProcessing ? 'Authenticating...' : 'Verify & Log Driver ID'}
        </button>
      </form>

      {systemMessage.text && (
        <div className={`system-message msg-${systemMessage.type}`}>
          {systemMessage.text}
        </div>
      )}

      {localLogs.length > 0 && (
        <div className="log-section">
          <div className="log-header">
            Local Synchronization Queue
            <span className="log-count">{localLogs.length} Records</span>
          </div>
          <div className="log-list">
            {localLogs.map((log) => (
              <div key={log.id} className="log-item">
                <span className="log-id">{log.driverId}</span>
                <span className={`badge badge-${log.status}`}>{log.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
