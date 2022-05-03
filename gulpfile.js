const { src, dest, watch } = require('gulp');
const compileSass = require('gulp-sass')(require('sass'));

compileSass.compiler = require('node-sass');

const bundleSass = () => {
    return src('assets/scss/**/*.scss')
        .pipe(compileSass().on('error', compileSass.logError))
        .pipe(dest('assets/css/global.css'));
};

const devWatch = () => {
    watch('assets/scss/**/*.scss', bundleSass);
};

exports.bundleSass = bundleSass;
exports.devWatch = devWatch;