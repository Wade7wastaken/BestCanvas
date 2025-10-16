export class LSWrapper<T> {
	private value: T;
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

	public get(): T {
		return this.value;
	}

	public set(newValue: T): void {
		localStorage.setItem(this.location, JSON.stringify(newValue));
		this.value = newValue;
	}
}
