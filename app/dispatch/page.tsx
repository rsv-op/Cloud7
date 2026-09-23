
"use client";

import React, { useEffect, useState } from 'react';
import { getDB, Order, OrderStatus } from '../lib/db';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';

export default function DispatchStationPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchOrders = async () => {
    try {
      const db = await getDB();
      const tx = db.transaction('orders', 'readonly');
      const store = tx.objectStore('orders');
      const request = store.getAll();
      
      request.onsuccess = () => {
        const allOrders = request.result as Order[];
        const readyOrders = allOrders.filter(o => o.status === 'READY' || o.status === 'DISPATCHED');
        readyOrders.sort((a, b) => b.timestamp - a.timestamp);
        setOrders(readyOrders);
      };
      
      request.onerror = () => setError('Failed to read orders from database.');
    } catch (err: any) {
      setError(err.message || 'Database connection failed.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 3000);
    return () => clearInterval(interval);
  }, []);

  const updateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      const db = await getDB();
      const tx = db.transaction('orders', 'readwrite');
      const store = tx.objectStore('orders');
      const getReq = store.get(orderId);
      
      getReq.onsuccess = () => {
        const order = getReq.result as Order;
        if (order) {
          order.status = newStatus;
          store.put(order);
          fetchOrders();
        }
      };
    } catch (err) {
      console.error('Failed to update order status', err);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#050505', color: '#9ca3af', fontFamily: 'system-ui, sans-serif' }}>
        Initializing Dispatch Pipeline...
      </div>
    );
  }

  return (
    <main style={{ minHeight: '100vh', background: '#050505', color: '#f3f4f6', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ background: '#111827', padding: '1.5rem 2rem', borderBottom: '1px solid #1f2937', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Truck size={28} color="#38bdf8" />
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>Dispatch Station</h1>
        </div>
        <div style={{ background: '#0c4a6e', color: '#bae6fd', padding: '0.5rem 1.25rem', borderRadius: '999px', fontSize: '0.875rem', fontWeight: 'bold', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          {orders.filter(o => o.status === 'READY').length} Awaiting Pickup
        </div>
      </header>

      <div style={{ padding: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {error && (
          <div style={{ gridColumn: '1 / -1', background: '#7f1d1d', color: '#fecaca', padding: '1rem', borderRadius: '8px' }}>
            {error}
          </div>
        )}
        
        {orders.length === 0 && !error && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#6b7280', marginTop: '6rem' }}>
            <CheckCircle size={56} style={{ margin: '0 auto 1.5rem auto', opacity: 0.4 }} />
            <h2 style={{ fontSize: '1.5rem', margin: '0 0 0.5rem 0' }}>Dispatch Clear</h2>
            <p style={{ margin: 0 }}>No orders awaiting courier pickup.</p>
          </div>
        )}

        {orders.map(order => {
          const elapsedMins = Math.floor((Date.now() - order.timestamp) / 60000);
          const isDispatched = order.status === 'DISPATCHED';

          return (
            <div key={order.id} style={{ background: '#111827', border: `1px solid ${isDispatched ? '#064e3b' : '#374151'}`, borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column', opacity: isDispatched ? 0.6 : 1 }}>
              <div style={{ background: isDispatched ? '#022c22' : '#1f2937', padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold', fontSize: '1.1rem', letterSpacing: '0.05em' }}>#{order.id.split('-')[1]}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.875rem', color: '#9ca3af', fontWeight: '600' }}>
                  <Clock size={14} /> {elapsedMins}m
                </span>
              </div>
              
              <div style={{ padding: '1.5rem', flex: 1 }}>
                <div style={{ color: '#38bdf8', fontWeight: '700', marginBottom: '1.25rem', fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {order.brand}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#e5e7eb', marginBottom: '1rem' }}>
                  <Package size={18} className="text-gray-400" />
                  <span style={{ fontWeight: '500' }}>{order.items.length} Items Packed</span>
                </div>
                <div style={{ color: '#9ca3af', fontSize: '0.85rem', background: '#1f2937', padding: '0.5rem', borderRadius: '6px' }}>
                  Channel: <strong>{order.channel}</strong>
                </div>
              </div>

              <div style={{ padding: '1.25rem', borderTop: '1px solid #374151', background: '#0a0a0a' }}>
                {!isDispatched ? (
                  <button 
                    onClick={() => updateOrderStatus(order.id, 'DISPATCHED')}
                    style={{ width: '100%', padding: '0.875rem', background: '#0284c7', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', transition: 'background 0.2s' }}
                    onMouseOver={(e) => e.currentTarget.style.background = '#0369a1'}
                    onMouseOut={(e) => e.currentTarget.style.background = '#0284c7'}
                  >
                    Hand Handoff to Courier
                  </button>
                ) : (
                  <div style={{ width: '100%', padding: '0.875rem', background: '#064e3b', color: '#a7f3d0', borderRadius: '8px', fontWeight: 'bold', fontSize: '1rem', textAlign: 'center' }}>
                    Dispatched
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
