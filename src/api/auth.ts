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

	const apiRes: Response = await request(e, { payload: true }, req);
	const data: {
		username: string,
		nickname: string,
		pfp: string
	} = await apiRes.json();
	localStorage.setItem('username', data.username);
	localStorage.setItem('nickname', data.nickname);
	localStorage.setItem('pfp', data.pfp ?? '');

	return data;
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
	localStorage.removeItem('username');
	localStorage.removeItem('nickname');
	localStorage.removeItem('pfp');

	return apiRes;
}

export async function verify(e: RequestEvent, username: string) {
	async function req(options: Options): Promise<Response> {
		const res: Response = await fetch(`${domain}/verify/${options.username}`, {
			method: 'GET',
			mode: 'cors',
			credentials: 'include'
		});
		return res;
	}

	const apiRes: Response = await request(e, { username }, req);

	return apiRes;
}
