

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  optimizeDeps: {
    exclude: ['qrcode.react'], // Exclude qrcode.react from being optimized
  },
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0', // Allows access from other devices
    port: 5173,      // Specify the port
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'localhost.pem')),
    },
  },
})


// vite.config.js
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     https: false, // ⛔ disables HTTPS
//     host: '0.0.0.0', // ✅ allows LAN access
//     port: 5173, // or any other port
//   },
// });

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     https: false,
//     host: '0.0.0.0',
//     port: 5173,
//     proxy: {
//       '/api': {
//         target: 'http://192.168.1.4:3000',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, '')
//       }
//     }
//   }
// });
