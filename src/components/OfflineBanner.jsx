import React from 'react';
import { WifiOff, Database } from 'lucide-react';

export default function OfflineBanner({ isOffline, fromCache, onRetry }) {
  if (!isOffline && !fromCache) return null;

  return (
    <div className={`mx-4 mt-3 mb-1 p-3 rounded-xl border flex items-center justify-between text-xs font-medium ${
      isOffline 
        ? 'bg-amber-50 border-amber-200 text-amber-900' 
        : 'bg-blue-50 border-blue-200 text-blue-900'
    }`}>
      <div className="flex items-center gap-2">
        {isOffline ? (
          <WifiOff className="w-4 h-4 text-amber-600 shrink-0" />
        ) : (
          <Database className="w-4 h-4 text-blue-600 shrink-0" />
        )}
        <div>
          <span className="font-bold">
            {isOffline ? 'Offline Mode' : 'Cached Data'}
          </span>
          <p className="text-[11px] opacity-80 leading-tight">
            {isOffline 
              ? 'Showing saved offline snapshot. Reconnect to refresh.' 
              : 'Serving instant cached view.'}
          </p>
        </div>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg shadow-2xs hover:bg-slate-50 text-slate-700 text-[11px] font-semibold transition"
        >
          Sync
        </button>
      )}
    </div>
  );
}
