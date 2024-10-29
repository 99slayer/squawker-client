import { useCallback, useEffect, useState } from 'react';
import { comment } from '../api/api';
import { PostInterface } from '../types';

function useFetchComments(
	username: string,
	commentCount: number = 0
) {
	const [commentGroups, setCommentGroups] = useState<PostInterface[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [commentsError, setError] = useState<unknown>(null);

	const fetchComments = useCallback(async () => {
		setLoading(true);
		setError(null);

		try {
			if (!username) throw new Error('Problem fetching comments.');

			const res: Response = await comment
				.getUserComments(null, username, commentCount);
			const data: PostInterface[] = await res.json();
			setCommentGroups(prev => {
				if (prev[0]?._id === data[0]?._id) return prev;
				return [...prev, ...data];
			});
		} catch (err) {
			setError(err);
		} finally {
			setLoading(false);
		}
	}, [username, commentCount]);

	useEffect(() => {
		fetchComments();
	}, [fetchComments]);

	return { commentGroups, loading, commentsError, refetch: fetchComments };
}

export default useFetchComments;
