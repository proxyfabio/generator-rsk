"use_strict";

var Store = require('../core/Store');
var Dispatcher = require('../core/Dispatcher');
var ActionTypes = require('../constants/ActionTypes');

var <%= name %>Store = new Store({

});

<%= name %>Store.dispatcherToken = Dispatcher.register(payload => {
	var action = payload.action;

	switch(action.actionType){

		#===== yeoman hook =====#
		default:
			break;
	}

	<%=name%>Store.emitChange();

	return true; // No errors.  Needed by promise in Dispatcher.

});

module.exports = <%= name %>Store;
