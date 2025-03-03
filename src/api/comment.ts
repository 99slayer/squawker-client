const domain = import.meta.env.VITE_API_URL;
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

export async function getPostReplies(
	e: RequestEvent,
	postId: string,
	commentCount: number
) {
	async function req(options: Options): Promise<Response> {
		const res: Response = await fetch(
			`${domain}/${options?.ids?.postId}/post-replies?commentCount=${commentCount}`,
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

export async function getCommentReplies(
	e: RequestEvent,
	postId: string,
	commentCount: number
) {
	async function req(options: Options): Promise<Response> {
		const res: Response = await fetch(
			`${domain}/${options?.ids?.postId}/comment-replies?commentCount=${commentCount}`,
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

export async function getCommentGroup(
	e: RequestEvent,
	commentId: string
) {
	async function req(options: Options): Promise<Response> {
		const res: Response = await fetch(
			`${domain}/comment-group/${options?.ids?.commentId}`,
			{
				method: 'GET',
				mode: 'cors',
				credentials: 'include'
			});
		return res;
	}

	const apiRes: Response = await request(e, { ids: { commentId } }, req);
	return apiRes;
}

export async function createComment(
	e: FormEvent,
	postId: string
) {
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

	const apiRes: Response = await request(e, { payload: true, ids: { postId } }, req);
	return apiRes;
}

export async function createRepost(e: RequestEvent, commentId: string) {
	async function req(): Promise<Response> {
		const res: Response = await fetch(
			`${domain}/publish-comment-repost/${commentId}`,
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

	const apiRes: Response = await request(e, { ids: { commentId } }, req);
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

	const apiRes: Response = await request(e, { payload: true, ids: { commentId } }, req);
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
