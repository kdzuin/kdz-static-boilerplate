module.exports = function (grunt) {

	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-zetzer');

	grunt.initConfig({
		/* css tasks */
		postcss: {
			options: {
				processors: [
					require('postcss-import')(),
					require('cssnext')(),
					require('autoprefixer-core')(),
					require('cssnano')(),
				]
			},
			build: {
				src: 'assets/css/base.css',
				dest: 'public/css/base.css'
			}
		},


		/* js tasks */
		concat: {
			lib: {
				src: 'assets/js/lib/**/*.js',
				dest: 'public/js/lib.js'
			},
			vendor: {
				src: 'assets/js/vendor/**/*.js',
				dest: 'public/js/vendor.js'
			}
		},


		/* templates tasks */
		zetzer: {
			build: {
				options: {
					templates: 'assets/tpl/',
					partials: 'assets/tpl/'
				},
				files: [
					{
						expand: true,
						cwd: "assets/tpl/",
						src: "*.html",
						dest: "public",
						ext: ".html",
					},
					{
						expand: true,
						cwd: "assets/tpl/",
						src: "*.dot.md",
						dest: "public",
						ext: ".html",
					}
				]
			}
		},


		/* service tasks */
		clean: {
			files: [
				'public/css/**/*.css',
				'public/js/**/*.js',
				'public/*.html',
			]
		},
		watch: {
			css: {
				files: 'assets/css/**/*.css',
				tasks: ['postcss']
			},
			js: {
				files: 'assets/js/**/*.css',
				tasks: ['concat']
			},
			tpl: {
				files: 'assets/tpl/**/*',
				tasks: ['zetzer']
			}
		},
		browserSync: {
			dev: {
				bsFiles: {
					src: [
						'public/**/*',
					]
				},
				options: {
					watchTask: true,
					server: {
						baseDir: "./public/"
					}
				}
			}
		}
	});

	grunt.registerTask('default', ['build', 'watch']);

	grunt.registerTask('build', ['clean', 'postcss', 'concat', 'zetzer']);
	grunt.registerTask('server', ['build', 'browserSync', 'watch'])

};
