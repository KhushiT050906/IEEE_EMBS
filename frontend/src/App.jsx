import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Layouts
import PatientLayout from './components/layout/PatientLayout';
import DoctorLayout from './components/layout/DoctorLayout';

// Public Pages
import Landing from './pages/Landing';
import Login from './pages/auth/Login';

// Patient Pages
import PatientDashboard from './pages/patient/Dashboard';
import PatientUpload from './pages/patient/Upload';
import PatientReport from './pages/patient/Report';
import PatientProgress from './pages/patient/Progress';
import PatientLifestylePlan from './pages/patient/LifestylePlan';
import PatientMedications from './pages/patient/Medications';

// Doctor Pages
import DoctorDashboard from './pages/doctor/Dashboard';
import PatientDetail from './pages/doctor/PatientDetail';
import PrescriptionWriter from './pages/doctor/Prescribe';
import DoctorPatients from './pages/doctor/Patients';
import DoctorTrends from './pages/doctor/Trends';
import DoctorReport from './pages/doctor/Report';
import DiseaseLibrary from './pages/library/DiseaseLibrary';

const Unauthorized = () => (
  <div className="min-h-screen flex items-center justify-center bg-surface">
    <div className="text-center p-8 bg-white rounded-clinical shadow-clinical border border-clinical-border border-l-4 border-l-danger">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Access Denied</h1>
      <p className="text-slate-500 mb-6">You do not have permission to access this portal.</p>
      <button 
        onClick={() => window.location.href = '/login'}
        className="text-primary font-bold hover:underline"
      >
        Return to Login
      </button>
    </div>
  </div>
);

const NotFound = () => (
   <div className="min-h-screen flex items-center justify-center bg-surface">
     <div className="text-center">
       <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
       <p className="text-slate-500 mb-8">The page you are looking for does not exist or has been moved.</p>
       <button 
         onClick={() => window.location.href = '/'}
         className="btn-primary"
       >
         Back to Home
       </button>
     </div>
   </div>
 );

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/library/:disease" element={<ProtectedRoute allowedRoles={['patient', 'doctor']}><DiseaseLibrary /></ProtectedRoute>} />

            {/* Patient Routes */}
            <Route
              path="/patient/*"
              element={
                <ProtectedRoute allowedRoles={['patient']}>
                  <PatientLayout>
                    <Routes>
                      <Route path="dashboard" element={<PatientDashboard />} />
                      <Route path="upload" element={<PatientUpload />} />
                      <Route path="report/:id" element={<PatientReport />} />
                      <Route path="progress" element={<PatientProgress />} />
                      <Route path="lifestyle-plan" element={<PatientLifestylePlan />} />
                      <Route path="medications" element={<PatientMedications />} />
                      <Route path="*" element={<Navigate to="dashboard" replace />} />
                    </Routes>
                  </PatientLayout>
                </ProtectedRoute>
              }
            />

            {/* Doctor Routes */}
            <Route
              path="/doctor/*"
              element={
                <ProtectedRoute allowedRoles={['doctor']}>
                  <DoctorLayout>
                    <Routes>
                      <Route path="dashboard" element={<DoctorDashboard />} />
                      <Route path="patients" element={<DoctorPatients />} />
                      <Route path="trends" element={<DoctorTrends />} />
                      <Route path="patient/:id" element={<PatientDetail />} />
                      <Route path="prescribe/:patientId" element={<PrescriptionWriter />} />
                      <Route path="report/:patientId/:cycleId" element={<DoctorReport />} />
                      <Route path="library" element={<DiseaseLibrary />} />
                      <Route path="library/:disease" element={<DiseaseLibrary />} />
                      <Route path="*" element={<Navigate to="dashboard" replace />} />
                    </Routes>
                  </DoctorLayout>
                </ProtectedRoute>
              }
            />

            {/* Error Routes */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
