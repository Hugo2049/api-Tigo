const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const CONFIG_FILE = path.join(__dirname, '../data/configs.json');

const readConfigs = () => {
  const data = fs.readFileSync(CONFIG_FILE, 'utf8');
  return JSON.parse(data);
};

// Captura todas las rutas y métodos
router.use((req, res) => {
  const { path: requestPath, method, query, body } = req;
  const configs = readConfigs();
  
  // Buscar configuración que coincida 
  const config = configs.find(c => 
    c.path.toLowerCase() === requestPath.toLowerCase() && 
    c.method.toLowerCase() === method.toLowerCase()
  );
  
  if (config) {
    if (config.response) {
      res.status(config.status || 200).json(config.response);
    } else if (config.dynamicResponse) {
      try {
        const handler = new Function('query', 'body', config.dynamicResponse);
        const result = handler(query, body);
        res.status(200).json(result);
      } catch (error) {
        res.status(500).json({ error: 'Error en respuesta dinámica', details: error.message });
      }
    }
  } else {
    res.status(404).json({ 
      error: 'Ruta no configurada',
      hint: `Registra esta ruta con: POST /api/configs { "path": "${requestPath}", "method": "${method}", "response": {...} }`
    });
  }
});

module.exports = router;