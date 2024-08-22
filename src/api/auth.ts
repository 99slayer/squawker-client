const domain = 'https://localhost:3000';
import { request } from './request';
import { Options, FormEvent, RequestEvent } from '../types';

export async function login(e: FormEvent) {
	async function req(options: Options): Promise<Response> {
		const res: Response = await fetch(`${domain}/login`, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: options.body
		});
		return res;
	}

	const apiRes: Response = await request(e, { payload: 'json' }, req);
	return apiRes;
}

export async function logout(e: RequestEvent) {
	async function req(): Promise<Response> {
		const res: Response = await fetch(`${domain}/logout`, {
			method: 'DELETE',
			mode: 'cors',
			credentials: 'include'
		});
		return res;
	}

	const apiRes: Response = await request(e, {}, req);
	return apiRes;
}
