import { useCallback, useEffect, useState } from 'react';
import { comment } from '../api/api';
import { PostInterface } from '../types';

function useFetchReplies(
	id: string | undefined,
	commentCount: number = 0,
	postType: 'Post' | 'Comment'
) {
	const [comments, setComments] = useState<PostInterface[]>([]);
	const [repliesLoading, setLoading] = useState<boolean>(true);
	const [repliesError, setError] = useState<unknown>(null);

	const fetchReplies = useCallback(async () => {
		setLoading(true);
		setError(null);

		try {
			let data: PostInterface[];

			if (!id) throw new Error('Problem fetching replies.');
			if (postType === 'Post') {
				const res: Response = await comment
					.getPostReplies(null, id, commentCount);
				data = await res.json();
			} else {
				const res: Response = await comment
					.getCommentReplies(null, id, commentCount);
				data = await res.json();
			}

			setComments(prev => {
				if (prev[0]?._id === data[0]?._id) return prev;
				return [...prev, ...data];
			});
		} catch (err) {
			setError(err);
		} finally {
			setLoading(false);
		}
	}, [id, commentCount, postType]);

	useEffect(() => {
		setComments([]);
	}, [id]);

	useEffect(() => {
		fetchReplies();
	}, [fetchReplies]);

	return { comments, repliesLoading, repliesError, repliesRefetch: fetchReplies };
}

export default useFetchReplies;
