  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react';
  import path from 'path'; // Importe o módulo path

  export default defineConfig({
    plugins: [react()],
    resolve: {
      alias: {       
        '@': path.resolve(__dirname, './src'), // Raiz do src
        '@components': path.resolve(__dirname, './src/components'),
        '@screens': path.resolve(__dirname, './src/Screens'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@images': path.resolve(__dirname, './src/assets/images'),
           
        
      }
    }
  });