var gulp            = require('gulp'),
	  gulpLoadPlugins = require('gulp-load-plugins'),
	  $               = gulpLoadPlugins(),
    autoprefixer    = require('autoprefixer'),
    del             = require('del'),
    markdown        = require('markdown'),
    sync            = require('browser-sync');
		//browserify    = require('browserify'),
    //watchify      = require('watchify'),
    //source        = require('vinyl-source-stream'),
    //buffer        = require('vinyl-buffer'),
    //assign        = require('lodash.assign'),

var DESTINATION = 'dist';

gulp.task('default', ['sync', 'css', 'html', 'htaccess', 'clean'], function () {
  gulp.watch('css/**/*.scss', ['css']);
  gulp.watch('html/**/*.html', ['html']);
});

gulp.task('clean', function () {
  return del.sync('dist/*');
});
 
gulp.task('html', function() {
  gulp.src(['html/*.html'])
    .pipe($.fileInclude({
      prefix: '{{',
      suffix: '}}',
      basepath: 'html',
      filters: {
        markdown: markdown.parse
      }
    }))
    .pipe(gulp.dest(DESTINATION));
});

//gulp.task('html', function () {
  //return gulp.src('intro.md')
    //.pipe(markdown())
    //.pipe(gulp.dest(DESTINATION));
//});

gulp.task('css', function () {
  return gulp.src('css/**/*.scss')
    .pipe($.scssLint()).on('error', $.sass.logError)
    .pipe($.sass()).on('error', $.sass.logError)
    .pipe($.postcss([
      autoprefixer({ browsers: ['last 2 versions'] })
    ]))
    .pipe($.minifyCss({compatibility: 'ie10'}))
    .pipe(gulp.dest('./dist/css'))
    .pipe(sync.reload({stream:true}));
});

gulp.task('sync', function() {
  sync.init(['./dist/*.{html,css,js,jpg}'], {
    proxy: "localhost.mattijsbliek.com",
    open: false,     // don't open the browser
    notify: false,   // hide the notify on the corner
    ghostMode: {
        clicks: true,
        location: true,
        forms: false,
        scroll: false
    }
  });
});

gulp.task('htaccess', function () {
  return gulp.src(['./.htaccess', './assets'])
  .pipe(gulp.dest('./dist/'));
});


//gulp.task('html', function () {
  //gulp.src('./*.html')
  //.pipe(gulp.dest('./dist/'));
//});

//gulp.task('js', bundle);

//var customOpts = {
	//entries: ['./js/main.js'],
	//debug: true
//};

//var opts = assign({}, watchify.args, customOpts);
//var b = watchify(browserify(opts).on('error', $.util.log));
//b.transform('babelify');
//b.on('update', bundle);

//function bundle() {
	//return b.bundle()
		//.on('error', $.util.log.bind($.util, 'Browserify Error'))
		//.pipe(source('bundle.js'))
		//.pipe(buffer())
		//.pipe($.sourcemaps.init({loadMaps: true})) // loads map from browserify file
     //Add transformation tasks to the pipeline here.
		//.pipe($.sourcemaps.write('./')) // writes .map file
		//.pipe(gulp.dest('./dist'))
        //.pipe(sync.reload({stream:true}));
//}
