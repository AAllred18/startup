// vite.config.js
export default {
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000', // your Express port
        changeOrigin: true,
        secure: false,
      },
      '/ws': {
        target: 'ws://localhost:4000',   // same server, WS upgrade
        ws: true,
        changeOrigin: true,
      },
    },
  },
};
