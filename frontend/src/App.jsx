import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import User from './components/User';
import Admin from './components/Admin';

// Protected route component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setLoading(false);
        setIsAuthenticated(false);
        return;
      }

      try {
        const response = await fetch('http://127.0.0.1:5000/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const userData = await response.json();
          setIsAuthenticated(true);
          setUserRole(userData.role);
        } else {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Authentication error:", error);
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, [navigate]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

const ParticlesBackground = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generatedParticles = [];
    for (let i = 0; i < 50; i++) {
      const size = Math.random() * 6 + 2;
      generatedParticles.push({
        size,
        left: `${Math.random() * 100}%`,
        duration: `${3 + Math.random() * 5}s`,
        background: Math.random() > 0.5 ? '#00ffe0' : '#0ff',
      });
    }
    setParticles(generatedParticles);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-20 animate-floatUp"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: p.left,
            background: p.background,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
};

const Unauthorized = () => (
  <div className="flex flex-col items-center justify-center h-screen">
    <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
    <p>You don't have permission to access this page.</p>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen">
        <ParticlesBackground />
        <Routes>
          {/* Default route redirects to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Auth routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          
          {/* Protected routes */}
          <Route 
            path="/user" 
            element={
              <ProtectedRoute allowedRoles={['user', 'admin']}>
                <User />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Admin />
              </ProtectedRoute>
            } 
          />
          
          {/* Catch all route for unknown paths */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;