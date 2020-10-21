module.exports = function(grunt) {
  const sass = require('node-sass');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      dist: {
        src: '<%= pkg.base_dir %>/assets/js/main.js',
        dest: '<%= pkg.base_dir %>/_site/assets/js/main.min.js',
      },
      options: {
        transform: ['envify'],
      },
      prod: {
        options: {
          transform: ['envify', 'uglifyify'],
        },
      },
    },
    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer')(),
          require('cssnano')(),
        ],
      },
      dist: {
        src: '<%= pkg.base_dir %>/_site/assets/css/main.min.css'
      }
    },
    sass: {
      options: {
        implementation: sass,
        sourceMap: true,
      },
      dist: {
        files: {
          '<%= pkg.base_dir %>/_site/assets/css/main.min.css': '<%= pkg.base_dir %>/assets/scss/main.scss',
        },
      }
    },
    shell: {
      eleventy: {
        command: 'npx eleventy',
      },
      sass_lint: {
        command: 'npx sass-lint-auto-fix && npx sass-lint -v',
      },
    },
    svg_sprite: {
      dist: {
        cwd: '<%= pkg.base_dir %>/assets/images/svg-sprite',
        src: ['*.svg'],
        dest: '<%= pkg.base_dir %>/_site/assets/images',
        options: {
          mode: {
            symbol: {
              dest: '',
              sprite: 'sprite.svg',
            },
          },
          shape: {
            meta: '<%= pkg.base_dir %>/assets/images/svg-sprite/meta.yaml',
          },
          svg: {
            namespaceIDs: false,
          }
        }
      }
    },
    terser: {
      dist: {
        src: '<%= pkg.base_dir %>/_site/assets/js/main.min.js',
        dest: '<%= pkg.base_dir %>/_site/assets/js/main.min.js',
      },
    },
    watch: {
      css: {
        files: ['<%= pkg.base_dir %>/assets/scss/**/*.scss'],
        tasks: ['shell:sass_lint', 'sass', 'postcss'],
      },
      js: {
        files: '<%= pkg.base_dir %>/assets/js/**/*.{js,jsx}',
        tasks: ['browserify'],
      },
      svg_sprite: {
        files: ['<%= pkg.base_dir %>/assets/images/svg-sprite/**'],
        tasks: ['svg_sprite'],
      },
    },
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-execute');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-svg-sprite');
  grunt.loadNpmTasks('grunt-terser');

  // Prep for dev
  grunt.registerTask('default', [
    'shell:sass_lint',
    'sass',
    'postcss',
    'browserify',
    'svg_sprite',
    'shell:eleventy',
  ]);

  // Prep for production
  grunt.registerTask('build', [
    'sass',
    'postcss',
    'browserify',
    'terser',
    'svg_sprite',
    'shell:eleventy',
  ]);
};
