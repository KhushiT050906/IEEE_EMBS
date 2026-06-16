import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Activity, Search, Clock, ChevronRight } from 'lucide-react';
import { Button, Card } from '../components/ui/Base';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Shield className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">DermaAI</span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/login')}>Sign In</Button>
          <Button onClick={() => navigate('/login')}>Get Started</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20 max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6">
          Multi-agent AI <span className="text-primary italic">Dermatology.</span>
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          The next generation of skin health monitoring. Clinical-grade AI agents working together 
          to assist doctors and empower patients through 30-day treatment cycles.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="h-14 px-8 text-base" onClick={() => navigate('/login')}>
            I'm a Patient <ChevronRight className="ml-2 w-5 h-5" />
          </Button>
          <Button size="lg" variant="outline" className="h-14 px-8 text-base" onClick={() => navigate('/login')}>
            I'm a Doctor
          </Button>
        </div>
        
        {/* Trust Badge */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all">
          <div className="flex items-center gap-2 font-bold text-slate-800">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-[10px] text-white">IEEE</div>
            EMBS Member
          </div>
          <div className="text-sm font-medium text-slate-600 px-4 py-2 border border-slate-200 rounded-full">
            RAG-Grounded Medical Intelligence
          </div>
          <div className="text-sm font-medium text-slate-600 border-l-2 border-primary pl-4">
            Expertise in South Asian Skin Tones (IV-VI)
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-surface py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">The Clinical Pipeline</h2>
            <p className="text-slate-500">Autonomous agents working in sequence to ensure accuracy and safety.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Search, title: '1. AI Analysis', desc: 'Vision Transformers identify conditions with GradCAM heatmaps.' },
              { icon: Activity, title: '2. Safety Check', desc: 'Agents verify contraindications against your history.' },
              { icon: Clock, title: '3. 30-Day Plan', desc: 'Lifestyle agents generate personalized diet and activity regimens.' },
              { icon: Shield, title: '4. Doctor Review', desc: 'Final human-in-the-loop validation of all prescriptions.' }
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-clinical border border-slate-100">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Conditions */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 mb-10 text-center">Comprehensive Dermatological Support</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {['Psoriasis', 'Eczema', 'Tinea', 'Viral Warts', 'Acne'].map((disease) => (
            <Card key={disease} className="flex items-center justify-center h-24 hover:border-primary transition-colors cursor-default">
              <span className="font-semibold text-slate-700">{disease}</span>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <Shield className="text-white w-4 h-4" />
              </div>
              <span className="font-bold tracking-tight text-slate-900">DermaAI</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Disclaimer: DermaAI is a clinical decision support tool. It does not replace the judgment of a licensed dermatologist.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-12">
            <div>
              <h4 className="font-bold text-sm text-slate-900 mb-4">Platform</h4>
              <ul className="text-xs text-slate-500 space-y-2">
                <li>Disease Library</li>
                <li>Research & RAG</li>
                <li>Ethics & Privacy</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 mb-4">Support</h4>
              <ul className="text-xs text-slate-500 space-y-2">
                <li>Help Center</li>
                <li>Terms of Service</li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
