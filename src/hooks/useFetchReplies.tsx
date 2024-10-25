import { useCallback, useEffect, useState } from 'react';
import { comment } from '../api/api';
import { PostInterface } from '../types';

function useFetchReplies(
	id: string | undefined,
	commentCount: number = 0,
	postType: 'Post' | 'Comment'
) {
	const [comments, setComments] = useState<PostInterface[]>([]);

	const fetchReplies = useCallback(async () => {
		let data: PostInterface[];

		if (!id) return;
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
	}, [id, commentCount, postType]);

	useEffect(() => {
		setComments([]);
	}, [id]);

	useEffect(() => {
		fetchReplies();
	}, [fetchReplies]);

	return { comments };
}

export default useFetchReplies;
