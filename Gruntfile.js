/*
 * Generated on 2013-12-06
 * generator-assemble v0.4.3
 * https://github.com/assemble/generator-assemble
 *
 * Copyright (c) 2013 David Smith
 * Licensed under the MIT license.
 */

'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// '<%= config.docsSrc %>/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%= config.docsSrc %>/templates/pages/**/*.hbs'

module.exports = function(grunt) {
// load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
	config: {
	  cssSrc: './src',
	  cssDist: './dist',
	  docsSrc: './docs/src',
	  docsDist: './docs/dist',
	  cssBanner: grunt.file.read('banner.txt'),
	  fwFilename: '<%= pkg.name %>',
	},

	watch: {
		options: {
			livereload: true,
		},
		css: {
			files: ['<%= config.cssSrc %>/**/*.scss'],
			tasks: ['sass', 'concat'] // run sass, then lint then combine with normalize
		},
		docs: {
            files: ['<%= jekyll.docs.options.src %>/**/*.html'],
            tasks: ['sass','jekyll:docs','copy:docsAssets']
        },
	},

	connect: {
		options: {
			open: true,
			keepalive: false
		},
		docs: {
			options: {
				port: 9000,
				base: '<%= jekyll.docs.options.dest %>'
			}
		},
	},

	sass: {
	  	options: {
			//includePaths: require('node-bourbon').includePaths,
			loadPath: require('node-bourbon').includePaths,
			// outputStyle: 'expanded', // minification via Grunt CSS Min is prefered
			style: 'expanded'
	  	},
		dist: {
			files: {
				'<%= config.cssDist %>/<%= config.fwFilename %>.css': '<%= config.cssSrc %>/framework.scss'
			}
		},
	},

	// Lint CSS
	csslint: {
	  options: {
		csslintrc: '.csslintrc' // https://github.com/gruntjs/grunt-contrib-csslint#options
	  },
	  dist: {
		src: ['<%= config.cssDist %>/<%= config.fwFilename %>.css']
	  }
	},

	// Apply CSS Prefixs
	autoprefixer: {
	  dist: {
		src: '<%= config.cssDist %>/<%= config.fwFilename %>.css',
		dest: '<%= config.cssDist %>/<%= config.fwFilename %>.css'
	  },
	},

	// Minify CSS for dist
	cssmin: {
	  options: {
		  banner: '<%= config.cssBanner %>',
	  },
	  minify: {
		files: {
		  '<%= config.cssDist %>/<%= config.fwFilename %>.min.css': ['<%= config.cssDist %>/<%= config.fwFilename %>.css', '!*.min.css']
		}
	  },
	},

	// Combine normalize with CSS framework (runs post CSSLint to avoid overzealous linting!)
	concat: {
	  options: {
		stripBanners: true,
		banner: '<%= config.cssBanner %>',
		separator: '\n\n\n\n/* Tanlinell CSS Framework */\n',
		nonull: true
	  },
	  dist: {
		src: ['./bower_components/normalize-css/normalize.css', '<%= config.cssDist %>/<%= config.fwFilename %>.css'],
		dest: '<%= config.cssDist %>/<%= config.fwFilename %>.css',
	  },
	},


	// Before generating any new files,
	// remove any previously-created files.
	clean: [
	  '<%= config.cssDist %>/*.css'
	],

	bump: {
	  options: {
		files: ['package.json', 'bower.json'],
		updateConfigs: ['pkg'], // update the config property, so that even tasks running in the same grunt process see the updated value
		commit: false,
		createTag: false,
		push: false
	  }
	},

	copy: {
		docsAssets: {
			src: '<%= config.cssDist %>/*.css',
			dest: '<%= config.docsDist %>/assets/',
			flatten: true
		}
	},
	jekyll: {
		options: {

		},
		docs: {
			options: {
				src : '<%= config.docsSrc %>',
				dest: '<%= config.docsDist %>'
			}
		},
	},

  });



  grunt.registerTask('build', [
	'clean',
	'sass',
	'autoprefixer',
	'concat',
	'cssmin',
  ]);

  grunt.registerTask('default', [
	'clean',
	'sass',
	'connect',
	'watch'
  ]);

};
