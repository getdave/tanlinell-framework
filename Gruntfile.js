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
      cssBanner: grunt.file.read('banner.txt'),
      fwFilename: '<%= pkg.name %>',
    },

    watch: {
      css: {
        files: ['<%= config.cssSrc %>/**/*.scss'],
        tasks: ['sass', 'csslint', 'concat'] // run sass, then lint then combine with normalize
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.cssDist %>/<%= config.fwFilename %>.css'
        ]
      }
    },

    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          base: [
            '<%= config.docsDist %>'
          ]
        }
      }
    },

   


    sass: {
      options: {
        //includePaths: require('node-bourbon').includePaths,
        loadPath: require('node-bourbon').includePaths,
       // outputStyle: 'expanded', // minification via Grunt CSS Min is prefered
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
        separator: '/* Begin: Tanlinell CSS Framework */',
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
		docs: {
			src: '<%= config.cssDist %>/*.css',
    		dest: '<%= config.docsDist %>/assets/',
    		flatten: true
		}
	}

  });



  grunt.registerTask('server', [
    'clean',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean',
    'sass',
    'csslint',
    'concat',
    'cssmin',
  ]);

  grunt.registerTask('default', [
    'clean',
    'watch'
  ]);

};
