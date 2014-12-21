"use_strict";

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var config = require('../config');
var fs = require('fs');

module.exports = yeoman.generators.Base.extend({
  constructor:function () {
    yeoman.generators.Base.apply(this,arguments);
    this.option('coffee');
  },

  initializing: function (name) {
    this.log('Creating new action: ' + chalk.green(name));

    this.argument('name', {
      required: true,
      type: String,
      desc: 'Action name'
    });
  },

  _getAssetsPath:function (name) {
    return process.cwd() + '/' + this._getAssetsUrl(name);
  },

  _getAssetsUrl:function (name) {
    return config.src + 'constants/' + name;
  },

  writing: function () {
    this.template('_action.js', config.src+'actions/'+ this.name +'Actions.js');

    // check if ActionTypes & PayloadSources exists
    var file = 'ActionTypes.js';
    var path = this._getAssetsPath(file);
    if(!fs.existsSync(path)){
      this.template('_actionTypes.js', this._getAssetsUrl(file));
    }

    file = 'PayloadSources.js';
    path = this._getAssetsPath(file);
    if(!fs.existsSync(path)){
      this.template('_payloadSources.js', this._getAssetsUrl(file));
    }

  }
});
