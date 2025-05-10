import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedEmail, setFocusedEmail] = useState(false);
  const [focusedPassword, setFocusedPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('http://127.0.0.1:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Identifiants invalides');
      }

      const data = await response.json();
      
      // Stocker le token dans le localStorage
      localStorage.setItem('token', data.token);

      // Rediriger en fonction du rôle
      if (data.user && data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/user');
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-900 via-indigo-700 to-blue-300 font-sans overflow-hidden">
      <div className="w-full max-w-md">
        {/* Card container with glass effect */}
        <div className="bg-black/30 p-8 rounded-2xl backdrop-blur-lg border border-white/20 text-white shadow-2xl">
          {/* Logo/Branding section */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-purple-700 to-blue-500 text-white text-2xl font-bold shadow-lg">
            °ABDO°
            </div>
          </div>
          
          <h2 className="text-center text-white font-bold text-3xl mb-2">MARHBA BIKOM</h2>
          <p className="text-center text-blue-200 mb-8">Connectez-vous a votre compte </p>

          {errorMessage && (
            <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-6">
              <p className="text-center text-sm">{errorMessage}</p>
            </div>
          )}

          <div className="space-y-6">
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedEmail(true)}
                onBlur={() => setFocusedEmail(email !== '')}
                required
                placeholder=" "
                className="w-full p-4 bg-white/10 border border-white/30 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
              />
              <label
                htmlFor="email"
                className={`absolute left-3 text-gray-300 transition-all duration-200 pointer-events-none ${
                  focusedEmail || email ? 'top-1 text-xs text-blue-700' : 'top-4 text-base'
                }`}
              >
                Adresse e-mail
              </label>
            </div>

            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedPassword(true)}
                onBlur={() => setFocusedPassword(password !== '')}
                required
                placeholder=" "
                className="w-full p-4 bg-white/10 border border-white/30 rounded-lg text-white outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
              />
              <label
                htmlFor="password"
                className={`absolute left-3 text-gray-300 transition-all duration-200 pointer-events-none ${
                  focusedPassword || password ? 'top-1 text-xs text-blue-700' : 'top-4 text-base'
                }`}
              >
                Mot de passe
              </label>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`w-full py-4 bg-gradient-to-r from-blue-900 to-purple-900 text-white font-bold rounded-lg hover:opacity-90 transition-all duration-200 transform hover:translate-y-px focus:outline-none focus:ring-2 focus:ring-blue-900 ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Connexion en cours...
                </div>
              ) : (
                'Se connecter'
              )}
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 text-center text-gray-300">
            Nouveau chez °ABDO° ?{' '}
            <button
              className="text-blue-300 hover:text-blue-200 font-medium ml-1"
              onClick={() => navigate('/register')}
            >
              Créer un compte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;