var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var createGulpFile = require('./../server/util/bundler/gulp-helpers');

var options = {
  devTools: {
    styling: 'css'
  }
};

describe('gulp-helper', function () {

  it('gulpFile should be a string', function (done) {
    var gulpFile = createGulpFile(options);
    expect(gulpFile).to.be.a('string');
    done();
  });

  it('should create task \'css\' when given options.frontend.styling = \'css\'', function(done) {
    var gulpFile = createGulpFile(options);
    expect(gulpFile).to.contain('gulp.task(\'cssminify\', function () {\n  return gulp.src(\'client/public/assets/*.css\')\n    .pipe(cleanCSS())\n    .pipe(extname(\'.min.css\'))\n    .pipe(gulp.dest(\'client/public/assets\'));\n});');
    done();
  });

  it('should create task \'less\' when given options.frontend.styling = \'less\'', function (done) {
    options.devTools.styling = 'less';
    var gulpFile = createGulpFile(options);
    expect(gulpFile).to.contain('gulp.task(\'less\', function () {\n  return gulp.src(\'client/public/assets/*.less\')\n    .pipe(less())\n    .pipe(cleanCSS())\n    .pipe(extname(\'.min.css\'))\n    .pipe(gulp.dest(\'client/public/assets\'));\n});\n');
    done();
  });

  it('should create task \'sass\' when given options.frontend.styling = \'sass\'', function (done) {
    options.devTools.styling = 'sass';
    var gulpFile = createGulpFile(options);
    expect(gulpFile).to.contain('gulp.task(\'sass\', function () {\n  return gulp.src(\'client/public/assets/*.scss\')\n    .pipe(sass().on(\'error\', sass.logError))\n    .pipe(cleanCSS())\n    .pipe(extname(\'.min.css\'))\n    .pipe(gulp.dest(\'client/public/assets\'));\n});\n');
    done();
  });

  it('should have gulp function to watch folder \'client/public/assets\' for changes with any input', function (done) {
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

  it('should update the \'.min.css\' files whenever a stylesheet changes');
});