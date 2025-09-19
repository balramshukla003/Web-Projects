import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Enables network access
    port: 5173, // Set your preferred port (default is 5173)
    strictPort: true, // Ensure the specified port is used
    open: true, // Automatically opens the app in the default browser
  },
});
