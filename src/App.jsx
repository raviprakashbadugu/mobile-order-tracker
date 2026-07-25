import React, { useState, useEffect } from 'react';
import { fetchOrders } from './data/mockOrders';
import OrderList from './components/OrderList';
import OrderDetail from './components/OrderDetail';
import OfflineBanner from './components/OfflineBanner';
import FooterCredit from './components/FooterCredit';
import { Wifi, WifiOff, AlertTriangle, PackageX, Sparkles } from 'lucide-react';
import './styles.css';

export default function App() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [fromCache, setFromCache] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  // Simulation Controls for Testing Task A & B Requirements
  const [simulatedOffline, setSimulatedOffline] = useState(false);
  const [forceError, setForceError] = useState(false);
  const [simulateEmpty, setSimulateEmpty] = useState(false);

  // Listen to browser network changes
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Initial Fetch & Refresh
  const loadOrderData = async ({ refresh = false } = {}) => {
    if (refresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setError(null);

    const effectiveOffline = isOffline || simulatedOffline;

    if (effectiveOffline) {
      // Simulate offline handling
      const cached = localStorage.getItem('digital_heroes_order_cache_inr');
      if (cached) {
        setOrders(JSON.parse(cached));
        setFromCache(true);
        setError(null);
      } else {
        setError('Network Unavailable: Device is offline and no cached orders were found.');
      }
      setIsLoading(false);
      setIsRefreshing(false);
      return;
    }

    try {
      const res = await fetchOrders({ forceError, simulateEmpty, delayMs: refresh ? 1000 : 700 });
      setOrders(res.data);
      setFromCache(res.fromCache);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [simulatedOffline, forceError, simulateEmpty]);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* Simulation Toolbar for Testing edge cases */}
      <div className="mb-4 p-3 bg-slate-900 text-white rounded-2xl max-w-md w-full shadow-lg border border-slate-800 text-xs">
        <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-800">
          <span className="font-bold flex items-center gap-1.5 text-orange-400">
            <Sparkles className="w-4 h-4" /> Demo Edge Case Tester (India)
          </span>
          <span className="text-[10px] text-slate-400 font-mono">TASK A & B DEMO</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setSimulatedOffline(!simulatedOffline)}
            className={`px-2 py-1.5 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1 transition ${
              simulatedOffline ? 'bg-amber-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            {simulatedOffline ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
            {simulatedOffline ? 'Offline Mode' : 'Online Mode'}
          </button>

          <button
            onClick={() => setForceError(!forceError)}
            className={`px-2 py-1.5 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1 transition ${
              forceError ? 'bg-rose-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            {forceError ? 'API Error ON' : 'Trigger Error'}
          </button>

          <button
            onClick={() => setSimulateEmpty(!simulateEmpty)}
            className={`px-2 py-1.5 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1 transition ${
              simulateEmpty ? 'bg-indigo-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            <PackageX className="w-3.5 h-3.5" />
            {simulateEmpty ? 'Empty ON' : 'Trigger Empty'}
          </button>
        </div>
      </div>

      {/* Main Device Emulator Container */}
      <div className="device-container">
        {/* Hardware Notch */}
        <div className="device-notch">
          <div className="device-speaker"></div>
          <div className="device-camera"></div>
        </div>

        {/* Sticky App Header Bar */}
        <header className="app-header flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-600 text-white rounded-xl flex items-center justify-center font-extrabold text-sm shadow-xs">
              ₹
            </div>
            <div>
              <h1 className="font-extrabold text-slate-900 text-sm leading-none">Order Tracker</h1>
              <span className="text-[10px] text-slate-500 font-medium">Digital Heroes Express (India)</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 bg-slate-100 rounded-full text-slate-700">
            {simulatedOffline || isOffline ? (
              <span className="flex items-center gap-1 text-amber-600">
                <WifiOff className="w-3 h-3" /> Offline
              </span>
            ) : (
              <span className="flex items-center gap-1 text-emerald-600">
                <Wifi className="w-3 h-3" /> Live (INR)
              </span>
            )}
          </div>
        </header>

        {/* Offline Banner when network/offline state is triggered */}
        <OfflineBanner 
          isOffline={isOffline || simulatedOffline} 
          fromCache={fromCache} 
          onRetry={() => loadOrderData({ refresh: true })} 
        />

        {/* Main Scrollable Viewport */}
        <main className="app-content">
          {selectedOrder ? (
            <OrderDetail 
              order={selectedOrder} 
              onBack={() => setSelectedOrder(null)} 
            />
          ) : (
            <OrderList
              orders={orders}
              isLoading={isLoading}
              error={error}
              onSelectOrder={(ord) => setSelectedOrder(ord)}
              onRefresh={() => loadOrderData({ refresh: true })}
              isRefreshing={isRefreshing}
              onClearFilters={() => {
                setForceError(false);
                setSimulateEmpty(false);
                setSimulatedOffline(false);
              }}
            />
          )}
        </main>

        {/* Required Digital Heroes Footer Credit */}
        <FooterCredit />
      </div>
    </div>
  );
}
