var inFileldLabel = function (labelBlock) {
	var label        = labelBlock.querySelectorAll("label")[0],
		input        = document.getElementById(label.getAttribute("for")),

		checkIfEmpty = function() {
			if (input.value) {
				label.classList.add("label-for-dirty");
				input.classList.add("is-dirty");
			} else {
				label.classList.remove("label-for-dirty");
				input.classList.remove("is-dirty");
			}
		},

		setFocus     = function() {
			label.classList.add("label-focus");
			input.classList.add("input-focus");
		},

		setBlur      = function() {
			label.classList.remove("label-focus");
			input.classList.remove("input-focus");
		};

	input.addEventListener("focus", function () {
		setFocus();
		checkIfEmpty();
	}, false);

	input.addEventListener("blur", function () {
		setBlur();
		checkIfEmpty();
	}, false);

	checkIfEmpty();
};


// Document ready function
function ready(fn) {
	if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
		fn();
	} else {
		document.addEventListener("DOMContentLoaded", fn);
	}
}

ready(function () {
	document.querySelectorAll(".label-block").forEach(function (el) {
		inFileldLabel(el);
	});
});
