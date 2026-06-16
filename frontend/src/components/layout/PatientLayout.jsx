import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Camera, Activity, Pill, UserCircle, LogOut, Bell, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../ui/Base';

const PatientLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', path: '/patient/dashboard', icon: LayoutDashboard },
    { name: 'Upload Scan', path: '/patient/upload', icon: Camera },
    { name: 'Progress', path: '/patient/progress', icon: Activity },
    { name: 'Lifestyle Plan', path: '/patient/lifestyle-plan', icon: UserCircle },
    { name: 'Medications', path: '/patient/medications', icon: Pill },
  ];

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-clinical-border hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-100 flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Shield className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">DermaAI</span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-4 py-3 rounded-clinical-sm text-sm font-medium transition-colors",
                isActive ? "bg-primary-light text-primary" : "text-slate-500 hover:bg-slate-50"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-8 h-8 rounded-full bg-slate-200" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900 truncate">{user?.name}</p>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Patient</p>
            </div>
            <button onClick={handleLogout} className="text-slate-400 hover:text-danger">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-clinical-border px-6 flex items-center justify-between shrink-0 sticky top-0 z-50">
          <h2 className="text-lg font-bold text-slate-900 md:hidden">DermaAI</h2>
          <div className="md:block hidden" /> {/* spacer */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-primary relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-danger rounded-full" />
            </button>
            <div className="w-8 h-8 rounded-full bg-slate-200 md:hidden" />
          </div>
        </header>

        <div className="p-6 max-w-5xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
};

export default PatientLayout;
