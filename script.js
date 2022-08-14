(function () {
	let input = document.querySelector("input");
	let $mega_six_container = $(".mega_six_container");
	//input event Handler
	input.addEventListener("change", () => {
		let files = input.files; //property of the <input type="file" /> element that returns an array of file(s) uploaded
		if (files.length == 0) return; //if the length of the array is zero return.
		const file = files[0]; //get the file at index 0 which will be the file which was uploaded
		let reader = new FileReader(); //https://developer.mozilla.org/en-US/docs/Web/API/FileReader/onload
		//create a new instance of FileReader

		reader.readAsText(file); // this function calls reader.onload and passes the event file as the parameter (e)
		reader.onload = (e) => {
			// e will hold the file that was passed in
			console.dir(e.target); //target refers to the file, check console in browser
			const file = e.target.result; //the file will always be stored in this property on the e.target (object)
			console.log(file);
			const lines = file.split(/\r\n|\n/); //split the file by return carriage or by newline which will return an array of split values
			console.log("the array containing each line of the text file below");
			console.dir(lines);
			let arr = [];
			for (let x = 0; x < lines.length; x++) {
				let current_line = lines[x].trim();
				let game = current_line.split(/\s+/);
				arr.push(game);
			}
			calculateOccurrence(arr);
		};
		reader.onerror = (e) => alert(e.target.error.name); // if an error occured
	});
	let occurrences = {};
	function calculateOccurrence(arr = []) {
		arr.forEach((lottery_game) => {
			lottery_game.forEach((num) => {
				if (!occurrences[num]) {
					occurrences[num] = 0;
				}
				occurrences[num]++;
			});
		});
		let numbers_sorted = orderByHighest(occurrences);
		displayNumbers(numbers_sorted);
	}

	function orderByHighest(occurrences) {
		let sortable = [];
		for (var game in occurrences) {
			sortable.push([game, occurrences[game]]);
		}
		sortable.sort(function (a, b) {
			return a[1] - b[1];
		});
		return sortable;
	}

	function displayNumbers(numbers_sorted, options) {
		let highest_to_lowest = numbers_sorted.reverse();
		$mega_six_container.html("");
		highest_to_lowest.forEach((set) => {
			let $wrapper = $(".number_template").clone(true).children();
			let $number = $wrapper.find(".number");
			randomColor($number);
			$number.text(set[0]);
			$wrapper
				.find(".occurrences")
				.html(
					`Number of Occurrences <strong class="occurrences_text">${set[1]}</strong>`
				);
			$mega_six_container.append($wrapper);
		});
	}

	function randomColor($number) {
		let r = Math.floor(Math.random() * 255);
		let g = Math.floor(Math.random() * 255);
		let b = Math.floor(Math.random() * 255);
		$number.css("background-color", `rgb(${r},${g},${b})`);
		let total = r + g + b;
		if (total > 382) {
			$number.css("color", `black`);
		}
	}
})();
