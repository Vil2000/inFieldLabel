


function inFileldLabel(labelBlock) {
	var block = this;

	block.label = labelBlock.querySelectorAll("label")[0];
	block.input = document.getElementById(this.label.getAttribute("for"));

	block.input.addEventListener("focus", function () {
		block.label.classList.add("label-focus");
		block.input.classList.add("on-focus");
	});

	block.input.addEventListener("blur", function () {
		block.label.classList.remove("label-focus");
		block.input.classList.remove("on-focus");
	});
}


document.addEventListener("click", function (event) {
	// Check if label-block or its child clicked
	var a = event.target;

	while (a != document && !a.classList.contains("label-block")) {
		a = a.parentNode;
	}

	if (a != document) {
		inFileldLabel(a);
	}
}, false);

// document.querySelectorAll(".label-block").forEach(function(el) {
// 	new inFileldLabel(el);
// });