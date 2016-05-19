module.exports = function(grunt) {
	'use strict';
 
	// configuração do projeto
	var gruntConfig = {
		pkg: grunt.file.readJSON('package.json'),
		

		 uglify: {
			my_target: {
				options: {
					sourceMap: true,
					sourceMapName: 'public/assets/js/app.min.map'
				},
				files: {
					'public/assets/js/app.min.js': ['distro/js/*.js', "distro/jquery/jquery.js","distro/bootstrap/dist/js/bootstrap.min.js","distro/modernizr/modernizr.js"]
				}
			}
		},


		cssmin: {
			target: {
				files: [{
					'public/assets/css/app.min.css': ["bower_components/bootstrap/dist/css/bootstrap.css","distro/css/*.css"]
				}]
			}
		},

		jshint: {
			all: ['src/assets/**/*.js']
		}
	};
 
	grunt.initConfig(gruntConfig);
 
	// carregando plugins
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
 
	// tarefas
	grunt.registerTask('default', ['jshint']);
	grunt.registerTask('js', ['uglify']);
	grunt.registerTask('css', ['cssmin']);
};