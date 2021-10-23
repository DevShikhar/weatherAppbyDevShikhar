"use strict";

let test = document.querySelector(".errorsection").innerHTML;
console.log(test);
if (Boolean(test)) {
	document.querySelector(".weather-details").style.display = "none";
}
