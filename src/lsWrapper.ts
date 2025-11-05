import { AlertPanic } from "./utils";

export class LSWrapper<T> {
    private value: T;

    public constructor(
        private readonly location: string,
        defaultValue: T
    ) {
        const currentValue = localStorage.getItem(location);

        if (currentValue === null) {
            localStorage.setItem(location, JSON.stringify(defaultValue));
            this.value = defaultValue;
            return;
        }

        try {
            this.value = JSON.parse(currentValue) as T;
        } catch (error) {
            throw new AlertPanic(
                `Failed to parse localStorage value. Original error: ${String(error)}`
            );
        }
    }

    public get(): T {
        return this.value;
    }

    public set(newValue: T): void {
        localStorage.setItem(this.location, JSON.stringify(newValue));
        this.value = newValue;
    }
}
