
"use client";

import React, { useEffect, useState } from 'react';
import { 
  Home, BarChart2, Users, Package, ShoppingCart, 
  CreditCard, Settings, Search, Moon, Bell, Menu, 
  MoreHorizontal, ChevronDown, Activity, AlertTriangle
} from 'lucide-react';
import { getDB, Order } from '../lib/db';
import OrderSimulationPanel from '../components/OrderSimulationPanel';

export default function OwnerDashboard() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTelemetry = async () => {
    try {
      const db = await getDB();
      const tx = db.transaction('orders', 'readonly');
      const store = tx.objectStore('orders');
      const request = store.getAll();
      
      request.onsuccess = () => {
        const allOrders = request.result as Order[];
        allOrders.sort((a, b) => b.timestamp - a.timestamp); // Newest first
        setOrders(allOrders);
      };
      
      request.onerror = () => setError('Database read failure.');
    } catch (err: any) {
      setError(err.message || 'IndexedDB connection failed.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 2000);
    return () => clearInterval(interval);
  }, []);

  // Calculate live metrics
  const totalRevenue = orders.length * 24.50; // Mock $24.50 avg order value
  const activeTickets = orders.filter(o => o.status === 'PENDING' || o.status === 'PREPARING').length;
  const completedOrders = orders.filter(o => o.status === 'DISPATCHED' || o.status === 'READY').length;

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-gray-300 font-sans overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-800 flex flex-col overflow-y-auto hide-scrollbar shrink-0">
        <div className="p-4 flex items-center gap-3 border-b border-gray-800 h-16 shrink-0">
          <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center font-bold text-white">
            DK
          </div>
          <span className="text-white font-semibold text-lg tracking-wide">Dark-Cloud OS</span>
        </div>

        <nav className="p-4 flex-1 space-y-6">
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Facility Overview</h3>
            <ul className="space-y-1">
              <li>
                <a href="#" className="flex items-center justify-between px-3 py-2 bg-gray-900 text-white rounded-md">
                  <div className="flex items-center gap-3">
                    <Home size={18} />
                    <span>Command Center</span>
                  </div>
                  <span className="bg-purple-900/50 text-purple-400 text-xs py-0.5 px-2 rounded-full">Live</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 px-3 py-2 hover:bg-gray-900/50 rounded-md transition-colors">
                  <BarChart2 size={18} />
                  <span>Financial Ledger</span>
                </a>
              </li>
              <li>
                <a href="/cook" className="flex items-center gap-3 px-3 py-2 hover:bg-gray-900/50 rounded-md transition-colors text-emerald-400">
                  <Activity size={18} />
                  <span>View Cook Station</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Brand Matrix</h3>
            <ul className="space-y-1">
              <li>
                <a href="#" className="flex items-center justify-between px-3 py-2 hover:bg-gray-900/50 rounded-md transition-colors">
                  <div className="flex items-center gap-3">
                    <Package size={18} />
                    <span>Inventory Sync</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-between px-3 py-2 hover:bg-gray-900/50 rounded-md transition-colors">
                  <div className="flex items-center gap-3">
                    <ShoppingCart size={18} />
                    <span>All Orders</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <span className="bg-blue-900/50 text-blue-400 text-xs py-0.5 px-2 rounded-full">{orders.length}</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-800 space-y-1">
          <a href="#" className="flex items-center gap-3 px-3 py-2 hover:bg-gray-900/50 rounded-md transition-colors">
            <Settings size={18} />
            <span>Facility Settings</span>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-gray-800 flex items-center justify-between px-6 shrink-0 relative">
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-white lg:hidden">
              <Menu size={20} />
            </button>
            <div className="flex bg-gray-900/50 rounded-lg border border-gray-800 p-1">
               <button className="px-4 py-1.5 text-sm rounded bg-gray-800 text-white shadow-sm">Owner Triage</button>
               <button className="px-4 py-1.5 text-sm text-gray-400 hover:text-white">Global Metrics</button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-white"><Search size={20} /></button>
            <button className="text-gray-400 hover:text-white"><Moon size={20} /></button>
            <div className="relative">
              <button className="text-gray-400 hover:text-white"><Bell size={20} /></button>
              {activeTickets > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold border-2 border-[#0a0a0a]">
                  {activeTickets}
                </span>
              )}
            </div>
            
            <div className="relative ml-2">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-8 h-8 bg-purple-600 rounded-full border-2 border-gray-700 overflow-hidden flex items-center justify-center text-white text-xs font-bold"
              >
                DK
              </button>
              
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#111] border border-gray-800 rounded-lg shadow-xl py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-800">
                    <p className="text-sm font-semibold text-white">Owner Access</p>
                  </div>
                  <button className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-800">
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 hide-scrollbar">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">Facility Command Center</h1>
              <p className="text-sm text-gray-400">Live multi-brand telemetry and dispatch tracking.</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors">
                Export Ledger
              </button>
            </div>
          </div>

          {/* Stats Grid - Matching the screenshot aesthetic */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <div className="bg-[#111] border border-gray-800 rounded-xl p-5">
              <div className="flex justify-between items-start mb-4">
                <CreditCard className="text-gray-400" size={20} />
                <span className="flex items-center text-emerald-500 text-xs font-medium bg-emerald-500/10 px-2 py-1 rounded">
                  <BarChart2 size={12} className="mr-1" /> +12.5%
                </span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-1">${totalRevenue.toLocaleString(undefined, {minimumFractionDigits: 2})}</h2>
              <p className="text-gray-400 text-sm mb-1">Total Gross Revenue</p>
              <p className="text-gray-600 text-xs">Today's metrics</p>
            </div>

            <div className="bg-[#111] border border-gray-800 rounded-xl p-5">
              <div className="flex justify-between items-start mb-4">
                <ShoppingCart className="text-gray-400" size={20} />
                <span className="flex items-center text-emerald-500 text-xs font-medium bg-emerald-500/10 px-2 py-1 rounded">
                  <BarChart2 size={12} className="mr-1" /> +8.2%
                </span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-1">{orders.length}</h2>
              <p className="text-gray-400 text-sm mb-1">Total Dispatch Volume</p>
              <p className="text-gray-600 text-xs">Across all brands</p>
            </div>

            <div className="bg-[#111] border border-gray-800 rounded-xl p-5">
              <div className="flex justify-between items-start mb-4">
                <Activity className="text-gray-400" size={20} />
                <span className="flex items-center text-orange-500 text-xs font-medium bg-orange-500/10 px-2 py-1 rounded">
                  Live Queue
                </span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-1">{activeTickets}</h2>
              <p className="text-gray-400 text-sm mb-1">Active Kitchen Tickets</p>
              <p className="text-gray-600 text-xs">Pending or Preparing</p>
            </div>
          </div>

          <div className="mb-8">
            <OrderSimulationPanel />
          </div>

          {/* Recent Orders Section (Replacing Recent Comments) */}
          <div className="mb-6 flex items-center justify-between">
             <h2 className="text-xl font-bold text-white">Live Order Feed</h2>
             <button className="text-sm text-gray-400 hover:text-white">View all history</button>
          </div>

          <div className="space-y-4">
             {loading ? (
               <div className="text-gray-500 text-center py-8">Syncing edge data...</div>
             ) : orders.length === 0 ? (
               <div className="bg-[#111] border border-gray-800 rounded-xl p-8 text-center text-gray-500">
                 No orders in the system. Use the injector above to simulate traffic.
               </div>
             ) : (
               orders.slice(0, 5).map((order) => (
                 <div key={order.id} className={`bg-[#111] border rounded-xl p-5 ${order.status === 'PENDING' ? 'border-orange-900/30' : 'border-gray-800'}`}>
                    <div className="flex items-center justify-between mb-3">
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-400">
                            {order.brand.charAt(0)}
                          </div>
                          <span className="font-medium text-white">{order.id}</span>
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full 
                            ${order.status === 'COMPLETED' || order.status === 'DISPATCHED' ? 'text-emerald-500 bg-emerald-500/10' : 
                              order.status === 'READY' ? 'text-blue-400 bg-blue-500/10' : 
                              'text-orange-400 bg-orange-500/10'}`}>
                            {order.status.toLowerCase()}
                          </span>
                       </div>
                       <button className="text-gray-500 hover:text-white"><MoreHorizontal size={18} /></button>
                    </div>
                    <p className="text-gray-300 text-sm mb-4">
                      {order.items.map(i => `${i.qty}x ${i.name}`).join(', ')}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                       <span className="text-purple-400 font-medium">{order.brand}</span>
                       <span>• {Math.floor((Date.now() - order.timestamp) / 60000)} minutes ago via {order.channel}</span>
                    </div>
                 </div>
               ))
             )}
          </div>

        </div>
      </main>
    </div>
  );
}
