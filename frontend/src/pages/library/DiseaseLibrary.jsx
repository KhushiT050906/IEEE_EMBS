import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BookOpen, ExternalLink, ChevronRight, Eye, Shield, Users } from 'lucide-react';
import { Card, Badge, Button, cn } from '../../components/ui/Base';

const diseases = {
  psoriasis: {
    name: 'Psoriasis',
    summary: 'Chronic inflammatory plaques with scaling and sharply demarcated borders.',
    patient: ['Use simple moisturization routines.', 'Watch for flare triggers like stress and irritation.', 'Check cycle progress with uploaded images.'],
    clinician: ['Assess severity by distribution and thickness.', 'Consider topical, phototherapy, or systemic options.', 'Review safety with medications and allergies.'],
    sources: ['DermNet NZ', 'AAD', 'WHO'],
  },
  eczema: {
    name: 'Eczema',
    summary: 'Pruritic, inflamed, and barrier-damaged dermatitis that can wax and wane.',
    patient: ['Avoid fragranced products.', 'Keep bathing short and lukewarm.', 'Track itch intensity in the portal.'],
    clinician: ['Confirm contact, atopic, or irritant pattern.', 'Review triggers from the intake summary.', 'Escalate if infection or severe scratching is present.'],
    sources: ['DermNet NZ', 'AAD', 'WHO'],
  },
  tinea: {
    name: 'Tinea',
    summary: 'Fungal infection with annular scaling and edge activity.',
    patient: ['Keep affected skin dry.', 'Do not share towels or razors.', 'Complete antifungal therapy if prescribed.'],
    clinician: ['Check for steroid-masked tinea.', 'Confirm distribution and likely source.', 'Document resolution before closing the cycle.'],
    sources: ['DermNet NZ', 'AAD', 'WHO'],
  },
  warts: {
    name: 'Viral Warts',
    summary: 'HPV-related lesions that can be persistent and recur.',
    patient: ['Do not pick lesions.', 'Protect shared surfaces when advised.', 'Follow treatment duration carefully.'],
    clinician: ['Assess lesion count and site.', 'Consider recurrence risk and treatment history.', 'Explain expected treatment course clearly.'],
    sources: ['DermNet NZ', 'AAD', 'WHO'],
  },
  acne: {
    name: 'Acne',
    summary: 'Inflammatory and non-inflammatory lesions driven by follicles and sebum.',
    patient: ['Use non-comedogenic skincare.', 'Avoid over-washing or scrubbing.', 'Stay consistent with prescribed routines.'],
    clinician: ['Document lesion type and severity.', 'Watch for scarring and psychosocial burden.', 'Check if medications require safety review.'],
    sources: ['DermNet NZ', 'AAD', 'WHO'],
  },
};

const tabs = ['patient', 'clinician', 'sources'];

const DiseaseLibrary = () => {
  const { disease } = useParams();
  const navigate = useNavigate();
  const key = (disease || 'psoriasis').toLowerCase().replace(/[^a-z]/g, '');
  const active = diseases[key] || diseases.psoriasis;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Disease Library</p>
          <h1 className="text-2xl font-bold text-slate-900">{active.name}</h1>
          <p className="text-sm text-slate-500 mt-1">Patient-friendly guidance and clinician references in one shared clinical page.</p>
        </div>
        <Badge variant="info">Shared library</Badge>
      </div>

      <div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-6">
        <Card>
          <div className="flex items-center gap-2 mb-4"><BookOpen className="w-4 h-4 text-primary" /><h2 className="font-bold text-slate-900">Supported Diseases</h2></div>
          <div className="space-y-2">
            {Object.entries(diseases).map(([keyName, item]) => (
              <button
                key={keyName}
                onClick={() => navigate(`/library/${keyName}`)}
                className={cn(
                  'w-full flex items-center justify-between rounded-clinical-sm border px-4 py-3 text-left transition-colors',
                  key === keyName ? 'border-primary bg-primary-light text-primary' : 'border-slate-100 bg-slate-50 text-slate-700 hover:bg-slate-100'
                )}
              >
                <span className="font-medium">{item.name}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4 gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">What the AI looks for</h2>
              <p className="text-sm text-slate-500 mt-1">GradCAM explanation and skin-tone context for both roles.</p>
            </div>
            <Badge variant="mild">Fitzpatrick IV-VI supported</Badge>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="rounded-clinical-sm border border-slate-100 bg-slate-50 p-4">
              <div className="flex items-center gap-2 mb-2"><Eye className="w-4 h-4 text-primary" /><p className="text-sm font-bold text-slate-900">Visual signs</p></div>
              <p className="text-sm text-slate-600 leading-relaxed">Pattern, border definition, scale, erythema, and lesion distribution.</p>
            </div>
            <div className="rounded-clinical-sm border border-slate-100 bg-slate-50 p-4">
              <div className="flex items-center gap-2 mb-2"><Shield className="w-4 h-4 text-primary" /><p className="text-sm font-bold text-slate-900">Safety review</p></div>
              <p className="text-sm text-slate-600 leading-relaxed">Medication conflicts, allergies, and lifestyle plan interactions.</p>
            </div>
            <div className="rounded-clinical-sm border border-slate-100 bg-slate-50 p-4">
              <div className="flex items-center gap-2 mb-2"><Users className="w-4 h-4 text-primary" /><p className="text-sm font-bold text-slate-900">Context signals</p></div>
              <p className="text-sm text-slate-600 leading-relaxed">Intake responses, symptom trajectory, and cycle day progression.</p>
            </div>
          </div>

          <div className="mt-6 border-t border-slate-100 pt-6">
            <p className="text-sm text-slate-600 leading-relaxed">{active.summary}</p>
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex flex-wrap gap-2 mb-5">
          {tabs.map((tab) => (
            <Badge key={tab} variant={tab === 'sources' ? 'info' : 'mild'}>{tab === 'patient' ? 'Patient' : tab === 'clinician' ? 'Clinician' : 'Sources'}</Badge>
          ))}
        </div>

        <div className="grid xl:grid-cols-3 gap-6">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-3">Patient section</h3>
            <div className="space-y-2">
              {active.patient.map((item) => <div key={item} className="rounded-clinical-sm bg-slate-50 border border-slate-100 p-4 text-sm text-slate-600 leading-relaxed">{item}</div>)}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-3">Clinician section</h3>
            <div className="space-y-2">
              {active.clinician.map((item) => <div key={item} className="rounded-clinical-sm bg-slate-50 border border-slate-100 p-4 text-sm text-slate-600 leading-relaxed">{item}</div>)}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-3">Linked sources</h3>
            <div className="space-y-2">
              {active.sources.map((item) => (
                <div key={item} className="flex items-center justify-between rounded-clinical-sm bg-slate-50 border border-slate-100 p-4 text-sm text-slate-600">
                  <span>{item}</span>
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DiseaseLibrary;