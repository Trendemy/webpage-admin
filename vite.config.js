import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
   plugins: [react()],
   base: '/',
   resolve: {
      alias: {
         '~': '/src'
      }
   },
   define: {
      'process.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL),
   },
   envPrefix: 'VITE_'
});
