import { useCallback, useEffect, useState } from 'react';
import { comment } from '../api/api';
import { PostInterface } from '../types';

function useFetchComments(
	username: string,
	commentCount: number = 0
) {
	const [commentGroups, setCommentGroups] = useState<PostInterface[]>([]);

	const fetchComments = useCallback(async () => {
		if (!username) return;

		const res: Response = await comment
			.getUserComments(null, username, commentCount);
		const data: PostInterface[] = await res.json();
		setCommentGroups(prev => {
			if (prev[0]?._id === data[0]?._id) return prev;
			return [...prev, ...data];
		});
	}, [username, commentCount]);

	useEffect(() => {
		fetchComments();
	}, [fetchComments]);

	return { commentGroups };
}

export default useFetchComments;
