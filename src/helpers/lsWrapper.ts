export class LocalStorageWrapper<T> {
	public readonly value: T;
	public readonly location: string;

	public constructor(location: string, defaultValue: T) {
		this.location = location;
		const currentValue = localStorage.getItem(location);

		if (currentValue === null) {
			localStorage.setItem(location, JSON.stringify(defaultValue));
			this.value = defaultValue;
			return;
		}

		this.value = JSON.parse(currentValue) as T;
	}

	public set(newValue: T): void {
		localStorage.setItem(this.location, JSON.stringify(newValue));
	}
}
