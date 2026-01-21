import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import useDataStore from './store/dataStore';
import TopNavigation from './components/TopNavigation';
import SubjectSelectionScreen from './screens/SubjectSelectionScreen';
import LessonsListScreen from './screens/LessonsListScreen';
import LessonViewScreen from './screens/LessonViewScreen';
import QuizScreen from './screens/QuizScreen';
import ShopScreen from './screens/ShopScreen';
import AdminPanel from './screens/AdminPanel';
import ArtGradingScreen from './screens/ArtGradingScreen';

function App() {
  const initialize = useDataStore(state => state.initialize);
  const initialized = useDataStore(state => state.initialized);
  const loading = useDataStore(state => state.loading);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    if (!initialized && !loading) {
      console.log('[App] Initializing data store...');
      initialize().catch((err) => {
        console.error('[App] Error during initialization:', err);
        setError(err.message || 'Failed to initialize app');
      });
    }
  }, [initialize, initialized, loading]);

  // Log initialization state changes
  useEffect(() => {
    console.log('[App] State:', { initialized, loading, hasError: !!error });
  }, [initialized, loading, error]);

  if (error) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        padding: '20px',
        textAlign: 'center'
      }}>
        <h2>Error Loading App</h2>
        <p>{error}</p>
        <button onClick={() => {
          setError(null);
          window.location.reload();
        }} style={{ marginTop: '20px', padding: '10px 20px' }}>
          Retry
        </button>
      </div>
    );
  }

  if (!initialized || loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <HashRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100vh', 
        overflow: 'hidden' 
      }}>
        <TopNavigation />
        <div style={{ 
          flex: 1, 
          overflow: 'hidden', 
          display: 'flex', 
          flexDirection: 'column' 
        }}>
          <Routes>
            <Route path="/" element={<SubjectSelectionScreen />} />
            <Route path="/lessons" element={<LessonsListScreen />} />
            <Route path="/lesson/:lessonId" element={<LessonViewScreen />} />
            <Route path="/quiz/:quizId" element={<QuizScreen />} />
            <Route path="/shop" element={<ShopScreen />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/art-grading" element={<ArtGradingScreen />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;

