/*
 * Generated on 2013-12-06
 * generator-assemble v0.4.3
 * https://github.com/assemble/generator-assemble
 *
 * Copyright (c) 2013 Hariadi Hinta
 * Licensed under the MIT license.
 */

'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// '<%= config.docsSrc %>/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%= config.docsSrc %>/templates/pages/**/*.hbs'

module.exports = function(grunt) {

  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({

    config: {
      cssSrc: './src',
      cssDist: './dist',
      fwFilename: 'tanlinell-framework',
      docsSrc: './docs/src',
      docsDist: './docs/dist'
    },

    watch: {
      assemble: {
        files: ['<%= config.docsSrc %>/{content,data,templates}/{,*/}*.{md,hbs,yml}'],
        tasks: ['assemble']
      },
      sass: {
        files: ['<%= config.cssSrc %>/{,*/}*.{scss,sass}'],
        tasks: ['sass:dev']
      },

      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.cssDist %>/<%= config.fwFilename %>.css',
          '<%= config.docsDist %>/{,*/}*.html',
          '<%= config.docsDist %>/assets/{,*/}*.css',
          '<%= config.docsDist %>/assets/{,*/}*.js',
          '<%= config.docsDist %>/assets/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
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

    assemble: {
      pages: {
        options: {
          flatten: true,
          assets: '<%= config.docsDist %>/assets',
          layout: '<%= config.docsSrc %>/templates/layouts/default.hbs',
          data: '<%= config.docsSrc %>/data/*.{json,yml}',
          partials: '<%= config.docsSrc %>/templates/partials/*.hbs'
        },
        files: {
          '<%= config.docsDist %>/': ['<%= config.docsSrc %>/templates/pages/*.hbs']
        }
      }
    },


    sass: {
      options: {
        includePaths: require('node-bourbon').includePaths,
        outputStyle: 'nested',
      },
      dist: {
        options: {
          outputStyle: 'compressed',
        },
        files: {
            '<%= config.cssDist %>/tanlinell-framework.css': '<%= config.cssSrc %>/framework.scss'
        }
      },
      dev: {
        files: {
            '<%= config.cssDist %>/tanlinell-framework.css': '<%= config.cssSrc %>/framework.scss'
        }
      },
    },


    csslint: {
      options: {
        csslintrc: '.csslintrc' // https://github.com/gruntjs/grunt-contrib-csslint#options
      },
      dist: {
        src: ['<%= config.cssDist %>/<%= config.fwFilename %>.css']
      }
    },


    autoprefixer: {

      options: {
        // Task-specific options go here.
      },

      // just prefix the specified file
      dist: {
        src: '<%= config.cssDist %>/<%= config.fwFilename %>.css',
        dest: '<%= config.cssDist %>/<%= config.fwFilename %>.css'
      },
    },



    // Before generating any new files,
    // remove any previously-created files.
    clean: [
      '<%= config.docsDist %>/**/*.{html,xml}',
      '<%= config.cssDist %>/**/*.{css}'
    ]

  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-autoprefixer');

  grunt.registerTask('server', [
    'clean',
    'assemble',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean',
    'assemble',
    'sass',
    'autoprefixer',
    'csslint'
  ]);

  grunt.registerTask('default', [
    'clean',
    'watch'
  ]);

};
