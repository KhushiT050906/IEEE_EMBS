import React from 'react';
import { cn } from './Base';

const types = [
  { id: 1, color: '#F8EEE7', label: 'Type I', desc: 'Always burns, never tans' },
  { id: 2, color: '#F3E4D8', label: 'Type II', desc: 'Usually burns, tans minimally' },
  { id: 3, color: '#E8D4C2', label: 'Type III', desc: 'Sometime burns, tans uniformly' },
  { id: 4, color: '#BB9473', label: 'Type IV', desc: 'Burns minimally, always tans' },
  { id: 5, color: '#916743', label: 'Type V', desc: 'Rarely burns, tans easily' },
  { id: 6, color: '#4E3128', label: 'Type VI', desc: 'Never burns' },
];

export const FitzpatrickPicker = ({ value, onChange }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {types.map((type) => (
        <button
          key={type.id}
          type="button"
          onClick={() => onChange(type.id)}
          className={cn(
            'flex flex-col items-center p-3 rounded-clinical border-2 transition-all duration-200 text-left',
            value === type.id 
              ? 'border-primary bg-primary-light ring-2 ring-primary/10' 
              : 'border-transparent bg-slate-50 hover:bg-slate-100'
          )}
        >
          <div 
            className="w-12 h-12 rounded-full border border-slate-200 mb-2 shadow-sm" 
            style={{ backgroundColor: type.color }}
          />
          <span className="text-sm font-semibold text-slate-900">{type.label}</span>
          <span className="text-[10px] text-slate-500 leading-tight mt-1">{type.desc}</span>
        </button>
      ))}
    </div>
  );
};
