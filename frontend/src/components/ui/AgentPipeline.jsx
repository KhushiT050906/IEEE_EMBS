import React from 'react';
import { motion } from 'framer-motion';
import { ScanSearch, Binary, ShieldCheck, HeartPulse } from 'lucide-react';
import { cn } from './Base';

const agents = [
  { id: 'vision', name: 'Vision Model', icon: ScanSearch, desc: 'Analyzing skin image' },
  { id: 'specialist', name: 'Specialist Agent', icon: Binary, desc: 'Identifying condition' },
  { id: 'safety', name: 'Safety Agent', icon: ShieldCheck, desc: 'Checking contraindications' },
  { id: 'lifestyle', name: 'Lifestyle Agent', icon: HeartPulse, desc: 'Generating 30-day plan' },
];

export const AgentPipeline = ({ activeAgentId = 'vision' }) => {
  const activeIndex = agents.findIndex(a => a.id === activeAgentId);

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-clinical border border-clinical-border shadow-clinical">
      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">AI processing pipeline</h3>
      <div className="flex flex-col gap-6">
        {agents.map((agent, index) => {
          const isActive = index === activeIndex;
          const isCompleted = index < activeIndex;

          return (
            <div key={agent.id} className="flex items-center gap-4">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 relative",
                isActive ? "bg-primary text-white ring-4 ring-primary/20 scale-110" : 
                isCompleted ? "bg-primary-light text-primary" : "bg-slate-100 text-slate-300"
              )}>
                <agent.icon className="w-5 h-5" />
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-primary"
                    animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                )}
              </div>
              <div className="flex-1">
                <p className={cn(
                  "text-sm font-bold",
                  isActive ? "text-primary" : isCompleted ? "text-slate-700" : "text-slate-300"
                )}>
                  {agent.name}
                </p>
                <p className={cn(
                  "text-xs",
                  isActive ? "text-primary-dark font-medium" : "text-slate-400"
                )}>
                  {isActive ? agent.desc : isCompleted ? 'Task completed' : 'Waiting...'}
                </p>
              </div>
              {isCompleted && (
                <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
