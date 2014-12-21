"use_strict";

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var fs = require('fs');
var config = require('../config');

_storeUrl = '/' + config.src + 'stores/';
_actionUrl = '/' + config.src + 'actions/';


_insertActionType = function (actionName) {
	return "\t"+this.constantName + ":null,";
};

_insertPayloadListener = function () {
  return "\
  case ActionTypes."+this.constantName+":\n\
    //place code here\n\
    "+this.storeName.replace('.js','')+".emitChange();\n\
    break;\n\
  ";
};

_insertActionCreator = function (actionName) {
  return "\
  "+actionName+":function(data){\n\
    Dispatcher."+this.actionType+"({\n\
      actionType: ActionTypes."+this.constantName+",\n\
      data:data\n\
    });\n\
  }\
  ";
};

module.exports = yeoman.generators.Base.extend({
	initializing: function (name) {
		this.log('Creating new action: ' + chalk.green(name));

		this.argument('name', {
			required: true,
			type: String,
			desc: 'Action name'
		});
	},
  _getDirFileList:function (url) {
    choices = [{
      name: "Skip",
      value: false
    }];
    list = fs.readdirSync(process.cwd() + url);
    list.forEach(function (file) {
      choices.push({
        name: file,
        value: file
      });
    });
    return choices;
  },
	prompting: function (argument) {
		var done = this.async();

		var prompts = [{
			type: 'input',
			name: 'constantName',
			message: 'Type constant name',
			validate: function (value) {
				if (!isNaN(value)) return false;
				return Boolean(value);
			}
		}, {
			type: 'list',
			name: 'store',
			message: 'Would you like to create payload listener at store?',
			choices: this._getDirFileList.call(this, _storeUrl),
			default: 0
		},{
      type: 'list',
      name: 'actionFile',
      message: 'Where would you like to create an action method?',
      choices: this._getDirFileList.call(this, _actionUrl),
      default: 0
    }, {
      type: 'list',
      name: 'actionType',
      message: 'What kind of action would you like to create?',
      choices: [{
        name: "Skip",
        value: false
      }, {
        name: "View action",
        value: 'handleViewAction'
      }],
      default: 0
    }];


		this.prompt(prompts, function (props) {
			this.constantName = props.constantName.toUpperCase();
			this.storeName = props.store;
			this.actionType = props.actionType;
			this.actionFile = props.actionFile;

			done();
		}.bind(this));

	},

  route: function (name) {
    var hook = '#===== yeoman hook =====#',
      path = config.src + 'constants/ActionTypes.js',
      file = this.readFileAsString(path),
      insert = _insertActionType.call(this);

    if (file && file.indexOf(insert) === -1) {
      this.write(path, file.replace(hook, insert + '\n\t' + hook));
    }

    if (this.storeName) {
      // add payload listener
      path = config.src + 'stores/' + this.storeName;
      file = this.readFileAsString(path);
      insert = _insertPayloadListener.call(this);

      if (file && file.indexOf(insert) === -1) {
        this.write(path, file.replace(hook, insert + '\n\t\t' + hook));
      }
    }

    if (this.actionType && this.actionFile) {
      // add action
      path = config.src + 'actions/' + this.actionFile;
      file = this.readFileAsString(path);
      insert = _insertActionCreator.call(this,name);

      if (file && file.indexOf(insert) === -1) {
        this.write(path, file.replace(hook, insert + '\n\t' + hook));
      }
    }

  },
});
