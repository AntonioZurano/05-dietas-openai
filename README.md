# Asis## 🛠️ Tecnologías

## Frontend

- HTML5 y CSS3 para la estructura y estilos
- JavaScript vanilla para la lógica del cliente
- Markdown-it para renderizar tablas
- Diseño responsive y mobile-first

## Backend

- Node.js y Express para el servidor
- API de OpenAI (gpt-3.5-turbo)
- Dotenv para gestión de variables de entorno

## 📋 Requisitos Previos

- Node.js 18.0 o superior
- Clave de API de OpenAI
- npm o yarn

## 🚀 Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/TuUsuario/asistente-dieta-openai.git
   cd asistente-dieta-openai
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura las variables de entorno:

   ```bash
   # Crea y edita el archivo .env
   cp .env.example .env
   ```

   Añade tu clave de API de OpenAI:

   ```env
   OPENAI_API_KEY=tu_clave_api_aqui
   PORT=3005
   ```

## 💻 Uso

1. Inicia el servidor:

   ```bash
   # Modo desarrollo (con recarga automática)
   npm start

   # Modo producción
   npm run serve
   ```

2. Abre tu navegador en [http://localhost:3005](http://localhost:3005)

3. Sigue el flujo de preguntas del chat:
   - Peso (kg)
   - Altura (cm)
   - Objetivo (adelgazar/mantener/aumentar)
   - Alergias
   - Alimentos no deseados
   - Número de comidas diarias

## 🔄 API Endpoints

### POST /api/nutri-chat

Gestiona la conversación y genera la dieta.

**Request:**

```json
{
  "id": "user-123",
  "message": "mensaje_del_usuario"
}
```

**Response:**

```json
{
  "message": "¡Aquí tienes tu dieta!",
  "diet": "tabla_markdown_con_la_dieta"
}
```

## 📁 Estructura del Proyecto

```text
05-dietas-openai/
├── public/
│   ├── assets/
│   │   ├── css/
│   │   │   └── styles.css
│   │   ├── img/
│   │   │   └── icon-dieta.png
│   │   └── js/
│   │       └── main.js
│   └── index.html
├── app.js
├── package.json
├── .env
└── README.md
```

## 🔧 Scripts Disponibles

- `npm start`: Inicia el servidor con nodemon (desarrollo)
- `npm run serve`: Inicia el servidor con node (producción)

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, sigue estos pasos:

1. Haz fork del proyecto
2. Crea una nueva rama (`git checkout -b feature/AmazingFeature`)
3. Haz commit de tus cambios (`git commit -m 'Add: Nueva característica'`)
4. Haz push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## ⚠️ Notas y Limitaciones

- Los datos del usuario se almacenan en memoria (se pierden al reiniciar)
- No hay persistencia de sesiones
- El modelo utilizado es gpt-3.5-turbo
- Requiere conexión a internet para funcionar

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles

## ✍️ Autor

Creado por Antonio Zurano Blázquez

- Como parte del curso "Desarrollo Web con IA" de Victor Robles (Udemy)
- GitHub: [@AntonioZurano](https://github.com/AntonioZurano)

## 🙏 Agradecimientos

- A Victor Robles por el excelente curso
- A la comunidad de OpenAI por proporcionar herramientas increíbles
- A todos los que contribuyen al ecosistema de código abierto

---
⌨️ con ❤️ por [Antonio Zurano](https://github.com/AntonioZurano) Dieta Semanal con OpenAI 🥗

Un asistente nutricional interactivo que genera dietas semanales personalizadas utilizando la API de OpenAI. La aplicación recopila información del usuario a través de un chat y genera un plan de comidas detallado en formato de tabla.

> Parte del curso "Desarrollo Web con IA" de Udemy.

## ✨ Características

- 🤖 Chat interactivo para recopilar datos del usuario
- 📊 Generación de dietas semanales personalizadas
- 🍽️ Detalles de cada comida: ingredientes, platos y calorías
- 💬 Integración con OpenAI GPT-3.5
- 📱 Diseño responsive y amigable
- 🎨 Interfaz visual moderna y limpia
- Backend con Node.js y Express; integración con OpenAI Chat Completions.
- Servido estáticamente el frontend desde `public/`.

## Arquitectura rápida

- `app.js`: servidor Express, endpoint `/api/nutri-chat` y lógica de turnos; uso de `openai` con `gpt-3.5-turbo`.
- `public/`: HTML/CSS/JS para la interfaz tipo chat.
- Almacenamiento temporal en memoria por usuario mediante `userData[id]` (no persistente).

## Requisitos

- Node.js 18+ (recomendado).
- Clave de API de OpenAI.

## Instalación

```bash
cd 05-dietas-openai
npm install
```

## Configuración

Crea un archivo `.env` en la raíz del proyecto:

```env
OPENAI_API_KEY=tu_clave_de_openai
# Opcional
PORT=3005
```

## Ejecución

Desarrollo (con recarga):

```bash
npm start
```

Producción/local simple:

```bash
npm run serve
```

Abre en el navegador: <http://localhost:3005>

## Uso del endpoint (API)

- Ruta: `POST /api/nutri-chat`
- Content-Type: `application/json`
- Cuerpo:

```json
{ "id": "user-123", "message": "<texto del usuario>" }
```

El backend guía el flujo en este orden de campos por `id`:

1) peso (kg) → 2) altura (cm) → 3) objetivo (adelgazar/mantener/subir) → 4) alergias → 5) no_gusta → 6) comidas_diarias.

