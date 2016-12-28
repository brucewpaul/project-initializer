exports.scripts = {
  "start": "node server/server.js",
  "start-nodemon": "nodemon server/server.js",
}

exports.dependencies = {
  "axios": "^0.15.3",
  "body-parser": "^1.15.2",
  "bookshelf": "^0.10.2",
  "express": "^4.14.0",
}

exports.devDependencies = {
  "nodemon": "^1.11.0"
}