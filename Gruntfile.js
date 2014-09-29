var jshintrc = '.jshintrc';
var gruntFile = 'Gruntfile.js';
var directoryPackage = '<%= pkg.name %>';
var directoryPrivate = directoryPackage + '/private';
var directoryPublic = directoryPackage + '/public';
var directoryPrivateJs = directoryPrivate + '/js';
var directoryPrivateJsAll = directoryPrivateJs + '/**/*.js';
var directoryPrivateLess = directoryPrivate + '/less';
var directoryPrivateLessAll = directoryPrivateLess + '/**/*.less';
var directoryPrivateHtml = directoryPrivate + '/html';
var directoryPrivateHtmlAll = directoryPrivateHtml + '/**/*.html';
var directoryPrivateImage = directoryPrivate + '/img';
var today = '<%= grunt.template.today("yyyy-mm-dd") %>';
var banner = '/*! <%= pkg.name %> ' + today + ' */\n';

module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            dist: {
                files: [
                    jshintrc,
                    gruntFile,
                    directoryPrivateJsAll,
                    directoryPrivateLessAll,
                    directoryPrivateHtmlAll,
                ],
                tasks: [
                    'default',
                ],
            },
        },
        jshint: {
            options: {
                ignores: [
                ],
            },
            dist: [
                gruntFile,
                directoryPrivateJsAll,
            ],
        },
        csslint: {
            dist: {
                src: [
                    directoryPublic + '/**/*.css',
                ],
            },
        },
        less: {
            dist: {
                options: {
                    sourceMap: true,
                    cleancss: true,
                    compress: true,
                    banner: banner,
                },
                files: {
                    '<%= pkg.name %>/public/view.less.min.css':
                        directoryPublic + '/view.less',
                },
            },
        },
        concat: {
            options: {
                separator: ';\n',
            },
            js: {
                src: [
                    directoryPrivateJs + '/view.js',
                ],
                dest: directoryPublic + '/view.js',
            },
            css: {
                src: [
                    directoryPrivateLess + '/view.less',
                ],
                dest: directoryPublic + '/view.less',
            },
        },
        copy: {
            edit: {
                src: directoryPrivateJs + '/edit.js',
                dest: directoryPublic + '/edit.js',
            },
            images: {
                files: [
                    {
                        expand: true,
                        src: [
                            directoryPrivateImage + '/**/*.jpg',
                        ],
                        dest: directoryPublic + '/',
                    },
                ],
            },
        },
        uglify: {
            options: {
                footer: '\n',
                sourceMap: true,
            },
            combine: {
                files: [{
                    expand: true,
                    cwd: directoryPublic + '/',
                    src: [
                        '*.js',
                        '!*.min.js',
                    ],
                    dest: directoryPublic + '/',
                    ext: '.js.min.js',
                    banner: banner,
                }],
            },
        },
        cssmin: {
            combine: {
                files: [{
                    footer: '\n',
                    expand: true,
                    cwd: directoryPublic,
                    src: [
                        '*.css',
                        '!*.min.css',
                    ],
                    dest: directoryPublic,
                    ext: '.min.css',
                }],
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', [
        'jshint',
        'csslint',
        'concat',
        'copy',
        'uglify',
        'less',
    ]);
};
