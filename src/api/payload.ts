import { FormEvent } from '../types';

export function payload(e: FormEvent) {
	const userInput = new FormData(e.currentTarget).entries();
	const inputJSON = JSON.stringify(Object.fromEntries(userInput));
	const payload = inputJSON;

	return payload;
}

export function payloadMulti(e: FormEvent, f) {
	const body = new FormData();
	const userInput = new FormData(e.currentTarget).entries();
	const inputJSON = JSON.stringify(Object.fromEntries(userInput));
	const file = new FormData(e.currentTarget).get(f);
	body.append('json', inputJSON);
	body.append('file', file);
	const payload = body;

	return payload;
}
