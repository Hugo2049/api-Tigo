const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const CONFIG_FILE = path.join(__dirname, '../data/configs.json');

// Lee configuraciones desde JSON
const readConfigs = () => {
  const data = fs.readFileSync(CONFIG_FILE, 'utf8');
  return JSON.parse(data);
};

// Guarda configuraciones en JSON
const saveConfigs = (configs) => {
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(configs, null, 2));
};

// Obtener todas las configuraciones
router.get('/', (req, res) => {
  const configs = readConfigs();
  res.json(configs);
});

// Crear/Actualizar una configuración
router.post('/', (req, res) => {
  const newConfig = req.body;
  const configs = readConfigs();
  
  // Buscar si ya existe una config para misma ruta y método
  const index = configs.findIndex(c => 
    c.path === newConfig.path && c.method === newConfig.method
  );
  
  if (index >= 0) {
    configs[index] = newConfig; // Actualizar
  } else {
    configs.push(newConfig); // Crear
  }
  
  saveConfigs(configs);
  res.status(201).json(newConfig);
});

// Eliminar una configuración
router.delete('/:path/:method', (req, res) => {
  const { path, method } = req.params;
  let configs = readConfigs();
  
  const initialLength = configs.length;
  configs = configs.filter(c => 
    !(c.path === path && c.method.toLowerCase() === method.toLowerCase())
  );
  
  if (configs.length < initialLength) {
    saveConfigs(configs);
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Configuración no encontrada' });
  }
});

module.exports = router;