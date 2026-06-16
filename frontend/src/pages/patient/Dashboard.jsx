import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Calendar, AlertCircle, ExternalLink, Activity, Info, Pill } from 'lucide-react';
import { Button, Card, Badge } from '../../components/ui/Base';
import { TimelineBar } from '../../components/ui/TimelineBar';

const PatientDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500">Welcome back. Your 30-day treatment cycle is in progress.</p>
      </div>

      {/* Cycle Timeline */}
      <Card className="bg-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Treatment Progress</h3>
          <Badge variant="info">Day 12 of 30</Badge>
        </div>
        <TimelineBar currentDay={12} />
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Next Action Card */}
        <Card className="md:col-span-2 flex flex-col justify-between border-primary/20 bg-primary-light/30">
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shrink-0">
              <Camera className="text-white w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Upcoming: Day 20 Check-in</h3>
              <p className="text-sm text-slate-500 mt-1">Your next clinical scan is due in 8 days. Maintain your current lifestyle plan until then.</p>
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <Button onClick={() => navigate('/patient/upload')}>Preview Upload Flow</Button>
            <Button variant="ghost">Set Reminder</Button>
          </div>
        </Card>

        {/* Diagnosis Summary */}
        <Card>
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Current Diagnosis</h3>
          <p className="text-lg font-bold text-slate-900 mb-1">Psoriasis Vulgaris</p>
          <Badge variant="moderate">Moderate Severity</Badge>
          <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">Last scanned 2 days ago</span>
            <Button variant="ghost" size="sm" className="h-8 p-0 text-primary">View Report <ExternalLink className="ml-1 w-3 h-3" /></Button>
          </div>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Today's Lifestyle Snapshot */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-slate-900">Today's Lifestyle Plan</h3>
            <Button variant="ghost" size="sm" onClick={() => navigate('/patient/lifestyle-plan')}>View Full Plan</Button>
          </div>
          <div className="space-y-4">
            {[
              { label: 'Diet', desc: 'Turmeric-infused daal, avoid citrus fruits', icon: Info },
              { label: 'Sleep', desc: 'Target 8 hours, no screen 1hr before bed', icon: Calendar },
              { label: 'Skincare', desc: 'Apply prescribed emollient twice daily', icon: Activity },
            ].map((item, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-8 h-8 rounded-clinical bg-slate-50 flex items-center justify-center shrink-0">
                  <item.icon className="w-4 h-4 text-slate-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{item.label}</p>
                  <p className="text-sm text-slate-800">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Medication Card (Read-only) */}
        <Card className="border-l-4 border-l-primary">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-primary">
              <Pill className="w-5 h-5" />
              <h3 className="text-sm font-bold">Active Prescription</h3>
            </div>
            <Badge variant="mild">Verified</Badge>
          </div>
          <div className="bg-slate-50 rounded-clinical p-4 mb-4">
            <p className="text-sm font-bold text-slate-900">Clobetasol Propionate (0.05%)</p>
            <p className="text-xs text-slate-500 mt-1">Apply thin layer to affected areas twice daily for 14 days.</p>
          </div>
          <p className="text-[10px] text-slate-400 italic">
            Prescribed by Dr. Sarah Wilson on June 10, 2026. Patient restricted from modifying prescriptions.
          </p>
          <div className="mt-4 flex items-center gap-2 px-3 py-2 bg-green-50 rounded-clinical-sm border border-green-100">
            <Activity className="w-3 h-3 text-green-600" />
            <span className="text-[10px] font-medium text-green-700 uppercase tracking-wider">Medicine Safety Agent: No Conflicts</span>
          </div>
        </Card>
      </div>

      {/* Appointment Card */}
      <Card className="bg-slate-900 text-white border-none shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-widest mb-1">Upcoming Telehealth</p>
            <h3 className="text-lg font-bold">Follow-up with Dr. Wilson</h3>
            <p className="text-sm text-slate-400">June 20, 2026 • 10:30 AM IST</p>
          </div>
          <Button className="bg-primary hover:bg-primary-dark border-none">Join Meeting</Button>
        </div>
      </Card>
    </div>
  );
};

export default PatientDashboard;
