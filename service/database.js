// database.js
// Connection to MongoDB
const { MongoClient, ObjectId } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
// ignoreUndefined keeps $set from writing undefined fields
const client = new MongoClient(url, { ignoreUndefined: true });

let db, userCollection, recipeCollection;

// Connect once on startup and verify
(async function init() {
  try {
    await client.connect();
    db = client.db('startup');
    userCollection = db.collection('user');
    recipeCollection = db.collection('recipe');

    await db.command({ ping: 1 });
    console.log('Connected to database');

    // Helpful indexes
    await Promise.all([
      userCollection.createIndex({ email: 1 }, { unique: true }),
      userCollection.createIndex({ token: 1 }, { sparse: true }),

      recipeCollection.createIndex({ ownerEmail: 1, updatedAt: -1 }),
      recipeCollection.createIndex({ shared: 1, sharedAt: -1 }),
    ]);
  } catch (ex) {
    console.error(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

// ----------------- Helpers -----------------
function toRecipeDTO(doc) {
  if (!doc) return null;
  return {
    id: String(doc._id),
    ownerEmail: doc.ownerEmail,
    title: doc.title ?? 'Untitled',
    totalTime: doc.totalTime ?? '—',         // e.g., "25 minutes" or "—"
    difficulty: doc.difficulty ?? '—',
    imageUrl: doc.imageUrl ?? 'placeholder.jpg',
    description: doc.description ?? '',
    servings: Number.isFinite(doc.servings) ? doc.servings : 0,
    ingredients: Array.isArray(doc.ingredients) ? doc.ingredients : [],
    steps: Array.isArray(doc.steps) ? doc.steps : [],
    shared: !!doc.shared,
    sharedAt: doc.sharedAt ?? null,
    createdAt: doc.createdAt ?? null,
    updatedAt: doc.updatedAt ?? null,
  };
}

// ----------------- USERS API -----------------
function getUser(email) {
  return userCollection.findOne({ email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token });
}

async function addUser(user) {
  await userCollection.insertOne(user);
}

async function updateUser(user) {
  // Expect full user object with email as key; set only provided fields
  await userCollection.updateOne({ email: user.email }, { $set: user });
}

// ----------------- RECIPES API -----------------
async function listRecipesByOwnerEmail(ownerEmail) {
  const docs = await recipeCollection
    .find({ ownerEmail })
    .sort({ updatedAt: -1 })
    .toArray();
  return docs.map(toRecipeDTO);
}

async function getRecipeByIdForOwnerEmail(id, ownerEmail) {
  const _id = new ObjectId(id);
  const doc = await recipeCollection.findOne({ _id, ownerEmail });
  return toRecipeDTO(doc);
}

async function createRecipeForOwnerEmail(ownerEmail, payload) {
  const now = new Date();
  const doc = {
    ownerEmail,
    title:       payload.title,
    totalTime:   payload.totalTime,   // string like "25 minutes" or "—"
    difficulty:  payload.difficulty,  // string like "Easy" / "—"
    imageUrl:    payload.imageUrl,
    description: payload.description,
    servings:    payload.servings,    // number
    ingredients: payload.ingredients, // string[]
    steps:       payload.steps,       // string[]
    shared:      !!payload.shared,    // default false if not provided
    sharedAt:    payload.shared ? now : null,
    updatedAt:   now,
  };

  const result = await recipeCollection.insertOne(doc);
  return toRecipeDTO({ _id: result.insertedId, ...doc });
}

async function updateRecipeByIdForOwnerEmail(id, ownerEmail, patch) {
  const _id = new ObjectId(id);

  // Only include fields that were actually provided
  const set = {};
  const keys = [
    'title', 'totalTime', 'difficulty', 'imageUrl',
    'description', 'servings', 'ingredients', 'steps'
  ];
  for (const k of keys) {
    if (k in patch) set[k] = patch[k];
  }
  set.updatedAt = new Date();

  const res = await recipeCollection.findOneAndUpdate(
    { _id, ownerEmail },
    { $set: set },
    { returnDocument: 'after' }
  );

  if (!res.value) return null; // not found or not owned
  return toRecipeDTO(res.value);
}

async function deleteRecipeByIdForOwnerEmail(id, ownerEmail) {
  const _id = new ObjectId(id);
  const res = await recipeCollection.deleteOne({ _id, ownerEmail });
  return res.deletedCount === 1;
}

// ---------- Sharing helpers for Discover ----------
async function setRecipeShareStatus(id, ownerEmail, shared) {
  const _id = new ObjectId(id);
  const now = new Date();

  // 1) Read by _id only
  const current = await recipeCollection.findOne({ _id });

  if (!current) {
    console.warn('[share] no such _id:', id);
    return null; // 404
  }

  // 2) Verify owner matches exactly (trim to be forgiving if you want)
  const dbOwner = (current.ownerEmail ?? '');
  const reqOwner = (ownerEmail ?? '');
  if (dbOwner !== reqOwner) {
    console.warn('[share] owner mismatch: db=', JSON.stringify(dbOwner), ' req=', JSON.stringify(reqOwner));
    return null; // 404
  }

  // 3) Update by _id only
  const res = await recipeCollection.findOneAndUpdate(
    { _id },
    { $set: { shared, sharedAt: shared ? now : null, updatedAt: now } },
    { returnDocument: 'after' }
  );

  return res.value ? toRecipeDTO(res.value) : null;
}

async function setRecipeShareStatusById(id, shared) {
  const _id = new ObjectId(id);
  const now = new Date();

  const res = await recipeCollection.findOneAndUpdate(
    { _id },
    { $set: { shared: !!shared, sharedAt: shared ? now : null, updatedAt: now } },
    {
      returnDocument: 'after',   // v4+ drivers
      returnOriginal: false,     // v3 drivers
    }
  );

  // Some driver/env combos still return null in res.value; fetch after as a fallback
  let doc = res.value;
  if (!doc) {
    doc = await recipeCollection.findOne({ _id });
  }
  return doc ? toRecipeDTO(doc) : null;
}



async function listSharedRecipes(excludeOwnerEmail) {
  const filter = excludeOwnerEmail
    ? { shared: true, ownerEmail: { $ne: excludeOwnerEmail } }
    : { shared: true };

  const docs = await recipeCollection
    .find(filter)
    .sort({ sharedAt: -1, updatedAt: -1 })
    .limit(100)
    .toArray();

  return docs.map(toRecipeDTO);
}


async function setRecipeShareStatusOwnerScoped(id, ownerEmail, shared) {
  const _id = new ObjectId(id);
  const now = new Date();

  const res = await recipeCollection.findOneAndUpdate(
    { _id, ownerEmail },
    { $set: { shared: !!shared, sharedAt: shared ? now : null, updatedAt: now } },
    {
      returnDocument: 'after',   // Node driver v4+
      returnOriginal: false,     // v3 compat
    }
  );

  // Some envs still return null; read it after as a fallback
  let doc = res.value || (await recipeCollection.findOne({ _id, ownerEmail }));
  return doc ? toRecipeDTO(doc) : null;
}



module.exports = {
  // Users
  getUser,
  getUserByToken,
  addUser,
  updateUser,

  // Recipes
  listRecipesByOwnerEmail,
  getRecipeByIdForOwnerEmail,
  createRecipeForOwnerEmail,
  updateRecipeByIdForOwnerEmail,
  deleteRecipeByIdForOwnerEmail,

  // Sharing
  setRecipeShareStatus,
  setRecipeShareStatusById,
  listSharedRecipes,
  setRecipeShareStatusOwnerScoped
};