import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import hook from '../../../hooks/hooks';
import { createPostList } from '../../componentUtil';
import Component from '../../Component';

function ProfilePosts() {
	const { state } = useLocation();
	const [postCount, setPostCount] = useState<number>(0);
	const {
		posts,
		loading,
		postsError,
		refetch
	} = hook.useFetchPosts(state.username, postCount);

	return (postsError ?
		<Component.Err refetch={refetch} /> :
		<div className='flex flex-col'>
			<ul className='pt-2 flex flex-col'>
				{createPostList(posts, 'Post')}
			</ul>
			{loading ?
				<Component.Spinner /> :
				<div>
					{posts.length === 0 ?
						<Component.Empty text={'User has no posts.'} /> :
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
						</div>}
				</div>
			}
		</div>
	);
}

export default ProfilePosts;
