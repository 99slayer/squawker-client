import {
	payload as pl,
	payloadMulti as plm
} from './payload';
import { Options, RequestEvent, FormEvent } from '../types';

function isFormEvent(e: RequestEvent): e is FormEvent {
	return e as FormEvent !== undefined;
}

export async function request(
	e: RequestEvent,
	options: Options,
	req: (options: Options) => Promise<Response>
): Promise<Response> {
	if (e) e.preventDefault();

	let payload;

	if (options.payload && isFormEvent(e)) {
		switch (options.payload) {
			case 'json':
				payload = pl(e);
				break;

			case 'multi':
				payload = plm(e, options.file);
				break;

			default:
				break;
		}
	}

	const apiResponse: Response = await req(
		{
			body: payload,
			ids: options.ids,
			username: options.username,
			update: options.update
		}
	);

	if (!apiResponse.ok) throw new Error(
		`${apiResponse.status + ' ' + apiResponse.statusText}`
	);

	return apiResponse;
}
