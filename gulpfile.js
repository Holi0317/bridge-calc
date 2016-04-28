'use strict';

let path = require('path');
let gulp = require('gulp');
let gutil = require('gulp-util');
let $ = require('gulp-load-plugins')();
let del = require('del');
let runSequence = require('run-sequence');
let merge = require('merge-stream');
let webpack = require('webpack');
let webpackMiddle = require('webpack-dev-middleware');

let browserSync = require('browser-sync').create();
let historyApiFallback = require('connect-history-api-fallback');
let reload = browserSync.reload;

function webpackConfig() {
  return {
    module: {
      loaders: [
        { test: /\.ts$/, loader: 'ts-loader' },
        { test: /\.html$/, loader: 'raw' },
        { test: /\.scss$/, loader: 'raw!postcss-loader!sass-loader' }
      ]
    },
    resolve: {
      extensions: ['', '.ts', '.js']
    },
    entry: {
      'script/app': './app/script/index.ts',
      'sw': './app/sw.ts'
    },
    output: {
      filename: '[name].js',
      path: '.tmp',
      publicPath: 'http://localhost:3000/'
    },
    plugins: [],
    postcss: function() {
      return [require('postcss-cssnext')];
    },
    sassLoader: sassConfig()
  }
}

function sassConfig() {
  return {
    includePaths: path.join(__dirname, 'node_modules'),
    outputStyle: (process.env.NODE_ENV === 'production') ? 'compressed' : 'expanded'
  }
}

gulp.task('html', () => {
  return gulp.src('app/index.html')
  .pipe($.htmlmin({
    removeComments: true,
    collapseWhitespace: true,
    conservativeCollapse: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    removeIgnored: true
  }))
  .pipe(gulp.dest('dist'));
});

gulp.task('clean', () => {
  return del(['dist', '.tmp']);
});

gulp.task('copy', () => {
  let polyfills = gulp.src('node_modules/angular2/bundles/angular2-polyfills.js')
  .pipe($.rename('polyfills.js'))
  .pipe(gulp.dest('.tmp/script'));

  let rxjs = gulp.src('node_modules/rxjs/bundles/Rx.js')
  .pipe($.rename('rx.js'))
  .pipe(gulp.dest('.tmp/script'));

  let swToolbox = gulp.src('node_modules/sw-toolbox/*.js')
  .pipe(gulp.dest('.tmp'));

  return merge(
    polyfills,
    rxjs,
    swToolbox
  );
});

gulp.task('copy:dist', () => {
  let polyfills = gulp.src('node_modules/angular2/bundles/angular2-polyfills.min.js')
  .pipe($.rename('polyfills.js'))
  .pipe(gulp.dest('dist/script'));

  let rxjs = gulp.src('node_modules/rxjs/bundles/Rx.min.js')
  .pipe($.rename('rx.js'))
  .pipe(gulp.dest('dist/script'));

  let swToolbox = gulp.src('node_modules/sw-toolbox/*.js')
  .pipe(gulp.dest('dist'));

  return merge(
    polyfills,
    rxjs,
    swToolbox
  );
});

gulp.task('bundle:dist', cb => {
  let config = webpackConfig();

  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    mangle: {
      keep_fnames: true
    }
  }));
  config.plugins.push(new webpack.EnvironmentPlugin(['NODE_ENV']));
  config.output.path = 'dist';
  config.output.publicPath = '/';

  webpack(config, (err, stats) => {
    if(err) throw new gutil.PluginError('webpack', err);
    gutil.log('[webpack]', stats.toString());
    cb();
  });
});

gulp.task('style', () => {
  let config = sassConfig();
  return gulp.src('app/style/app.scss')
  .pipe($.sass(config))
  .pipe(gulp.dest('.tmp/style'));
});

gulp.task('style:dist', () => {
  let config = sassConfig()

  return gulp.src('app/style/app.scss')
  .pipe($.sass(config))
  .pipe(gulp.dest('dist/style'));
})

gulp.task('serve', ['style', 'copy'], () => {
  let config = webpackConfig();
  config.output.path = path.join(__dirname, config.output.path);

  let compiler = webpack(config);

  let middleware = webpackMiddle(compiler, {
    publicPath: config.output.publicPath
  });

  browserSync.init({
    server: {
      baseDir: ['.tmp', 'app']
    },
    port: 3000,
    middleware: [middleware, historyApiFallback()]
  });

  middleware.waitUntilValid(() => {
    compiler.plugin('done', () => {
      reload();
    });
  });

  gulp.watch('app/style/**/*.scss', ['style', reload]);
});

gulp.task('serve:dist', ['default'], () => {
  browserSync.init({
    server: {
      baseDir: ['dist']
    },
    port: 3001,
    middleware: [historyApiFallback()]
  });
});

gulp.task('default', cb => {
  process.env.NODE_ENV = 'production';
  return runSequence(
    'clean',
    ['bundle:dist', 'html', 'style:dist', 'copy:dist'],
    cb
  );
});

gulp.task('push', () => {
  return gulp.src('./dist/**/*')
  .pipe($.ghPages());
});

gulp.task('deploy', cb => {
  return runSequence(
    'default',
    'push',
    cb
  );

});
