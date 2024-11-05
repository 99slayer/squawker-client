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

export async function getUsers(
	e: RequestEvent,
	userCount: number
) {
	async function req(): Promise<Response> {
		const res: Response = await fetch(
			`${domain}/users?userCount=${userCount}`,
			{
				method: 'GET',
				mode: 'cors',
				credentials: 'include'
			});
		return res;
	}

	const apiRes: Response = await request(e, {}, req);
	return apiRes;
}

export async function getUserFollowers(
	e: RequestEvent,
	username: string,
	userCount: number
) {
	async function req(options: Options): Promise<Response> {
		const res: Response = await fetch(
			`${domain}/user/${options.username}/followers?userCount=${userCount}`,
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

export async function getUserFollowing(
	e: RequestEvent,
	username: string,
	userCount: number
) {
	async function req(options: Options): Promise<Response> {
		const res: Response = await fetch(
			`${domain}/user/${options.username}/following?userCount=${userCount}`,
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

export async function follow(
	e: RequestEvent,
	username: string
) {
	async function req(options: Options): Promise<Response> {
		const res: Response = await fetch(
			`${domain}/user/follow/${options.username}`,
			{
				method: 'PUT',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include'
			});
		return res;
	}

	const apiRes: Response = await request(e, { username }, req);
	return apiRes;
}

export async function unfollow(
	e: RequestEvent,
	username: string
) {
	async function req(options: Options): Promise<Response> {
		const res: Response = await fetch(
			`${domain}/user/unfollow/${options.username}`,
			{
				method: 'PUT',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json',
				},
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

	const apiRes: Response = await request(e, { payload: true }, req);
	return apiRes;
}

export async function createGuestUser(e: RequestEvent) {
	async function req(): Promise<Response> {
		const res: Response = await fetch(`${domain}/signup-guest`, {
			method: 'GET',
			mode: 'cors',
			credentials: 'include'
		});
		return res;
	}

	const apiRes: Response = await request(e, {}, req);
	return apiRes;
}

export async function updateUserAccount(
	e: FormEvent,
	username: string
) {
	async function req(options: Options): Promise<Response> {
		const res: Response = await fetch(
			`${domain}/${options.username}/account-update`,
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

	const apiRes: Response = await request(e, { payload: true, username }, req);
	return apiRes;
}

export async function updateUserSecurity(
	e: FormEvent,
	username: string
) {
	async function req(options: Options): Promise<Response> {
		const res: Response = await fetch(
			`${domain}/${options.username}/security-update`,
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
	const apiRes: Response = await request(e, { payload: true, username }, req);
	return apiRes;
}
