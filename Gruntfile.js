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
    pkg: grunt.file.readJSON('package.json'),
    config: {
      cssSrc: './src',
      cssDist: './dist',
      cssBanner: '/* Tanlinell CSS Framework - by <%= pkg.author.name %>  - v<%= pkg.version %> (<%= grunt.template.today("dd-mm-yyyy") %>) */',
      fwFilename: '<%= pkg.name %>',
      docsSrc: './docs/src',
      docsDist: './docs/dist'
    },

    watch: {
      assemble: {
        files: ['<%= config.docsSrc %>/{content,data,templates}/{,*/}*.{md,hbs,yml}'],
        tasks: ['assemble']
      },
      css: {
        files: ['<%= config.cssSrc %>/{,*/}*.{scss,sass}'],
        tasks: ['sass', 'csslint', 'concat'] // run sass, then lint then combine with normalize
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
        outputStyle: 'nested', // minification via Grunt CSS Min is prefered
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
      },
      dist: {
        src: ['./bower_components/normalize-css/normalize.css', '<%= config.cssDist %>/<%= config.fwFilename %>.css'],
        dest: '<%= config.cssDist %>/<%= config.fwFilename %>.css',
      },
    },


    // Before generating any new files,
    // remove any previously-created files.
    clean: [
      '<%= config.cssDist %>/*.css',
      '<%= config.docsDist %>/**/*.{html,xml}',
    ],

    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        updateConfigs: ['pkg'], // update the config property, so that even tasks running in the same grunt process see the updated value
        commit: false,
        createTag: false,
        push: false
      }
    }

  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-bump');

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
    'csslint',
    'concat',
    'cssmin'
  ]);

  grunt.registerTask('default', [
    'clean',
    'watch'
  ]);

};
