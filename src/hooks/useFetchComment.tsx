import { useCallback, useEffect, useState } from 'react';
import { PostInterface } from '../types';
import { comment } from '../api/api';

function useFetchComment(id: string) {
	const [commentGroup, setCommentGroup] = useState<PostInterface | null>(null);

	const fetchComment = useCallback(async () => {
		if (!id) return;

		const res: Response = await comment.getCommentGroup(null, id);
		const data: PostInterface = await res.json();
		setCommentGroup(data);
	}, [id]);

	useEffect(() => {
		fetchComment();
	}, [fetchComment]);

	return {
		commentGroup,
		postId: commentGroup?.post_data.post_id
	};
}

export default useFetchComment;
