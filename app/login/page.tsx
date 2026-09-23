
"use client";

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock } from 'lucide-react';

function LoginContent() {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Pre-authorized station PINs aligning with middleware.ts
    const validPins = ['1111', '2222', '3333', '9999', 'dev_token'];
    
    if (!validPins.includes(pin)) {
      setError('Invalid station PIN. Access denied.');
      setLoading(false);
      setPin('');
      return;
    }

    // Provision the secure station cookie
    document.cookie = `kitchen_pin=${pin}; path=/; max-age=28800; SameSite=Strict`;
    
    // Deterministic role routing
    setTimeout(() => {
      if (pin === '1111') router.push('/cook');
      else if (pin === '2222') router.push('/dispatch');
      else if (pin === '3333') router.push('/owner');
      else router.push(redirectPath || '/owner');
    }, 500);
  };

  const handleKeypad = (num: string) => {
    if (pin.length < 4) {
      setPin(prev => prev + num);
      setError('');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#050505', color: '#f3f4f6', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: '#0a0a0a', border: '1px solid #1f2937', borderRadius: '16px', padding: '2.5rem', width: '100%', maxWidth: '400px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px', background: '#1e293b', borderRadius: '50%', marginBottom: '1rem', border: '1px solid #334155' }}>
            <Lock size={28} color="#38bdf8" />
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0 0 0.5rem 0', color: '#fff' }}>Dark-Cloud OS</h1>
          <p style={{ color: '#9ca3af', fontSize: '0.875rem', margin: 0 }}>Enter station PIN to authenticate</p>
        </div>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1.5rem' }}>
            <input 
              type="password"
              value={pin}
              readOnly
              style={{ width: '100%', background: '#111827', border: '1px solid #374151', padding: '1rem', borderRadius: '8px', color: '#fff', fontSize: '2rem', textAlign: 'center', letterSpacing: '0.5em', outline: 'none' }}
              placeholder="••••"
            />
          </div>

          {error && (
            <div style={{ background: '#7f1d1d', color: '#fecaca', padding: '0.75rem', borderRadius: '8px', fontSize: '0.875rem', textAlign: 'center', marginBottom: '1.5rem' }}>
              {error}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
              <button 
                key={num}
                type="button"
                onClick={() => handleKeypad(num.toString())}
                style={{ background: '#1f2937', color: '#fff', border: 'none', padding: '1rem', borderRadius: '8px', fontSize: '1.25rem', fontWeight: 'bold', cursor: 'pointer', transition: 'background 0.2s' }}
                onMouseOver={(e) => e.currentTarget.style.background = '#374151'}
                onMouseOut={(e) => e.currentTarget.style.background = '#1f2937'}
              >
                {num}
              </button>
            ))}
            <button 
              type="button"
              onClick={() => setPin('')}
              style={{ background: '#7f1d1d', color: '#fecaca', border: 'none', padding: '1rem', borderRadius: '8px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}
            >
              CLR
            </button>
            <button 
              type="button"
              onClick={() => handleKeypad('0')}
              style={{ background: '#1f2937', color: '#fff', border: 'none', padding: '1rem', borderRadius: '8px', fontSize: '1.25rem', fontWeight: 'bold', cursor: 'pointer' }}
            >
              0
            </button>
            <button 
              type="button"
              onClick={() => setPin(prev => prev.slice(0, -1))}
              style={{ background: '#1f2937', color: '#9ca3af', border: 'none', padding: '1rem', borderRadius: '8px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}
            >
              DEL
            </button>
          </div>

          <button 
            type="submit"
            disabled={loading || pin.length < 4}
            style={{ width: '100%', background: pin.length >= 4 ? '#2563eb' : '#374151', color: '#fff', border: 'none', padding: '1rem', borderRadius: '8px', fontSize: '1rem', fontWeight: 'bold', cursor: pin.length >= 4 ? 'pointer' : 'not-allowed', transition: 'background 0.2s' }}
          >
            {loading ? 'Authenticating...' : 'Access Station'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8' }}>Loading Security Gate...</div>}>
      <LoginContent />
    </Suspense>
  );
}
