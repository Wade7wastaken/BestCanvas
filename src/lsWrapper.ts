export class LocalStorageWrapper<T> {
	value: T;
	location: string;

	constructor(location: string, defaultValue: T) {
		this.location = location;
		const currentValue = localStorage.getItem(location);

		if (currentValue === null) {
			localStorage.setItem(location, JSON.stringify(defaultValue));
			this.value = defaultValue;
			return;
		}

		this.value = JSON.parse(currentValue) as T;
	}

	set(newValue: T): void {
		localStorage.setItem(this.location, JSON.stringify(newValue));
	}
}
