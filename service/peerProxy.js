// peerProxy.js  (Simon-style)
const { WebSocketServer } = require('ws');

function peerProxy(httpServer) {
  const wss = new WebSocketServer({ noServer: true });
  const peers = new Set();

  // only accept ws on /ws (like Simon)
  httpServer.on('upgrade', (req, socket, head) => {
    if (req.url !== '/ws') {
      socket.destroy();
      return;
    }
    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit('connection', ws, req);
    });
  });

  wss.on('connection', (ws) => {
    peers.add(ws);
    ws.on('close', () => peers.delete(ws));
  });

  function broadcast(message) {
    const data = JSON.stringify(message);
    for (const ws of peers) {
      if (ws.readyState === ws.OPEN) ws.send(data);
    }
  }

  return { broadcast };
}

module.exports = { peerProxy };
