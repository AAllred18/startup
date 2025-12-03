// recipeNotifier.js
const RecipeEvent = {
  System: 'system',
  Shared: 'recipe:shared',
  Unshared: 'recipe:unshared',
  Updated: 'recipe:updated', // optional
  Deleted: 'recipe:deleted', // optional
};

class EventMessage {
  constructor(from, type, value) {
    this.from = from;     // e.g., 'server'
    this.type = type;     // one of RecipeEvent
    this.value = value;   // payload (recipe or small object)
  }
}


