// this needs to be here so that node doesn't throw a warning about a possible memory leak where there actually is none.
require('events').EventEmitter.defaultMaxListeners = 100;

var CronJob = require('cron').CronJob;
var Promise = require('bluebird');
var neo4j = require('neo4j-driver').v1;
var config = require('./config.js');

var driver = neo4j.driver("bolt://" + config.neo4j.server, neo4j.auth.basic(config.neo4j.user, config.neo4j.password));

// var session = driver.session();

var queueInstance = require('./queue.js');
var util = require('./util.js');

var initNeo4j = function(frameworks, packages, cb) {
  var session = driver.session();
  var promises = [];

  // let's go ahead and add all of the frameworks to neo4j
  for ( var i = 0; i < frameworks.length; i++) {
    promises.push(
      new Promise(function(resolve,reject) {
        session
          .run( `MERGE (f:Framework { name: {framework} })`, {framework: frameworks[i]})
          .then( function() {
            session.close();
            driver.close();
            resolve();
          })
          .catch(function(err) {
            session.close();
            driver.close();
            reject(err);
          });
      })
    )
  }

  // let's also add all of the packages
  for ( var i = 0; i < packages.length; i++) {
    promises.push(
      new Promise(function(resolve,reject) {
        session
          .run( `MERGE (p:Package { name: {package} })`, {package: packages[i]})
          .then( function() {
            session.close();
            driver.close();
            resolve();
          })
          .catch(function(err) {
            session.close();
            driver.close();
            reject(err);
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
            .run(`MATCH (f:Framework { name: {framework} }), (p:Package { name: {package} }) MERGE (f)-[:HAS_PACKAGE]->(p)`, {framework: frameworks[i], package: packages[j]})
            .then( function() {
              session.close();
              driver.close();
              resolve();
            })
            .catch(function(err) {
              session.close();
              driver.close();
              reject(err);
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
          .run(`MATCH (n:Package {name: {package}}),(p:Package) WHERE NOT n.name = p.name MERGE (n)-[r:RECOMMENDS]->(p) ON CREATE SET ${frameworkQueryString} RETURN n,p`, {package: packages[k] })
          .then( function() {
            session.close();
            driver.close();
            resolve();
          })
          .catch(function(err) {
            session.close();
            driver.close();
            reject(err);
          });
      })
    )
  }
  Promise.all(promises)
  .then(function() {
    cb(null);
  })
  .catch(function(e) {
    cb(e);
  });
}

var queue = queueInstance();

var queueConfig = function(config) {
  queue.enqueue(config);
}

var saveConfig = function(config) { // config = {framework: 'React', packages: ['cssmin', 'watch']}
  if (!config) {
    return;
  };

  addPackage({
    packages: config.packages,
    framework: config.framework
  });
}

var getRecommendations = function(config, cb) {
  var session = driver.session();
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
          .run( `MATCH (a:Package {name: {packageName}})-[r:RECOMMENDS]->(b:Package) WHERE NOT b.name IN {otherPackages} RETURN properties(a),properties(r),properties(b)`, { packageName: package, otherPackages: config.packages } )
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
          })
          .then(() => {
            session.close();
            driver.close();
            resolve();
          })
          .catch(function(err) {
            session.close();
            driver.close();
            reject(err);
          });
      })
    )
  });

  Promise.all(promises).then(() => {
    for ( var k in storage ) {
      result.push({name: k, value: storage[k]})
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
  var session = driver.session();
  if (config.packages.length < 2) {
    return;
  }
  var uniqueCombinations = util.combination(config.packages, 2);
  for ( var i = 0; i < uniqueCombinations.length; i++) {
    session
      .run( `MATCH (a:Package {name: {package1} })-[r:RECOMMENDS]-(b:Package {name: {package2} }) SET r.${config.framework.toLowerCase()}Value = r.${config.framework.toLowerCase()}Value + 1`, {package1: uniqueCombinations[i][0], package2: uniqueCombinations[i][1]})
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
        session.close();
        driver.close();
      });
  }
}

module.exports = {
  getRecommendations: getRecommendations,
  queueConfig: queueConfig,
  init: initNeo4j
}

// queueConfig({framework: 'React', packages: ['cssmin', 'sass', 'uglify']})
// queueConfig({framework: 'React', packages: ['cssmin', 'watch', 'uglify']})

// saveConfig({framework: 'React', packages: ['cssmin', 'watch', 'uglify']});
// saveConfig({framework: 'React', packages: ['cssmin', 'uglify']});

// addPackage({framework: 'angular', packages: ['watch', 'sass', 'uglify']});

// getRecommendations({framework: 'angular', packages: ['watch', 'uglify']}, function(err, recommendations) {
//   if ( err ) {
//     console.log(err);
//   }
//   console.log(recommendations);
// })


new CronJob('0 0 * * * *', function() { // cron job happens every hour
  // will this cause problems? having a while loop in here? should it be in a seperate file?
  console.log('fire cron')
  while ( queue.size() > 0) {
    saveConfig(queue.dequeue());
  }

}, null, true, 'America/Los_Angeles');