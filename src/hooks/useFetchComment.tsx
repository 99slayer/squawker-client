import { useCallback, useEffect, useState } from 'react';
import { PostInterface } from '../types';
import { comment } from '../api/api';

function useFetchComment(id: string) {
	const [commentGroup, setCommentGroup] = useState<PostInterface | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [commentError, setError] = useState<unknown>(null);

	const fetchComment = useCallback(async () => {
		setLoading(true);
		setError(null);

		try {
			if (!id) throw new Error('Problem fetching comment.');

			const res: Response = await comment.getCommentGroup(null, id);
			const data: PostInterface = await res.json();
			setCommentGroup(data);
		} catch (err) {
			setError(err);
		} finally {
			setLoading(false);
		}
	}, [id]);

	useEffect(() => {
		fetchComment();
	}, [fetchComment]);

	return {
		commentGroup,
		loading,
		commentError,
		refetch: fetchComment,
		postId: commentGroup?.post_data.post_id
	};
}

export default useFetchComment;
