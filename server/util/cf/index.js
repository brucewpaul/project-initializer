var db = require('./db');
var controller = require('./db/controller');

var queueInstance = require('./queue.js');
var util = require('./util.js');

var queue = queueInstance();

var queueConfig = function(framework, packages) {
  queue.enqueue({framework, packages});
  // this needs to be changed so that a worker will periodically come and empty the queue
  if ( queue.size() === 2 ) {
    while ( queue.size() > 0) {
      saveConfig(queue.dequeue());
    }
  }
}

var saveConfig = function(config) { // config = {packages: ['cssmin', 'watch']}
  if (!config || config.packages.length < 2) {
    return;
  };

  var combos = util.combination(config.packages, 2);

  for ( var i = 0; i < combos.length; i++ ) {
    controller.createRelationship({
      package: combos[i][0],
      otherPackage: combos[i][1],
      framework: config.framework
    }, function(pkg) {
      console.log('relation created', pkg)
    });
  }

}

var getRecommendations = function(packages) {
  if (!packages) {
    return;
  }

  var framework = packages[0].framework || null;
  var promises = [];
  var results = [];

  packages.forEach(function(pkg) {
    promises.push(controller.retreiveRelationship(pkg).then(function(relation) {
      results.push(relation);
    }));
  });

  return new Promise(function(resolve, reject) {
    Promise.all(promises).then(function() {
      resolve(results);
    });
  })

}

var generateValues = function() {
  // get all relationships and re-compute the stats for the package combos
}

var addPackage = function() {
  // add package
}

// saveConfig({framework: 'react', packages: ['cssmin', 'watch', 'uglify']});
// saveConfig({framework: 'react', packages: ['cssmin', 'uglify']});

// controller.retreiveAllRelationships().then(function(packages) {
//   getRecommendations(packages).then(function(relationships) {
//     // console.log('relationships', relationships)
//     relationships.forEach(function(relations){
//       relations.forEach(function(relation){
//         controller.incrementPackageStat(relation).then(function(stat) {
//           console.log('stat', stat);
//         });
//       });
//     });
//   });
// });