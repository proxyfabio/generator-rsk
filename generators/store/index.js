"use_strict";

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var config = require('../config');

module.exports = yeoman.generators.Base.extend({
	constructor:function () {
		yeoman.generators.Base.apply(this,arguments);
		this.option('coffee');
	},

	initializing: function (name) {
		this.log('Creating new store: ' + chalk.green(name));

		this.argument('name', {
			required: true,
			type: String,
			desc: 'The store name'
		});
	},

	writing: function () {
    this.template('_store.js', config.src+'stores/'+ this.name +'Store.js');
	}
});
