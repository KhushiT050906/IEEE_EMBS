import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Users, AlertTriangle, ChevronRight, ShieldCheck, CalendarDays } from 'lucide-react';
import { Button, Card, Badge, Input, cn } from '../../components/ui/Base';

const patients = [
  { id: 'P001', name: 'Rohan Sharma', disease: 'Psoriasis', severity: 'Severe', day: 12, status: 'Warning', alerts: 2, next: 'Prescription review' },
  { id: 'P002', name: 'Anjali Gupta', disease: 'Eczema', severity: 'Mild', day: 22, status: 'Improving', alerts: 0, next: 'Routine follow-up' },
  { id: 'P003', name: 'Vikram Singh', disease: 'Acne', severity: 'Moderate', day: 5, status: 'Needs Prescription', alerts: 1, next: 'Medication safety check' },
  { id: 'P004', name: 'Priya Verma', disease: 'Tinea', severity: 'Mild', day: 28, status: 'End of Cycle', alerts: 0, next: 'Final report' },
];

const queue = [
  { label: 'Stagnation alert', value: '4' },
  { label: 'Safety conflicts', value: '2' },
  { label: 'Prescriptions due', value: '6' },
];

const DoctorPatients = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-6">
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-4 h-4 text-primary" />
            <h1 className="text-lg font-bold text-slate-900">Patient Registry</h1>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {queue.map((item) => (
              <div key={item.label} className="rounded-clinical-sm border border-slate-100 bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{item.label}</p>
                <p className="text-2xl font-bold text-slate-900 mt-2">{item.value}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-slate-900 text-white border-none">
          <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">Clinical Note</p>
          <h2 className="text-lg font-bold mb-2">Queue organized by urgency</h2>
          <p className="text-sm text-slate-400 leading-relaxed">Use the registry to open patient detail, write prescriptions, and track cycle status without leaving the workspace.</p>
        </Card>
      </div>

      <Card className="p-0 overflow-hidden bg-white border-clinical-border">
        <div className="px-6 pt-6 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Active Patients</h2>
            <p className="text-sm text-slate-500 mt-1">Structured registry with cycle day, status, and next action.</p>
          </div>
          <div className="flex gap-2">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input placeholder="Search by name or ID" className="pl-10 h-10" />
            </div>
            <Button variant="outline" className="h-10 px-3"><Filter className="w-4 h-4 mr-2" /> Filter</Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-clinical-border text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                <th className="px-6 py-4">Patient</th>
                <th className="px-6 py-4">Condition</th>
                <th className="px-6 py-4">Cycle Day</th>
                <th className="px-6 py-4">Severity</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Alerts</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {patients.map((patient) => (
                <tr key={patient.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-[10px] font-bold">{patient.name.split(' ').map((part) => part[0]).join('')}</div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{patient.name}</p>
                        <p className="text-xs text-slate-400">{patient.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{patient.disease}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">Day {patient.day}</td>
                  <td className="px-6 py-4"><Badge variant={patient.severity.toLowerCase()}>{patient.severity}</Badge></td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      'text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded',
                      patient.status === 'Warning' ? 'bg-red-50 text-danger' : patient.status === 'Needs Prescription' ? 'bg-amber-50 text-amber-700' : 'bg-green-50 text-green-700'
                    )}>{patient.status}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{patient.alerts}</td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm" onClick={() => navigate(`/doctor/patient/${patient.id}`)}>
                      Open <ChevronRight className="ml-1 w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid xl:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center gap-2 mb-3"><ShieldCheck className="w-4 h-4 text-primary" /><h3 className="font-bold text-slate-900">Next Prescription</h3></div>
          <p className="text-sm text-slate-600 leading-relaxed">Patients ready for medication review appear here. Safety conflicts are always surfaced before submission.</p>
        </Card>
        <Card>
          <div className="flex items-center gap-2 mb-3"><CalendarDays className="w-4 h-4 text-primary" /><h3 className="font-bold text-slate-900">Upcoming Review</h3></div>
          <p className="text-sm text-slate-600 leading-relaxed">Check-ins due today and tomorrow are grouped in the queue on the dashboard for faster triage.</p>
        </Card>
        <Card>
          <div className="flex items-center gap-2 mb-3"><AlertTriangle className="w-4 h-4 text-danger" /><h3 className="font-bold text-slate-900">Escalations</h3></div>
          <p className="text-sm text-slate-600 leading-relaxed">Stagnation and worsening alerts from the Tracking Agent are prioritized at the top of the doctor workspace.</p>
        </Card>
      </div>
    </div>
  );
};

export default DoctorPatients;