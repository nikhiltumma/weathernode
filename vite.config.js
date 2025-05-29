import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/weathernode/', // 👈 Add this line
  plugins: [react()],
});

