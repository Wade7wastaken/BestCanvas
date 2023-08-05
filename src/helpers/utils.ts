export function panic(message: string): never {
	alert(message);
	throw new Error(message);
}
