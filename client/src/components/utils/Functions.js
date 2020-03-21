function isScrolledIntoView(el) {
	var rect = el.getBoundingClientRect();
	var elemTop = rect.top;
	var elemBottom = rect.bottom;

	// Only completely visible elements return true:
	var isVisible = elemTop >= 0 && elemBottom <= window.innerHeight;
	// Partially visible elements return true:
	//isVisible = elemTop < window.innerHeight && elemBottom >= 0;
	return isVisible;
}

// A replacement over visibility sensor
var visibleY = function(el) {
	var rect = el.getBoundingClientRect(),
		top = rect.top,
		height = rect.height;
	el = el.parentNode;
	// Check if bottom of the element is off the page
	if (rect.bottom < 0) return false;
	// Check its within the document viewport
	if (top > document.documentElement.clientHeight) return false;
	do {
		rect = el.getBoundingClientRect();
		if (!(top <= rect.bottom)) return false;
		// Check if the element is out of view due to a container scrolling
		if (top + height <= rect.top) return false;
		el = el.parentNode;
	} while (el !== document.body);
	return true;
};

export { isScrolledIntoView, visibleY };
