// backend/middlewares/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware pour protéger les routes
const protect = async (req, res, next) => {
  let token;

  // Vérifier si le token existe dans les headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Obtenir le token
      token = req.headers.authorization.split(' ')[1];

      // Vérifier le token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Ajouter l'utilisateur à la requête (sans le mot de passe)
      req.user = {
        id: decoded.id,
        role: decoded.role  // Inclure le rôle dans la requête
      };

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Non autorisé, token invalide' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Non autorisé, pas de token' });
  }
};

// Middleware pour vérifier si l'utilisateur est admin
const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Non autorisé, veuillez vous connecter' });
  }
  
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Accès refusé. Vous devez être administrateur.' });
  }
  
  next();
};

module.exports = { protect, isAdmin };