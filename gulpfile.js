const gulp=require('gulp'),
	gulpSequence = require('gulp-sequence'),
	spriter=require('gulp-css-spriter'),
	less=require('gulp-less'),
	cssmin = require('gulp-minify-css'),
	md5 = require('gulp-md5-plus'),
	uglify=require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	clean=require('gulp-clean');

var _pathName=gulp.env.build;

gulp.task('html',function() {
	return gulp.src(['src/**/*.html'])
		.pipe(gulp.dest('dist/'))
})
gulp.task('moveimg',function(){
	return gulp.src(['src/**/*.{png,jpg,gif,ico}'])
		.pipe(gulp.dest('dist/'));
})

gulp.task('img',function(){
	return gulp.src('dist/**/*.{png,jpg,gif,ico}')
        .pipe(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest('dist/'));
})

gulp.task('css',function() {
	var timestamp= +new Date();
	return gulp.src('src/'+_pathName+'/**/*.css')
		.pipe(spriter({
            spriteSheet: 'dist/'+_pathName+'/images/spritesheet' + timestamp + '.png',
            pathToSpriteSheetFromCSS: '../images/spritesheet' + timestamp + '.png',
            spriteSheetBuildCallback:()=>{

            }
        }))
        .pipe(less())
        .pipe(cssmin())
        .pipe(md5(10, 'dist/**/*.html'))
        .pipe(gulp.dest('dist/'))
})

gulp.task('js',function(){
	return gulp.src('src/**/*.js')
		.pipe(uglify())
		.pipe(md5(10, 'dist/**/*.html'))
        .pipe(gulp.dest('dist/'));  
})

gulp.task('clean', function () {
    return gulp.src(['dist/'+_pathName],{read: false})
        .pipe(clean({
	        force: true
	    }))
});

gulp.task('default',function(){
	gulpSequence('clean','html','moveimg','css','img','js',function(){
		console.log("success")
	})
})