import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import hook from '../../../hooks/hooks';
import { createPostList } from '../../componentUtil';
import Component from '../../Component';

function ProfileReplies() {
	const { state } = useLocation();
	const [commentCount, setCommentCount] = useState<number>(0);
	const {
		commentGroups,
		loading,
		commentsError,
		refetch
	} = hook.useFetchComments(state.username, commentCount);

	return (commentsError ?
		<Component.Err refetch={refetch} /> :
		<div className='flex flex-col'>
			<ul className='pt-2 flex flex-col gap-4'>
				{createPostList(commentGroups, 'CommentGroup')}
			</ul>
			{loading ?
				<Component.Spinner /> :
				<div className='self-center'>
					{commentGroups.length === 0 ?
						<Component.Empty text={'User has no replies.'} /> :
						<div>
							{commentCount !== commentGroups.length ?
								<button
									className='px-5 py-1 rounded-full hover:text-white hover:bg-gray-onyx font-semibold'
									onClick={() => setCommentCount(commentGroups.length)}
								>
									GET MORE
								</button>
								: <></>
							}
						</div>}
				</div>
			}
		</div>
	);
}

export default ProfileReplies;
