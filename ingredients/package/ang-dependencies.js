exports.scripts = {
  "start": "node server/server.js",
  "start-nodemon": "nodemon server/server.js",
}

exports.dependencies = {
  "axios": "^0.15.3",
  "body-parser": "^1.15.2",
  "bookshelf": "^0.10.2",
  "express": "^4.14.0",
  "knex": "^0.12.6",
  "sqlite3": "^3.1.8"
}

exports.devDependencies = {
  "nodemon": "^1.11.0"
}