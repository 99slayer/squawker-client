const domain = 'https://localhost:3000';
import { request } from './request';
import { Options, FormEvent, RequestEvent } from '../types';

export async function getUser(e: RequestEvent, username: string) {
	async function req(options: Options): Promise<Response> {
		const res: Response = await fetch(
			`${domain}/user/${options.username}`,
			{
				method: 'GET',
				mode: 'cors',
				credentials: 'include'
			});
		return res;
	}

	const apiRes: Response = await request(e, { username }, req);
	return apiRes;
}

export async function createUser(e: FormEvent) {
	async function req(options: Options): Promise<Response> {
		const res: Response = await fetch(`${domain}/signup`, {
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
	// payload will be multi once I add image functionality.
	const apiRes: Response = await request(e, { payload: 'json' }, req);
	return apiRes;
}

export async function updateUser(
	e: FormEvent,
	username: string,
	update: string
) {
	async function req(options: Options): Promise<Response> {
		const res: Response = await fetch(
			`${domain}/${options.username}/update-${options.update}`,
			{
				method: 'PUT',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: options.body
			});

		return res;
	}
	// payload will be multi once I add image functionality.
	const apiRes: Response = await request(e, { payload: 'json', username, update }, req);
	return apiRes;
}
