var inFileldLabelFn = {
	checkIfEmpty : function (label, input) {
		if (input.value) {
			label.classList.add("label-for-dirty");
			input.classList.add("is-dirty");
		} else {
			label.classList.remove("label-for-dirty");
			input.classList.remove("is-dirty");
		}
	},
	setFocus     : function (label, input) {
		label.classList.add("label-focus");
		input.classList.add("input-focus");
	},
	setBlur      : function (label, input) {
		label.classList.remove("label-focus");
		input.classList.remove("input-focus");
	},
};


function inFileldLabel(labelBlock) {
	var label        = labelBlock.querySelectorAll("label")[0],
		input        = document.getElementById(label.getAttribute("for"));

	input.addEventListener("focus", function () {
		inFileldLabelFn.setFocus(label, input);
		inFileldLabelFn.checkIfEmpty(label, input);
	}, false);

	input.addEventListener("blur", function () {
		inFileldLabelFn.setBlur(label, input);
		inFileldLabelFn.checkIfEmpty(label, input);
	}, false);

	inFileldLabelFn.checkIfEmpty(label, input);
}

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
