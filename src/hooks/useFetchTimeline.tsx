import { useCallback, useEffect, useState } from 'react';
import { PostInterface } from '../types';
import { post } from '../api/api';

function useFetchTimeline(postCount: number = 0) {
	const [posts, setPosts] = useState<PostInterface[]>([]);

	const fetchTimeline = useCallback(async () => {
		const res: Response = await post.getTimeline(null, postCount);
		const data = await res.json();
		setPosts(prev => {
			if (prev[0]?._id === data[0]?._id) return prev;
			return [...prev, ...data];
		});
	}, [postCount]);

	useEffect(() => {
		fetchTimeline();
	}, [fetchTimeline]);

	return { posts };
}

export default useFetchTimeline;
