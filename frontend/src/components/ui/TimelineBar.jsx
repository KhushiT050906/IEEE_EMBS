import React from 'react';
import { cn } from './Base';

export const TimelineBar = ({ currentDay = 0 }) => {
  const steps = [
    { label: 'Day 0', day: 0 },
    { label: 'Day 10', day: 10 },
    { label: 'Day 20', day: 20 },
    { label: 'Day 30', day: 30 },
  ];

  return (
    <div className="w-full py-8 px-4">
      <div className="relative flex justify-between">
        {/* Progress Line */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 -z-0" />
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 transition-all duration-500 ease-in-out -z-0" 
          style={{ width: `${(Math.min(currentDay, 30) / 30) * 100}%` }}
        />

        {steps.map((step) => {
          const isCompleted = currentDay >= step.day;
          const isCurrent = currentDay === step.day;

          return (
            <div key={step.day} className="relative z-10 flex flex-col items-center">
              <div 
                className={cn(
                  "w-6 h-6 rounded-full border-4 transition-all duration-300",
                  isCompleted 
                    ? "bg-primary border-primary" 
                    : "bg-white border-slate-200 shadow-sm",
                  isCurrent && "scale-125 ring-4 ring-primary/20"
                )}
              />
              <div className="absolute top-8 flex flex-col items-center whitespace-nowrap">
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-wider",
                  isCompleted ? "text-primary" : "text-slate-400"
                )}>
                  {step.label}
                </span>
                {isCurrent && (
                  <span className="text-[10px] bg-primary-light text-primary px-1.5 py-0.5 rounded-full mt-1 font-bold">
                    Today
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
