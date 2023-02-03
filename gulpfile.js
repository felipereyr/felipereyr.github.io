const { src, dest, watch, parallel } = require("gulp");
const sass = require("gulp-sass")(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');
function css(done){
    src('source/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css'));


    done();
}

function imagenes(done){
    const opciones ={
        optimizationLevel: 3
    }

    src('source/img/**/*.{png, jpg}')
        .pipe(cache(imagemin(opciones)))
        .pipe(dest('build/img'))

    done();
}

function versionWebp (done){

    const opciones ={
        quality: 50
    };

    src('source/img/**/*.{png, jpg}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'))

    done();
}

function versionAvif (done){

    const opciones ={
        quality: 50
    };

    src('source/img/**/*.{png, jpg}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'))

    done();
}

function javascript(done){
    src('source/js/**/*.js')
        .pipe(dest('build/js'));
    
    done();
}



function dev(done){
    watch('source/scss/**/*.scss', css);
    watch('source/js/**/*.js', javascript);

    done();
}

exports.css = css;
exports.js = javascript;
exports.versionAvif = versionAvif;
exports.imagenes = imagenes;
exports.versionWep = versionWebp;
exports.dev = parallel (imagenes,versionAvif,  versionWebp ,javascript , dev);