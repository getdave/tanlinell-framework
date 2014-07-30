/**
 * TOGGLE
 *
 * Creates a Toogle switch used for triggering the addition of
 * "active"-like classes to another targetted DOM element
 * typically used to trigger visibility of expandable regions
 * such as toggleable menus. Works well when paired with a CSS
 * "expandable" module. Data API is provided.
 */

(function(Tanlinell, $) {

	function Toggle(el, options) {
		this.el = el;
		this.$el = $(el);
		this.isActive = false;

		this.settings = $.extend({
			eventType: "click",
			toggleTarget: this.$el.data('toggle-target'),
			focusTarget: false,
			classList: this.$el.data("toggle-classlist") || "is-active",
			toggleActiveText: this.$el.data("toggle-active-text") || false
		}, options);

		this.$toggleTarget = $(this.settings.toggleTarget);
		this.$focusTarget =  (this.settings.focusTarget) ? $(this.settings.focusTarget) : this.$toggleTarget;


		this.toggleText = this.$el.text();

		this.setup();
	}

	Toggle.prototype.setup = function() {
		this.addListeners();
	};

	Toggle.prototype.addListeners = function() {
		var _this = this;

		// This has to be directly bound else we end up with
		// issues when this.el is a selector representing a
		// collection of elements
		this.$el.on(this.settings.eventType, this.el, function(e) {
			e.preventDefault();
			_this.toggleIt( $(this), e );
		});
	};

	Toggle.prototype.toggleIt = function($ele,event) {

		if (this.isActive) {
			this.close($ele,event);
		} else {
			this.open($ele,event);
		}
	};

	Toggle.prototype.close = function($ele,event) {
		this.$toggleTarget.removeClass( this.settings.classList );
		this.$focusTarget.attr("tabindex","-1");

		this.$el.removeClass('toggle--active');
		this.$el.focus();

		if (this.settings.toggleActiveText) {
			this.$el.html(this.toggleText);
		}
		this.isActive = false;
	};

	Toggle.prototype.open = function($ele,event) {
		this.$toggleTarget.addClass( this.settings.classList );
		this.$focusTarget.attr("tabindex","0").focus();

		this.$el.addClass('toggle--active');

		if (this.settings.toggleActiveText) {
			this.$el.html(this.settings.toggleActiveText);
		}

		this.isActive = true;
	};





	// Data API
	$("[data-toggle]").each(function() {
		var $this = $(this);

		// Check if this has been initialized
		if( $this.data('tanlinell-module-initialized') ) {
			return true;
		}

		// Mark as initialized
		$this.data('tanlinell-module-initialized', true);

		// Instantiate new SmoothScroll on this unique element
		new Toggle( $this );
	});

	// Register Module
	Tanlinell.modules.Toggle = Toggle;


}(Tanlinell, jQuery));

