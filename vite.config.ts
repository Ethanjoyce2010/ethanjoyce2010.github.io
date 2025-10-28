import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  // User site will be served from the root domain
  base: '/',
  plugins: [react()],
});
