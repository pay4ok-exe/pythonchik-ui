// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider, message } from 'antd';
import { setAntMessage } from './services/api';

// Auth Provider
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Layout components
import MainLayout from './components/layout/MainLayout';

// Pages
import Dashboard from './pages/Dashboard';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import TopicDetailPage from './pages/TopicDetailPage';
import LessonPage from './pages/LessonPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import LeaderboardPage from './pages/LeaderboardPage';
import NotFoundPage from './pages/NotFoundPage';
import ContactPage from './pages/ContactPage';
import SupportPage from './pages/SupportPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import LogoutPage from './pages/LogoutPage';
// Games page commented out as requested
// import GamesPage from './pages/GamesPage';
import CompilerPage from './pages/CompilerPage';

// App Context Provider
import { AppProvider } from './context/AppContext';
import EmailVerificationPage from './pages/EmailVerificationPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import LandingPage from './pages/LandingPage';
import GamesPage from './pages/GamesPage';
import GameDetailPage from './pages/GameDetailPage';
import GamePage from './pages/GamePage';

// Custom theme configuration for Ant Design
const theme = {
  token: {
    colorPrimary: '#FF8C00',
    colorSuccess: '#43A047',
    colorInfo: '#1890FF',
    colorWarning: '#FAAD14',
    colorError: '#F5222D',
    borderRadius: 8,
    fontFamily: '"Poppins", sans-serif',
  },
};

function App() {
  // Initialize message global instance for the API client
  useEffect(() => {
    setAntMessage(message);
  }, []);

  return (
    <ConfigProvider theme={theme}>
      <AuthProvider>
        <AppProvider>
          <Router>
            <Routes>
              {/* Public routes */}
              <Route path="/landing" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/logout" element={<LogoutPage />} />
              <Route path="/verification" element={<EmailVerificationPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              {/* <Route path="/reset-password" element={<ResetPasswordPage />} /> */}
              <Route path="/terms" element={<TermsOfServicePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/support" element={<SupportPage />} />

              {/* Protected routes */}
              <Route element={<ProtectedRoute />}>
                <Route element={<MainLayout />}>
                  <Route index element={<Navigate to="/dashboard" replace />} />
                  <Route path="games" element={<GamesPage />} />
                  <Route path="games/:slug" element={<GameDetailPage />} />
                  <Route path="games/custom" element={<GamePage />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="courses" element={<CoursesPage />} />
                  <Route path="courses/:courseId" element={<CourseDetailPage />} />
                  <Route path="courses/:courseId/topics/:topicId" element={<TopicDetailPage />} />
                  <Route
                    path="courses/:courseId/topics/:topicId/lessons/:lessonId"
                    element={<LessonPage />}
                  />
                  <Route path="profile" element={<ProfilePage />} />
                  <Route path="leaderboard" element={<LeaderboardPage />} />
                  <Route path="compiler" element={<CompilerPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Route>
            </Routes>
          </Router>
        </AppProvider>
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;
