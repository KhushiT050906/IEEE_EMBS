import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, FileText, ShieldAlert, Pill, History, ExternalLink, Activity } from 'lucide-react';
import { Button, Card, Badge } from '../../components/ui/Base';
import { TimelineBar } from '../../components/ui/TimelineBar';
import { GradCAMToggle } from '../../components/ui/GradCAMToggle';

const PatientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/doctor/dashboard')} className="p-0 h-10 w-10">
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Rohan Sharma <span className="text-slate-400 font-normal ml-2">#{id || 'P001'}</span></h1>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Male • 28 yrs • Fitzpatrick Type IV</span>
              <div className="w-1 h-1 rounded-full bg-slate-300" />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Allergies: Penicillin, Sulfur</span>
            </div>
          </div>
        </div>
        <Button onClick={() => navigate(`/doctor/prescribe/${id || 'P001'}`)}><Pill className="w-4 h-4 mr-2" /> Modify Treatment</Button>
      </div>

      {/* Cycle Overview */}
      <Card className="bg-white">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Active Cycle (June 2026)</h3>
          <Badge variant="severe">Alert: Day 12 Check-in</Badge>
        </div>
        <TimelineBar currentDay={12} />
      </Card>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Left Column: AI specialist brief */}
        <div className="md:col-span-2 space-y-8">
          <Card className="p-0 overflow-hidden">
            <div className="p-6 bg-slate-50 border-b border-clinical-border flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <h3 className="font-bold text-slate-900">AI Specialist Disease Brief</h3>
               </div>
               <Badge className="bg-primary text-white border-none">96% Confident</Badge>
            </div>
            <div className="p-6 space-y-6">
               <div className="grid md:grid-cols-2 gap-8">
                  <div>
                     <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Vision Model Output</h4>
                     <GradCAMToggle 
                        imageUrl="https://images.unsplash.com/photo-1612119276561-73602f37750b?q=80&w=600&auto=format&fit=crop" 
                        heatmapUrl="https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=600&auto=format&fit=crop" 
                        confidence={96}
                     />
                  </div>
                  <div className="space-y-4">
                     <div>
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Primary Condition</h4>
                        <p className="text-lg font-bold text-slate-900">Psoriasis Vulgaris</p>
                     </div>
                     <div>
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Severity Score</h4>
                        <p className="text-lg font-bold text-danger">PASI: 22.4 (Severe)</p>
                     </div>
                     <div>
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Clinical Reasoning</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">
                           Analysis shows classic sharply demarcated erythematous plaques with silvery scaling. 
                           Significant inflammation detected in the left elbow region. 
                           Tracking Agent notes a 12% expansion in lesion perimeter since baseline (Day 0).
                        </p>
                     </div>
                  </div>
               </div>
            </div>
          </Card>

          <Card className="p-6">
             <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                   <Activity className="w-5 h-5 text-primary" />
                   <h3 className="font-bold text-slate-900">Symptom Trends</h3>
                </div>
                <Badge variant="info">30-Day View</Badge>
             </div>
             <div className="h-64 flex items-center justify-center bg-slate-50 border border-dashed border-slate-200 rounded-clinical">
                <p className="text-sm text-slate-400">Recharts Trend Analysis (Severity & Affected Area)</p>
             </div>
          </Card>
        </div>

        {/* Right Column: Safety & Actions */}
        <div className="space-y-8">
           <Card className="p-6 border-red-100 bg-red-50/50">
              <div className="flex items-center gap-2 text-danger mb-4">
                 <ShieldAlert className="w-5 h-5" />
                 <h3 className="font-bold">Clinical Alerts</h3>
              </div>
              <ul className="space-y-3">
                 <li className="p-3 bg-white rounded border border-red-100 shadow-sm text-xs text-slate-600">
                    <span className="font-bold block text-danger mb-1">Severe Stagnation</span>
                    Patient reports no improvement with current topical steroid.
                 </li>
                 <li className="p-3 bg-white rounded border border-red-100 shadow-sm text-xs text-slate-600">
                    <span className="font-bold block text-danger mb-1">Safety Risk</span>
                    Lifestyle agent flagged new high-sodium diet reported in intake.
                 </li>
              </ul>
           </Card>

           <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                 <div className="flex items-center gap-2">
                    <History className="w-5 h-5 text-primary" />
                    <h3 className="font-bold text-slate-900">Current Plan</h3>
                 </div>
                 <Button variant="ghost" size="sm" className="h-8 p-0 text-primary">Details <ExternalLink className="ml-1 w-3 h-3" /></Button>
              </div>
              <div className="space-y-4">
                 <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-bold uppercase tracking-wider">Medication</span>
                    <span className="text-slate-900 font-bold">Betamethasone</span>
                 </div>
                 <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-bold uppercase tracking-wider">Plan Version</span>
                    <span className="text-slate-900 font-bold">V 2.3 (Cycle 1)</span>
                 </div>
                 <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-bold uppercase tracking-wider">Status</span>
                    <Badge variant="moderate">Compliance 65%</Badge>
                 </div>
              </div>
           </Card>

           <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Clinician Notes</label>
              <textarea 
                 className="w-full h-32 p-3 bg-white border border-clinical-border rounded-clinical text-sm focus:ring-1 focus:ring-primary outline-none resize-none"
                 placeholder="Enter clinical observations for this patient..."
              />
              <Button className="w-full h-10">Save Notes</Button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetail;
