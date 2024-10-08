const domain = 'https://localhost:3000';
import { request } from './request';
import { Options, RequestEvent } from '../types';

export async function createLike(e: RequestEvent, postId: string) {
	async function req(options: Options): Promise<Response> {
		const res: Response = await fetch(
			`${domain}/publish-like/${options?.ids?.postId}`,
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

	const apiRes: Response = await request(e, { ids: { postId } }, req);
	return apiRes;
}

export async function deleteLike(e: RequestEvent, postId: string) {
	async function req(options: Options): Promise<Response> {
		const res: Response = await fetch(
			`${domain}/delete-like/${options?.ids?.postId}`,
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
