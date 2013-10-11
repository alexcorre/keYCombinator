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
	},

	/**
	 * @method wrapCollectionNodes
	 *
	 * @param $nodes {jQuery object} - list of nodes
	 * @return {Array|jQuery Object} - array where each item is a jquery node
	 */
	wrapCollectionNodes: function($nodes) {
		var wrappedNodes = _.map(nodes, function(element) {
			return $(element);
		});
		return wrappedNodes;
	}

};

/**
 * @module ItemIterator
 *
 * The iterator data structure used to walk the array of items
 * on hacker news
 */
function ItemIterator($titles) {
	this.index = -1;
	this.items = $titles;
}

ItemIterator.prototype.current = function() {
	if (this.index >= 0 && this.index < this.items.length) {
		return this.items[this.index];		
	}
}

ItemIterator.prototype.next = function() {
	if (this.index < (this.items.length - 1)) {
		this.index ++;	
	}
	return this.current();
}

ItemIterator.prototype.prev = function() {
	if (this.index > 0) {
		this.index--;
	}
	return this.current();
}

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
		var $titles = $(this.titleSelector);
		return new ItemIterator($titles);
	},

	activate: function($element) {
		if ($element) {
			$element.addClass('kc-current');
		}
	},

	deactivate: function($element) {
		if ($element) {
			$element.removeClass('kc-current');
		}
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
	 * @property iterator
	 *
	 * The main iterator for walking the list of items
	 */
	iterator: null,

	/**
	 * @method initialize
	 *
	 * Perform app initialization on page load
	 */
	initialize: function() {
		this.iterator = Walker.parse();
	},

	/**
	 * @method moveNext
	 *
	 * Moves main cursor to the next story
	 */
	moveNext: function() {
		var $currentElement = $(this.iterator.current());
		Walker.deactivate($currentElement);

		var $element = $(this.iterator.next());
		Walker.activate($element);

		//console.log('element', $element[0]);
	},

	/**
	 * @method movePrev
	 *
	 * Moves cursor to the previous story
	 */
	movePrev: function() {
		var $currentElement = $(this.iterator.current());
		Walker.deactivate($currentElement);

		var $element = $(this.iterator.prev());
		Walker.activate($element);	

		//console.log('element', $element[0]);
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
				this.moveNext();
			}

			// K
			if (event.keyCode === 107) {
				this.movePrev();
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