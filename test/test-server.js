var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server/server.js');

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

describe ('Server', function () {

  it('should connect to localhost', function(done) {
    chai.request(server)
      .get('/')
      .end(function(err, res) {
        res.should.have.status(200);
        done();
      });
  });

  it('should accept POST request to /build', function(done) {
    chai.request(server)
      .post('/build')
      .send(options)
      .end(function(err, res) {
        res.should.have.status(201);
        done();
      });
  });

  it('should return url/id of bundle from POST request to /build', function(done) {
    chai.request(server)
      .post('/build')
      .send(options)
      .end(function(err, res) {
        expect(res.text).to.be.a('string');
        done();
      });
  });

});
