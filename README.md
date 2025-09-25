# 🥗 Asistente de Dietas Semanal con OpenAI

Un asistente nutricional interactivo que genera dietas semanales personalizadas utilizando la API de OpenAI. La aplicación recopila información del usuario a través de un chat y genera un plan de comidas detallado en formato de tabla.

> Parte del curso "Desarrollo Web con IA" de Victor Robles (Udemy).

## ✨ Características

- 🤖 Chat interactivo para recopilar datos del usuario
- 📊 Generación de dietas semanales personalizadas
- 🍽️ Detalles de cada comida: ingredientes, platos y calorías
- 💬 Integración con OpenAI GPT-3.5
- 📱 Diseño responsive y amigable
- 🎨 Interfaz visual moderna y limpia

## 🛠️ Tecnologías

### Frontend

- HTML5 y CSS3 para la estructura y estilos
- JavaScript vanilla para la lógica del cliente
- Markdown-it para renderizar tablas
- Diseño responsive y mobile-first

### Backend

- Node.js y Express para el servidor
- API de OpenAI (gpt-3.5-turbo)
- Dotenv para gestión de variables de entorno

## 🚀 Instalación y Configuración

1. Clona el repositorio:

   ```bash
   git clone https://github.com/AntonioZurano/05-dietas-openai.git
   cd 05-dietas-openai
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

## ⚠️ Notas y Limitaciones

- Los datos del usuario se almacenan en memoria (se pierden al reiniciar)
- No hay persistencia de sesiones
- El modelo utilizado es gpt-3.5-turbo
- Requiere conexión a internet para funcionar

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, sigue estos pasos:

1. Haz fork del proyecto
2. Crea una nueva rama (`git checkout -b feature/AmazingFeature`)
3. Haz commit de tus cambios (`git commit -m 'Add: Nueva característica'`)
4. Haz push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

## ✍️ Autor

Creado por Antonio Zurano Blázquez

- Como parte del curso "Desarrollo Web con IA" de Victor Robles (Udemy)
- GitHub: [@AntonioZurano](https://github.com/AntonioZurano)

## 🙏 Agradecimientos

- A Victor Robles por el excelente curso
- A la comunidad de OpenAI por proporcionar herramientas increíbles
- A todos los que contribuyen al ecosistema de código abierto

---
⌨️ con ❤️ por [Antonio Zurano](https://github.com/AntonioZurano)
