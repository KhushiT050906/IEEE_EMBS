import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Download, FileText, ShieldAlert, TrendingUp, BookOpen, Plus } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Button, Card, Badge } from '../../components/ui/Base';
import { GradCAMToggle } from '../../components/ui/GradCAMToggle';

const cycleTrend = [
  { day: 0, score: 22 },
  { day: 10, score: 17 },
  { day: 20, score: 10 },
  { day: 30, score: 6 },
];

const comparison = [
  { label: 'Day 0', note: 'Baseline flare', score: 22 },
  { label: 'Day 10', note: 'Reduced erythema', score: 17 },
  { label: 'Day 20', note: 'Plaques shrinking', score: 10 },
  { label: 'Day 30', note: 'Residual dryness', score: 6 },
];

const safetyFlags = [
  'Day 12: medication and diet plan conflict flagged and resolved before submission.',
  'Day 20: photo-sensitivity warning acknowledged by the clinician.',
];

const reportNarrative = [
  'Patient showed steady improvement after the initial two weeks, with the highest burden at baseline and marked reduction by Day 30.',
  'The Tracking Agent detected the largest improvement after the skincare routine was simplified.',
  'Safety checks remained stable after the medication adjustment and diet plan modification.'
];

const DoctorReport = () => {
  const { patientId, cycleId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">End-of-Cycle Report</p>
          <h1 className="text-2xl font-bold text-slate-900">Clinical cycle summary</h1>
          <p className="text-sm text-slate-500 mt-1">Patient {patientId || 'P001'} • Cycle {cycleId || '1'} • Exportable final review</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Download className="w-4 h-4 mr-2" /> PDF</Button>
          <Button onClick={() => navigate(`/doctor/patient/${patientId || 'P001'}`)}>Back to Case</Button>
        </div>
      </div>

      <div className="grid xl:grid-cols-[1.2fr_0.8fr] gap-6">
        <Card>
          <div className="flex items-center gap-2 mb-5"><FileText className="w-4 h-4 text-primary" /><h2 className="font-bold text-slate-900">30-Day Narrative</h2></div>
          <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
            {reportNarrative.map((item) => <p key={item}>{item}</p>)}
          </div>
        </Card>

        <Card className="bg-slate-900 text-white border-none">
          <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">Final Status</p>
          <h2 className="text-lg font-bold mb-2">Improved, discharge-ready</h2>
          <p className="text-sm text-slate-400 leading-relaxed">The cycle is complete and the next treatment recommendation is to continue the current regimen with a follow-up review in the next cycle.</p>
        </Card>
      </div>

      <div className="grid xl:grid-cols-[1.1fr_0.9fr] gap-6">
        <Card className="p-0 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Image Comparison Strip</h2>
              <p className="text-sm text-slate-500 mt-1">Four checkpoint images with severity scores.</p>
            </div>
            <Badge variant="mild">Final score 6</Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-0">
            {comparison.map((item) => (
              <div key={item.label} className="border-t sm:border-t-0 sm:border-r border-slate-100 last:border-r-0">
                <div className="aspect-square bg-slate-50 flex items-center justify-center border-b border-slate-100">
                  <div className="text-center px-4">
                    <div className="w-14 h-14 rounded-full bg-primary-light mx-auto mb-3 flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Clinical image</p>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-bold text-slate-900">{item.label}</p>
                    <Badge variant={item.score <= 8 ? 'mild' : item.score <= 15 ? 'moderate' : 'severe'}>{item.score}</Badge>
                  </div>
                  <p className="text-sm text-slate-600">{item.note}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-5"><TrendingUp className="w-4 h-4 text-primary" /><h2 className="font-bold text-slate-900">Severity Trend</h2></div>
          <div className="h-72 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cycleTrend}>
                <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} tickFormatter={(value) => `Day ${value}`} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: '10px', border: '1px solid #E5E7EB' }} />
                <Area type="monotone" dataKey="score" stroke="#0F6E56" fill="#E6F1EE" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="rounded-clinical-sm border border-slate-100 bg-slate-50 p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Next cycle recommendation</p>
            <p className="text-sm text-slate-600 leading-relaxed">Continue topical maintenance, simplify skincare, and review for discharge in the next follow-up cycle.</p>
          </div>
        </Card>
      </div>

      <div className="grid xl:grid-cols-[0.75fr_1.25fr] gap-6">
        <Card>
          <div className="flex items-center gap-2 mb-4"><ShieldAlert className="w-4 h-4 text-danger" /><h3 className="font-bold text-slate-900">Safety Flags</h3></div>
          <div className="space-y-3">
            {safetyFlags.map((flag) => <div key={flag} className="rounded-clinical-sm border border-red-100 bg-red-50 p-4 text-sm text-slate-700 leading-relaxed">{flag}</div>)}
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-4"><Plus className="w-4 h-4 text-primary" /><h3 className="font-bold text-slate-900">Doctor Notes</h3></div>
          <textarea className="w-full h-32 p-3 border border-clinical-border rounded-clinical-sm text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none" placeholder="Add final clinical notes before closing the cycle..." />
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline">Save Draft</Button>
            <Button>Close Cycle</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DoctorReport;