Ejemplo rápido con curl (simulando pasos):

```bash
# 1) peso
curl -s -X POST http://localhost:3005/api/nutri-chat \
   -H 'Content-Type: application/json' \
   -d '{"id":"user-123","message":"80"}'

# 2) altura
curl -s -X POST http://localhost:3005/api/nutri-chat \
   -H 'Content-Type: application/json' \
   -d '{"id":"user-123","message":"175"}'

# 3) objetivo
curl -s -X POST http://localhost:3005/api/nutri-chat \
   -H 'Content-Type: application/json' \
   -d '{"id":"user-123","message":"adelgazar"}'

# 4) alergias
curl -s -X POST http://localhost:3005/api/nutri-chat \
   -H 'Content-Type: application/json' \
   -d '{"id":"user-123","message":"gluten"}'

# 5) no_gusta
curl -s -X POST http://localhost:3005/api/nutri-chat \
   -H 'Content-Type: application/json' \
   -d '{"id":"user-123","message":"berenjena"}'

# 6) comidas_diarias (tras esto, devuelve la tabla Markdown)
curl -s -X POST http://localhost:3005/api/nutri-chat \
   -H 'Content-Type: application/json' \
   -d '{"id":"user-123","message":"5"}'
```

Respuesta: `{ "reply": "¡Aqui tienes tu dieta! | Día | ... (tabla Markdown)" }`

## Estructura del proyecto

```text
05-dietas-openai/
├── public/
│   ├── assets/
│   │   ├── css/
│   │   │   └── styles.css
│   │   ├── img/
│   │   │   └── icon-dieta.png
│   │   └── js/
│   │       └── main.js
│   └── index.html
├── app.js
├── package.json
├── .env (no se versiona)
└── README.md
```

## Scripts disponibles

- `npm start`: inicia con nodemon.
- `npm run serve`: inicia con node.

## Notas y limitaciones

- `userData` está en memoria: al reiniciar el servidor, se pierden las sesiones y estados.
- No hay autenticación ni persistencia; el `id` del cliente debe ser estable durante la conversación.
- El front (`public/assets/js/main.js`) está preparado para integrar la llamada al endpoint; puedes implementar la lógica de chat allí según tus necesidades.
- El modelo configurado es `gpt-3.5-turbo`. Puedes actualizarlo en `app.js`.

## Licencia

MIT. Ver `LICENSE.md`.

## Autor

Creado por Antonio Zurano como parte del curso "Desarrollo Web con IA" (Udemy).
