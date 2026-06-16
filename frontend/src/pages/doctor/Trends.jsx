import React from 'react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, Badge } from '../../components/ui/Base';
import { TrendingUp, PieChart as PieChartIcon, Activity, CalendarDays } from 'lucide-react';

const severityTrend = [
  { day: '0', active: 22 },
  { day: '5', active: 20 },
  { day: '10', active: 17 },
  { day: '15', active: 14 },
  { day: '20', active: 10 },
  { day: '25', active: 8 },
  { day: '30', active: 6 },
];

const diseaseBreakdown = [
  { name: 'Psoriasis', value: 52, color: '#0F6E56' },
  { name: 'Eczema', value: 34, color: '#6B7280' },
  { name: 'Tinea', value: 28, color: '#E24B4A' },
  { name: 'Acne', value: 18, color: '#C7D2FE' },
];

const appointments = [
  { time: '10:30', label: 'Rohan Sharma', note: 'Review safety conflict' },
  { time: '11:10', label: 'Vikram Singh', note: 'Write new prescription' },
  { time: '14:20', label: 'Priya Verma', note: 'End-cycle report' },
];

const DoctorTrends = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Clinical Trends</p>
          <h1 className="text-2xl font-bold text-slate-900">Aggregate patient progress</h1>
          <p className="text-sm text-slate-500 mt-1">Trends help identify stagnation, improvement, and safety review patterns across active patients.</p>
        </div>
        <Badge variant="info">Live clinical overview</Badge>
      </div>

      <div className="grid xl:grid-cols-[1.35fr_0.65fr] gap-6">
        <Card>
          <div className="flex items-center gap-2 mb-5"><TrendingUp className="w-4 h-4 text-primary" /><h2 className="font-bold text-slate-900">Severity Improvement</h2></div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={severityTrend}>
                <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} tickFormatter={(value) => `Day ${value}`} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: '10px', border: '1px solid #E5E7EB' }} />
                <Area type="monotone" dataKey="active" stroke="#0F6E56" fill="#E6F1EE" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-5"><PieChartIcon className="w-4 h-4 text-primary" /><h2 className="font-bold text-slate-900">Disease Breakdown</h2></div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={diseaseBreakdown} dataKey="value" nameKey="name" innerRadius={52} outerRadius={90} paddingAngle={4}>
                  {diseaseBreakdown.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '10px', border: '1px solid #E5E7EB' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
            {diseaseBreakdown.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <span className="text-slate-600">{item.name}</span>
                <span className="font-semibold text-slate-900">{item.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid xl:grid-cols-[0.9fr_1.1fr] gap-6">
        <Card>
          <div className="flex items-center gap-2 mb-4"><Activity className="w-4 h-4 text-primary" /><h3 className="font-bold text-slate-900">Daily Appointment Load</h3></div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={appointments.map((item, index) => ({ label: item.time, value: 3 - index }))}>
                <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" />
                <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: '10px', border: '1px solid #E5E7EB' }} />
                <Bar dataKey="value" fill="#0F6E56" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-4"><CalendarDays className="w-4 h-4 text-primary" /><h3 className="font-bold text-slate-900">Upcoming Reviews</h3></div>
          <div className="space-y-3">
            {appointments.map((item) => (
              <div key={item.time} className="rounded-clinical-sm border border-slate-100 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-4 mb-1">
                  <p className="text-sm font-bold text-slate-900">{item.label}</p>
                  <span className="text-xs text-slate-400">{item.time}</span>
                </div>
                <p className="text-sm text-slate-600">{item.note}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DoctorTrends;