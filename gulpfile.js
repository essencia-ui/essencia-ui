var
	gulp = require( 'gulp' ),
	browserSync = require( 'browser-sync' ),
	sourcemaps = require( 'gulp-sourcemaps'),
	$ = require( 'gulp-load-plugins' )( {lazy: true} );

gulp.task( 'styles', function () {
	return gulp
		.src( './src/sass/**/*.scss' )
		.pipe( $.sass().on( 'error', $.sass.logError ) )
		.pipe( $.autoprefixer( 'last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4' ) )
		.pipe( $.cleanCss() )
		.pipe( sourcemaps.init())
		.pipe( $.rename( 'essencia-ui.min.css' ) )
		.pipe( sourcemaps.write('.'))
		.pipe( gulp.dest( 'public/css/' ) )
		.pipe( browserSync.reload( {stream: true} ) );
} );

// gulp.task('vendorScripts', function() {
// 	gulp.src('./src/js/vendor/**/*.js')
// 			.pipe(gulp.dest('public/js/vendor'));
// });

gulp.task( 'scripts', function () {
	return gulp
		.src([
			'./src/js/vendor/**/*.js',
			'./src/js/app.js'
		])
		// .src( [
		// 	'./src/js/!(vendor)**/!(app)*.js',
		// 	'./src/js/app.js'
		// ] )
		.pipe( $.plumber() )
		.pipe( sourcemaps.init())
		.pipe( $.babel({
			presets: ['@babel/preset-env'],
		}))
		.pipe( $.concat( 'essencia-ui.min.js' ) )
		.pipe( $.terser() )
		.pipe( sourcemaps.write('.'))
		.pipe( gulp.dest( 'public/js' ) )
		.pipe( browserSync.reload( {stream: true} ) );
} );

// Optimizes the images that exists
gulp.task( 'images', function () {
	return gulp
		.src( 'src/images/**' )
		.pipe( $.changed( 'images' ) )
		.pipe( $.imagemin( {
			// Lossless conversion to progressive JPGs
			progressive: true,
			// Interlace GIFs for progressive rendering
			interlaced: true
		} ) )
		.pipe( gulp.dest( 'public/images' ) )
		.pipe( $.size( {title: 'images'} ) );
} );

gulp.task( 'html', function () {
	return gulp
		.src( './src/**/*.html' )
		.pipe( gulp.dest( 'public/' ) )
} );

gulp.task( 'browser-sync', ['styles', 'scripts'], function () {
	browserSync( {
		server: {
			baseDir: "./public/",
			injectChanges: true // this is new
		}
	} );
} );

gulp.task( 'deploy', function () {
	return gulp
		.src( './public/**/*' )
		.pipe( ghPages() );
} );

gulp.task( 'watch', function () {
	// Watch .html files
	gulp.watch( 'src/**/*.html', ['html', browserSync.reload] );
	gulp.watch( "public/*.html" ).on( 'change', browserSync.reload );
	// Watch .sass files
	gulp.watch( 'src/sass/**/*.scss', ['styles', browserSync.reload] );
	// Watch .js files
	gulp.watch( 'src/js/*.js', ['scripts', browserSync.reload] );
	// Watch .js files
	// gulp.watch( 'src/js/vendor/*', ['vendorScripts', browserSync.reload] );
	gulp.watch( 'src/js/vendor/*', ['scripts', browserSync.reload] );
	// Watch image files
	gulp.watch( 'src/images/**/*', ['images', browserSync.reload] );
} );

gulp.task( 'default', function () {
	gulp.start(
		'styles',
		// 'vendorScripts',
		'scripts',
		'images',
		'html',
		'browser-sync',
		'watch',
	);
} );


