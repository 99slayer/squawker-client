const domain = 'https://localhost:3000';
import { request } from './request';
import { Options, FormEvent, RequestEvent } from '../types';

export async function getTimeline(e: RequestEvent) {
	async function req(): Promise<Response> {
		const res: Response = await fetch(`${domain}/home`, {
			method: 'GET',
			mode: 'cors',
			credentials: 'include'
		});
		return res;
	}

	const apiRes: Response = await request(e, {}, req);
	return apiRes;
}

export async function getUserPosts(e: RequestEvent, username: string) {
	async function req(options: Options): Promise<Response> {
		const res: Response = await fetch(
			`${domain}/${options.username}/posts`,
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

export async function getPost(
	e: RequestEvent,
	username: string,
	postId: string
) {
	async function req(): Promise<Response> {
		const res: Response = await fetch(
			`${domain}/${username}/post/${postId}`,
			{
				method: 'GET',
				mode: 'cors',
				credentials: 'include'
			});
		return res;
	}

	const apiRes: Response = await request(e, { ids: { postId }, username }, req);
	return apiRes;
}

export async function createPost(e: FormEvent, postId: string) {
	async function req(options: Options): Promise<Response> {
		const res: Response = await fetch(
			`${domain}/publish-post/${options?.ids?.postId}`,
			{
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

	const apiRes: Response = await request(e, { payload: 'json', ids: { postId } }, req);
	return apiRes;
}

export async function updatePost(e: FormEvent, postId: string) {
	async function req(options: Options): Promise<Response> {
		const res: Response = await fetch(
			`${domain}/edit-post/${options?.ids?.postId}`,
			{
				method: 'PUT',
				mode: 'cors',
				credentials: 'include',
				body: options.body
			});
		return res;
	}

	const apiRes: Response = await request(e, { payload: 'json', ids: { postId } }, req);
	return apiRes;
}

export async function deletePost(e: RequestEvent, postId: string) {
	async function req(options: Options): Promise<Response> {
		const res: Response = await fetch(
			`${domain}/delete-post/${options?.ids?.postId}`,
			{
				method: 'DELETE',
				mode: 'cors',
				credentials: 'include'
			});
		return res;
	}

	const apiRes: Response = await request(e, { ids: { postId } }, req);
	return apiRes;
}
