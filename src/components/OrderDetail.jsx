import React, { useState } from 'react';
import { ArrowLeft, Copy, Check, MapPin, CreditCard, ShoppingBag, Truck, User, Mail, Phone } from 'lucide-react';
import StatusChip from './StatusChip';
import VerticalTimeline from './VerticalTimeline';
import { formatINR } from '../data/mockOrders';

export default function OrderDetail({ order, onBack }) {
  const [copied, setCopied] = useState(false);

  if (!order) return null;

  const handleCopyTracking = () => {
    if (order.tracking_number) {
      navigator.clipboard.writeText(order.tracking_number);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const subtotal = order.amount / 1.18; // 18% GST calculation (inclusive)
  const gstTax = order.amount - subtotal;

  return (
    <div className="screen-enter space-y-4 pb-8">
      {/* Top Navigation */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition active:scale-95 shadow-2xs"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Orders</span>
      </button>

      {/* Main Order Overview Card */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Order ID</span>
            <h2 className="text-lg font-extrabold text-slate-900 font-mono tracking-tight">{order.id}</h2>
          </div>
          <StatusChip status={order.status} />
        </div>

        <div className="text-xs text-slate-500 flex items-center gap-2">
          <span>Placed on {new Date(order.placed_at).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          <span>&bull;</span>
          <span>{new Date(order.placed_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
        </div>

        {order.tracking_number && (
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-slate-600 font-medium">
              <Truck className="w-4 h-4 text-orange-600" />
              <span>AWB #: <strong className="font-mono text-slate-900">{order.tracking_number}</strong></span>
            </div>
            <button
              onClick={handleCopyTracking}
              className="flex items-center gap-1 text-[11px] font-bold text-orange-600 hover:text-orange-700 active:scale-95 transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy AWB'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Vertical Status Timeline Component */}
      <VerticalTimeline timeline={order.timeline} />

      {/* Purchased Items Breakdown */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <ShoppingBag className="w-4 h-4 text-orange-600" />
          <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Items Summary ({order.items?.length || 0})</h3>
        </div>

        <div className="divide-y divide-slate-100">
          {order.items?.map((item) => (
            <div key={item.id} className="py-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center overflow-hidden shrink-0 shadow-2xs">
                  {item.image?.startsWith('/') || item.image?.startsWith('http') ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xl">{item.image || '📦'}</span>
                  )}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{item.name}</h4>
                  <p className="text-[11px] text-slate-500 font-medium">Qty: {item.quantity} &bull; {formatINR(item.price)} each</p>
                </div>
              </div>
              <span className="text-xs font-extrabold text-slate-900 font-mono">
                {formatINR(item.quantity * item.price)}
              </span>
            </div>
          ))}
        </div>

        {/* Pricing Summary (INR / GST Breakdown) */}
        <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
          <div className="flex justify-between">
            <span>Item Subtotal</span>
            <span className="font-medium text-slate-800 font-mono">{formatINR(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Charge</span>
            <span className="font-medium text-emerald-600 font-semibold">FREE (Express Delivery)</span>
          </div>
          <div className="flex justify-between">
            <span>GST (18%)</span>
            <span className="font-medium text-slate-800 font-mono">{formatINR(gstTax)}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-slate-100 text-sm font-extrabold text-slate-900">
            <span>Total Paid (INR)</span>
            <span className="text-orange-600 font-mono">{formatINR(order.amount)}</span>
          </div>
        </div>
      </div>

      {/* Customer & Delivery Address */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-2xs space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <User className="w-4 h-4 text-orange-600" />
          <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Customer & Delivery Address</h3>
        </div>

        <div className="space-y-2 text-xs text-slate-600">
          <div className="flex items-start gap-2">
            <User className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
            <span className="font-bold text-slate-900">{order.customer?.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{order.customer?.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{order.customer?.phone}</span>
          </div>
          <div className="flex items-start gap-2 pt-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
            <span className="leading-tight font-medium text-slate-800">{order.customer?.address}</span>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-600">
          <CreditCard className="w-4 h-4 text-slate-400" />
          <span>Payment Mode: <strong className="font-semibold text-slate-900">{order.payment_method}</strong></span>
        </div>
      </div>
    </div>
  );
}
