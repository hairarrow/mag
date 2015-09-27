var fs = require('fs');

module.exports = function(grunt) {
  var _ = grunt.util._;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: ['build/**/*'],
    copy: {
      main: {
        files: [
          {
            expand: true,
            src: ['img/*', 'js/*', 'svg/*'],
            dest: 'build/'
          },
        ],
      },
    },
    scsslint: {
      allFiles: [
        'scss/*.scss'
      ],
      options: {
        config: '.scss-lint.yml',
        reporterOutput: 'scss-lint-report.xml',
        emitError: true,
        colorizeOutput: true
      }
    },
    csslint: {
      strict: {
        src: ['css/**/*.css']
      }
    },
    sass: {
      dist: {
        options: {
          // includePaths: ['bower_components/foundation/scss','bower_components/font-awesome/scss'],
          style: 'compact',
          sourceMap: '../css/styles.css.map'
        },
        files: {
          'build/css/styles.css':'scss/styles.scss'
        }
      }
    },
    htmlhint: {
      html1: {
        options: {
          htmlhintrc: '.htmlhintrc'
        },
        src: ['include/**/*.html', 'templates/**/*.html']
      }
    },
    watch: {
      grunt: { files: ['Gruntfile.js'] },
      sass: {
        files: 'scss/**/*.scss',
        tasks: ['sass']
      },
      template: {
        files: ['templates/**/*.html', 'include/**/*.html'],
        tasks: ['template']
      },
      htmlhint: {
        files: ['templates/**/*.html', 'include/**/*.html'],
        tasks: ['htmlhint']
      }
    },
    template: {
      foo: {
        src: ['**/*.html'],
        dest: 'build/',
        expand: true,
        cwd: 'templates/'
      }
    },
    browserSync: {
      bsFiles: {
        src: ['build/**/*']
      },
      options: {
        injectChanges: true,
        logConnections: true,
        notify: false,
        directory: true,
        tunnel: "csscsscss",
        watchTask: true,
        browser: ['Google Chrome'],
        host: '0.0.0.0',
        port: 8000,
        server: {
          baseDir: ['build/']
        }
      }
    },
    git_deploy: {
      your_target: {
        options: {
          // url: 'git@github.com:RealGeeks/miranda.git'
        },
        src: 'build/'
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-scss-lint');
  grunt.loadNpmTasks('grunt-htmlhint');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-git-deploy');

  grunt.registerTask('build', ['sass', 'template']);
  grunt.registerTask('default', ['clean', 'copy', 'build', 'browserSync', 'watch']);
  grunt.registerTask('htmllint', ['template', 'htmlhint']);

  var templateData = {
    include: function (path, props) {
      return _.template(fs.readFileSync(path, 'utf-8'), _.extend(templateData, props || {}));
    }
  };

  grunt.registerMultiTask('template', function() {
    this.files.forEach(function(files) {
      files.src.forEach(function(file) {
        var content = _.template(fs.readFileSync(file, 'utf-8'), templateData);
        fs.writeFileSync(files.dest, content);
      });
    });
  });
}
