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

// Clean the contents of the distribution directory
gulp.task('clean', function () {
    return del('dist/**/*');
});

// Copy dependencies
gulp.task("copy:libs", function () {
    return gulp.src([
        'core-js/client/shim.min.js',
        'zone.js/dist/zone.js',
        'reflect-metadata/Reflect.js',
        'systemjs/dist/system.src.js',
        'rxjs/**',
        'jquery/dist/**',
        'semantic-ui-css/semantic.min.css',
        'semantic-ui-css/semantic.min.js',
        'zone.js/dist/**',
        '@angular/**'
    ], { cwd: "node_modules/**" })
        .pipe(gulp.dest("dist/lib"));
});

// Copy static assets - i.e. non TypeScript compiled source
gulp.task('copy:assets', function () {
    return gulp.src(['app/**/*', '!app/**/*.ts', '*', '!sass/'], { base: './src', cwd: './src' })
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

// TypeScript compile
gulp.task('compile', function () {
    return gulp
        .src(['src/app/**/*.ts', 'typings/globals/**/*.d.ts'])
        .pipe(sourcemaps.init())
        .pipe(typescript(tscConfig.compilerOptions))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/app'));
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

    gulp.watch(['src/app/**/*', 'src/index.html', 'src/sass/*.scss'], ['recompile']);
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
        ['compile', 'sass', 'copy:libs', 'copy:assets'],
        callback);
});

// Recompile Angular (TS and HTML) and SASS, without clean and without copying external libs.
// Finish by reloading browsersync
// This should run a lot quicker than a full build
gulp.task('recompile', function (callback) {
    runSequence(
        ['compile', 'sass', 'copy:assets'],
        'reload',
        callback);
});

gulp.task('default', ['build']);