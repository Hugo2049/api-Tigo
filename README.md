# api-Tigo

## Instalación

Clona el repositorio:

git clone https://github.com/Hugo2049/api-Tigo
cd mock-api

Instala dependencias:
npm install

Inicia el servidor:
npm start
El servidor estará en: http://localhost:3000


## Uso Básico
Registrar un Mock

Endpoint: POST /api/configs
Body:
json

{
  "path": "/ruta-ejemplo",
  "method": "GET",  // Puede ser GET, POST, PUT, etc.
  "response": {     // Respuesta estática
    "mensaje": "¡Mock exitoso!"
  }
}

Ejemplo con curl:

curl -X POST http://localhost:3000/api/configs \
-H "Content-Type: application/json" \
-d '{
  "path": "/saludo",
  "method": "GET",
  "response": { "texto": "Hola mundo" }
}'

## Probar el Mock
curl http://localhost:3000/saludo
