import React from 'react';
import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { BarChart3, CalendarDays, Image as ImageIcon, TrendingDown, Activity, ClipboardList } from 'lucide-react';
import { Card, Badge, cn } from '../../components/ui/Base';

const scanCards = [
  { label: 'Day 0', date: 'Jun 1, 2026', score: 22, area: 18, note: 'Baseline flare with diffuse scaling.' },
  { label: 'Day 10', date: 'Jun 11, 2026', score: 17, area: 14, note: 'Reduced erythema after topical therapy.' },
  { label: 'Day 20', date: 'Jun 21, 2026', score: 11, area: 9, note: 'Smaller plaque borders and less itch.' },
  { label: 'Day 30', date: 'Jul 1, 2026', score: 6, area: 5, note: 'Marked response, residual dryness only.' },
];

const severityData = [
  { day: 0, severity: 22, area: 18, pain: 7, itch: 8 },
  { day: 5, severity: 20, area: 17, pain: 7, itch: 8 },
  { day: 10, severity: 17, area: 14, pain: 5, itch: 6 },
  { day: 15, severity: 15, area: 12, pain: 5, itch: 5 },
  { day: 20, severity: 11, area: 9, pain: 4, itch: 4 },
  { day: 25, severity: 8, area: 7, pain: 3, itch: 3 },
  { day: 30, severity: 6, area: 5, pain: 2, itch: 2 },
];

const changeLog = [
  { date: 'Day 6', reason: 'Added friction reduction guidance after worsening from heat and sweating.' },
  { date: 'Day 12', reason: 'Diet plan updated to reduce citrus and ultra-processed foods after intake review.' },
  { date: 'Day 19', reason: 'Sleep target increased to 8 hours after persistent itch and fatigue.' },
  { date: 'Day 27', reason: 'Skincare plan simplified to improve adherence and reduce irritation.' },
];

const formatPercent = (value) => `${value}%`;

const chartTooltip = {
  contentStyle: {
    borderRadius: '10px',
    border: '1px solid #E5E7EB',
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    fontSize: '12px',
  },
};

const PatientProgress = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Patient Progress</p>
          <h1 className="text-2xl font-bold text-slate-900">30-Day Treatment Cycle</h1>
          <p className="text-sm text-slate-500 mt-1">Progress is read-only and updated from uploaded check-ins and doctor review.</p>
        </div>
        <Badge variant="info">Day 30 review ready</Badge>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Image Strip</h2>
          </div>
          <span className="text-xs text-slate-400">Day 0, 10, 20, 30</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {scanCards.map((scan) => (
            <div key={scan.label} className="rounded-clinical border border-clinical-border bg-slate-50 overflow-hidden">
              <div className="aspect-[4/3] bg-white flex items-center justify-center border-b border-clinical-border">
                <div className="text-center px-4">
                  <div className="w-14 h-14 mx-auto rounded-full bg-primary-light flex items-center justify-center mb-3">
                    <ImageIcon className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Clinical Scan</p>
                </div>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">{scan.label}</h3>
                  <Badge variant={scan.score <= 8 ? 'mild' : scan.score <= 15 ? 'moderate' : 'severe'}>{scan.score} severity</Badge>
                </div>
                <p className="text-xs text-slate-500 flex items-center gap-1.5"><CalendarDays className="w-3.5 h-3.5" /> {scan.date}</p>
                <p className="text-sm text-slate-700 leading-relaxed">{scan.note}</p>
                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <span>Affected area</span>
                  <span className="font-semibold text-slate-800">{scan.area}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid xl:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-primary" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">Severity Trend</h2>
            </div>
            <Badge variant="mild">Improving</Badge>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={severityData}>
                <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} tickFormatter={(value) => `Day ${value}`} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                <Tooltip formatter={(value) => [value, 'Severity score']} labelFormatter={(label) => `Day ${label}`} {...chartTooltip} />
                <Line type="monotone" dataKey="severity" stroke="#0F6E56" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">Affected Area Trend</h2>
            </div>
            <Badge variant="info">Tracked by AI</Badge>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={severityData}>
                <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} tickFormatter={(value) => `Day ${value}`} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} tickFormatter={formatPercent} />
                <Tooltip formatter={(value) => [formatPercent(value), 'Affected area']} labelFormatter={(label) => `Day ${label}`} {...chartTooltip} />
                <Area type="monotone" dataKey="area" stroke="#0F6E56" fill="#E6F1EE" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid xl:grid-cols-[1.35fr_0.65fr] gap-6">
        <Card>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">Symptom Log</h2>
            </div>
            <span className="text-xs text-slate-400">Pain and itch scores over 30 days</span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={severityData}>
                <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} tickFormatter={(value) => `Day ${value}`} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                <Tooltip {...chartTooltip} />
                <Line type="monotone" dataKey="pain" stroke="#E24B4A" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="itch" stroke="#0F6E56" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-500">
            <span className="inline-flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-danger" /> Pain</span>
            <span className="inline-flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-primary" /> Itch</span>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-6">
            <ClipboardList className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">Plan Change Log</h2>
          </div>
          <div className="space-y-4">
            {changeLog.map((entry) => (
              <div key={entry.date} className="rounded-clinical-sm border border-slate-100 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <p className="text-sm font-bold text-slate-900">{entry.date}</p>
                  <Badge variant="info">Updated</Badge>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{entry.reason}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PatientProgress;