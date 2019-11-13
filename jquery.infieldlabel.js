(function($) {
	$.InFieldLabels = function(label, field, options) {
		// To avoid scope issues, use 'base' instead of 'this'
		// to reference this class from internal events and functions.
		var base = $(this);

		// Access to jQuery and DOM versions of each element
		base.$label = $(label);

		base.$field = $(field);

		base.$label.data("InFieldLabels", base);

		base.init = function() {
			// Merge supplied options with default options
			base.options = $.extend({}, $.InFieldLabels.defaultOptions, options);

			// Check if the field is already filled in
			// add a short delay to handle autocomplete
			setTimeout(function() {
				$("input:-webkit-autofill").each(function() {
					$(this).addClass(base.options.fieldClass);
					$('label[for="'+ this.id +'"]').addClass(base.options.finalClass);
				});
				base.checkForEmpty();

				$('input[type="password"]:-webkit-autofill').focus();
			}, 50);

			base.$field.focus(function() {
				base.$label.addClass(base.options.focusClass);
				base.$field.addClass(base.options.fieldFocusClass);
			}).blur(function() {
				base.checkForEmpty(true);
			}).bind("keydown.infieldlabel", function(e) {
				// Use of a namespace (.infieldlabel) allows us to
				// unbind just this method later
				base.inputKeydown(e);
			}).bind("paste", function() {
				// Since you can not paste an empty string we can assume
				// that the field is not empty and the label can be cleared.
				base.$label.addClass(base.options.finalClass);
				base.$field.addClass(base.options.fieldClass);
			}).change(function() {
				base.checkForEmpty();
			}).bind("onPropertyChange", function() {
				base.checkForEmpty();
			}).bind("keyup.infieldlabel", function() {
				base.checkForEmpty();
			});

			base.$field.focusout(function() {
				base.$label.removeClass(base.options.focusClass);
				base.$field.removeClass(base.options.fieldFocusClass);
			});

		};

		// Checks for empty as a fail safe
		// set blur to true when passing from
		// the blur event
		base.checkForEmpty = function() {
			if (base.$field.val() === "") {
				base.$label.removeClass(base.options.finalClass);
				base.$field.removeClass(base.options.fieldClass);
			} else {
				base.$label.addClass(base.options.finalClass);
				base.$field.addClass(base.options.fieldClass);
			}
		};

		base.inputKeydown = function(e) {
			if (
				(e.keyCode === 16) || // Skip Shift
				(e.keyCode === 9) // Skip Tab
			) {
				return;
			}

			base.$label.addClass(base.options.finalClass);

			// Remove keydown event to save on CPU processing
			base.$field.unbind("keydown.infieldlabel");
		};

		// Run the initialization method
		base.init();
	};

	$.InFieldLabels.defaultOptions = {
		enabledInputTypes: ["text", "search", "tel", "url", "email", "password", "number", "textarea"],
		focusClass: "label-focus",
		finalClass: "label-final",
		fieldFocusClass: "on-focus",
		fieldClass: "is-dirty",
	};


	$.fn.inFieldLabels = function(options) {
		var allowed_types = options && options.enabledInputTypes || $.InFieldLabels.defaultOptions.enabledInputTypes;

		return this.each(function() {
			// Find input or textarea based on for= attribute
			// The for attribute on the label must contain the ID
			// of the input or textarea element
			var for_attr = $(this).attr("for"),
				field, restrict_type;
			if (!for_attr) {
				return; // Nothing to attach, since the for field wasn't used
			}

			// Find the referenced input or textarea element
			field = document.getElementById(for_attr);
			if (!field) {
				return; // No element found
			}

			// Restrict input type
			restrict_type = $.inArray(field.type, allowed_types);

			if (restrict_type === -1 && field.nodeName !== "TEXTAREA") {
				return; // Again, nothing to attach
			}

			// Only create object for matched input types and textarea
			(new $.InFieldLabels(this, field, options));
		});
	};

}(jQuery));


// Labels
$(document).ready(function () {
	$(".label-block label").inFieldLabels();
});