var fs = require('fs');
var _ = require('lodash');

var gulpTestModules = [ //write these first
  '\'use strict\';\n',
  'var chai = require(\'chai\');\n',
  'var should = chai.should();\n',
  'var expect = chai.expect;\n',
  'var fs = require(\'fs\');\n',
  'var path = require(\'path\');\n',
  'var exec = require(\'child_process\').exec;\n',
  '\n\ndescribe(\'Gulp file tests: \', function () {\n', //needs to close with });
  '  it(\'should have Gulp File\', function (done) {\n',
  '  expect(fs.existsSync(path.join(__dirname, \'../../Gulpfile.js\'))).to.equal(true);\n',
  '  done();\n',
  '});'
];

function makeCombinedTaskTest (taskObj) {
  if (!taskObj.plugins.includes('watch')) {
    return '\n  it (\'Gulp File has task \'' + taskObj.name + '\', function (done) {\n    this.timeout(5000);\n    fs.readFile(path.join(__dirname, \'../../Gulpfile.js\'), function (err, data) {\n      if (err) {\n        console.log(\'error with test\'Gulp File has task ' + taskObj.name + ' :\', err);\n      }\n      expect(data.includes("gulp.task(\'' + taskObj.name + '\', ' + JSON.stringify(taskObj.plugins) + ');")).to.equal(true);\n      done();\n    })\n  });\n\n'
  } else {
    taskObj.plugins.splice(taskObj.plugins.indexOf('watch'), 1);
    return '\n  it (\'Gulp File has watch function that executes \'' + JSON.stringify(taskObj.plugins) + '\', function (done) {\n    this.timeout(5000);\n    fs.readFile(path.join(__dirname, \'../../Gulpfile.js\'), function (err, data) {\n      if (err) {\n        console.log(\'error with test \'Gulp File has watch function :\', err);\n      }\n      expect(data.includes(\'\ngulp.watch(\'client/assets\', ' + JSON.stringify(taskObj.plugins) + ');")).to.equal(true);\n      done();\n    })\n  });\n\n'
  }
};

function createGulpTestFile (options) {
  console.log('gulptestmaker got called');
  var gulpTestFile = '';
  var closing = '});';

  _.forEach(gulpTestModules, function (line) {
    gulpTestFile += line;
  }); //writes up all the modules and the first testForExistance
  console.log('made it past line 36')
  for (var i = 0; i < options.devTools.taskRunner.tasks.length; i++) {
    gulpTestFile += makeCombinedTaskTest(options.devTools.taskRunner.tasks[i]);
  };
  console.log('made it past line 40')
  gulpTestFile += closing;
  console.log('gulpTestFile', gulpTestFile);
  return gulpTestFile;
};

module.exports = createGulpTestFile;