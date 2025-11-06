const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');

const app = express();
const authCookieName = 'token';

// The users are saved in memory and disappear whenever the service is restarted.
let users = [];

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// These functions will be the same that I require for entrance into my application

// CODE FOR USER AUTHENTICATION

// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await findUser('email', req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(req.body.email, req.body.password);

    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  }
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const user = await findUser('email', req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      setAuthCookie(res, user.token);
      res.send({ email: user.email });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    delete user.token;
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  users.push(user);

  return user;
}

async function findUser(field, value) {
  if (!value) return null;

  return users.find((u) => u[field] === value);
}

// CODE FOR USERS PERSONAL RECIPES (Fetch Recipes, ADD, EDIT, DELETE)

const recipes = new Map(); // id -> recipe

function ensureString(v, fallback = '') {
  return (typeof v === 'string' && v.trim()) ? v.trim() : fallback;
}

function normalizeRecipeInput(body, defaults = {}) {
  return {
    title: ensureString(body.title, defaults.title ?? 'Untitled'),
    totalTime: ensureString(body.totalTime, defaults.totalTime ?? '—'),
    difficulty: ensureString(body.difficulty, defaults.difficulty ?? '—'),
    imageUrl: ensureString(body.imageUrl, defaults.imageUrl ?? 'placeholder.jpg'),
  };
}

// Send all recipes over that are connected to the owner
apiRouter.get('/recipes', verifyAuth, (req, res) => {
  const mine = Array.from(recipes.values()).filter(r => r.ownerEmail === req.user.email);
  res.send(mine);
});

// Create a new recipe for the logged-in user
apiRouter.post('/recipes', verifyAuth, (req, res) => {
  const data = normalizeRecipeInput(req.body);
  const id = uuid.v4();

  const recipe = {
    id,
    ownerEmail: req.user.email,
    ...data,
  };
  recipes.set(id, recipe);
  res.status(201).send(recipe);
});

// Edit current recipes based off of their id
apiRouter.put('/recipes/:id', verifyAuth, (req, res) => {
  const r = recipes.get(req.params.id);
  if (!r || r.ownerEmail !== req.user.email) {
    return res.status(404).send({ msg: 'Not found' });
  }

  const updated = { ...r, ...normalizeRecipeInput(req.body, r) };
  recipes.set(r.id, updated);
  res.send(updated);
});

apiRouter.delete('/recipes/:id', verifyAuth, (req, res) => {
  const r = recipes.get(req.params.id);
  if (!r || r.ownerEmail !== req.user.email) {
    return res.status(404).send({ msg: 'Not found' });
  }

  recipes.delete(r.id);
  res.status(204).end();
});

// "Share" stub (for later WebSocket feature)
apiRouter.post('/recipes/:id/share', verifyAuth, (req, res) => {
  const r = recipes.get(req.params.id);
  if (!r || r.ownerEmail !== req.user.email) {
    return res.status(404).send({ msg: 'Not found' });
  }

  res.send({ ok: true, id: r.id, shared: true });
});



// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});