import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, ArrowRight } from 'lucide-react';
import { Button, Input, Card } from '../../components/ui/Base';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role) => {
    login(email, password, role);
    navigate(role === 'doctor' ? '/doctor/dashboard' : '/patient/dashboard');
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
          <Shield className="text-white w-6 h-6" />
        </div>
        <span className="text-2xl font-bold tracking-tight text-slate-900">DermaAI</span>
      </div>

      <Card className="w-full max-w-md p-8 bg-white">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Welcome back</h1>
        <p className="text-sm text-slate-500 mb-8">Clinical-grade skin health monitoring.</p>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <Input 
            label="Email Address" 
            placeholder="name@example.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input 
            label="Password" 
            type="password" 
            placeholder="••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <div className="flex items-center justify-between py-2">
            <Link to="#" className="text-xs font-medium text-primary hover:underline">Forgot password?</Link>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <Button onClick={() => handleLogin('patient')}>
              Patient Login
            </Button>
            <Button variant="outline" onClick={() => handleLogin('doctor')}>
              Doctor Login
            </Button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400">
            Don't have an account? {' '}
            <Link to="/register/patient" className="text-primary font-bold hover:underline">Register as Patient</Link>
          </p>
        </div>
      </Card>

      <p className="mt-8 text-xs text-slate-400 max-w-sm text-center line-clamp-2">
        By signing in, you agree to our Terms of Clinical Service and Data Privacy Policy.
      </p>
    </div>
  );
};

export default Login;
