
// File: app/error.tsx
"use client";

import React, { useEffect } from 'react';

/**
 * Cloud7 Global Error Boundary
 * Architecture: Next.js App Router | Client Component
 * Role: Traps fatal React hydration faults and outputs mobile-readable telemetry.
 */

export default function GlobalErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Silently log to console if a desktop environment ever connects
    console.error('Cloud7 Edge Exception:', error);
  }, [error]);

  return (
    <div style={{ 
      padding: '2rem', 
      backgroundColor: '#0b132b', 
      color: '#f8fafc', 
      minHeight: '100vh', 
      fontFamily: 'monospace',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <div style={{ borderLeft: '4px solid #ef4444', paddingLeft: '1.5rem' }}>
        <h1 style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '1.5rem', textTransform: 'uppercase' }}>
          Fatal Architectural Exception
        </h1>
        
        <div style={{ backgroundColor: '#1e293b', padding: '1.5rem', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
          <p style={{ fontWeight: 'bold', marginBottom: '0.75rem', color: '#94a3b8' }}>Diagnostic Telemetry:</p>
          <p style={{ color: '#38bdf8', wordBreak: 'break-all', fontSize: '1.125rem', lineHeight: '1.5' }}>
            {error.message || "Unknown React Hydration Fault"}
          </p>
          
          {error.stack && (
            <pre style={{ 
              marginTop: '1.5rem', 
              fontSize: '0.75rem', 
              whiteSpace: 'pre-wrap', 
              color: '#64748b',
              backgroundColor: '#080e21',
              padding: '1rem',
              borderRadius: '4px',
              overflowX: 'auto'
            }}>
              {error.stack}
            </pre>
          )}
        </div>

        <button 
          onClick={() => reset()} 
          style={{ 
            marginTop: '2rem', 
            padding: '1rem 2rem', 
            backgroundColor: '#38bdf8', 
            border: 'none', 
            color: '#000', 
            fontWeight: 'bold', 
            borderRadius: '4px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            width: '100%'
          }}
        >
          Initialize Reboot Sequence
        </button>
      </div>
    </div>
  );
}
