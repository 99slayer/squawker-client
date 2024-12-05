const domain = import.meta.env.VITE_API_DOMAIN;
import { request } from './request';
import { Options, FormEvent, RequestEvent } from '../types';

export async function getTimeline(e: RequestEvent, postCount: number) {
	async function req(): Promise<Response> {
		const res: Response = await fetch(
			`${domain}/home?postCount=${postCount}`,
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

export async function getUserPosts(
	e: RequestEvent,
	username: string,
	postCount: number
) {
	async function req(options: Options): Promise<Response> {
		const res: Response = await fetch(
			`${domain}/${options.username}/posts?postCount=${postCount}`,
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
	postId: string
) {
	async function req(): Promise<Response> {
		const res: Response = await fetch(
			`${domain}/post/${postId}`,
			{
				method: 'GET',
				mode: 'cors',
				credentials: 'include'
			});
		return res;
	}

	const apiRes: Response = await request(e, { ids: { postId } }, req);
	return apiRes;
}

export async function createPost(
	e: FormEvent,
	postId: string | null = null
) {
	async function req(options: Options): Promise<Response> {
		const res: Response = await fetch(
			`${domain}/publish-post/${postId ? options?.ids?.postId : ''}`,
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

	const reqOptions: Options = {
		payload: true
	};

	if (postId) reqOptions.ids = { postId };

	const apiRes: Response = await request(e, reqOptions, req);
	return apiRes;
}

export async function createRepost(e: RequestEvent, postId: string) {
	async function req(): Promise<Response> {
		const res: Response = await fetch(
			`${domain}/publish-post-repost/${postId}`,
			{
				method: 'POST',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include'
			});
		return res;
	}

	const apiRes: Response = await request(e, { ids: { postId } }, req);
	return apiRes;
}

export async function updatePost(e: FormEvent, postId: string) {
	async function req(options: Options): Promise<Response> {
		const res: Response = await fetch(
			`${domain}/edit-post/${options?.ids?.postId}`,
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

	const apiRes: Response = await request(e, { payload: true, ids: { postId } }, req);
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
