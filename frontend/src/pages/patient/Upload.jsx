import React, { useState } from 'react';
import { Camera, Upload, ChevronRight, CheckCircle2, Info, AlertCircle, Trash2 } from 'lucide-react';
import { Button, Card, Input, Badge } from '../../components/ui/Base';
import { AgentPipeline } from '../../components/ui/AgentPipeline';

const bodyRegions = [
  'Face', 'Scalp', 'Neck', 'Chest', 'Back', 'Right Arm', 'Left Arm', 'Right Leg', 'Left Leg', 'Abdomen'
];

const PatientUpload = () => {
  const [step, setStep] = useState(1); // 1: Upload, 2: Context, 3: Processing
  const [activeRegion, setActiveRegion] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeAgentId, setActiveAgentId] = useState('vision');

  const startProcessing = () => {
    setStep(3);
    const agentIds = ['vision', 'specialist', 'safety', 'lifestyle'];
    let index = 0;
    const interval = setInterval(() => {
      if (index < agentIds.length) {
        setActiveAgentId(agentIds[index]);
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          // In a real app, we'd navigate to report
          alert('Processing complete! This would navigate to your diagnosis report.');
          setStep(1);
        }, 1000);
      }
    }, 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-4 py-4">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
              step === s ? 'bg-primary text-white' : 
              step > s ? 'bg-primary-light text-primary' : 'bg-slate-100 text-slate-400'
            }`}>
              {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
            </div>
            {s < 3 && <div className={`w-12 h-0.5 ${step > s ? 'bg-primary-light' : 'bg-slate-100'}`} />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900">Upload Clinical Photo</h1>
            <p className="text-sm text-slate-500 mt-1">Ensure good lighting and focus on the affected area.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="border-2 border-dashed border-slate-200 rounded-clinical p-8 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer aspect-square">
                <Camera className="w-12 h-12 text-slate-300 mb-4" />
                <p className="text-sm font-bold text-slate-700 text-center">Click to capture or drag & drop</p>
                <p className="text-xs text-slate-400 mt-2">Maximum file size: 5MB</p>
              </div>
              
              <Card className="bg-amber-50 border-amber-100">
                <div className="flex gap-3">
                  <Info className="w-5 h-5 text-amber-600 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">Photo Quality Tips</h4>
                    <ul className="text-xs text-amber-800 list-disc list-inside mt-1 space-y-1">
                      <li>Use natural daylight if possible</li>
                      <li>Remove any jewelry or clothing from the area</li>
                      <li>Hold steady for a sharp image</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Select Affected Area</h3>
              <div className="grid grid-cols-2 gap-2">
                {bodyRegions.map(region => (
                  <button
                    key={region}
                    onClick={() => setActiveRegion(region)}
                    className={`px-4 py-2 rounded-clinical-sm text-xs font-medium border transition-all ${
                      activeRegion === region 
                        ? 'bg-primary text-white border-primary' 
                        : 'bg-white border-slate-200 text-slate-600 hover:border-primary'
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
              <div className="flex-1 flex items-end justify-end mt-8">
                <Button 
                  size="lg" 
                  disabled={!activeRegion}
                  onClick={() => setStep(2)}
                  className="w-full h-12"
                >
                  Continue to Context <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900">Report Context</h1>
            <p className="text-sm text-slate-500 mt-1">Help our agents understand the trajectory of your symptoms.</p>
          </div>

          <Card className="p-8 space-y-8">
            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-700">Duration of current flare-up (Days)</label>
              <div className="flex items-center gap-4">
                <input type="range" min="1" max="30" className="flex-1 accent-primary" />
                <span className="w-12 text-center font-bold text-primary">14d</span>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-700">Symptom Trajectory</label>
              <div className="grid grid-cols-3 gap-3">
                {['Getting better', 'Same', 'Getting worse'].map(t => (
                  <button key={t} className="px-4 py-3 rounded-clinical border text-xs font-bold text-slate-600 hover:border-primary transition-all">
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-sm font-bold text-slate-700">Pain Level (0-10)</label>
                <input type="range" min="0" max="10" className="w-full accent-danger" />
                <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  <span>No Pain</span>
                  <span>Severe Pain</span>
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-sm font-bold text-slate-700">Itch Level (0-10)</label>
                <input type="range" min="0" max="10" className="w-full accent-primary" />
                <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  <span>No Itch</span>
                  <span>Severe Itch</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-slate-100">
              <label className="text-sm font-bold text-slate-700">Recent Changes (Check all that apply)</label>
              <div className="grid grid-cols-2 gap-3">
                {['New detergent/soap', 'Dietary changes', 'Environmental stress', 'Recent illness'].map(c => (
                  <label key={c} className="flex items-center gap-3 p-3 rounded-clinical border border-slate-100 cursor-pointer hover:bg-slate-50">
                    <input type="checkbox" className="w-4 h-4 rounded text-primary focus:ring-primary" />
                    <span className="text-xs text-slate-600">{c}</span>
                  </label>
                ))}
              </div>
            </div>
          </Card>

          <div className="flex gap-4">
            <Button variant="outline" size="lg" className="flex-1" onClick={() => setStep(1)}>Back</Button>
            <Button size="lg" className="flex-1" onClick={startProcessing}>Submit for AI Analysis</Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-12 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900">Clinical Evaluation in Progress</h1>
            <p className="text-sm text-slate-500 mt-1">Our specialized agents are analyzing your scan and medical records.</p>
          </div>
          <AgentPipeline activeAgentId={activeAgentId} />
          
          <Card className="bg-white p-6 max-w-lg mx-auto border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
              <Info className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              <strong>Patient Safety Note:</strong> High-confidence predictions (&gt;95%) will be shared immediately. 
              Lower confidence cases will require a mandatory differential diagnosis audit by our Medical Safety Agent.
            </p>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PatientUpload;
