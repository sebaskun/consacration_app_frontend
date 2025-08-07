import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // Cargar variables de entorno basadas en el modo actual
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    base: '/',
    // Configuración para desarrollo
    server: {
      port: 5173,
      host: true,
    },
    // Configuración de preview para producción local
    preview: {
      port: 4173,
      host: true,
    },
    // Definir variables de entorno
    define: {
      __APP_ENV__: JSON.stringify(env.VITE_ENVIRONMENT),
    },
  }
})
