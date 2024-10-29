import { useCallback, useEffect, useState } from 'react';
import { PostInterface } from '../types';
import { post } from '../api/api';

function useFetchTimeline(postCount: number = 0) {
	const [posts, setPosts] = useState<PostInterface[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [timelineError, setError] = useState<unknown>(null);

	const fetchTimeline = useCallback(async () => {
		setLoading(true);
		setError(null);

		try {
			const res: Response = await post.getTimeline(null, postCount);
			const data = await res.json();
			setPosts(prev => {
				if (prev[0]?._id === data[0]?._id) return prev;
				return [...prev, ...data];
			});
		} catch (err: unknown) {
			setError(err);
		} finally {
			setLoading(false);
		}
	}, [postCount]);

	useEffect(() => {
		fetchTimeline();
	}, [fetchTimeline]);

	return { posts, loading, timelineError, refetch: fetchTimeline };
}

export default useFetchTimeline;
