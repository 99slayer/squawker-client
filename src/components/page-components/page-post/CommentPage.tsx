import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { comment } from '../../../api/api';
import { PostInterface } from '../../../types';
import Component from '../../Component';

function CommentPage() {
	const { id }: { id: string } = useOutletContext();
	const navigate = useNavigate();
	const [commentGroup, setCommentGroup] = useState<PostInterface | null>(null);
	const [comments, setComments] = useState<PostInterface[]>([]);
	const [commentCount, setCommentCount] = useState<number>(0);

	const pullCommentGroup = useCallback(async () => {
		if (!id) return;
		const res: Response = await comment.getCommentGroup(null, id);
		if (!res.ok && res.status === 404) return navigate(-1);
		const data: PostInterface = await res.json();
		setCommentGroup(data);
	}, [id, navigate]);

	const pullComments = useCallback(async () => {
		if (!commentGroup || commentGroup.direct_comment_count === 0) return;
		const res: Response = await comment
			.getCommentReplies(null, commentGroup.post_data.post_id, commentCount);
		const data: PostInterface[] = await res.json();

		setComments(prev => {
			if (prev[0]?._id === data[0]?._id) return prev;
			return [...prev, ...data];
		});
	}, [commentGroup, commentCount]);

	useEffect(() => {
		pullCommentGroup();
		return () => {
			setComments([]);
		};
	}, [pullCommentGroup]);

	useEffect(() => {
		pullComments();
	}, [pullComments]);

	function createComments(commentArr: PostInterface[]): JSX.Element[] {
		const commentElements: JSX.Element[] = [];
		commentArr.map((cmnt) => {
			commentElements.push(
				<li key={uuid()}><Component.Post data={cmnt} /></li>
			);
		});

		return commentElements;
	}

	return (
		(commentGroup ?
			<div className='flex flex-col'>
				<Component.CommentDisplayGroup
					commentGroup={commentGroup as PostInterface}
				/>
				<Component.ReplyUI id={commentGroup.post_data.post_id} />
				{comments.length > 0 ?
					<div>
						<ul className='flex flex-col'>
							{createComments(comments)}
						</ul>
						{commentCount > comments.length ?
							<></> :
							<button
								className='p-2 border-[2px] border-black self-center'
								onClick={() => { setCommentCount(prev => prev + 10); }}
							>
								GET MORE
							</button>}
					</div>
					:
					<div>NO COMMENTS YET</div>
				}
			</div>
			:
			<></>
		)
	);
}

export default CommentPage;
