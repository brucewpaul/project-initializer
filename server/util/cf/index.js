var db = require('./db');
var controller = require('./db/controller');

var queueInstance = require('./queue.js');
var util = require('./util.js');

// will eventually be in a db
var storage = {
  'all': {
    'cssmin': {
      'uglify': {
        'value': 10
      },
      'watch': {
        'value': 16
      },
      'sass': {
        'value': 15
      },
    },
    'uglify': {
      'cssmin': {
        'value': 10
      },
      'watch': {
        'value': 2
      },
      'sass': {
        'value': 7
      },
    },
    'watch': {
      'uglify': {
        'value': 2
      },
      'cssmin': {
        'value': 16
      },
      'sass': {
        'value': 4
      },
    },
    'sass': {
      'uglify': {
        'value': 7
      },
      'watch': {
        'value': 4
      },
      'cssmin': {
        'value': 15
      },
    }
  },
  'react': {
    'cssmin': {
      'uglify': {
        'value': 5
      },
      'watch': {
        'value': 12
      },
      'sass': {
        'value': 5
      },
    },
    'uglify': {
      'cssmin': {
        'value': 5
      },
      'watch': {
        'value': 1
      },
      'sass': {
        'value': 7
      },
    },
    'watch': {
      'uglify': {
        'value': 1
      },
      'cssmin': {
        'value': 12
      },
      'sass': {
        'value': 2
      },
    },
    'sass': {
      'uglify': {
        'value': 7
      },
      'watch': {
        'value': 2
      },
      'cssmin': {
        'value': 5
      },
    }
  },
  'angular': {
    'cssmin': {
      'uglify': {
        'value': 5
      },
      'watch': {
        'value': 4
      },
      'sass': {
        'value': 10
      },
    },
    'uglify': {
      'cssmin': {
        'value': 5
      },
      'watch': {
        'value': 1
      },
      'sass': {
        'value': 0
      },
    },
    'watch': {
      'uglify': {
        'value': 1
      },
      'cssmin': {
        'value': 4
      },
      'sass': {
        'value': 2
      },
    },
    'sass': {
      'uglify': {
        'value': 0
      },
      'watch': {
        'value': 2
      },
      'cssmin': {
        'value': 10
      },
    }
  },
}

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
    console.log(combos[i][0])
    controller.createRelationship({
      package: combos[i][0],
      otherPackage: combos[i][1],
      framework: config.framework
    });
  }

  // for ( var i = 0; i < config.packages.length; i++ ) {
  //   var pkg = config.packages[i];

    // if ( !storage[config.framework][pkg] ) {
    //   storage[config.framework][pkg] = {}
    // }

    // if ( !storage['all'][pkg] ) {
    //   storage['all'][pkg] = {}
    // }

    // for ( var j = 0; j < config.packages.length; j++ ) {
    //   var otherPkg = config.packages[j];
    //   if ( pkg !== otherPkg ) {
    //     if ( storage['all'][pkg][otherPkg] ) {
    //       storage['all'][pkg][otherPkg]['value'] += 1;
    //     } else {
    //       storage['all'][pkg][otherPkg]['value'] = 1;
    //     }

    //     if ( storage[config.framework][pkg][otherPkg] ) {
    //       storage[config.framework][pkg][otherPkg]['value'] += 1;
    //     } else {
    //       storage[config.framework][pkg][otherPkg]['value'] = 1;
    //     }

    //     storage[config.framework][pkg][otherPkg]['relevance'] = storage[config.framework][pkg][otherPkg]['value'] / storage['all'][pkg][otherPkg]['value']
    //   }
    // }
  // }

  // console.log(storage['all']['cssmin']['watch'])
  // console.log(storage['react']['cssmin']['watch'])

  // var react = storage['react'];
  // var angular = storage['react'];

  // for ( var k in react ) {
  //   // console.log(react[k])
  //   for ( var i in react[k] ) {
  //     // console.log(react[k][i])
  //   }
  // }

  // return storage;
}

var getRecommendations = function(framework, packages) {
  if (!packages) {
    return
  };

  if (packages.length === 1) {
    if ( !storage[framework][packages[0]] ) {
      return null;
    } else {
      // sort this
      return storage[framework][packages[0]];
    }
  }

  var recommendations = {};

  packages.forEach((pkg) => {
    if ( storage[framework][pkg] ) {
      for ( var k in storage[framework][pkg] ) {
        if ( recommendations[k] ) {
          recommendations[k] += storage[framework][pkg][k]
        } else {
          recommendations[k] = storage[framework][pkg][k]
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

var generateValues = function() {
  // get all relationships and re-compute the stats for the package combos
}

var addPackage = function() {
  // add package
}

// saveConfig({framework: 'react', packages: ['cssmin', 'watch', 'uglify']});

// controller.retreiveAllRelationships(function(packages) {
//   console.log(packages)
// })