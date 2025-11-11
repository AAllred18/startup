// Connection to MongoDB
const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;

const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');
const recipeCollection = db.collection('recipe');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connect to database`);
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

// -----  USERS API -----

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function addUser(user) {
  await userCollection.insertOne(user);
}

async function updateUser(user) {
  await userCollection.updateOne({ email: user.email }, { $set: user });
}

// ----- Recipe API -----

async function listRecipesByOwnerEmail(ownerEmail) {
  const docs = await recipeCollection
    .find({ ownerEmail })
    .sort({ updatedAt: -1 })
    .toArray();
  return docs.map(toRecipeDTO);
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

  const res = await recipeCollection.findOneAndUpdate(
    { _id, ownerEmail },
    { $set: set },
    { returnDocument: 'after' }
  );

  if (!res.value) return null; // not found or not owned
  return toRecipeDTO(res.value);
}

module.exports = {
// Users
  getUser,
  getUserByToken,
  addUser,
  updateUser,
// Recipes
  listRecipesByOwnerEmail,
  createRecipeForOwnerEmail,
  updateRecipeByIdForOwnerEmail,
};
