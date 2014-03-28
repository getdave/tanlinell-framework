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
        distDir: './dist',
        cssSrc: './sass',
        cssDist: './dist/css',
        jsSrc: './js',
        jsDist: './dist/js',
        docsSrc: './docs',
        docsDist: './dist/docs',
        packageBanner: grunt.file.read('banner.txt'),
        fwFilename: '<%= pkg.name %>',
    },

    watch: {
        options: {
            livereload: true,
        },
        css: {
            files: ['<%= config.cssSrc %>/**/*.scss'],
            tasks: ['sass'] // run sass, then lint then combine with normalize
        },
        js: {
            files: ['<%= config.jsSrc %>/**/*.js'],
            tasks: ['jshint','uglify'] // uglify
        },
        docs: {
            files: ['<%= jekyll.docs.options.src %>/**/*.html'],
            tasks: ['assets','jekyll:docs','copy:docsAssets']
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
            style: 'expanded',
            loadPath: [
                '.',
                '<%= config.cssSrc %>'
            ],
        },
        dist: {
            files: {
                '<%= config.cssDist %>/<%= config.fwFilename %>.css': '<%= config.cssSrc %>/<%= pkg.name %>.scss'
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

    // Minify CSS for "dist"
    cssmin: {
      options: {
          banner: '<%= config.packageBanner %>',
      },
      minify: {
        files: {
          '<%= config.cssDist %>/<%= config.fwFilename %>.min.css': ['<%= config.cssDist %>/<%= config.fwFilename %>.css', '!*.min.css']
        }
      },
    },

    // JavaScipt Linting with JSHint
    jshint: {
        options: {
            jshintrc: '.jshintrc',
            "force": true
        },
        all: [
            'Gruntfile.js',
            '<%= config.jsSrc %>/**/*.js',

            // Ignored files
            '!<%= config.jsSrc %>/modules/_*.js',
            '!<%= config.jsSrc %>/vendor/**/*.js'
        ]
    },

    // Compress and minify JS
    uglify: {
        dist: {
            options: {
                mangle: false,
                compress: false,
                beautify: true,
                banner: "<%= config.packageBanner %>"
            },
            files: [{
                src: [
                    // Compiled files
                    '<%= config.jsSrc %>/vendor/**/*.js',
                    '<%= config.jsSrc %>/<%= pkg.name %>.js',
                    '<%= config.jsSrc %>/modules/*.js',

                    // Ignored files
                    '!<%= config.jsSrc %>/modules/_*.js', // ignore boilerplate files
                    '!<%= config.jsSrc %>/vendor/modernizr*.js'
                ],
                dest: '<%= config.jsDist %>/<%= pkg.name %>.js'
            }],
        },
    },




    // Before generating any new files,
    // remove any previously-created files.
    clean: [
      '<%= config.distDir %>'
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

    // Copy assets to Documentation
    copy: {
        docsAssets: {
            src: ['<%= config.cssDist %>/*.css', '<%= config.jsDist %>/*.js'],
            dest: '<%= config.docsDist %>/assets/',
            flatten: true
        }
    },


    // Documentation Static Site
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
    'cssmin',
    'jshint',
    'uglify',
    'jekyll:docs',
    'copy:docsAssets'
  ]);



  grunt.registerTask('assets', [
    'sass',
    'jshint',
    'uglify',
  ]);


  grunt.registerTask('default', [
    'clean',
    'assets',
    'connect',
    'watch'
  ]);

};
