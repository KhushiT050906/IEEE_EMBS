import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, AlertTriangle, TrendingUp, Calendar, ChevronRight, Filter, Search } from 'lucide-react';
import { Button, Card, Badge, Input, cn } from '../../components/ui/Base';

const DoctorDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { label: 'Active Patients', value: '142', icon: Users, color: 'text-primary' },
    { label: 'Pending Reviews', value: '18', icon: AlertTriangle, color: 'text-amber-500' },
    { label: 'Recovery Rate', value: '84%', icon: TrendingUp, color: 'text-green-500' },
    { label: 'Appointments', value: '12', icon: Calendar, color: 'text-blue-500' },
  ];

  const patients = [
    { id: 'P001', name: 'Rohan Sharma', disease: 'Psoriasis', severity: 'Severe', day: 12, flags: 2, status: 'Warning' },
    { id: 'P002', name: 'Anjali Gupta', disease: 'Eczema', severity: 'Mild', day: 22, flags: 0, status: 'Improving' },
    { id: 'P003', name: 'Vikram Singh', disease: 'Acne', severity: 'Moderate', day: 5, flags: 1, status: 'Needs Prescription' },
    { id: 'P004', name: 'Priya Verma', disease: 'Tinea', severity: 'Mild', day: 28, flags: 0, status: 'End of Cycle' },
  ];

  return (
    <div className="space-y-8">
      <section className="grid xl:grid-cols-[1.35fr_0.65fr] gap-6">
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <Card key={i} className="bg-white">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-slate-50 ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                    <p className="text-xl font-bold text-slate-900">{stat.value}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="bg-slate-900 text-white border-none">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-slate-400 mb-1">Command Center</p>
                <h2 className="text-lg font-bold">Doctor operations at a glance</h2>
                <p className="text-sm text-slate-400 mt-1">Priority flags, pending work, and patient triage are organized side by side.</p>
              </div>
              <Badge variant="severe">6 Critical Alerts</Badge>
            </div>
          </Card>

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Priority Patient Flags</h2>
              <span className="text-xs text-slate-400 uppercase tracking-widest">Agent escalations</span>
            </div>
            <div className="grid xl:grid-cols-2 gap-4">
              <Card className="border-l-4 border-l-danger flex items-start justify-between gap-4 p-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                    <AlertTriangle className="text-danger w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Rohan Sharma (P001)</h4>
                    <p className="text-sm text-slate-500 mt-1">Tracking Agent: 15% increase in affected area since Day 0.</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => navigate('/doctor/patient/P001')}>Review</Button>
              </Card>

              <Card className="border-l-4 border-l-amber-500 flex items-start justify-between gap-4 p-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                    <AlertTriangle className="text-amber-500 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Vikram Singh (P003)</h4>
                    <p className="text-sm text-slate-500 mt-1">Medicine Safety Agent: Multiple drug-food interactions flagged.</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => navigate('/doctor/patient/P003')}>Review</Button>
              </Card>
            </div>
          </section>
        </div>

        <Card className="p-6 h-full">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-slate-900">Today&apos;s Work Queue</h3>
            <Badge variant="info">12 appointments</Badge>
          </div>
          <div className="space-y-4">
            {[
              { time: '10:30', name: 'Rohan Sharma', task: 'Prescription review', tone: 'severe' },
              { time: '11:10', name: 'Vikram Singh', task: 'Safety conflict resolution', tone: 'moderate' },
              { time: '12:40', name: 'Anjali Gupta', task: 'Routine follow-up', tone: 'mild' },
            ].map((item) => (
              <div key={item.time} className="rounded-clinical-sm border border-slate-100 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <p className="text-sm font-bold text-slate-900">{item.name}</p>
                  <Badge variant={item.tone}>{item.time}</Badge>
                </div>
                <p className="text-sm text-slate-600">{item.task}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid xl:grid-cols-[1.5fr_0.5fr] gap-6 items-start">
        <Card className="p-0 overflow-hidden bg-white border-clinical-border">
          <div className="px-6 pt-6 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Active Patient Triage</h2>
              <p className="text-sm text-slate-500 mt-1">Desktop-first table layout for rapid clinical review.</p>
            </div>
            <div className="flex gap-2">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input placeholder="Search patients..." className="pl-10 h-10" />
              </div>
              <Button variant="outline" className="h-10 px-3"><Filter className="w-4 h-4 mr-2" /> Filter</Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-clinical-border font-bold text-[10px] text-slate-400 uppercase tracking-widest">
                  <th className="px-6 py-4">Patient ID</th>
                  <th className="px-6 py-4">Patient Name</th>
                  <th className="px-6 py-4">Clinical Condition</th>
                  <th className="px-6 py-4">Cycle Progress</th>
                  <th className="px-6 py-4">Severity</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {patients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 text-sm font-bold text-primary">{patient.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 text-[10px] font-bold">{patient.name.split(' ').map(n => n[0]).join('')}</div>
                        <div className="text-sm font-bold text-slate-900">{patient.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{patient.disease}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden max-w-[80px]">
                          <div className="h-full bg-primary" style={{ width: `${(patient.day / 30) * 100}%` }} />
                        </div>
                        <span className="text-[10px] font-bold text-slate-400">Day {patient.day}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={patient.severity.toLowerCase()}>{patient.severity}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        'text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded',
                        patient.status === 'Warning' ? 'bg-red-50 text-danger' :
                        patient.status === 'Needs Prescription' ? 'bg-amber-50 text-amber-700' : 'bg-green-50 text-green-700'
                      )}>
                        {patient.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="sm" onClick={() => navigate(`/doctor/patient/${patient.id}`)}>
                        View Case <ChevronRight className="ml-1 w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-slate-50 border-t border-clinical-border flex items-center justify-center">
            <Button variant="ghost" size="sm" className="text-slate-400 font-bold text-xs uppercase tracking-widest">Load More Records</Button>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-bold text-slate-900 mb-4">Clinical Snapshot</h3>
            <div className="space-y-4 text-sm text-slate-600">
              <div className="flex items-center justify-between"><span>Psoriasis</span><span className="font-semibold text-slate-900">52</span></div>
              <div className="flex items-center justify-between"><span>Eczema</span><span className="font-semibold text-slate-900">34</span></div>
              <div className="flex items-center justify-between"><span>Tinea</span><span className="font-semibold text-slate-900">28</span></div>
              <div className="flex items-center justify-between"><span>Acne</span><span className="font-semibold text-slate-900">18</span></div>
            </div>
          </Card>

          <Card className="p-6 bg-slate-900 text-white border-none">
            <p className="text-xs uppercase tracking-widest text-slate-400 mb-2">Workflow</p>
            <h3 className="text-lg font-bold mb-2">Review, prescribe, and monitor</h3>
            <p className="text-sm text-slate-400 leading-relaxed">The doctor portal is now arranged as a workspace rather than a vertical stack of isolated cards.</p>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default DoctorDashboard;
