//
// ─── IDEA ───────────────────────────────────────────────────────────────────────
//

const sleep = (m) => new Promise((r) => setTimeout(r, m)); // Make setTImeout Return a promise
const watchedValue = new Object(); // empty object
const valueWatcher = async (_value, interval) => {
	await sleep(interval);
	return new Promise((resolve, reject) => {
		if (!_value) {
			resolve(false); // false because the value is not what expected
			//resolve(valueWatcher());
		} else {
			resolve(_value);
		}
	});
};

export default valueWatcher;
