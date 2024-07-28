const Loki = require('lokijs');
const path = require('path');

// Create a new LokiJS database instance
const db = new Loki(path.join(__dirname, 'database.json'), {
  autosave: true,
  autosaveInterval: 4000, // Save every 4 seconds
  autoload: true,
  autoloadCallback: loadHandler,
  persistenceMethod: 'fs'
});

let sessionsManagement;

// Callback when the database is loaded
function loadHandler(err) {
  if (err) {
    console.error('Failed to load database:', err);
  } else {
    console.log('Database loaded successfully');
    // Initialize the 'users' collection
    sessionsManagement = db.getCollection('sessionsManagement') || db.addCollection('sessionsManagement');
  }
}

const sessionGeyByKey=(key)=>{
  const session = db.getCollection('sessionsManagement').findOne({ key });
  return session
}

// Export the database instance and collections
module.exports = {
  db,
  getSessionsManagement: () =>  sessionsManagement,
  sessionGeyByKey
};