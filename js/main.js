// =========
// Main
// =========

/**
 * @module Helpers
 */
var Helpers = {

	/**
	 * @method hasNoActiveInputs
	 *
	 * Returns true if there are not currently active elements
	 */
	hasNoActiveInputs: function() {
		return document.activeElement === document.body;
	}

};

/**
 * @module App
 * 
 * Main application module for listening to key events and
 * communicating with DOM reader.  Keeps current state.
 */
var App = {
	
	/**
	 * @method initialize
	 *
	 * Perform app initialization on page load
	 */
	initialize: function() {
		console.log('initializing');
	},

	/**
	 * @method keyPressed
	 *
	 * Base Handler for key press event
	 */
	keyPressed: function(event) {
		if (Helpers.hasNoActiveInputs()) {
			// J
			if (event.keyCode === 106) {
				console.log('J');
			}

			if (event.keyCode === 107) {
				console.log('K');
			}
		}
	}

};

/**
 * Initialization
 */
$(document).ready(function() {
  App.initialize();

  $(window).on('keypress', function(e) {
  	App.keyPressed(e);
  });

});