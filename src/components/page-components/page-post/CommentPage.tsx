import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { comment } from '../../../api/api';
import { PostInterface } from '../../../types';
import Component from '../../Component';
import useFetchComment from '../../../hooks/useFetchComment';
import useFetchReplies from '../../../hooks/useFetchReplies';

function CommentPage() {
	const { id }: { id: string } = useOutletContext();
	const [commentCount, setCommentCount] = useState<number>(0);
	const { commentGroup, postId } = useFetchComment(id);
	const { comments } = useFetchReplies(postId, commentCount, 'Comment');

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
