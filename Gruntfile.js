module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		sass: {
			options: {
				style: 'compressed'
			},

			all: {
				expand: true,
				cwd: './css/',
				src: ['*.sass'],
				dest: './css/',
				ext: '.css'
			}
		},

		coffee: {
			all: {
				expand: true,
				flatten: true,
				cwd: './js/',
				src: ['*.coffee'],
				dest: './js/',
				ext: '.js'
			}
		},

		uglify: {
			options: {
				mangle: true
			},

			all: {
				expand: true,
				cwd: './js/',
				src: ['*.js'],
				dest: './js/',
				ext: '.js'
			}
		},

		watch: {
			css: {
				files: ['./css/*.sass'],
				tasks: ['sass']
			},

			coffee: {
				files: ['./js/*.coffee'],
				tasks: ['coffee']
			},

			js: {
				files: ['./js/*.js'],
				tasks: ['newer:uglify']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-newer');

	grunt.registerTask('default', ['watch', 'sass', 'coffee', 'uglify']);
}