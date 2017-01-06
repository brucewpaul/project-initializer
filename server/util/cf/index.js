var queueInstance = require('./queue.js');

// will eventually be in a db
var storage = {
  'cssmin': {
    'uglify': 5,
    'watch': 4,
    'sass': 10,
  },
  'uglify': {
    'cssmin': 5,
    'watch': 1,
    'sass': 0,
  },
  'watch': {
    'uglify': 1,
    'cssmin': 4,
    'sass': 2,
  },
  'sass': {
    'uglify': 0,
    'watch': 2,
    'cssmin': 10,
  }
}

var queue = queueInstance();

var queueConfig = function(packages) {
  queue.enqueue(packages)
  if ( queue.size() === 2 ) {
    console.log('test', queue.size())
    while ( queue.size() > 0) {
      saveConfig(queue.dequeue());
    }
  }
}

var saveConfig = function(packages) {
  if (!packages) {
    return;
  };

  for ( var i = 0; i < packages.length; i++ ) {
    var pkg = packages[i];

    if ( !storage[pkg] ) {
      storage[pkg] = {}
    }
    for ( var j = 0; j < packages.length; j++ ) {
      var otherPkg = packages[j];
      if ( pkg !== otherPkg ) {
        if ( storage[pkg][otherPkg] ) {
          storage[pkg][otherPkg] += 1;
        } else {
          storage[pkg][otherPkg] = 1;
        }
      }
    }
  }
  return storage;
}

var getRecommendations = function(packages) {
  if (!packages) {
    return
  };

  if (packages.length === 1) {
    if ( !storage[packages[0]] ) {
      return null;
    } else {
      // sort this
      return storage[packages[0]];
    }
  }

  var recommendations = {};

  packages.forEach((pkg) => {
    if ( storage[pkg] ) {
      for ( var k in storage[pkg] ) {
        if ( recommendations[k] ) {
          recommendations[k] += storage[pkg][k]
        } else {
          recommendations[k] = storage[pkg][k]
        }
      }
    }
    // add this combo to storage
  });

  var results = [];

  for ( var k in recommendations ) {
    var input = {
      package: k,
      rating: recommendations[k]
    }
    results.push(input);
  }

  return results.sort(function(a, b) {
    return b.rating - a.rating
  });
}

console.log(getRecommendations(['cssmin', 'watch']))