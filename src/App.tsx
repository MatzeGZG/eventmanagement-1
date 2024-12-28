import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomeFeed } from './features/feed/components/HomeFeed';
import { MapProvider } from './contexts/MapContext';
import { MapContainer } from './features/map';
import { CalendarContainer } from './components/calendar/CalendarContainer';
import { AuthProvider } from './features/auth';
import { AuthContainer } from './features/auth/components/AuthContainer';
import { ErrorBoundary } from './utils/errorHandling/ErrorBoundary';
import { NotFound } from './components/common/NotFound';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <AuthProvider>
          <Router>
            <MapProvider>
              <Layout>
                <Routes>
                  <Route path="/" element={<HomeFeed />} />
                  <Route path="/feed" element={<HomeFeed />} />
                  <Route path="/calendar" element={<CalendarContainer />} />
                  <Route path="/map" element={<MapContainer />} />
                  <Route path="/login" element={<AuthContainer />} />
                  <Route path="/signup" element={<AuthContainer />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>
            </MapProvider>
          </Router>
        </AuthProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default App;