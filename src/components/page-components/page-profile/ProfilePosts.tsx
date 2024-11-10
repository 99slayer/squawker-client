import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import useFetchPosts from '../../../hooks/useFetchPosts';
import Spinner from '../../Spinner';
import Err from '../../Err';
import { createPostList } from '../../componentUtil';

function ProfilePosts() {
	const { state } = useLocation();
	const [postCount, setPostCount] = useState<number>(0);
	const {
		posts,
		loading,
		postsError,
		refetch
	} = useFetchPosts(state.username, postCount);

	return (postsError ?
		<Err refetch={refetch} /> :
		<div className='flex flex-col'>
			<ul className='pt-2 flex flex-col'>
				{createPostList(posts, 'Post')}
			</ul>
			{loading ?
				<Spinner /> :
				<div className='self-center'>
					{postCount !== posts.length ?
						<button
							className='p-2 border-[2px] border-black'
							onClick={() => setPostCount(posts.length)}
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

export default ProfilePosts;
