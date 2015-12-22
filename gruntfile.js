module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Copy web assets from bower_components to more convenient directories.
        copy: {
            main: {
                files: [
                    // Vendor scripts.

                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap-sass/',
                        src: ['**'],
                        dest: 'bootstrap-sass/'
                    },

                ]
            },
        },

        // Compile SASS files into minified CSS.
        sass: {
            options: {
                includePaths: ['bootstrap-sass/assets/stylesheets']
            },
            dist: {
                options: {
                    outputStyle: 'compressed'
                },
                files: {
                    'css/style.css': 'sass/style.scss'
                }
            }
        },

        // Watch these files and notify of changes.
        watch: {
            grunt: { files: ['gruntfile.js'] },

            sass: {
                files: [
                    'sass/**/*.scss'
                ],
                tasks: ['sass']
            }
        }
    });

    // Load externally defined tasks.
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Establish tasks we can run from the terminal.
    grunt.registerTask('build', ['sass', 'copy']);
    grunt.registerTask('default', ['build', 'watch']);
}
