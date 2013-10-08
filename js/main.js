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
 * @module Walker
 *
 * DOM Walker
 */
var Walker = {

	upArrowSelector: 'td center',

	titleSelector: 'td.title a',

	commentsSelector: 'td.subtext a:last-of-type',

	/**
	 * @method parse
	 */
	parse: function() {
		var parsed = {
			ups: [],
			titles: [],
			comments: []
		};

		// Up arrows
		var $ups = $(this.upArrowSelector);
		_.each($ups, function(element) {
			parsed.ups.push($(element));
		});

		var $titles = $(this.titleSelector);
		_.each($titles, function(element) {
			parsed.titles.push($(element));
		});

		var $comments = $(this.commentsSelector);
		_.each($titles, function(element) {
			parsed.comments.push($(element));
		});

		return parsed;
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
		var parsed = Walker.parse();
		console.log('parsed', parsed);
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

			// K
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