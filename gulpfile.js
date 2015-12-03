var gulp = require("gulp"),
browserSync = require('browser-sync');

gulp.task('server', function(){
	browserSync({
		port:9000,
		server:{
			baseDir:'erster'
		}
	});
});

gulp.task('watch', function(){
	gulp.watch([
		'erster/*.html',
		'erster/js/**/*.js',
		'erster/css/**/*.css'
		]).on('change', browserSync.reload);
});

gulp.task('default', ['server','watch']);