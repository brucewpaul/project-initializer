var expect = require('chai').expect;
var should = require('chai').should();
var createGruntFile = require('../server/util/bundler/grunt-helpers.js');
var _ = require('lodash');

var options = {
 frontEnd:{
   framework: 'React',
   styling: 'Javascipt/html/css'
 },
 backEnd: {
   database: 'Sqlite'
 },
 devTools: {
   taskRunner: {
     name: 'grunt',
     plugins:['cssmin', 'uglify', 'sass', 'less', 'watch'],
     tasks:[
     {
       name: 'build',
       plugins: ['cssmin', 'uglify']
     }
     ]
   },
   bundler:{
     name: 'webpack',
     config:[]
   },
   testing: 'mocha/chai'
 }
}

var hasLine = function(lines, targetLine) {
  var hasLine = false;
  _.forEach(lines, function(line) {
    if (line === targetLine) {
      hasLine = true;
    }
  });
  return hasLine
}

describe('Gruntfile', function() {

  it('should be a string', function() {
    expect(createGruntFile(options)).to.be.a('string');
  });

  var gruntLines = createGruntFile(options).split('\n');

  it('should have an initConfig', function() {
    expect(hasLine(gruntLines, '  grunt.initConfig({')).to.be.true;
  });

  it('should set the pkg property in grunt to package.json', function() {
    expect(hasLine(gruntLines, '    pkg: grunt.file.readJSON(\'package.json\'),')).to.be.true;
  });

  it('should set up config for cssmin plugin', function() {
    expect(hasLine(gruntLines, '    cssmin: {')).to.be.true;
  });

  it('should set up config for uglify plugin', function() {
    expect(hasLine(gruntLines, '    uglify: {')).to.be.true;
  });

  it('should set up config for sass plugin', function() {
    expect(hasLine(gruntLines, '    sass: {')).to.be.true;
  });

  it('should set up config for less plugin', function() {
    expect(hasLine(gruntLines, '    less: {')).to.be.true;
  });

  it('should set up config for watch plugin', function() {
    expect(hasLine(gruntLines, '    watch: {')).to.be.true;
  });

  it('should set up config for karma plugin', function() {
    expect(hasLine(gruntLines, '    karma: {')).to.be.true;
  });

  it('should load tasks for cssmin', function() {
    expect(hasLine(gruntLines, '  grunt.loadNpmTasks(\'grunt-contrib-cssmin\');')).to.be.true;
  });

  it('should load tasks for uglify', function() {
    expect(hasLine(gruntLines, '  grunt.loadNpmTasks(\'grunt-contrib-uglify\');')).to.be.true;
  });

  it('should load tasks for sass', function() {
    expect(hasLine(gruntLines, '  grunt.loadNpmTasks(\'grunt-contrib-sass\');')).to.be.true;
  });

  it('should load tasks for less', function() {
    expect(hasLine(gruntLines, '  grunt.loadNpmTasks(\'grunt-contrib-less\');')).to.be.true;
  });

  it('should load tasks for watch', function() {
    expect(hasLine(gruntLines, '  grunt.loadNpmTasks(\'grunt-contrib-watch\');')).to.be.true;
  });

  it('should load tasks for karma', function() {
    expect(hasLine(gruntLines, '  grunt.loadNpmTasks(\'grunt-contrib-karma\');')).to.be.true;
  });

  it('should register a basic task', function() {
    expect(hasLine(gruntLines, '  grunt.registerTask(\'build\', [\'cssmin\', \'uglify\']);')).to.be.true;
  });
});