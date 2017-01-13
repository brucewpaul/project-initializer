exports.scripts = {
  "start-webpack": "webpack --config config.webpack.js --watch --colors --progress"
}

exports.dependencies = {
  "body-parser": "^1.15.2",
  "express": "^4.14.0",
  "vue": "^2.1.8"
}

exports.devDependencies = {
  "css-loader": "^0.26.1",
  "babel-core": "^6.0.0",
  "babel-loader": "^6.0.0",
  "babel-preset-es2015": "^6.0.0",
  "vue-loader": "^10.0.0",
  "vue-template-compiler": "^2.1.0",
  "webpack": "^2.1.0-beta.25"
}