// peerProxy.js
const { WebSocketServer, WebSocket } = require('ws'); // <-- add WebSocket

function peerProxy(httpServer) {
  const wss = new WebSocketServer({ noServer: true });
  const peers = new Set();

  httpServer.on('upgrade', (req, socket, head) => {
    if (req.url !== '/ws') return socket.destroy();
    wss.handleUpgrade(req, socket, head, (ws) => wss.emit('connection', ws, req));
  });

  wss.on('connection', (ws) => {
    peers.add(ws);
    ws.isAlive = true;
    ws.on('pong', () => (ws.isAlive = true));
    ws.on('close', () => peers.delete(ws));
  });

  // optional keepalive
  setInterval(() => {
    for (const p of peers) {
      if (!p.isAlive) { p.terminate(); peers.delete(p); continue; }
      p.isAlive = false;
      try { p.ping(); } catch {}
    }
  }, 30000);

  function broadcast(message) {
    const data = JSON.stringify(message);
    for (const p of peers) {
      if (p.readyState === WebSocket.OPEN) p.send(data); // <-- use WebSocket.OPEN
    }
  }

  return { broadcast };
}

module.exports = { peerProxy };
