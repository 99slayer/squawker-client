import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { PostInterface } from '../../../types';
import { comment } from '../../../api/api';
import Component from '../../Component';

function ProfileReplies() {
	const { state } = useLocation();
	const [commentGroups, setCommentGroups] = useState<PostInterface[]>([]);
	const [commentCount, setCommentCount] = useState<number>(0);

	const pullUserComments = useCallback(async () => {
		if (!state) return;
		const res: Response = await comment
			.getUserComments(null, state.username, commentCount);
		const data: PostInterface[] = await res.json();
		setCommentGroups(prev => {
			if (prev[0]?._id === data[0]?._id) return prev;
			return [...prev, ...data];
		});
	}, [state, commentCount]);

	useEffect(() => {
		pullUserComments();
	}, [pullUserComments]);

	function createComments(commentArr: PostInterface[]): JSX.Element[] {
		const commentElements: JSX.Element[] = [];
		commentArr.map((commentGroup) => {
			commentElements.push(
				<li key={uuid()}>
					<div>
						<Component.CommentDisplayGroup
							commentGroup={commentGroup}
						/>
					</div>
				</li>
			);
		});

		return commentElements;
	}

	return (
		(commentGroups.length > 0 ?
			<div
				className='flex flex-col'
			>
				<ul className='pt-2 flex flex-col gap-4'>
					{createComments(commentGroups)}
				</ul>
				{commentCount > commentGroups.length ?
					<></> :
					<button
						className='p-2 border-[2px] border-black self-center'
						onClick={() => { setCommentCount(prev => prev + 10); }}
					>
						GET MORE
					</button>
				}
			</div>
			:
			<div>THIS USER HAS NO REPLIES</div>
		)
	);
}

export default ProfileReplies;
