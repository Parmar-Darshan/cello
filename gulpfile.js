const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
// const minify = require('gulp-minify');
const cleanCSS = require("gulp-clean-css");
const htmlPartial = require('gulp-html-partial');
const browserSync = require('browser-sync');
const imagemin = require('gulp-imagemin');
const gulpIf = require('gulp-if');
const isProd = process.env.NODE_ENV === 'prod';


// Task to process HTML files and inject partials
gulp.task('html', () => {
    return gulp.src('src/*.html')
        .pipe(htmlPartial({
            basePath: 'src/partials/'
        }))
        .pipe(gulp.dest('docs/'));
});

// Task to compile SCSS and compress CSS
// gulp.task('styles', () => {
//     return gulp.src('src/scss/*.scss')
//         .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
//         .pipe(gulp.dest('docs/css'));
// });



// /const gulp = require("gulp");
// const sass = require("gulp-sass")(require("sass"));

gulp.task("styles", function () {
    return gulp
        .src("src/scss/style.scss") // Point to your custom SCSS file
        .pipe(
            sass({
                includePaths: ["node_modules"], // Resolve imports from node_modules
            }).on("error", sass.logError)
        )
        .pipe(cleanCSS()) // Optional: Minify the CSS
        .pipe(gulp.dest("docs/css")); // Output folder
});

gulp.task('minifyjs', () => {
    return gulp.src('src/js/*.js')
        // .pipe(minify())
        .pipe(gulp.dest('docs/js'))
});


gulp.task('serve', () => {
    browserSync.init({
        server: {
            baseDir: './docs', // or wherever your files are served from
            open: true  // Open the browser automatically
        },

    })
    gulp.watch('./src/**/*.html', gulp.series('html')).on('change', browserSync.reload);
    gulp.watch('./src/scss/**/*.scss', gulp.series('styles')).on('change', browserSync.reload);
    gulp.watch('./src/js/**/*.js', gulp.series('minifyjs')).on('change', browserSync.reload);
    gulp.watch('src/images/**/*', gulp.series('images')).on('change', browserSync.reload);
});


function img() {
    return gulp.src('src/images/**/*')
        .pipe(gulpIf(isProd, imagemin()))
        .on('data', (file) => {
            console.log(`Processing: ${file.relative}`);
        })
        .pipe(gulp.dest('docs/images/'));
}

gulp.task('copy-images', function () {
    return gulp
        .src('src/**/*.{svg,png,jpg,gif,webp}', { encoding: false })
        .pipe(gulp.dest('docs'));
});

// Register the task
gulp.task('images', img);


gulp.task('build', gulp.series('html', 'styles', 'minifyjs', 'images', 'copy-images', (done) => {
    done();
}));


gulp.task('watch', () => {
    gulp.watch('src/scss/**/*.scss', gulp.series('styles'));
    gulp.watch('src/js/**/*.js', gulp.series('minifyjs'));

});

// Default task to run styles and html tasks
gulp.task('default', gulp.series('build', 'html', 'styles', 'minifyjs', 'serve', 'images'));
