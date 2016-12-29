var request = require('request');
var chai = require('chai');
var should = chai.should();
var expect = chai.expect;

describe('API Routes', function() {
  it('should respond to GET requests to /api/items with a 200 status code', function(done) {
    request('http://127.0.0.1:3000/api/items', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('should send back parsable stringified JSON', function(done) {
    request('http://127.0.0.1:3000/api/items', function(error, response, body) {
      expect(JSON.parse.bind(this, body)).to.not.throw();
      done();
    });
  });

  it('should send back an object', function(done) {
    request('http://127.0.0.1:3000/api/items', function(error, response, body) {
      var parsedBody = JSON.parse(body);
      expect(parsedBody).to.be.an('object');
      done();
    });
  });

  it('should send back an array containing objects', function(done) {
    request('http://127.0.0.1:3000/api/items', function(error, response, body) {
      var parsedBody = JSON.parse(body);
      expect(parsedBody).to.be.an('object');
      expect(parsedBody.results).to.be.an('array');
      done();
    });
  });

  it('should accept POST requests to /api/items', function(done) {
    var requestParams = {method: 'POST',
      uri: 'http://127.0.0.1:3000/api/items',
      json: {
        title: 'Test Title',
        text: 'Test Text'
      }
    };

    request(requestParams, function(error, response, body) {
      expect(response.statusCode).to.equal(201);
      done();
    });
  });

  it('should respond with items that were previously posted', function(done) {
    var requestParams = {method: 'POST',
      uri: 'http://127.0.0.1:3000/api/items',
      json: {
        username: 'test2',
        message: 'test2 text'}
    };

    request(requestParams, function(error, response, body) {
      // Now if we request the log, that message we posted should be there:
      request('http://127.0.0.1:3000/api/items', function(error, response, body) {
        var items = JSON.parse(body).results;
        expect(items[0].text).to.equal('Test Text');
        expect(items[0].title).to.equal('Test Title');

        done();
      });
    });
  });

  it('Should 404 when asked for a nonexistent endpoint', function(done) {
    request('http://127.0.0.1:3000/nothing/to/see/here', function(error, response, body) {
      expect(response.statusCode).to.equal(404);
      done();
    });
  })
});