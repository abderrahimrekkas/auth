import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User as UserIcon, LogOut } from 'lucide-react';

const User = () => {
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
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] font-orbitron">
        <div className="text-cyan-300 text-xl flex items-center">
          <div className="w-4 h-1 rounded-full bg-cyan-300 animate-pulse mr-3"></div>
          Chargement...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] font-orbitron">
        <div className="bg-white/1 p-10 rounded-xl backdrop-blur-md border border-white/10 text-white w-full max-w-md shadow-[0_0_30px_rgba(0,255,255,0.2)]">
          <h2 className="text-red-500 text-center text-xl mb-6">Erreur: {error}</h2>
          <button
            onClick={() => navigate('/login')}
            className="w-full p-3 bg-cyan-300 text-[#0f0c29] font-bold rounded hover:bg-cyan-300 transition flex items-center justify-center"
          >
            <UserIcon size={20} className="mr-2" /> Retour à la connexion
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] font-orbitron">
      <div className="bg-white/1 p-10 rounded-xl backdrop-blur-md border border-white/10 text-white w-full max-w-md shadow-[0_0_30px_rgba(0,255,255,0.2)]">
        <div className="flex justify-center mb-6">
          <div className="bg-cyan-500/20 p-3 rounded-full">
            <UserIcon color="cyan" size={48} />
          </div>
        </div>
        
        <h2 className="text-center text-cyan-300 text-xl mb-0">Espace Utilisateur</h2>
        
        <div className="mb-2 ">
          <div className="bg-cyan-900/30 p-6 rounded-lg border border-cyan-700/50 mb-4">
            <p className="text-gray-300 mb-2">Nom:</p>
            <p className="text-cyan-200 font-semibold">{userData.name}</p>
          </div>
          
          <div className="bg-cyan-900/30 p-6 rounded-lg border border-cyan-700/50 mb-4">
            <p className="text-gray-300 mb-2">Email:</p>
            <p className="text-cyan-200">{userData.email}</p>
          </div>
          
          <div className="bg-cyan-900/30 p-6 rounded-lg border border-cyan-700/50">
            <p className="text-gray-300 mb-2">Rôle:</p>
            <p className="text-cyan-200">{userData.role}</p>
          </div>
        </div>
        
        <button
          onClick={handleLogout}
          className="w-full p-3 bg-cyan-500/80 hover:bg-cyan-600 text-white font-bold rounded transition flex items-center justify-center"
        >
          <LogOut size={20} className="mr-2" /> Se déconnecter
        </button>
      </div>
    </div>
  );
};

export default User;