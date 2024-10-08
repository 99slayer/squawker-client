import { FormEvent } from '../types';

export function payload(e: FormEvent) {
	const userInput: FormDataIterator<[string, FormDataEntryValue]> = new FormData(e.currentTarget).entries();
	const inputJSON: string = JSON.stringify(Object.fromEntries(userInput));
	const payload: string = inputJSON;

	return payload;
}

export function payloadMulti(e: FormEvent, f) {
	const body: FormData = new FormData();
	const userInput: FormDataIterator<[string, FormDataEntryValue]> = new FormData(e.currentTarget).entries();
	const inputJSON: string = JSON.stringify(Object.fromEntries(userInput));
	const file: FormDataEntryValue | null = new FormData(e.currentTarget).get(f);
	body.append('json', inputJSON);
	body.append('file', file);
	const payload: FormData = body;

	return payload;
}
