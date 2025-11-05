const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.static('public'));

import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:4000',
    },
  },
});

