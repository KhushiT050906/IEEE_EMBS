import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Download, Share2, ClipboardList, BookOpen, AlertTriangle } from 'lucide-react';
import { Button, Card, Badge } from '../../components/ui/Base';
import { GradCAMToggle } from '../../components/ui/GradCAMToggle';

const PatientReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data for the report
  const reportData = {
    diseaseName: 'Psoriasis Vulgaris',
    confidence: 96,
    severity: 'Moderate',
    explanation: 'Plaque psoriasis is an autoimmune condition characterized by thick, red, scaly patches on the skin.',
    findings: [
      'Sharply demarcated erythematous plaques',
      'Presence of silvery-white micaceous scales',
      'Positive for Koebner phenomenon (reported context)',
      'Baseline severity score: 14.2 PASI'
    ],
    citations: [
      { source: 'DermNet NZ', url: '#', quote: 'Psoriasis is a chronic inflammatory skin disease...' },
      { source: 'AAD', url: '#', quote: 'Guidelines for management of plaque psoriasis...' },
      { source: 'PubMed', url: '#', quote: 'Recent advances in IL-23 inhibition therapy...' }
    ],
    differential: [
      { name: 'Nummular Eczema', probability: 4 },
      { name: 'Seborrheic Dermatitis', probability: 2 }
    ]
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold text-slate-900">Clinical Diagnosis Report</h1>
            <Badge variant="moderate">Verified by Agent</Badge>
          </div>
          <p className="text-sm text-slate-500">Cycle ID: {id || 'CYC-2026-8812'} • Generated June 11, 2026</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1 md:flex-none"><Download className="w-4 h-4 mr-2" /> PDF</Button>
          <Button variant="outline" className="flex-1 md:flex-none"><Share2 className="w-4 h-4 mr-2" /> Share</Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Main AI Analysis Column */}
        <div className="md:col-span-2 space-y-8">
          <Card className="p-0 overflow-hidden border-primary/20">
            <div className="p-6 bg-primary-light/30 border-b border-primary/10">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-slate-900">{reportData.diseaseName}</h3>
                <Badge className="bg-primary text-white border-none px-3 py-1 text-sm">{reportData.confidence}% Confidence</Badge>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                {reportData.explanation}
              </p>
            </div>
            
            <div className="p-6">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Visual Evidence (GradCAM)</h4>
              <GradCAMToggle 
                imageUrl="https://images.unsplash.com/photo-1612119276561-73602f37750b?q=80&w=600&auto=format&fit=crop" 
                heatmapUrl="https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=600&auto=format&fit=crop" 
                confidence={reportData.confidence}
              />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <ClipboardList className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-bold">Key Clinical Findings</h3>
            </div>
            <ul className="space-y-4">
              {reportData.findings.map((finding, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  {finding}
                </li>
              ))}
            </ul>
          </Card>

          {reportData.confidence < 95 && (
            <Card className="p-6 border-amber-200 bg-amber-50">
              <div className="flex items-center gap-3 mb-4 text-amber-800">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="text-lg font-bold">Differential Diagnoses</h3>
              </div>
              <div className="space-y-3">
                {reportData.differential.map((diff, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-white rounded-clinical border border-amber-100 shadow-sm">
                    <span className="text-sm font-bold text-slate-700">{diff.name}</span>
                    <Badge variant="info">{diff.probability}% probability</Badge>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar Column */}
        <div className="space-y-8">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-5 h-5 text-primary" />
              <h3 className="text-sm font-bold">RAG Evidence Sources</h3>
            </div>
            <div className="space-y-4">
              {reportData.citations.map((cite, i) => (
                <div key={i} className="group cursor-pointer">
                  <p className="text-xs font-bold text-primary group-hover:underline mb-1">{cite.source}</p>
                  <p className="text-[11px] text-slate-500 italic leading-relaxed line-clamp-3">"{cite.quote}"</p>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-6 text-xs text-primary h-8">View All Citations</Button>
          </Card>

          <Card className="bg-slate-900 text-white border-none p-6 text-center">
            <p className="text-xs text-slate-400 mb-4">Next Step in Pipeline</p>
            <h4 className="text-lg font-bold mb-4">Medication Review</h4>
            <p className="text-xs text-slate-400 mb-6">Awaiting doctor prescription. Our Safety Agent will automatically verify it against your history.</p>
            <Button className="w-full bg-primary hover:bg-primary-dark border-none" onClick={() => navigate('/patient/dashboard')}>Back to Dashboard</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PatientReport;
