export function initLocalStorage<T>(location: string, defaultValue: T): T {
	const currentValue = localStorage.getItem(location);
	if (currentValue) {
		return JSON.parse(currentValue) as T;
	} else {
		localStorage.setItem(location, JSON.stringify(defaultValue));
		return defaultValue;
	}
}
