import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Library, BarChart3, Settings, LogOut, Bell, Shield, UserPlus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../ui/Base';

const DoctorLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', path: '/doctor/dashboard', icon: LayoutDashboard },
    { name: 'My Patients', path: '/doctor/patients', icon: Users },
    { name: 'Clinical Trends', path: '/doctor/trends', icon: BarChart3 },
    { name: 'Disease Library', path: '/doctor/library', icon: Library },
  ];

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-clinical-border flex flex-col shrink-0 overflow-y-auto">
        <div className="p-6 border-b border-slate-100 flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-light rounded-lg flex items-center justify-center">
            <Shield className="text-primary w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 font-sans">DermaAI <span className="text-[10px] bg-primary-light text-primary px-1.5 py-0.5 rounded ml-1 align-top uppercase tracking-wider">Doc</span></span>
        </div>

        <div className="p-4">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-primary text-white rounded-clinical-sm text-sm font-bold hover:bg-primary-dark transition-all">
            <UserPlus className="w-4 h-4" />
            New Consultant
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-4 py-3 rounded-clinical-sm text-sm font-medium transition-all",
                  isActive ? "bg-primary-light text-primary" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </NavLink>
          ))}
        </nav>

          <div className="p-4 border-t border-slate-100">
            <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-clinical-sm border border-slate-100">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">SW</div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-900 truncate">{user?.name}</p>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Dermatologist</p>
            </div>
              <button onClick={handleLogout} className="text-slate-400 hover:text-danger">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto bg-white md:bg-surface">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-clinical-border px-8 flex items-center justify-between shrink-0 sticky top-0 z-50">
          <div className="flex items-center gap-4">
             <div className="text-sm font-bold text-slate-400 flex items-center gap-2">
                Clinical Workspace <span className="text-slate-200">/</span> <span className="text-slate-900">Patient Triage</span>
             </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-8 w-px bg-slate-100 mx-2" />
            <button className="p-2 text-slate-400 hover:text-primary relative transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-danger rounded-full border-2 border-white" />
            </button>
            <button className="p-2 text-slate-400 hover:text-primary transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DoctorLayout;
