const domain = 'https://localhost:3000';
import { request } from './request';
import { Options, FormEvent, RequestEvent } from '../types';

export async function getUserComments(
	e: RequestEvent,
	username: string,
	commentCount: number
) {
	async function req(options: Options): Promise<Response> {
		const res: Response = await fetch(
			`${domain}/${options.username}/comments?commentCount=${commentCount}`,
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

export async function getComment(
	e: RequestEvent,
	username: string,
	commentId: string
) {
	async function req(options: Options): Promise<Response> {
		const res: Response = await fetch(
			`${domain}/${options.username}/comment/${options?.ids?.commentId}`,
			{
				method: 'GET',
				mode: 'cors',
				credentials: 'include'
			});
		return res;
	}

	const apiRes: Response = await request(e, { username, ids: { commentId } }, req);
	return apiRes;
}

export async function createComment(e: FormEvent, postId: string) {
	async function req(options: Options): Promise<Response> {
		const res: Response = await fetch(
			`${domain}/publish-comment/${options?.ids?.postId}`,
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

export async function updateComment(e: FormEvent, commentId: string) {
	async function req(options: Options): Promise<Response> {
		const res: Response = await fetch(
			`${domain}/edit-comment/${options?.ids?.commentId}`,
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

	const apiRes: Response = await request(e, { payload: 'json', ids: { commentId } }, req);
	return apiRes;
}

export async function deleteComment(e: RequestEvent, commentId: string) {
	async function req(options: Options): Promise<Response> {
		const res: Response = await fetch(
			`${domain}/delete-comment/${options?.ids?.commentId}`,
			{
				method: 'DELETE',
				mode: 'cors',
				credentials: 'include'
			});
		return res;
	}

	const apiRes: Response = await request(e, { ids: { commentId } }, req);
	return apiRes;
}
