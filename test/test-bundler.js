var exec = require('child_process').exec;
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));
var path = require('path');
var chai = require('chai');
var chaiHttp = require('chai-http');

var server = require('../server/server.js');

var bundler = require('../server/util/bundler/index.js');
var assemble = require('../server/util/bundler/assemble-files.js');
var bundlePackage = require('../server/util/bundler/bundle-package.js');

var should = chai.should();
var expect = chai.expect;

chai.use(chaiHttp);

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
     plugins:['cssmin', 'uglify'],
     tasks:[
     {
       name: 'cssmin',
       plugins:['cssmin']
     },
     {
       name:'uglify',
       plugins:['uglify']
     },
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

describe ('Bundler', function () {

  it('should create unique folder', function(done) {
    bundler(options, function(url) {
      var fileName = url + '.tar.gz';
      var uniquePath = path.resolve(__dirname, '..', 'server/bundles', fileName );

      fs.exists(uniquePath, (exists) => {
        if ( exists ) {
          done();
        }
      });
    });
  });

});

describe ('bundle-package', function () {

  it('should return an object', function(done) {
    package = bundlePackage(options);
    expect(package).to.be.an('object');
    done();
  });

  it('should return an object based on the options', function(done) {
    package = bundlePackage(options);
    expect(package.dependencies).to.include.keys('react');
    expect(package.dependencies).to.include.keys('sqlite3');
    expect(package.scripts).to.include.keys('start');
    expect(package.devDependencies).to.include.keys('webpack');

    done();
  });

  it('should create an object even with no options given', function(done) {
    package = bundlePackage();
    expect(package.dependencies).to.eql({});
    expect(package.scripts).to.eql({});
    expect(package.devDependencies).to.eql({});
    done();
  });

});

describe ('assemble-files', function () {

  it('should assemble files at path', function(done) {
  });

  it('should assemble a zipper file with same name', function(done) {
  });

  it('should fire callback', function(done) {
  });

  it('callback should handle error', function(done) {
  });

});
