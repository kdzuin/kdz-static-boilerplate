module.exports = function (grunt) {

	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');

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


		/* service tasks */
		clean: {
			files: [
				'public/css/**/*.css',
				'public/js/**/*.js'
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
			}
		},
		connect: {
			test: {
				options: {
					port: 8000,
					keepalive: true,
					base: './public/'
				}
			}
		}
	});

	grunt.registerTask('build', ['clean', 'postcss', 'concat']);
	grunt.registerTask('default', ['build', 'watch']);

};
