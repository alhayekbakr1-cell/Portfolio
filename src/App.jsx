import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header';
import Hero from './components/Hero';
import ScrollProgress from './components/ScrollProgress';
import GoogleAnalytics from './components/GoogleAnalytics';
import ScrollToTop from './components/ScrollToTop';
import MotionBackground from './components/MotionBackground';

// Lazy load non-critical components
const Experience = lazy(() => import('./components/Experience'));
const QualitySafety = lazy(() => import('./components/QualitySafety'));
const TeachingMentorship = lazy(() => import('./components/TeachingMentorship'));
const Research = lazy(() => import('./components/Research'));
const AcademicVision = lazy(() => import('./components/AcademicVision'));
const Publications = lazy(() => import('./components/Publications'));
const Leadership = lazy(() => import('./components/Leadership'));
const Education = lazy(() => import('./components/Education'));
const Service = lazy(() => import('./components/Service'));
const References = lazy(() => import('./components/References'));
const ClinicalCalculators = lazy(() => import('./components/ClinicalCalculators'));
const MedicalAILab = lazy(() => import('./components/MedicalAI'));
const AIUpdates = lazy(() => import('./components/AIUpdates'));
const MedicalUpdates = lazy(() => import('./components/ClinicalUpdates'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const QuickAccessToolbar = lazy(() => import('./components/QuickAccessToolbar'));
const CollaborateMatcher = lazy(() => import('./components/CollaborateMatcher'));
const ClinicalMedia = lazy(() => import('./components/ClinicalMedia'));
// Simple loading fallback
const LoadingSpinner = () => (
  <div style={{ padding: '50px', textAlign: 'center', color: '#64748b' }}>
    Loading content...
  </div>
);

import ErrorBoundary from './components/ErrorBoundary';

// ... (imports remain)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Prevent excessive NCBI hits
      staleTime: 60 * 60 * 1000, // 1 hour caching for literature
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
      <div className="App">
        <MotionBackground />
        <ScrollToTop />
        <ScrollProgress />
        <GoogleAnalytics />
        <Header />

        <Suspense fallback={<LoadingSpinner />}>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  <AcademicVision />
                </>
              } />
              <Route path="/experience" element={<Experience />} />
              <Route path="/research" element={<Research />} />
              <Route path="/medical-ai" element={<MedicalAILab />} />
              <Route path="/ai-updates" element={<AIUpdates />} />
              <Route path="/medical-updates" element={<MedicalUpdates />} />
              <Route path="/clinical-updates" element={<Navigate to="/medical-updates" replace />} />
              <Route path="/news" element={<Navigate to="/medical-updates" replace />} />
              <Route path="/publications" element={<Publications />} />
              <Route path="/leadership" element={<Leadership />} />
              <Route path="/quality-safety" element={<QualitySafety />} />
              <Route path="/education" element={<Education />} />
              <Route path="/teaching" element={<TeachingMentorship />} />
              <Route path="/service" element={<Service />} />
              <Route path="/calculators" element={<ClinicalCalculators />} />
              <Route path="/references" element={<References />} />
              <Route path="/collaborate" element={<CollaborateMatcher />} />
              <Route path="/media-lab" element={<ClinicalMedia />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </ErrorBoundary>
        </Suspense>

        <Footer />
        <QuickAccessToolbar />
      </div>
    </Router>
    </QueryClientProvider>
  );
}

export default App;
