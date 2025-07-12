const express = require('express');
const bodyParser = require('body-parser');
const configRoutes = require('./routes/configRoutes');
const mockRoutes = require('./routes/mockRoutes');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Rutas para gestionar configuraciones 
app.use('/api/configs', configRoutes);

// Ruta genérica 
app.use(mockRoutes); 

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});