// this needs to be here so that node doesn't throw a warning about a possible memory leak where there actually is none.
require('events').EventEmitter.defaultMaxListeners = 100;

var Promise = require('bluebird');
var neo4j = require('neo4j-driver').v1;

var driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "112187"));
var session = driver.session();

var queueInstance = require('./queue.js');
var util = require('./util.js');

var queue = queueInstance();

var initNeo4j = function(frameworks, packages) {

  var promises = [];

  // let's go ahead and add all of the frameworks to neo4j
  for ( var i = 0; i < frameworks.length; i++) {
    promises.push(
      new Promise(function(resolve,reject) {
        session
          .run( `MERGE (f:Framework { name: '${frameworks[i]}' })`)
          .then( function() {
            resolve()
            session.close();
            driver.close();
          })
          .catch(function(err) {
            reject(err)
          });
      })
    )
  }

  // let's also add all of the packages
  for ( var i = 0; i < packages.length; i++) {
    promises.push(
      new Promise(function(resolve,reject) {
        session
          .run( `MERGE (p:Package { name: '${packages[i]}' })`)
          .then( function() {
            resolve()
            session.close();
            driver.close();
          })
          .catch(function(err) {
            reject(err)
          });
      })
    )
  }

  // this is going to store the properties of the package-package relationship
  var frameworkObject = [];

  // now we are going to go through each framework and create a relationship to each package
  for ( var i = 0; i < frameworks.length; i++) {
    frameworkObject.push( 'r.' + frameworks[i].toLowerCase() + 'Value = 0')
    for ( var j = 0; j < packages.length; j++) {
      promises.push(
        new Promise(function(resolve,reject) {
          session
            .run(`MATCH (f:Framework { name: '${frameworks[i]}' }), (p:Package { name: '${packages[j]}' }) MERGE (f)-[:HAS_PACKAGE]->(p)`)
            .then( function() {
              session.close();
              driver.close();
              resolve();
            })
            .catch(function(err) {
              // console.log(err)
              reject(err)
            });
        })
      )
    }
  }

  // here we create the properties for the relationship between the packages
  var frameworkQueryString = frameworkObject.join(',');

  // now we are going to relate each package to all of the other packages, with the values for the frameworks on the relationship
  for ( var k = 0; k < packages.length; k++) {
    promises.push(
      new Promise(function(resolve,reject) {
        session
          .run(`MATCH (n:Package {name: "${packages[k]}"}),(p:Package) WHERE NOT n.name = p.name MERGE (n)-[r:RECOMMENDS]->(p) ON CREATE SET ${frameworkQueryString} RETURN n,p`)
          .then( function() {
            session.close();
            driver.close();
            resolve();
          })
          .catch(function(err) {
            // console.log(err)
            reject(err)
          });
      })
    )
  }

  Promise.all(promises)
  .then()
  .catch(function(e) {
    console.log(e);
  });
}

// initNeo4j(['React','Angular','Vue'], ['cssmin','watch','uglify','sass'])

var queueConfig = function(framework, packages) {
  queue.enqueue({framework: framework, packages: packages});
  console.log('queue', queue.size());
  // this needs to be changed so that a worker will periodically come and empty the queue
  if ( queue.size() === 2 ) {
    while ( queue.size() > 0) {
      saveConfig(queue.dequeue());
    }
  }
}

var saveConfig = function(config) { // config = {packages: ['cssmin', 'watch']}
  if (!config) {
    return;
  };

  addPackage({
    packages: config.packages,
    framework: config.framework
  });
}

var getRecommendations = function(config, cb) {
  if (!config) {
    return;
  }

  var storage = {};
  var promises = [];
  var result = [];

  config.packages.forEach(function(package) {
    promises.push(
      new Promise(function(resolve,reject) {
        session
          .run( `MATCH (a:Package {name: "${package}"})-[r:RECOMMENDS]->(b:Package) WHERE NOT b.name IN ${JSON.stringify(config.packages)} RETURN properties(a),properties(r),properties(b)`)
          .then( function( result ) {
            if ( result.records.length > 0 ) {
              result.records.forEach(function(record) {
                var name = record._fields[2].name;
                var value = record._fields[1][`${config.framework.toLowerCase()}Value`].toInt();
                if ( storage[name] ) {
                  storage[name] += value;
                } else {
                  storage[name] = value;
                }
              });
            }
            resolve()
            session.close();
            driver.close();
          })
          .catch(function(err) {
            reject(err)
          });
      })
    )
  });

  Promise.all(promises).then(() => {
    for ( var k in storage ) {
      var tempObject = {
        name: k,
        value: storage[k]
      }
      result.push(tempObject)
    }
    cb(null, result.sort(function(a, b) {
      return b.value - a.value
    }))
  })
  .catch(function(e) {
    cb(new Error(e));
  });
}

var addPackage = function(config) {
  if (config.packages.length < 2) {
    return;
  }
  var uniqueCombinations = util.combination(config.packages, 2)
  for ( var i = 0; i < uniqueCombinations.length; i++) {
    uniqueCombinations[i]
    session
      .run( `MATCH (a:Package {name:'${uniqueCombinations[i][0]}'})-[r:RECOMMENDS]-(b:Package {name:'${uniqueCombinations[i][1]}'}) SET r.${config.framework.toLowerCase()}Value = r.${config.framework.toLowerCase()}Value + 1`)
      .then( function( result ) {
        result.records.forEach(function(record) {
          var name = record._fields[2].name;
          var value = record._fields[1][`${config.framework.toLowerCase()}Value`].toInt();
          if ( storage[name] ) {
            storage[name] += value;
          } else {
            storage[name] = value;
          }
        });
        session.close();
        driver.close();
      })
      .catch(function(err) {
        console.log(err)
      });
  }
}

module.exports = {
  getRecommendations: getRecommendations,
  queueConfig: queueConfig,
  init: initNeo4j
}