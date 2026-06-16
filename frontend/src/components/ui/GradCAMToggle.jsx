import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from './Base';
import { cn } from './Base';

export const GradCAMToggle = ({ imageUrl, heatmapUrl, confidence }) => {
  const [showHeatmap, setShowHeatmap] = useState(false);

  return (
    <div className="relative group rounded-clinical overflow-hidden border border-clinical-border bg-slate-100">
      <img src={imageUrl} alt="Skin lesion" className="w-full h-auto aspect-square object-cover" />
      
      {showHeatmap && (
        <img 
          src={heatmapUrl} 
          alt="AI Analysis Heatmap" 
          className="absolute inset-0 w-full h-auto aspect-square object-cover opacity-60 mix-blend-multiply transition-opacity duration-300" 
        />
      )}

      {/* Confidence Overlay */}
      {confidence && (
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-clinical-sm border border-slate-200 shadow-sm">
          <p className="text-[10px] uppercase tracking-wider font-bold text-slate-500">AI Confidence</p>
          <p className="text-sm font-bold text-primary">{confidence}%</p>
        </div>
      )}

      {/* Toggle Button */}
      <div className="absolute bottom-4 right-4">
        <Button 
          variant={showHeatmap ? 'primary' : 'ghost'} 
          onClick={() => setShowHeatmap(!showHeatmap)}
          className={cn(
            "bg-white shadow-lg hover:bg-white/90 text-slate-700",
            showHeatmap && "bg-primary text-white"
          )}
          size="sm"
        >
          {showHeatmap ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
          {showHeatmap ? 'Hide AI Analysis' : 'Show AI Analysis'}
        </Button>
      </div>
    </div>
  );
};
