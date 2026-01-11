import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import useDataStore from './store/dataStore';
import TopNavigation from './components/TopNavigation';
import SubjectSelectionScreen from './screens/SubjectSelectionScreen';
import LessonsListScreen from './screens/LessonsListScreen';
import LessonViewScreen from './screens/LessonViewScreen';
import QuizScreen from './screens/QuizScreen';

function App() {
  const initialize = useDataStore(state => state.initialize);
  const initialized = useDataStore(state => state.initialized);
  const loading = useDataStore(state => state.loading);

  useEffect(() => {
    if (!initialized && !loading) {
      initialize();
    }
  }, [initialize, initialized, loading]);

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
    <BrowserRouter>
      <TopNavigation />
      <Routes>
        <Route path="/" element={<SubjectSelectionScreen />} />
        <Route path="/lessons" element={<LessonsListScreen />} />
        <Route path="/lesson/:lessonId" element={<LessonViewScreen />} />
        <Route path="/quiz/:quizId" element={<QuizScreen />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

