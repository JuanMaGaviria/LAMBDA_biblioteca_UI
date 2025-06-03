import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      // Configuración de Tailwind directamente aquí
      content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}', // Archivos donde se usarán las clases
      ],
      theme: {
        extend: {
          colors: {
            'custom-blue': '#1E3A8A', // Color personalizado
            'custom-green': '#10B981',
            'brand-primary': {
              100: '#E6F0FA', // Escala de colores
              500: '#3B82F6',
              900: '#1E3A8A',
            },
          },
        },
      },
      plugins: [],
    }),
  ],
})
