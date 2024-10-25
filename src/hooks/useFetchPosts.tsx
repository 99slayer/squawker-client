import { useCallback, useEffect, useState } from 'react';
import { post } from '../api/api';
import { PostInterface } from '../types';

function useFetchPosts(
	username: string,
	postCount: number = 0
) {
	const [posts, setPosts] = useState<PostInterface[]>([]);

	const fetchPosts = useCallback(async () => {
		if (!username) return;

		const res: Response = await post
			.getUserPosts(null, username, postCount);
		const data: PostInterface[] = await res.json();
		setPosts(prev => {
			if (prev[0]?._id === data[0]?._id) return prev;
			return [...prev, ...data];
		});
	}, [username, postCount]);

	useEffect(() => {
		fetchPosts();
	}, [fetchPosts]);

	return { posts };
}

export default useFetchPosts;
