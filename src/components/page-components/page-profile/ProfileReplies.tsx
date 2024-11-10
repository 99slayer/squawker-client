import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import useFetchComments from '../../../hooks/useFetchComments';
import Err from '../../Err';
import Spinner from '../../Spinner';
import { createPostList } from '../../componentUtil';

function ProfileReplies() {
	const { state } = useLocation();
	const [commentCount, setCommentCount] = useState<number>(0);
	const {
		commentGroups,
		loading,
		commentsError,
		refetch
	} = useFetchComments(state.username, commentCount);

	return (commentsError ?
		<Err refetch={refetch} /> :
		<div className='flex flex-col'>
			<ul className='pt-2 flex flex-col gap-4'>
				{createPostList(commentGroups, 'CommentGroup')}
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
