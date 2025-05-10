import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, LogOut, User, Settings, Database } from 'lucide-react';

const Admin = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Non authentifié');
          setLoading(false);
          return;
        }

        const response = await fetch('http://127.0.0.1:5000/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }

        const data = await response.json();
        
        // Vérifier si l'utilisateur a le rôle admin
        if (data.role !== 'admin') {
          setError('Accès non autorisé');
          setLoading(false);
          return;
        }
        
        setUserData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 font-orbitron">
        <div className="text-cyan-300 text-xl flex items-center">
          <div className="w-4 h-4 rounded-full bg-cyan-300 animate-pulse mr-3"></div>
          Chargement...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 font-orbitron">
        <div className="bg-black/40 p-10 rounded-xl backdrop-blur-md border border-red-500/30 text-white w-full max-w-md shadow-lg">
          <div className="flex justify-center mb-6">
            <div className="bg-red-500/20 p-3 rounded-full">
              <Shield color="red" size={48} />
            </div>
          </div>
          <h2 className="text-red-400 text-center text-xl mb-6">Erreur: {error}</h2>
          <button
            onClick={() => navigate('/login')}
            className="w-full p-3 bg-cyan-500 text-black font-bold rounded hover:bg-cyan-400 transition flex items-center justify-center"
          >
            <User size={20} className="mr-2" /> Retour à la connexion
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-100 via-purple-900 to-blue-100 font-orbitron">
      <div className="bg-black/40 p-8 rounded-xl backdrop-blur-md border border-cyan-500/30 text-white w-full max-w-md shadow-lg">
        <div className="flex justify-center mb-6">
          <div className="bg-cyan-500/20 p-3 rounded-full">
            <Shield color="cyan" size={48} />
          </div>
        </div>
        
        <h2 className="text-center text-cyan-300 text-2xl mb-6">Panneau d'Administration</h2>
        
        <div className="mb-8">
          <div className="bg-red-900/30 p-6 rounded-lg border border-red-700/50 mb-4">
            <div className="flex items-center justify-center">
              <Shield color="red" size={24} className="mr-2" />
              <p className="text-white text-center text-xl">Zone Administrateur</p>
            </div>
          </div>
          
          <div className="bg-black/30 p-6 rounded-lg border border-cyan-700/50 mb-4">
            <p className="text-gray-300 mb-2">Nom:</p>
            <p className="text-cyan-200 font-semibold">{userData.name}</p>
          </div>
          
          <div className="bg-black/30 p-6 rounded-lg border border-cyan-700/50 mb-4">
            <p className="text-gray-300 mb-2">Email:</p>
            <p className="text-cyan-200">{userData.email}</p>
          </div>
          
          <div className="bg-black/30 p-6 rounded-lg border border-cyan-700/50 mb-4">
            <p className="text-gray-300 mb-2">Rôle:</p>
            <p className="text-cyan-200 font-bold">{userData.role}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button className="bg-cyan-900/50 hover:bg-cyan-900/70 p-4 rounded-lg border border-cyan-700/50 flex flex-col items-center justify-center transition">
            <Database color="cyan" size={24} className="mb-2" />
            <span className="text-sm">Base de données</span>
          </button>
          
          <button className="bg-cyan-900/50 hover:bg-cyan-900/70 p-4 rounded-lg border border-cyan-700/50 flex flex-col items-center justify-center transition">
            <Settings color="cyan" size={24} className="mb-2" />
            <span className="text-sm">Paramètres</span>
          </button>
        </div>
        
        <button
          onClick={handleLogout}
          className="w-full p-3 bg-red-500/80 hover:bg-red-600 text-white font-bold rounded transition flex items-center justify-center"
        >
          <LogOut size={20} className="mr-2" /> Se déconnecter
        </button>
      </div>
    </div>
  );
};

export default Admin;