const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass');
const tslint = require('gulp-tslint');
const typescript = require('gulp-typescript');
const tscConfig = require('./tsconfig.json');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const tsconfig = require('tsconfig-glob');
const runSequence = require('run-sequence');
const fs = require('fs');
const url = require('url');
const path = require("path");
const webpack = require('gulp-webpack');

// Clean the contents of the distribution directory
gulp.task('clean', function () {
    return del('dist/**/*');
});

// Copy dependencies
gulp.task("copy:libs", function () {
    return gulp.src([
        'jquery/dist/**',
        'react/dist/**',
        'react-dom/dist/**'   
    ], { cwd: "node_modules/**" })
    .pipe(gulp.dest("dist/lib"));
});

// Copy assets
gulp.task('copy:assets', function () {
    return gulp.src(['index.html', 'assets/**/*'], { base: './src', cwd: './src' })
        .pipe(gulp.dest('dist'))
});

// Sass compile
gulp.task('sass', function () {
    return gulp.src('./src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'));
});

// TSLint
gulp.task('tslint', function () {
    return gulp.src('src/app/**/*.ts')
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report())
});

// Webpack typescript
gulp.task('webpack', function() { 
    return gulp.src('src/**/*.jsx')
        .pipe(webpack( require('./webpack.config.js') ))
        .pipe(gulp.dest('dist/'))
});

// TSConfig glob
gulp.task('tsconfig-glob', function () {
    return tsconfig({
        configPath: '.',
        indent: 2
    });
});

// Run browsersync for development
gulp.task('serve', ['build'], function () {
    browserSync({
        server: {
            baseDir: 'dist'
        },
        browser: ["chrome"],
        port: 8000,
        ui: {
            port: 8080
        }
    });

    gulp.watch(['src/**/*'], ['recompile']);
});

// Reload browsersync
gulp.task('reload', function () {
    return browserSync.reload();
})

// Main build task
gulp.task('build', function (callback) {
    runSequence(
        'tsconfig-glob',
        'tslint',
        'clean',
        ['sass', 'copy:libs', 'copy:assets', 'webpack'],
        callback);
});

// Recompile Angular (TS and HTML) and SASS, without clean and without copying external libs.
// Finish by reloading browsersync
// This should run a lot quicker than a full build
gulp.task('recompile', function (callback) {
    runSequence(
        ['sass', 'copy:assets', 'webpack'],
        'reload',
        callback);
});

gulp.task('default', ['build']);