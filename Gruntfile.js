var cssModulesify = require('css-modulesify');
var stringHash = require('string-hash');

module.exports = function(grunt) {

    grunt.initConfig({
        browserify: {
            build: {
                files: {
                    'dist/hastur.js': ['src/index.js'],
                    'examples/dist/example.js': ['examples/src/example.js'],
                },
                options: {
                    watch: true,
                    keepAlive: true,
                    plugin: [
                        ['css-modulesify', {
                            output: 'dist/hastur.css',
                            generateScopedName: cssModulesify.generateShortName,
                            before: [
                                'postcss-simple-vars',
                                'postcss-mixins',
                                'postcss-color-function',
                                'postcss-nested',
                                'postcss-modules-extract-imports',
                            ],
                            after: [
                                require('autoprefixer')({browsers: '> 5%'}),
                            ]
                        }]
                    ],
                    browserifyOptions: {
                        debug: true,
                        extensions: ['.js']
                    },
                    transform: [
                        ['babelify', {
                            "sourceMapRelative": "$PWD/src",
                            "presets": ["es2015", "react", "stage-0"]
                        }],
                    ]
                }
            }
        },
        exorcise: {
            build: {
                files: {
                    'dist/hastur.js.map': ['dist/hastur.js'],
                    'examples/dist/example.js.map': ['examples/dist/example.js'],
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-exorcise');

    grunt.registerTask('build', ['browserify', 'exorcise']);
    grunt.registerTask('default', ['build']);

};
