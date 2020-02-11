function inFileldLabel(labelBlock) {
	//
	// Variables
	//
	var label = labelBlock.querySelector("label"),
		input = document.getElementById(label.getAttribute("for")),
		clearBtn = labelBlock.querySelector(".label-block__clear"),
		timeout = "";

	//
	// Methods
	//
	function checkIfEmpty() {
		if (input.value) {
			labelBlock.classList.add("label-block_dirty");
			if (clearBtn) {
				clearBtn.classList.remove("hidden");
			}
		} else {
			labelBlock.classList.remove("label-block_dirty");
			if (clearBtn) {
				clearBtn.classList.add("hidden");
			}
		}
	}

	function setFocus() {
		labelBlock.classList.add("label-block_focus");
	}

	function setBlur() {
		labelBlock.classList.remove("label-block_focus");
	}

	function clearInput() {
		input.value = "";
		checkIfEmpty();
	}


	//
	// Inits & Event Listeners
	//
	input.addEventListener("focus", function () {
		setFocus();
		checkIfEmpty();
	}, false);

	input.addEventListener("blur", function () {
		setBlur();
		checkIfEmpty();
	}, false);

	input.addEventListener("keyup", function () {
		clearTimeout(timeout);

		timeout = setTimeout(function () {
			checkIfEmpty();
		}, 500);
	});

	if (clearBtn) {
		clearBtn.addEventListener("click", function () {
			clearInput();
		});
	}

	checkIfEmpty();

}


document.querySelectorAll(".label-block").forEach(function (el) {
	inFileldLabel(el);
});