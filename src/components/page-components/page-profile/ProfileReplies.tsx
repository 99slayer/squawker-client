import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { PostInterface } from '../../../types';
import Component from '../../Component';
import useFetchComments from '../../../hooks/useFetchComments';
import Err from '../../Err';
import Spinner from '../../Spinner';

function ProfileReplies() {
	const { state } = useLocation();
	const [commentCount, setCommentCount] = useState<number>(0);
	const {
		commentGroups,
		loading,
		commentsError,
		refetch
	} = useFetchComments(state.username, commentCount);

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

	return (commentsError ?
		<Err refetch={refetch} /> :
		<div className='flex flex-col'>
			<ul className='pt-2 flex flex-col gap-4'>
				{createComments(commentGroups)}
			</ul>
			{loading ?
				<Spinner /> :
				<div className='self-center'>
					{commentCount !== commentGroups.length ?
						<button
							className='p-2 border-[2px] border-black'
							onClick={() => setCommentCount(commentGroups.length)}
						>
							GET MORE
						</button>
						: <></>
					}
				</div>
			}
		</div>
	);
}

export default ProfileReplies;
