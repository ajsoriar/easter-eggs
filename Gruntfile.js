'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            build: {
                src: ['dist/*.*','dist/css/*.*','src/css/*.css']
            }
        },
        copy: {
            build: {
                files: [{
                    cwd: 'src',
                    src: [
                        '*.js',
                        '*.css'
                    ],
                    dest: 'dist',
                    expand: true
                },{
                    cwd: 'src/css',
                    src: [
                        '*.css'
                    ],
                    dest: 'dist/css',
                    expand: true
                }]
            }
        },
        uglify: {
            options: {
                preserveComments: 'some', // will preserve all comments that start with a bang (!) or include a closure compiler style directive (@preserve)
                mangle: false, // false to prevent changes to your variable and function names.
                compress: {
                    drop_console: true
                }
            },
            my_target: {
                files: {
                    'dist/easter-eggs.min.js': ['dist/easter-eggs.js']
                }
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'dist',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist',
                    ext: '.min.css'
                }]
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');


    grunt.registerTask( 
        'build',
        'Compiles all of the assets and files to dist directory.',
        ['clean', 'copy', 'uglify', 'cssmin']
    );

};
