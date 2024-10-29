import { useCallback, useEffect, useState } from 'react';
import { post } from '../api/api';
import { PostInterface } from '../types';

function useFetchPosts(
	username: string,
	postCount: number = 0
) {
	const [posts, setPosts] = useState<PostInterface[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [postsError, setError] = useState<unknown>(null);

	const fetchPosts = useCallback(async () => {
		setLoading(true);
		setError(null);

		try {
			if (!username) throw new Error('problem fetching posts.');

			const res: Response = await post
				.getUserPosts(null, username, postCount);
			const data: PostInterface[] = await res.json();
			setPosts(prev => {
				if (prev[0]?._id === data[0]?._id) return prev;
				return [...prev, ...data];
			});
		} catch (err: unknown) {
			setError(err);
		} finally {
			setLoading(false);
		}
	}, [username, postCount]);

	useEffect(() => {
		fetchPosts();
	}, [fetchPosts]);

	return { posts, loading, postsError, refetch: fetchPosts };
}

export default useFetchPosts;
