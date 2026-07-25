import React from 'react';
import { Check, Clock, AlertTriangle, PackageCheck } from 'lucide-react';

export default function VerticalTimeline({ timeline = [] }) {
  if (!timeline || timeline.length === 0) return null;

  // Calculate progress height percentage
  const completedCount = timeline.filter(t => t.completed).length;
  const progressPercent = timeline.length <= 1
    ? 0
    : Math.min(100, Math.max(0, ((completedCount - 0.5) / (timeline.length - 1)) * 100));

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 my-4">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
        <PackageCheck className="w-5 h-5 text-blue-600" />
        <h3 className="font-bold text-slate-900 text-sm tracking-wide uppercase">Shipment Status Timeline</h3>
      </div>

      <div className="timeline-container">
        {/* Background Line */}
        <div className="timeline-line"></div>

        {/* Animated Progress Fill */}
        <div
          className="timeline-progress"
          style={{ height: `${progressPercent}%` }}
        ></div>

        {timeline.map((step, idx) => {
          let dotState = 'pending';
          if (step.failed) {
            dotState = 'failed';
          } else if (step.current) {
            dotState = 'current';
          } else if (step.completed) {
            dotState = 'completed';
          }

          return (
            <div key={idx} className="timeline-item">
              {/* Timeline Dot Icon */}
              <div className={`timeline-dot ${dotState}`}>
                {step.failed ? (
                  <AlertTriangle className="w-3.5 h-3.5" />
                ) : step.completed && !step.current ? (
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                ) : step.current ? (
                  <Clock className="w-3.5 h-3.5 animate-pulse" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                )}
              </div>

              {/* Step Content Card */}
              <div className={`pl-2 transition-all duration-200 ${step.current ? 'opacity-100' : step.completed ? 'opacity-90' : 'opacity-50'}`}>
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-bold ${step.failed ? 'text-rose-600' : step.current ? 'text-blue-600' : 'text-slate-900'}`}>
                    {step.status}
                  </span>
                  {step.timestamp && (
                    <span className="text-[11px] font-medium text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md">
                      {new Date(step.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {step.description}
                </p>

                {step.timestamp && (
                  <span className="text-[10px] text-slate-400 block mt-1">
                    {new Date(step.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
