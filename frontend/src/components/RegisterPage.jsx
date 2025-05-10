import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user');
  const [focusedName, setFocusedName] = useState(false);
  const [focusedEmail, setFocusedEmail] = useState(false);
  const [focusedPassword, setFocusedPassword] = useState(false);
  const [focusedConfirmPassword, setFocusedConfirmPassword] = useState(false);
  const [focusedRole, setFocusedRole] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoading(true);

    if (password !== confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de l\'inscription');
      }

      const data = await response.json();
      
      setSuccessMessage("Compte créé avec succès ! Redirection vers la page de connexion...");
      
      // Stocker le token si renvoyé par l'API
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      
      // Redirection après un délai
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center full-screen bg-blue-500 font-orbitron bg-[radial-gradient(ellipse_at_center,_rgba(77,0,141,0.3),rgba(0,20,70,0.5),_rgba(0,0,0,0.8))]">
      {/* Glowing effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-purple-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-40 h-40 bg-cyan-400 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative w-full max-w-sm">
        <div className="bg-black/70 p-4 rounded-2xl backdrop-blur-xl border border-cyan-500 text-white shadow-[0_0_30px_rgba(6,182,212,0.25)] overflow-hidden">
          <h2 className="text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-500 text-2xl mb-6 tracking-wide">
            CREER UN COMPTE
          </h2>

          {/* Alert messages */}
          {errorMessage && (
            <div className="mb-6 p-3 bg-red-900 border border-red-500 rounded-lg text-red-400 text-center text-sm">
              {errorMessage}
            </div>
          )}
          
          {successMessage && (
            <div className="mb-6 p-3 bg-green-900/40 border border-green-500 rounded-lg text-green-400 text-center text-sm">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="relative mb-6 group">
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setFocusedName(true)}
                onBlur={() => setFocusedName(name !== '')}
                required
                placeholder=" "
                className="w-full p-4 bg-black/30 border-b-2 border-cyan-500/50 rounded-t-lg text-white outline-none transition-all duration-300 focus:border-cyan-400 focus:shadow-[0_4px_12px_rgba(6,182,212,0.25)]"
              />
              <label
                htmlFor="name"
                className={`absolute left-3 text-gray-400 transition-all duration-300 pointer-events-none ${
                  focusedName || name 
                    ? 'top-0 text-xs text-cyan-400' 
                    : 'top-4 text-sm'
                }`}
              >
                Nom complet
              </label>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 group-hover:w-full"></div>
            </div>

            {/* Email Field */}
            <div className="relative mb-6 group">
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
                className="w-full p-4 bg-black/30 border-b-2 border-cyan-500/50 rounded-t-lg text-white outline-none transition-all duration-300 focus:border-cyan-400 focus:shadow-[0_4px_12px_rgba(6,182,212,0.25)]"
              />
              <label
                htmlFor="email"
                className={`absolute left-3 text-gray-400 transition-all duration-300 pointer-events-none ${
                  focusedEmail || email 
                    ? 'top-0 text-xs text-cyan-400' 
                    : 'top-4 text-sm'
                }`}
              >
                Adresse e-mail
              </label>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 group-hover:w-full"></div>
            </div>

            {/* Password Field */}
            <div className="relative mb-6 group">
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
                className="w-full p-4 bg-black/30 border-b-2 border-cyan-500/50 rounded-t-lg text-white outline-none transition-all duration-300 focus:border-cyan-400 focus:shadow-[0_4px_12px_rgba(6,182,212,0.25)]"
              />
              <label
                htmlFor="password"
                className={`absolute left-3 text-gray-400 transition-all duration-300 pointer-events-none ${
                  focusedPassword || password 
                    ? 'top-0 text-xs text-cyan-400' 
                    : 'top-4 text-sm'
                }`}
              >
                Mot de passe
              </label>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 group-hover:w-full"></div>
            </div>

            {/* Confirm Password Field */}
            <div className="relative mb-6 group">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onFocus={() => setFocusedConfirmPassword(true)}
                onBlur={() => setFocusedConfirmPassword(confirmPassword !== '')}
                required
                placeholder=" "
                className="w-full p-4 bg-black/30 border-b-2 border-cyan-500/50 rounded-t-lg text-white outline-none transition-all duration-300 focus:border-cyan-400 focus:shadow-[0_4px_12px_rgba(6,182,212,0.25)]"
              />
              <label
                htmlFor="confirmPassword"
                className={`absolute left-3 text-gray-400 transition-all duration-300 pointer-events-none ${
                  focusedConfirmPassword || confirmPassword 
                    ? 'top-0 text-xs text-cyan-400' 
                    : 'top-4 text-sm'
                }`}
              >
                Confirmez le mot de passe
              </label>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 group-hover:w-full"></div>
            </div>

            {/* Role Selection */}
            <div className="relative mb-8 group">
              <select
                id="role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                onFocus={() => setFocusedRole(true)}
                onBlur={() => setFocusedRole(true)}
                className="w-full p-4 bg-black/30 border-b-2 border-cyan-500/50 rounded-t-lg text-white outline-none appearance-none transition-all duration-300 focus:border-cyan-400 focus:shadow-[0_4px_12px_rgba(6,182,212,0.25)]"
              >
                <option value="user">Utilisateur</option>
                <option value="admin">Administrateur</option>
              </select>
              <label
                htmlFor="role"
                className="absolute top-0 left-3 text-xs text-cyan-400 pointer-events-none"
              >
                Rôle
              </label>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 group-hover:w-full"></div>
            </div>

            {/* Submit Button with neon glow */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 px-6 mt-4 relative overflow-hidden rounded-lg font-bold text-lg transition-all duration-300
                ${isLoading 
                  ? 'bg-gray-700 text-gray-300 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] hover:from-cyan-400 hover:to-purple-500'
                }`}
            >
              <span className="relative z-10">
                {isLoading ? 'Inscription en cours...' : 'S\'INSCRIRE'}
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></span>
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-8 text-gray-300">
            Déjà inscrit ?{' '}
            <button
              className="text-cyan-400 hover:text-purple-400 transition-colors duration-300 font-medium"
              onClick={() => navigate('/login')}
            >
              Se connecter
            </button>
          </div>
          
          {/* Decorative element */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500"></div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;