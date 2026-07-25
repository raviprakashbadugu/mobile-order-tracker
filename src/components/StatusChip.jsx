import React from 'react';
import { getOrderStatusColor } from '../data/mockOrders';

export default function StatusChip({ status }) {
  const style = getOrderStatusColor(status);

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${style.bg} ${style.text} ${style.border}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`}></span>
      {style.label}
    </span>
  );
}
