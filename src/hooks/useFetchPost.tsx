import { useCallback, useEffect, useState } from 'react';
import { post } from '../api/api';
import { PostInterface } from '../types';

function useFetchPost(id: string) {
	const [currentPost, setCurrentPost] = useState<PostInterface | null>(null);

	const fetchPost = useCallback(async () => {
		if (!id) return;

		const res: Response = await post.getPost(null, id);
		const data: PostInterface = await res.json();
		setCurrentPost(data);
	}, [id]);

	useEffect(() => {
		fetchPost();
	}, [fetchPost]);

	return [currentPost];
}

export default useFetchPost;
