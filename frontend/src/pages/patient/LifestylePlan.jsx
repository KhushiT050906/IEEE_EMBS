import React, { useState } from 'react';
import { CheckCircle2, Apple, MoonStar, Sparkles, Dumbbell, HeartHandshake, ChevronDown, AlertTriangle, Pill } from 'lucide-react';
import { Card, Badge, cn } from '../../components/ui/Base';

const tabs = [
  { id: 'diet', label: 'Diet', icon: Apple },
  { id: 'sleep', label: 'Sleep', icon: MoonStar },
  { id: 'skincare', label: 'Skincare', icon: Sparkles },
  { id: 'activity', label: 'Activity', icon: Dumbbell },
  { id: 'stress', label: 'Stress Management', icon: HeartHandshake },
];

const planData = {
  diet: {
    title: 'ICMR-aligned anti-inflammatory diet',
    checklist: [
      'Start the day with oats or poha and unsweetened curd',
      'Include dal, paneer, fish, or tofu at lunch',
      'Drink 2 to 2.5 liters of water spread across the day',
      'Avoid packaged snacks and deep-fried street food',
    ],
    highlights: [
      'Turmeric, moong dal, amla, and leafy greens are emphasized.',
      'Citrus fruits are limited because they may worsen irritation for this cycle.',
      'Red badge warnings appear for known allergies or drug-food conflicts.',
    ],
  },
  sleep: {
    title: 'Sleep protection plan',
    checklist: [
      'Target 8 hours of sleep each night',
      'Stop screens 60 minutes before bed',
      'Keep the room cool and low-light',
      'Use the same bedtime every day',
    ],
    highlights: [
      'Sleep consistency is linked to reduced flare intensity.',
      'Late-night scrolling is marked as a risk behavior.',
    ],
  },
  skincare: {
    title: 'Barrier-first skincare routine',
    checklist: [
      'Cleanse gently with lukewarm water',
      'Apply prescribed emollient after bathing',
      'Use fragrance-free sunscreen on exposed skin',
      'Do not scrub plaques or pick at scales',
    ],
    highlights: [
      'The routine is intentionally simple to maximize adherence.',
      'Moisturizer timing is important after showering.',
    ],
  },
  activity: {
    title: 'Movement plan',
    checklist: [
      'Take a 20-minute walk after lunch',
      'Do light stretching in the morning',
      'Avoid long sweat-heavy workouts during active flare-ups',
      'Wear loose cotton clothing during exercise',
    ],
    highlights: [
      'Low-friction movement is preferred until symptoms improve.',
      'Overheating can worsen itching and redness.',
    ],
  },
  stress: {
    title: 'Stress reduction plan',
    checklist: [
      'Use 5 minutes of box breathing twice a day',
      'Log work stress or flare triggers in the notes section',
      'Plan one quiet break during the workday',
      'Limit caffeine after 2 pm',
    ],
    highlights: [
      'Stress and poor sleep are tracked as flare contributors.',
      'The intake agent adapts this plan next cycle based on adherence.',
    ],
  },
};

const warnings = [
  { label: 'Allergy warning', text: 'Citrus and tomato are flagged for this cycle.', tone: 'danger' },
  { label: 'Drug-food conflict', text: 'Avoid grapefruit when prescribed topical steroids with this plan.', tone: 'danger' },
  { label: 'Adherence note', text: 'Simple routines are preferred over high-volume task lists.', tone: 'info' },
];

const versionHistory = [
  { version: 'v1.0', date: 'Day 0', reason: 'Baseline lifestyle plan created from intake conversation.' },
  { version: 'v1.1', date: 'Day 12', reason: 'Diet updated after tracking agent noted higher itch on spicy meals.' },
  { version: 'v1.2', date: 'Day 19', reason: 'Sleep and stress plan tuned after work-related flare report.' },
];

const PatientLifestylePlan = () => {
  const [activeTab, setActiveTab] = useState('diet');
  const activePlan = planData[activeTab];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Lifestyle Plan</p>
          <h1 className="text-2xl font-bold text-slate-900">Daily care checklist</h1>
          <p className="text-sm text-slate-500 mt-1">This plan is read-only unless the next cycle intake updates it.</p>
        </div>
        <Badge variant="moderate">Version 1.2 active</Badge>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="border-b border-slate-100 bg-slate-50 px-4 sm:px-6 py-3">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-clinical-sm px-3 py-2 text-sm font-medium transition-colors',
                    isActive ? 'bg-primary text-white' : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-0">
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">{activePlan.title}</h2>
              <p className="text-sm text-slate-500 mt-1">Select items below as you complete them during the day.</p>
            </div>

            <div className="space-y-3">
              {activePlan.checklist.map((item) => (
                <label key={item} className="flex items-start gap-3 rounded-clinical-sm border border-slate-100 p-4 hover:bg-slate-50 transition-colors cursor-pointer">
                  <input type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary" />
                  <span className="text-sm text-slate-700 leading-relaxed">{item}</span>
                </label>
              ))}
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Clinical highlights</h3>
              <div className="space-y-3">
                {activePlan.highlights.map((item) => (
                  <div key={item} className="rounded-clinical-sm bg-slate-50 border border-slate-100 p-4 text-sm text-slate-600 leading-relaxed">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t lg:border-t-0 lg:border-l border-slate-100 bg-slate-50 p-6 sm:p-8 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4 text-danger" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">Warnings</h3>
              </div>
              <div className="space-y-3">
                {warnings.map((warning) => (
                  <div key={warning.label} className="rounded-clinical-sm border border-slate-100 bg-white p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={warning.tone === 'danger' ? 'severe' : 'info'}>{warning.label}</Badge>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{warning.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <Pill className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">Current cycle meds tie-in</h3>
              </div>
              <div className="rounded-clinical-sm border border-slate-100 bg-white p-4 text-sm text-slate-600 leading-relaxed">
                Any drug-food conflict warnings from the doctor’s prescription will appear here automatically and stay read-only.
              </div>
            </div>

            <details className="rounded-clinical-sm border border-slate-100 bg-white p-4">
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-bold text-slate-900">
                Plan version history
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </summary>
              <div className="mt-4 space-y-3">
                {versionHistory.map((entry) => (
                  <div key={entry.version} className="rounded-clinical-sm bg-slate-50 border border-slate-100 p-3">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <p className="text-sm font-bold text-slate-900">{entry.version}</p>
                      <span className="text-[10px] uppercase tracking-widest text-slate-400">{entry.date}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{entry.reason}</p>
                  </div>
                ))}
              </div>
            </details>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PatientLifestylePlan;