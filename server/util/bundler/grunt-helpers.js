var fs = require('fs');
var _ = require('lodash');

var gruntMain = [
  'module.exports = function(grunt) {\n',
  '}\n'
];

var gruntInitConfig = [
  '  grunt.initConfig({\n',
  '    pkg: grunt.file.readJSON(\'package.json\'),\n',
  '  });\n'
]

var pluginConfigs = {
  cssmin: [
    '    cssmin: {\n',
    '      target: {\n',
    '        files: [{\n',
    '          expand: true,\n',
    {React: '          cwd: \'public/assets\',\n',
    Angular: '          cwd: \'assets\',\n'},
    '          src: [\'*.css\', \'!*.min.css\'],\n',
    {React: '          dest: \'public/assets\',\n',
    Angular: '          dest: \'assets\',\n'},
    '          ext: \'.min.css\'\n',
    '        }]\n',
    '      }\n',
    '    },\n'
  ],
  uglify: [
    '    uglify: {\n',
    '      target: {\n',
    '        files: [{\n',
    '          expand: true,\n',
    {React: '          cwd: \'public/assets\',\n',
    Angular: '          cwd: \'assets\',\n'},
    '          src: [\'*.js\', \'!*.min.js\'],\n',
    {React: '          dest: \'public/assets\',\n',
    Angular: '          dest: \'assets\',\n'},
    '          ext: \'.min.js\'\n',
    '        }]\n',
    '      }\n',
    '    },\n'
  ],
  sass: [
    '    sass: {\n',
    '      target: {\n',
    '        files: [{\n',
    '          expand: true,\n',
    {React: '          cwd: \'public/assets\',\n',
    Angular: '          cwd: \'assets\',\n'},
    '          src: [\'*.scss\'],\n',
    {React: '          dest: \'public/assets\',\n',
    Angular: '          dest: \'assets\',\n'},
    '          ext: \'.css\'\n',
    '        }]\n',
    '      }\n',
    '    },\n'
  ],
  less: [
    '    less: {\n',
    '      target: {\n',
    '        files: [{\n',
    '          expand: true,\n',
    {React: '          cwd: \'public/assets\',\n',
    Angular: '          cwd: \'assets\',\n'},
    '          src: [\'*.less\'],\n',
    {React: '          dest: \'public/assets\',\n',
    Angular: '          dest: \'assets\',\n'},
    '          ext: \'.css\'\n',
    '        }]\n',
    '      }\n',
    '    },\n'
  ]
}

var loadNpmTasks = {
  cssmin: '  grunt.loadNpmTasks(\'grunt-contrib-cssmin\');\n',
  uglify: '  grunt.loadNpmTasks(\'grunt-contrib-uglify\');\n',
  sass: '  grunt.loadNpmTasks(\'grunt-contrib-sass\');\n',
  less: '  grunt.loadNpmTasks(\'grunt-contrib-less\');\n'
}

var createGruntTask = function(task) {
  var gruntTask = '  grunt.registerTask(';
  gruntTask = gruntTask + "'" + task.name + "', [";
  _.forEach(task.plugins, function(plugin, index) {
    var formattedPlugin = "'" + plugin + "'";
    if (index !== task.plugins.length - 1) {
      gruntTask = gruntTask + formattedPlugin + ', ';
    } else {
      gruntTask += formattedPlugin;
    }
  });
  gruntTask += ']);\n';
  return gruntTask;
}

var createGruntfileContents = function(options) {
  var gruntFile = '';
  gruntFile += gruntMain[0];
  gruntFile += gruntInitConfig[0];
  gruntFile += gruntInitConfig[1];
  // for each plugin, insert it into the config init
  _.forEach(options.devTools.taskRunner.plugins, function(plugin) {
    _.forEach(pluginConfigs[plugin], function(line) {
      if (typeof line === 'object') {
        gruntFile += line[options.frontEnd.framework];
      } else {
        gruntFile += line;
      }
    });
  });
  gruntFile += gruntInitConfig[2];
  // for each plugin, load npm module
  _.forEach(options.devTools.taskRunner.plugins, function(plugin) {
    gruntFile += loadNpmTasks[plugin];
  });
  // for each task, create the task.
  _.forEach(options.devTools.taskRunner.tasks, function(task) {
    gruntFile += createGruntTask(task);
  });
  gruntFile += gruntMain[1];
  return gruntFile;
}

module.exports = createGruntfileContents;