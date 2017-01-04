var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var fs = require('fs');
var path = require('path');
var Promise = require('bluebird');
 //used to run shell commands
var execAsync = Promise.promisify(require('child_process').exec);
var createGulpFile = require('./../server/util/bundler/gulp-helpers');

var options = {
  devTools: {
    styling: 'css'
  }
};

var deleteFolderRecursive = function(path) {
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file,index){
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

describe('gulp-helper', function () {

  xit('gulpFile should be a string', function (done) {
    var gulpFile = createGulpFile(options);
    expect(gulpFile).to.be.a('string');
    done();
  });

  xit('should create task \'css\' when given options.frontend.styling = \'css\'', function(done) {
    var gulpFile = createGulpFile(options);
    expect(gulpFile).to.contain('gulp.task(\'cssminify\', function () {\n  return gulp.src(\'client/public/assets/*.css\')\n    .pipe(cleanCSS())\n    .pipe(extname(\'.min.css\'))\n    .pipe(gulp.dest(\'client/public/assets\'));\n});');
    done();
  });

  xit('should create task \'less\' when given options.frontend.styling = \'less\'', function (done) {
    options.devTools.styling = 'less';
    var gulpFile = createGulpFile(options);
    expect(gulpFile).to.contain('gulp.task(\'less\', function () {\n  return gulp.src(\'client/public/assets/*.less\')\n    .pipe(less())\n    .pipe(cleanCSS())\n    .pipe(extname(\'.min.css\'))\n    .pipe(gulp.dest(\'client/public/assets\'));\n});\n');
    done();
  });

  xit('should create task \'sass\' when given options.frontend.styling = \'sass\'', function (done) {
    options.devTools.styling = 'sass';
    var gulpFile = createGulpFile(options);
    expect(gulpFile).to.contain('gulp.task(\'sass\', function () {\n  return gulp.src(\'client/public/assets/*.scss\')\n    .pipe(sass().on(\'error\', sass.logError))\n    .pipe(cleanCSS())\n    .pipe(extname(\'.min.css\'))\n    .pipe(gulp.dest(\'client/public/assets\'));\n});\n');
    done();
  });

  it('should have gulp function to watch folder \'client/public/assets\'', function (done) {
    options.devTools.styling = 'css';
    var gulpFile = createGulpFile(options);
    expect(gulpFile).to.contain('gulp.watch(\'client/public/assets\', [\'css\']);\n');
    options.devTools.styling = 'less';
    var gulpFile = createGulpFile(options);
    expect(gulpFile).to.contain('gulp.watch(\'client/public/assets\', [\'less\']);\n');
    options.devTools.styling = 'sass';
    var gulpFile = createGulpFile(options);
    expect(gulpFile).to.contain('gulp.watch(\'client/public/assets\', [\'sass\']);\n');
    done();
  });

  it('should create .min.css files when \'gulp css\' is called', function(done) {
    var cssFile = "body {background-color: blue}";
    options.devTools.styling = 'css';
    fs.mkdirSync(path.join(__dirname, 'client'));
    fs.mkdirSync(path.join(__dirname, 'client/public'));
    fs.mkdirSync(path.join(__dirname, 'client/public/assets'));
    fs.writeFileSync(path.join(__dirname, 'client/public/assets/style.css'), cssFile);
    fs.writeFileSync(path.join(__dirname, 'client/gulpfile.js'), createGulpFile(options));
    execAsync('gulp css')
      .then(function(data) {
        expect(fs.stat(path.join(__dirname, 'client/public/assets/style.min.css'))).isFile();
        deleteFolderRecursive(path.join(__dirname, 'client'));
        done();
      }).catch(function(error) {
        console.log('error :', error);
        deleteFolderRecursive(path.join(__dirname, 'client'));
        done();
      });
    //execute gulp css
    //check folder to see if styles.min.css exists
  });

  xit('should create .min.css files when \'gulp less\' is called');

  xit('should create .min.css files when \'gulp sass\' is called');

  xit('should update the \'.min.css\' files whenever a stylesheet changes', function () {
    //insert gulpfile into test repo
    //run gulp css, store that file in variable
    //write into the css file
    //check folder to see if styles.min.css has changed from version in memory
  });
});