"use_strict";
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  constructor:function () {
    yeoman.generators.Base.apply(this,arguments);
    this.option('coffee');
  },

  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('React-Starter-Kit') + ' generator.'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'createTree',
      message: 'Would you like to install project structure?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.createTree = props.createTree;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      if (!this.createTree) return;
    },

    projectfiles: function () {
      if (!this.createTree) return;

      this.fs.copy(
        this.sourceRoot()+'/**',
        this.destinationPath()
      );

      this.fs.copy(
        this.sourceRoot()+'/.*',
        this.destinationPath()
      );
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
