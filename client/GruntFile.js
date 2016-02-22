module.exports = function(grunt) {
    var specsPath = 'modules/*/specs/**/*.spec.js';
    var srcPath = ["modules/*/factory/**/*.js", "modules/*/**/*.js", "!"+specsPath];
    var configPath = [
        "modules/main/js/config/app.js",
        "modules/main/js/config/**/*.js",
        "modules/*/js/config/**/*.js"
    ];
    var mainPath =  "modules/main/**/*.js";

    var dependenciesPath = [
        "bower_components/angular/angular.min.js",
        "bower_components/identicon.js/identicon.js",
        "bower_components/identicon.js/pnglib.js",
        "bower_components/angular-ui-router/release/angular-ui-router.min.js",
        "bower_components/angular-resource/angular-resource.min.js",
        "bower_components/moment/min/moment.min.js",
        "bower_components/socket.io.client/dist/socket.io-1.3.5.js"
    ];

    var helperPath = 'modules/*/specs/helpers/**/*.js';
    var specsLibPath = [];

    grunt.initConfig({
        concat: {
            app: {
                options: {
                    process: function(src, filepath) {
                        return '\n' + '// FILE: ' + filepath + '\n' + src;
                    }
                },
                src: [configPath, mainPath, "!"+specsPath],
                dest: 'modules/app.js'
            },
            dist: {
                options: {
                    process: function(src, filepath) {
                        return '\n' + '// FILE: ' + filepath + '\n' + src;
                    }
                },
                src: [dependenciesPath, configPath, mainPath, srcPath],
                dest: 'dist/wisestGame.js'
            }
        },
        jshint: {
            all: {
                src: ['Gruntfile.js', specsPath, srcPath]
            }
        },
        jasmine: {
            pivotal: {
                src: [configPath, mainPath, srcPath],
                options: {
                    vendor: [dependenciesPath, specsLibPath],
                    specs: specsPath,
                    helpers: helperPath,
                    template: require('grunt-template-jasmine-istanbul'),
                    templateOptions: {
                        coverage: 'bin/coverage/coverage.json',
                        report: 'bin/coverage',
                        thresholds: { // we will use this soon
                            lines: 100,
                            statements: 100,
                            branches: 100,
                            functions: 100
                        }
                    }
                }
            },
            watch: {
                src: [configPath, mainPath, srcPath],
                options: {
                    vendor: [dependenciesPath, specsLibPath],
                    specs: specsPath,
                    helpers: helperPath
                }
            }
        },
        uglify: {
            options: {
                mangle: false,
                compress: false,
                report: 'min',
                // the banner is inserted at the top of the output
                banner: '/*! <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/wisestGame.min.js': [dependenciesPath, configPath, mainPath, srcPath]
                }
            }
        },
        watch: {
            src: {
                files: ['Gruntfile.js', specsPath, srcPath],
                tasks: ['jshint', 'concat']
            },
            test: {
                files: [specsPath, srcPath],
                tasks: ['jasmine:watch']
            }
        }
    });

    require('load-grunt-tasks')(grunt, {
      pattern: ['grunt-*', '!grunt-template-jasmine-istanbul']
    });

    // Default task.
    grunt.registerTask('default', ['jshint', 'jasmine', 'concat']);
    grunt.registerTask('dist', ['jshint', 'jasmine', 'concat', 'uglify']);

};