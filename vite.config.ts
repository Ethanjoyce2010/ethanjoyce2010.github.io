import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  // Use a relative base so the site works under GitHub Pages subpaths
  base: './',
  plugins: [react()],
});
