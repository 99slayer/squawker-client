import { FormEvent } from '../types';

export function payload(e: FormEvent) {
	const userInput = new FormData(e.currentTarget).entries();
	const inputJSON: string = JSON.stringify(Object.fromEntries(userInput));
	const payload: string = inputJSON;

	return payload;
}
