# Totus Tuus - App de Consagración Total

Una aplicación web en español para ayudar a las personas a completar la consagración total de 33 días a Jesús a través de María, según las enseñanzas de San Luis María Grignion de Montfort.

## 📖 ¿Qué es la Consagración Total?

La consagración total es una práctica espiritual que consiste en entregarse completamente a Jesús a través de María. Este proceso de 33 días incluye:

- **Meditaciones diarias** sobre las virtudes de María
- **Videos espirituales** para profundizar en las enseñanzas
- **Rezo del Rosario** con misterios específicos para cada día
- **Reflexión personal** y crecimiento espiritual

## ✨ Características de la App

### 🏠 Página de Inicio

- Diseño atractivo con tema amarillo/dorado
- Información sobre la consagración
- Navegación a registro/inicio de sesión

### 🔐 Autenticación

- Página de registro e inicio de sesión
- Diseño de dos columnas con imagen de Nuestra Señora
- Integración con backend simulado

### 📊 Dashboard

- **Progreso general** con barra de progreso visual
- **Contenido del día actual** con meditación, video y rosario
- **Videos embebidos de YouTube** para cada día
- **Acceso directo al PDF** de meditaciones
- **Acciones rápidas** para navegar por la app
- **Sidebar persistente** con navegación

### 📅 Calendario

- **Vista de los 33 días** en formato de cuadrícula
- **Estado de completado** para cada tarea
- **Modal detallado** para revisar contenido de días pasados
- **Marcado de tareas** (meditación, video, rosario)
- **Videos embebidos** y acceso a PDFs

### 🤖 Chatbot Espiritual

- **Asistente flotante** disponible en todas las páginas
- **Respuestas como San Luis de Montfort**
- **Guía espiritual** personalizada
- **Interfaz de chat** moderna y accesible

## 🛠️ Tecnologías Utilizadas

- **React 18** con TypeScript
- **Vite** para desarrollo rápido
- **React Router** para navegación
- **Tailwind CSS** para estilos
- **Lucide React** para iconos
- **YouTube Embed API** para videos
- **Google Drive** para PDFs de meditación

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**

   ```bash
   git clone <url-del-repositorio>
   cd frontent_consagracion
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**

   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:5173
   ```

### Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run lint` - Ejecuta el linter

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── Homepage.tsx    # Página de inicio
│   ├── AuthPage.tsx    # Página de autenticación
│   ├── Dashboard.tsx   # Dashboard principal
│   ├── Calendar.tsx    # Calendario de 33 días
│   ├── MainLayout.tsx  # Layout con sidebar
│   └── Chatbot.tsx     # Chatbot espiritual
├── data/
│   └── mockApi.json    # Datos simulados de la API
├── assets/             # Imágenes y recursos
└── App.tsx            # Componente principal
```

## 🎨 Diseño y UX

- **Tema amarillo/dorado** inspirado en la devoción mariana
- **Diseño responsivo** para móviles y desktop
- **Interfaz intuitiva** con navegación clara
- **Accesibilidad** con contraste adecuado
- **Animaciones suaves** para mejor experiencia

## 📱 Funcionalidades Principales

### Gestión de Progreso

- Seguimiento automático del día actual
- Marcado de tareas completadas
- Visualización del progreso general

### Contenido Multimedia

- Videos de YouTube embebidos para cada día
- PDFs de meditación accesibles
- Contenido espiritual organizado

### Navegación Intuitiva

- Sidebar persistente en Dashboard y Calendario
- Navegación rápida entre secciones
- Acceso directo a funcionalidades

## 🔮 Próximas Características

- [ ] **Notificaciones push** para recordatorios diarios
- [ ] **Sincronización en la nube** del progreso
- [ ] **Comunidad** de usuarios consagrados
- [ ] **Múltiples idiomas** (inglés, portugués)
- [ ] **Modo offline** para contenido descargado
- [ ] **Estadísticas detalladas** del progreso espiritual

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- **San Luis María Grignion de Montfort** por sus enseñanzas sobre la consagración total
- **Comunidad React** por las herramientas de desarrollo
- **Tailwind CSS** por el framework de estilos
- **Lucide** por los iconos hermosos

---

_"A Jesús por María" - San Luis María Grignion de Montfort_
