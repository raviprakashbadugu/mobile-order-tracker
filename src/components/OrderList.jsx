import React, { useState } from 'react';
import { RefreshCw, Search, Package, AlertCircle, ArrowUpRight, ChevronRight } from 'lucide-react';
import StatusChip from './StatusChip';
import { formatINR } from '../data/mockOrders';

export default function OrderList({ 
  orders = [], 
  isLoading, 
  error, 
  onSelectOrder, 
  onRefresh, 
  isRefreshing,
  onClearFilters
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer?.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items?.some(i => i.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = selectedStatus === 'all' || order.status.toLowerCase() === selectedStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const statusCategories = ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'];

  return (
    <div className="space-y-4 pb-6">
      {/* Header Banner / Controls */}
      <div className="flex items-center justify-between px-1 pt-1">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Live Orders (India)</h2>
          <p className="text-xs text-slate-500 font-medium">Track delivery across Indian hubs</p>
        </div>

        {/* Manual Pull-to-Refresh Action Button */}
        <button
          onClick={onRefresh}
          disabled={isLoading || isRefreshing}
          className={`flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 text-orange-600 hover:bg-orange-100 active:scale-95 rounded-full text-xs font-semibold transition ${
            isRefreshing ? 'opacity-75 cursor-not-allowed' : ''
          }`}
          title="Pull to Refresh"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'spinner' : ''}`} />
          <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
        </button>
      </div>

      {/* Pull-to-Refresh Banner when active */}
      {isRefreshing && (
        <div className="pull-refresh-container bg-orange-50/80 rounded-xl py-2 px-3 text-xs border border-orange-100 text-orange-800">
          <RefreshCw className="w-4 h-4 spinner text-orange-600" />
          <span>Syncing latest orders with Indian logistics servers...</span>
        </div>
      )}

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search by Order ID, name, city (e.g. Bengaluru, Mumbai)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-8 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition shadow-2xs"
        />
        {searchTerm && (
          <button 
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
        )}
      </div>

      {/* Filter Status Horizontal Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        {statusCategories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedStatus(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-all ${
              selectedStatus === cat
                ? 'bg-slate-900 text-white shadow-xs scale-102'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* LOADING STATE (Skeleton Cards) */}
      {isLoading && !isRefreshing && (
        <div className="space-y-3">
          {[1, 2, 3, 4].map(n => (
            <div key={n} className="bg-white rounded-2xl p-4 border border-slate-100 space-y-3 shadow-2xs">
              <div className="flex justify-between items-center">
                <div className="w-28 h-4 skeleton"></div>
                <div className="w-16 h-5 skeleton rounded-full"></div>
              </div>
              <div className="w-44 h-3 skeleton"></div>
              <div className="flex justify-between items-center pt-2">
                <div className="w-20 h-4 skeleton"></div>
                <div className="w-12 h-3 skeleton"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ERROR STATE */}
      {error && !isLoading && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 text-center my-4 space-y-3 shadow-sm">
          <div className="w-10 h-10 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-rose-950 text-sm">Failed to Load Indian Orders</h3>
            <p className="text-xs text-rose-700 mt-1">{error}</p>
          </div>
          <button
            onClick={onRefresh}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition shadow-xs active:scale-95"
          >
            Retry API Request
          </button>
        </div>
      )}

      {/* EMPTY STATE */}
      {!isLoading && !error && filteredOrders.length === 0 && (
        <div className="bg-white border border-slate-100 rounded-2xl p-8 text-center my-4 space-y-3 shadow-2xs">
          <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">No Orders Found</h3>
            <p className="text-xs text-slate-500 mt-1">
              {searchTerm || selectedStatus !== 'all' 
                ? 'No matching orders found with current filters.' 
                : 'Your order history is currently empty.'}
            </p>
          </div>
          {(searchTerm || selectedStatus !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedStatus('all');
              }}
              className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition"
            >
              Clear Filters
            </button>
          )}
        </div>
      )}

      {/* LIST OF ORDERS */}
      {!isLoading && !error && filteredOrders.length > 0 && (
        <div className="space-y-3">
          {filteredOrders.map((order, index) => (
            <div
              key={order.id}
              onClick={() => onSelectOrder(order)}
              style={{ animationDelay: `${index * 60}ms` }}
              className="order-card bg-white rounded-2xl p-4 border border-slate-100 shadow-2xs hover:shadow-md hover:border-orange-200 cursor-pointer transition group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold text-slate-800 tracking-tight flex items-center gap-1">
                  {order.id}
                  <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-orange-600 transition" />
                </span>
                <StatusChip status={order.status} />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-600">
                <span className="font-semibold text-slate-900 truncate max-w-[200px]">
                  {order.customer?.name}
                </span>
                <span className="font-extrabold text-slate-900 text-sm font-mono">
                  {formatINR(order.amount)}
                </span>
              </div>

              <div className="mt-2.5 pt-2.5 border-t border-slate-50 flex items-center justify-between text-[11px] text-slate-500">
                <div className="flex items-center gap-1.5">
                  <span className="text-base">{order.items?.[0]?.image || '📦'}</span>
                  <span className="truncate max-w-[170px] font-medium text-slate-700">
                    {order.items?.[0]?.name}
                    {order.items?.length > 1 && ` +${order.items.length - 1} more`}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-orange-600 font-semibold group-hover:translate-x-0.5 transition">
                  <span>Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
