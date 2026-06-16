import React from 'react';
import { ShieldCheck, ShieldAlert, Clock3, Lock, CalendarDays, History, Pill, ArrowRight } from 'lucide-react';
import { Card, Badge } from '../../components/ui/Base';

const currentPrescription = [
  { name: 'Clobetasol Propionate 0.05%', dosage: 'Apply thin layer', frequency: 'Twice daily', duration: '14 days' },
  { name: 'Ceramide Emollient', dosage: 'Apply generously', frequency: 'After bathing and before bed', duration: '30 days' },
  { name: 'Cetirizine 10mg', dosage: '1 tablet', frequency: 'At night as needed for itch', duration: '7 days' },
];

const safetyRows = [
  { label: 'Allergy review', value: 'Safe', tone: 'mild', note: 'No allergy conflicts with current prescription.' },
  { label: 'Drug-food check', value: 'Review', tone: 'moderate', note: 'Avoid grapefruit if diet plan changes include citrus-heavy fruit intake.' },
  { label: 'Interaction status', value: 'Safe', tone: 'mild', note: 'No conflict detected with current topical routine.' },
];

const warnings = [
  'Citrus-heavy meals may interact with future oral therapies if prescribed in a new cycle.',
  'A late-night snack plan should avoid known allergy triggers already logged in the profile.',
];

const history = [
  { cycle: 'Cycle 1', date: 'Jun 10, 2026', doctor: 'Dr. Sarah Wilson', summary: 'Initial topical regimen for active flare.' },
  { cycle: 'Cycle 0', date: 'May 08, 2026', doctor: 'Dr. Sarah Wilson', summary: 'Baseline symptomatic relief only.' },
];

const badgeForTone = (tone) => {
  if (tone === 'moderate') return 'moderate';
  if (tone === 'severe') return 'severe';
  return 'mild';
};

const PatientMedications = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Medications</p>
          <h1 className="text-2xl font-bold text-slate-900">Read-only prescription view</h1>
          <p className="text-sm text-slate-500 mt-1">Patients cannot add, edit, or request medications from this screen.</p>
        </div>
        <Badge variant="info">Updated by doctor only</Badge>
      </div>

      <div className="grid xl:grid-cols-[1.15fr_0.85fr] gap-6">
        <Card>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-primary" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">Current Prescription</h2>
            </div>
            <Badge variant="mild">Prescribed by Dr. Sarah Wilson</Badge>
          </div>

          <div className="space-y-4">
            {currentPrescription.map((item) => (
              <div key={item.name} className="rounded-clinical-sm border border-slate-100 bg-slate-50 p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-900">{item.name}</p>
                    <p className="text-sm text-slate-600 mt-1">{item.dosage}</p>
                  </div>
                  <div className="text-xs text-slate-500 sm:text-right">
                    <p className="font-semibold text-slate-700">{item.frequency}</p>
                    <p>{item.duration}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-clinical-sm border border-slate-100 bg-white p-4 flex items-start gap-3">
            <CalendarDays className="w-4 h-4 text-primary mt-0.5" />
            <div className="text-sm text-slate-600 leading-relaxed">
              <p className="font-semibold text-slate-900 mb-1">Cycle details</p>
              <p>Issued June 10, 2026 for Cycle 1. The prescription remains locked until the doctor updates it in a new visit.</p>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 text-xs text-slate-400">
            <Lock className="w-3.5 h-3.5" />
            This view is intentionally read-only.
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">Medicine Safety Agent</h2>
            </div>

            <div className="space-y-3">
              {safetyRows.map((row) => (
                <div key={row.label} className="rounded-clinical-sm border border-slate-100 p-4 bg-slate-50">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <p className="text-sm font-bold text-slate-900">{row.label}</p>
                    <Badge variant={badgeForTone(row.tone)}>{row.value}</Badge>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{row.note}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-2 mb-4">
              <ShieldAlert className="w-4 h-4 text-danger" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">Warnings</h2>
            </div>
            <div className="space-y-3">
              {warnings.map((warning) => (
                <div key={warning} className="rounded-clinical-sm border border-red-100 bg-red-50 p-4 text-sm text-slate-700 leading-relaxed">
                  {warning}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <div className="grid xl:grid-cols-[0.8fr_1.2fr] gap-6">
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Pill className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">Prescription summary</h2>
          </div>
          <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
            <p><span className="font-semibold text-slate-900">Prescribed by:</span> Dr. Sarah Wilson</p>
            <p><span className="font-semibold text-slate-900">Cycle:</span> 1</p>
            <p><span className="font-semibold text-slate-900">Read-only:</span> Yes, patients cannot edit medications on this page.</p>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-4">
            <History className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">Prescription History</h2>
          </div>
          <div className="space-y-3">
            {history.map((item) => (
              <div key={item.cycle} className="rounded-clinical-sm border border-slate-100 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <p className="text-sm font-bold text-slate-900">{item.cycle}</p>
                  <span className="text-[10px] uppercase tracking-widest text-slate-400">{item.date}</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{item.summary}</p>
                <p className="mt-2 text-xs text-slate-400">{item.doctor}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="bg-slate-900 text-white border-none">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-400 mb-1">Next action</p>
            <h2 className="text-lg font-bold">Medication changes only come from your doctor</h2>
            <p className="text-sm text-slate-400 mt-1">Any new prescription will automatically update this view after clinician review.</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <ArrowRight className="w-4 h-4" />
            System-managed record
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PatientMedications;