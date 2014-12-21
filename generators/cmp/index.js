"use_strict";

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var config = require('../config');

module.exports = yeoman.generators.Base.extend({
  constructor:function () {
    yeoman.generators.Base.apply(this,arguments);
  },

  initializing: function (name) {
    this.log('Create new react component: ' + chalk.green(name));

    this.argument('name', {
      required: true,
      type: String,
      desc: 'The component name'
    });
  },

  prompting:function (argument) {
    var done = this.async();

    var prompts = [{
      type: 'confirm',
      name: 'installAssets',
      message: 'Would you like to create component with store & actions?',
      default: false
    }];

    this.prompt(prompts, function (props) {
      this.installAssets = props.installAssets;

      done();
    }.bind(this));

  },

  writing: function () {
    this.template('_cmp.js', config.src + 'components/'+ this.name +'.react' + (this.options.coffee? '.cjsx' : '.jsx'));

    if(this.installAssets){

      this.composeWith('rsk:action',{
        args:[this.name]
      });

      // this.template('../../action/templates/_action.js', config.src + 'actions/'+ this.name +'Actions.js');
      this.template('../../store/templates/_store.js', config.src + 'stores/'+ this.name +'Store.js');
    }
  }
});
