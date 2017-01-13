var neo4j = require('neo4j-driver').v1;

var driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "112187"));
var session = driver.session();

var queueInstance = require('./queue.js');
var util = require('./util.js');

var queue = queueInstance();

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
          .run( `MATCH (a:Package {name: "${package}"})-[r:recommends]->(b:Package) WHERE NOT b.name IN ${JSON.stringify(config.packages)} RETURN properties(a),properties(r),properties(b)`)
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
      .run( `MATCH (a:Package {name:'${uniqueCombinations[i][0]}'})-[r:recommends]-(b:Package {name:'${uniqueCombinations[i][1]}'}) SET r.${config.framework.toLowerCase()}Value = r.${config.framework.toLowerCase()}Value + 1`)
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

// saveConfig({framework: 'react', packages: ['cssmin', 'watch', 'uglify']});
// saveConfig({framework: 'react', packages: ['cssmin', 'uglify']});

// addPackage({framework: 'react', packages: ['watch', 'sass', 'uglify']});

// getRecommendations({framework: 'react', packages: ['watch', 'uglify']}, function(err, recommendations) {
//   if ( err ) {
//     console.log(err);
//   }
//   console.log(recommendations);
// })

module.exports = {
  getRecommendations: getRecommendations,
  queueConfig: queueConfig
}