import { useCallback, useEffect, useState } from 'react';
import { post } from '../api/api';
import { PostInterface } from '../types';

function useFetchPost(id: string): [
	PostInterface | null,
	boolean,
	unknown,
	() => Promise<void>,
	string | undefined
] {
	const [currentPost, setCurrentPost] = useState<PostInterface | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [postError, setError] = useState<unknown>(null);

	const fetchPost = useCallback(async () => {
		setLoading(true);
		setError(null);

		try {
			if (!id) throw new Error('Problem fetching post.');

			const res: Response = await post.getPost(null, id);
			const data: PostInterface = await res.json();
			setCurrentPost(data);
		} catch (err) {
			setError(err);
		} finally {
			setLoading(false);
		}

	}, [id]);

	useEffect(() => {
		fetchPost();
	}, [fetchPost]);

	return [
		currentPost,
		loading,
		postError,
		fetchPost,
		currentPost?.post_data.post_id
	];
}

export default useFetchPost;
