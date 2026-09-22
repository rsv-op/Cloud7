
"use client";

import React, { useState } from 'react';
import { 
  Home, BarChart2, Users, Folder, Package, ShoppingCart, 
  UserCircle, CreditCard, FileText, DollarSign, Settings, 
  HelpCircle, Search, Moon, Bell, Menu, MoreHorizontal, ChevronDown 
} from 'lucide-react';

export default function CMSDashboardPage() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-gray-300 font-sans overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-800 flex flex-col overflow-y-auto">
        <div className="p-4 flex items-center gap-3 border-b border-gray-800 h-16 shrink-0">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-white">
            Z
          </div>
          <span className="text-white font-semibold text-lg tracking-wide">CMSFullForm</span>
        </div>

        <nav className="p-4 flex-1 space-y-6">
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Overview</h3>
            <ul className="space-y-1">
              <li>
                <a href="#" className="flex items-center justify-between px-3 py-2 bg-gray-900 text-white rounded-md">
                  <div className="flex items-center gap-3">
                    <Home size={18} />
                    <span>Dashboard</span>
                  </div>
                  <span className="bg-blue-900/50 text-blue-400 text-xs py-0.5 px-2 rounded-full">3</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 px-3 py-2 hover:bg-gray-900/50 rounded-md transition-colors">
                  <BarChart2 size={18} />
                  <span>Analytics</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 px-3 py-2 hover:bg-gray-900/50 rounded-md transition-colors">
                  <Users size={18} />
                  <span>Organization</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-between px-3 py-2 hover:bg-gray-900/50 rounded-md transition-colors">
                  <div className="flex items-center gap-3">
                    <Folder size={18} />
                    <span>Projects</span>
                  </div>
                  <span className="bg-blue-900/50 text-blue-400 text-xs py-0.5 px-2 rounded-full">12</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">E-Commerce</h3>
            <ul className="space-y-1">
              <li>
                <a href="#" className="flex items-center justify-between px-3 py-2 hover:bg-gray-900/50 rounded-md transition-colors">
                  <div className="flex items-center gap-3">
                    <Package size={18} />
                    <span>Products</span>
                  </div>
                  <ChevronDown size={14} className="text-gray-500" />
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-between px-3 py-2 hover:bg-gray-900/50 rounded-md transition-colors">
                  <div className="flex items-center gap-3">
                    <ShoppingCart size={18} />
                    <span>Orders</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <span className="bg-blue-900/50 text-blue-400 text-xs py-0.5 px-2 rounded-full">5</span>
                     <ChevronDown size={14} className="text-gray-500" />
                  </div>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-between px-3 py-2 hover:bg-gray-900/50 rounded-md transition-colors">
                  <div className="flex items-center gap-3">
                    <UserCircle size={18} />
                    <span>Customers</span>
                  </div>
                  <ChevronDown size={14} className="text-gray-500" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Finance</h3>
            <ul className="space-y-1">
              <li>
                <a href="#" className="flex items-center justify-between px-3 py-2 hover:bg-gray-900/50 rounded-md transition-colors">
                  <div className="flex items-center gap-3">
                    <CreditCard size={18} />
                    <span>Transactions</span>
                  </div>
                  <ChevronDown size={14} className="text-gray-500" />
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-between px-3 py-2 hover:bg-gray-900/50 rounded-md transition-colors">
                  <div className="flex items-center gap-3">
                    <FileText size={18} />
                    <span>Invoices</span>
                  </div>
                  <span className="bg-blue-900/50 text-blue-400 text-xs py-0.5 px-2 rounded-full">2</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-between px-3 py-2 hover:bg-gray-900/50 rounded-md transition-colors">
                  <div className="flex items-center gap-3">
                    <DollarSign size={18} />
                    <span>Payments</span>
                  </div>
                  <ChevronDown size={14} className="text-gray-500" />
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-800 space-y-1">
          <a href="#" className="flex items-center gap-3 px-3 py-2 hover:bg-gray-900/50 rounded-md transition-colors">
            <Settings size={18} />
            <span>Settings</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 hover:bg-gray-900/50 rounded-md transition-colors">
            <HelpCircle size={18} />
            <span>Help</span>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-gray-800 flex items-center justify-between px-6 shrink-0 relative">
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-white lg:hidden">
              <Menu size={20} />
            </button>
            <div className="flex bg-gray-900/50 rounded-lg border border-gray-800 p-1">
               <button className="px-4 py-1.5 text-sm rounded bg-gray-800 text-white shadow-sm">Politics</button>
               <button className="px-4 py-1.5 text-sm text-gray-400 hover:text-white">Political analysis</button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-white"><Search size={20} /></button>
            <button className="text-gray-400 hover:text-white"><Moon size={20} /></button>
            <div className="relative">
              <button className="text-gray-400 hover:text-white"><Bell size={20} /></button>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold border-2 border-[#0a0a0a]">3</span>
            </div>
            <button className="text-gray-400 hover:text-white"><Settings size={20} /></button>
            
            <div className="relative ml-2">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-8 h-8 bg-gray-300 rounded-full border-2 border-gray-700 overflow-hidden focus:outline-none focus:border-gray-500"
              />
              
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#111] border border-gray-800 rounded-lg shadow-xl py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-800">
                    <p className="text-sm font-semibold text-white">My Account</p>
                  </div>
                  <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white">
                    <UserCircle size={16} /> Profile
                  </a>
                  <a href="#" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white">
                    <Settings size={16} /> Settings
                  </a>
                  <div className="border-t border-gray-800 my-1"></div>
                  <button className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-800">
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">CMS Full Form .com</h1>
              <p className="text-sm text-gray-400">Forks & Likes this Project, and download Full Templates at CMSFullForm.com</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors">
                New Article
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border border-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">
                Import Content
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-8">
            <div className="bg-[#111] border border-gray-800 rounded-xl p-5">
              <div className="flex justify-between items-start mb-4">
                <FileText className="text-gray-400" size={20} />
                <span className="flex items-center text-emerald-500 text-xs font-medium bg-emerald-500/10 px-2 py-1 rounded">
                  <BarChart2 size={12} className="mr-1" /> +12.5%
                </span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-1">1,247</h2>
              <p className="text-gray-400 text-sm mb-1">Total Articles</p>
              <p className="text-gray-600 text-xs">Published articles</p>
            </div>

            <div className="bg-[#111] border border-gray-800 rounded-xl p-5">
              <div className="flex justify-between items-start mb-4">
                <Users className="text-gray-400" size={20} />
                <span className="flex items-center text-emerald-500 text-xs font-medium bg-emerald-500/10 px-2 py-1 rounded">
                  <BarChart2 size={12} className="mr-1" /> +23.1%
                </span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-1">89.2K</h2>
              <p className="text-gray-400 text-sm mb-1">Page Views</p>
              <p className="text-gray-600 text-xs">This month</p>
            </div>

            <div className="bg-[#111] border border-gray-800 rounded-xl p-5">
              <div className="flex justify-between items-start mb-4">
                <Menu className="text-gray-400" size={20} />
                <span className="flex items-center text-emerald-500 text-xs font-medium bg-emerald-500/10 px-2 py-1 rounded">
                  <BarChart2 size={12} className="mr-1" /> +8.2%
                </span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-1">2,847</h2>
              <p className="text-gray-400 text-sm mb-1">Comments</p>
              <p className="text-gray-600 text-xs">User engagement</p>
            </div>

            <div className="bg-[#111] border border-gray-800 rounded-xl p-5">
              <div className="flex justify-between items-start mb-4">
                <UserCircle className="text-gray-400" size={20} />
                <span className="flex items-center text-red-500 text-xs font-medium bg-red-500/10 px-2 py-1 rounded">
                  <BarChart2 size={12} className="mr-1" /> -2.1%
                </span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-1">24</h2>
              <p className="text-gray-400 text-sm mb-1">Authors</p>
              <p className="text-gray-600 text-xs">Active writers</p>
            </div>
            
            <div className="bg-[#111] border border-gray-800 rounded-xl p-5">
              <div className="flex justify-between items-start mb-4">
                <Folder className="text-gray-400" size={20} />
                <span className="flex items-center text-emerald-500 text-xs font-medium bg-emerald-500/10 px-2 py-1 rounded">
                  <BarChart2 size={12} className="mr-1" /> +5.3%
                </span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-1">18</h2>
              <p className="text-gray-400 text-sm mb-1">Scheduled Posts</p>
              <p className="text-gray-600 text-xs">Upcoming content</p>
            </div>

            <div className="bg-[#111] border border-gray-800 rounded-xl p-5">
              <div className="flex justify-between items-start mb-4">
                <Package className="text-gray-400" size={20} />
                <span className="flex items-center text-emerald-500 text-xs font-medium bg-emerald-500/10 px-2 py-1 rounded">
                  <BarChart2 size={12} className="mr-1" /> +15.7%
                </span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-1">3,456</h2>
              <p className="text-gray-400 text-sm mb-1">Media Files</p>
              <p className="text-gray-600 text-xs">Images & videos</p>
            </div>
          </div>

          <div className="mb-6 flex items-center justify-between">
             <h2 className="text-xl font-bold text-white">Recent Comments</h2>
             <button className="text-sm text-gray-400 hover:text-white">Moderate all</button>
          </div>

          <div className="space-y-4">
             <div className="bg-[#111] border border-gray-800 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-300" />
                      <span className="font-medium text-white">John Smith</span>
                      <span className="px-2 py-0.5 text-xs font-medium text-emerald-500 bg-emerald-500/10 rounded-full">approved</span>
                   </div>
                   <button className="text-gray-500 hover:text-white"><MoreHorizontal size={18} /></button>
                </div>
                <p className="text-gray-300 text-sm mb-4">Great article! This really helped me understand the concept better.</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                   <span>on &quot;The Future of AI in Healthcare&quot;</span>
                   <span>• 2 minutes ago</span>
                </div>
             </div>

             <div className="bg-[#111] border border-orange-900/30 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-300" />
                      <span className="font-medium text-white">Sarah Wilson</span>
                      <span className="px-2 py-0.5 text-xs font-medium text-orange-400 bg-orange-500/10 rounded-full">pending</span>
                   </div>
                   <button className="text-gray-500 hover:text-white"><MoreHorizontal size={18} /></button>
                </div>
                <p className="text-gray-300 text-sm mb-4">I disagree with some points mentioned here. The data seems...</p>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-gray-500 mb-4">
                   <span>on &quot;Global Economic Trends 2024&quot;</span>
                   <span>• 15 minutes ago</span>
                </div>
                <div className="flex items-center gap-4">
                   <button className="text-emerald-500 text-sm font-medium hover:text-emerald-400 transition-colors">Approve</button>
                   <button className="text-red-500 text-sm font-medium hover:text-red-400 transition-colors">Reject</button>
                </div>
             </div>
          </div>

        </div>
      </main>
    </div>
  );
}
