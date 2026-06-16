import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Plus, Trash2, Search, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button, Card, Badge, Input, cn } from '../../components/ui/Base';

const PrescriptionWriter = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [drugs, setDrugs] = useState([
    { id: 1, name: 'Clobetasol Propionate', dosage: '0.05%', frequency: 'Twice daily', duration: '14 days' }
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [safetyStatus, setSafetyStatus] = useState('checking'); // checking, safe, conflict

  useEffect(() => {
    // Simulate multi-agent safety check
    setSafetyStatus('checking');
    const timer = setTimeout(() => {
      // If we add a specific "bad" drug for demo
      const hasConflict = drugs.some(d => d.name.toLowerCase().includes('penicillin'));
      setSafetyStatus(hasConflict ? 'conflict' : 'safe');
    }, 1500);
    return () => clearTimeout(timer);
  }, [drugs]);

  const addDrug = () => {
    setDrugs([...drugs, { id: Date.now(), name: '', dosage: '', frequency: '', duration: '' }]);
  };

  const removeDrug = (id) => {
    setDrugs(drugs.filter(d => d.id !== id));
  };

  const updateDrug = (id, field, value) => {
    setDrugs(drugs.map(d => d.id === id ? { ...d, [field]: value } : d));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="p-0 h-10 w-10">
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl font-bold text-slate-900">Issue Prescription</h1>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate(-1)}>Discard</Button>
            <Button disabled={safetyStatus !== 'safe'}>Submit & Update Patient Portal</Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Left: Drug Selection */}
        <div className="md:col-span-2 space-y-6">
          <Card className="p-6">
             <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-900">Current Regimen</h3>
                <Button variant="outline" size="sm" onClick={addDrug}><Plus className="w-4 h-4 mr-2" /> Add Medication</Button>
             </div>
             
             <div className="space-y-6">
                {drugs.map((drug, index) => (
                  <div key={drug.id} className="p-4 border border-clinical-border rounded-clinical relative group bg-white shadow-sm hover:shadow-md transition-all">
                    <button 
                      onClick={() => removeDrug(drug.id)}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-white border border-red-100 text-danger rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="md:col-span-2 relative">
                         <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Medication Name</label>
                         <Input 
                            value={drug.name} 
                            onChange={(e) => updateDrug(drug.id, 'name', e.target.value)}
                            placeholder="Search drug library..."
                            className={cn(
                               "h-11",
                               drug.name.toLowerCase().includes('penicillin') && "border-danger focus:ring-danger/20"
                            )}
                         />
                      </div>
                      <Input 
                        label="Strength/Dosage" 
                        value={drug.dosage} 
                        onChange={(e) => updateDrug(drug.id, 'dosage', e.target.value)}
                        placeholder="e.g. 500mg or 0.05%"
                      />
                      <Input 
                        label="Frequency" 
                        value={drug.frequency} 
                        onChange={(e) => updateDrug(drug.id, 'frequency', e.target.value)}
                        placeholder="e.g. Twice daily"
                      />
                      <Input 
                        label="Duration" 
                        value={drug.duration} 
                        onChange={(e) => updateDrug(drug.id, 'duration', e.target.value)}
                        placeholder="e.g. 14 days"
                      />
                    </div>
                  </div>
                ))}
             </div>
          </Card>

          <Card className="p-6">
             <h3 className="font-bold text-slate-900 mb-4">Doctor's Clinical Notes</h3>
             <textarea 
                className="w-full h-32 p-3 bg-slate-50 border border-clinical-border rounded-clinical text-sm focus:ring-primary outline-none"
                placeholder="Internal clinical notes for pharmacy or follow-up..."
             />
          </Card>
        </div>

        {/* Right: Real-time Safety Agent */}
        <div className="space-y-6">
           <Card className={cn(
              "p-6 h-fit sticky top-24 border-2 transition-all duration-500",
              safetyStatus === 'checking' ? 'border-blue-100 bg-blue-50/10' : 
              safetyStatus === 'conflict' ? 'border-danger bg-red-50/50 shadow-lg shadow-red-100' : 
              'border-green-100 bg-green-50/50'
           )}>
              <div className="flex items-center gap-3 mb-6">
                 <div className={cn(
                    "p-2 rounded-lg",
                    safetyStatus === 'checking' ? 'bg-blue-100 text-blue-600' : 
                    safetyStatus === 'conflict' ? 'bg-danger text-white' : 
                    'bg-green-500 text-white'
                 )}>
                    {safetyStatus === 'checking' ? <Search className="w-5 h-5 animate-pulse" /> : 
                     safetyStatus === 'conflict' ? <AlertCircle className="w-5 h-5" /> : 
                     <ShieldCheck className="w-5 h-5" />}
                 </div>
                 <h3 className="font-bold text-slate-900">Medicine Safety Agent</h3>
              </div>

              {safetyStatus === 'checking' && (
                <div className="space-y-4">
                  <div className="h-4 bg-slate-100 rounded w-3/4 animate-pulse" />
                  <div className="h-4 bg-slate-100 rounded w-1/2 animate-pulse" />
                  <p className="text-xs text-slate-500 mt-4 leading-relaxed italic">
                    Cross-referencing prescription with patient allergies, medical history, and existing lifestyle plan...
                  </p>
                </div>
              )}

              {safetyStatus === 'conflict' && (
                <div className="space-y-6">
                   <div className="p-4 bg-white border border-danger/20 rounded-clinical shadow-sm">
                      <p className="text-xs font-bold text-danger uppercase tracking-widest mb-1">Critical Allergy Conflict</p>
                      <p className="text-sm text-slate-700">Patient has a documented <strong>Penicillin allergy</strong>. The selected medication is contraindicated.</p>
                   </div>
                   <div className="p-4 bg-white border border-amber-200 rounded-clinical shadow-sm">
                      <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-1">Lifestyle Warning</p>
                      <p className="text-sm text-slate-700">This medication may cause photo-sensitivity. Lifestyle Agent will update the 30-day activity plan to restrict sun exposure.</p>
                   </div>
                   <p className="text-xs text-slate-500">
                     Clinician must resolve or acknowledge critical conflicts before the system allows submission.
                   </p>
                </div>
              )}

              {safetyStatus === 'safe' && (
                <div className="space-y-6">
                   <div className="flex items-center gap-3 text-green-700">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="font-bold">Regimen Verified</span>
                   </div>
                   <div className="space-y-4">
                      <div className="flex justify-between text-xs items-center">
                         <span className="text-slate-500">Allergy History</span>
                         <span className="text-green-600 font-bold">CLEAR</span>
                      </div>
                      <div className="flex justify-between text-xs items-center">
                         <span className="text-slate-500">Drug-Food Interaction</span>
                         <span className="text-green-600 font-bold">NOMINAL</span>
                      </div>
                      <div className="flex justify-between text-xs items-center">
                         <span className="text-slate-500">Cycle Trajectory Fit</span>
                         <span className="text-green-600 font-bold">OPTIMAL</span>
                      </div>
                   </div>
                   <p className="text-xs text-slate-500 leading-relaxed">
                     The multi-agent consensus suggests this regimen is highly safe for the patient's current profile.
                   </p>
                </div>
              )}
           </Card>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionWriter;
