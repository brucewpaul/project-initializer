var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var fs = require('fs');
var path = require('path');
var Promise = require('bluebird');
var gulp = require('gulp');
 //used to run shell commands
var execSync = require('child_process').execSync;
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

  after(function() {
    deleteFolderRecursive(path.join(__dirname, 'client'));
    fs.unlinkSync(path.join(__dirname, 'gulpfile.js'));
  });

  it('gulpFile should be a string', function (done) {
    var gulpFile = createGulpFile(options);
    expect(gulpFile).to.be.a('string');
    done();
  });

  it('should create task \'build-css\' when given options.frontend.styling = \'css\'', function(done) {
    var gulpFile = createGulpFile(options);
    expect(gulpFile).to.contain('gulp.task(\'build-css\', function () {\n  return gulp.src(\'client/public/assets/*.css\')\n    .pipe(cleanCSS())\n    .pipe(extname(\'.min.css\'))\n    .pipe(gulp.dest(\'client/public/assets\'));\n});');
    done();
  });

  it('should create task \'build-less\' when given options.frontend.styling = \'less\'', function (done) {
    options.devTools.styling = 'less';
    var gulpFile = createGulpFile(options);
    expect(gulpFile).to.contain('gulp.task(\'build-less\', function () {\n  return gulp.src(\'client/public/assets/*.less\')\n    .pipe(less())\n    .pipe(cleanCSS())\n    .pipe(extname(\'.min.css\'))\n    .pipe(gulp.dest(\'client/public/assets\'));\n});\n');
    done();
  });

  it('should create task \'build-sass\' when given options.frontend.styling = \'sass\'', function (done) {
    options.devTools.styling = 'sass';
    var gulpFile = createGulpFile(options);
    expect(gulpFile).to.contain('gulp.task(\'build-sass\', function () {\n  return gulp.src(\'client/public/assets/*.scss\')\n    .pipe(sass().on(\'error\', sass.logError))\n    .pipe(cleanCSS())\n    .pipe(extname(\'.min.css\'))\n    .pipe(gulp.dest(\'client/public/assets\'));\n});\n');
    done();
  });

  it('should have gulp function to watch folder \'client/public/assets\'', function (done) {
    options.devTools.styling = 'css';
    var gulpFile = createGulpFile(options);
    expect(gulpFile).to.contain('gulp.watch(\'client/public/assets\', [\'build-css\']);\n');
    options.devTools.styling = 'less';
    var gulpFile = createGulpFile(options);
    expect(gulpFile).to.contain('gulp.watch(\'client/public/assets\', [\'build-less\']);\n');
    options.devTools.styling = 'sass';
    var gulpFile = createGulpFile(options);
    expect(gulpFile).to.contain('gulp.watch(\'client/public/assets\', [\'build-sass\']);\n');
    done();
  });

  it('should create .min.css files when \'gulp css\' is called', function(done) {
    this.timeout(70000);
    deleteFolderRecursive(path.join(__dirname, 'client'));
    var cssFile = "body {background-color: blue}";
    options.devTools.styling = 'css';
    fs.mkdirSync(path.join(__dirname, 'client'));
    fs.mkdirSync(path.join(__dirname, 'client/public'));
    fs.mkdirSync(path.join(__dirname, 'client/public/assets'));
    fs.writeFileSync(path.join(__dirname, 'client/public/assets/style.css'), cssFile);
    fs.writeFileSync(path.join(__dirname, 'gulpfile.js'), createGulpFile(options));

    execSync('gulp build-css\n', {cwd: __dirname});
    expect(fs.existsSync(path.join(__dirname, 'client/public/assets/style.min.css'))).to.be.true;
    done();
  });

  it('should create .min.css files when \'gulp less\' is called', function (done) {
    this.timeout(70000);
    deleteFolderRecursive(path.join(__dirname, 'client'));
    fs.unlinkSync(path.join(__dirname, 'gulpfile.js'));
    var cssFile = "body {background-color: blue}";
    options.devTools.styling = 'less';
    fs.mkdirSync(path.join(__dirname, 'client'));
    fs.mkdirSync(path.join(__dirname, 'client/public'));
    fs.mkdirSync(path.join(__dirname, 'client/public/assets'));
    fs.writeFileSync(path.join(__dirname, 'client/public/assets/style.less'), cssFile);
    fs.writeFileSync(path.join(__dirname, 'gulpfile.js'), createGulpFile(options));


    execSync('gulp build-less\n', {cwd: __dirname});
    expect(fs.existsSync(path.join(__dirname, 'client/public/assets/style.min.css'))).to.be.true;
    done();
  });

  it('should create .min.css files when \'gulp sass\' is called', function(done) {
    this.timeout(10000);
    fs.unlinkSync(path.join(__dirname, 'gulpfile.js'));
    deleteFolderRecursive(path.join(__dirname, 'client'));
    var cssFile = "body {background-color: blue}";
    options.devTools.styling = 'sass';
    fs.mkdirSync(path.join(__dirname, 'client'));
    fs.mkdirSync(path.join(__dirname, 'client/public'));
    fs.mkdirSync(path.join(__dirname, 'client/public/assets'));
    fs.writeFileSync(path.join(__dirname, 'client/public/assets/style.scss'), cssFile);
    fs.writeFileSync(path.join(__dirname, 'gulpfile.js'), createGulpFile(options));

    execSync('gulp build-sass\n', {cwd: __dirname});
    expect(fs.existsSync(path.join(__dirname, 'client/public/assets/style.min.css'))).to.be.true;
    done();
  });

  it('should update the \'.min.css\' files whenever a stylesheet changes', function () {
    this.timeout(10000);
    fs.unlinkSync(path.join(__dirname, 'gulpfile.js'));
    deleteFolderRecursive(path.join(__dirname, 'client'));
    var cssFile = "body {background-color: blue}";
    options.devTools.styling = 'css';
    fs.mkdirSync(path.join(__dirname, 'client'));
    fs.mkdirSync(path.join(__dirname, 'client/public'));
    fs.mkdirSync(path.join(__dirname, 'client/public/assets'));
    fs.writeFileSync(path.join(__dirname, 'client/public/assets/style.scss'), cssFile);
    fs.writeFileSync(path.join(__dirname, 'gulpfile.js'), createGulpFile(options));

  });
});
