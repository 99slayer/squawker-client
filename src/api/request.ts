import { payload as pl } from './payload';
import { Options, RequestEvent, FormEvent } from '../types';

function isFormEvent(e: RequestEvent): e is FormEvent {
	return e as FormEvent !== undefined;
}

export async function request(
	e: RequestEvent,
	options: Options,
	req: (options: Options) => Promise<Response>
): Promise<Response> {
	let payload;

	if (e) e.preventDefault();
	if (options.payload && isFormEvent(e)) payload = pl(e);

	const apiResponse: Response = await req(
		{
			body: payload,
			ids: options.ids,
			username: options.username
		}
	);

	return apiResponse;
}
