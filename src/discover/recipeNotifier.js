// recipeNotifier.js
const RecipeEvent = {
  System: 'system',
  Shared: 'recipe:shared',
  Unshared: 'recipe:unshared',
  Updated: 'recipe:updated', 
  Deleted: 'recipe:deleted', 
};

class EventMessage {
  constructor(from, type, value) {
    this.from = from;     
    this.type = type;     
    this.value = value;   
  }
}

class RecipeEventNotifier {
  handlers = new Set();
  socket = null;
  reconnectAttempts = 0;
  maxBackoffMs = 8000;

  constructor() {
    this.connect();
  }

  url() {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    return `${protocol}://${window.location.host}/ws`;
  }

  connect() {
    this.socket = new WebSocket(this.url());

    this.socket.onopen = () => {
      this.reconnectAttempts = 0;
      this._emit(new EventMessage('system', RecipeEvent.System, { msg: 'connected' }));
    };

    this.socket.onclose = () => {
      this._emit(new EventMessage('system', RecipeEvent.System, { msg: 'disconnected' }));
      this.scheduleReconnect();
    };

    this.socket.onmessage = async (msg) => {
      try {
        // Support both string and Blob messages
        const raw = typeof msg.data === 'string' ? msg.data : await msg.data.text();
        const event = JSON.parse(raw);
        // Expect { type: 'recipe:shared'|'recipe:unshared'|..., recipe: {...} }
        this._emit(new EventMessage('server', event.type, event.recipe ?? event.value ?? event));
      } catch (e) {
        console.warn('WS parse error', e);
      }
    };
  }

  scheduleReconnect() {
    const backoff = Math.min(1000 * Math.pow(2, this.reconnectAttempts++), this.maxBackoffMs);
    setTimeout(() => this.connect(), backoff);
  }

  addHandler(handler) {
    this.handlers.add(handler);
    return () => this.removeHandler(handler); // convenience unsubscribe
  }

  removeHandler(handler) {
    this.handlers.delete(handler);
  }

  _emit(evt) {
    this.handlers.forEach((h) => {
      try { h(evt); } catch (e) { console.error('Handler error', e); }
    });
  }
}

const RecipeNotifier = new RecipeEventNotifier();
export { RecipeEvent, RecipeNotifier };
