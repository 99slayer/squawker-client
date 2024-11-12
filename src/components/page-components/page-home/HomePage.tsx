import { useState } from 'react';
import hook from '../../../hooks/hooks';
import { createPostList } from '../../componentUtil';
import Component from '../../Component';

function HomePage() {
	const [postCount, setPostCount] = useState<number>(0);
	const {
		posts,
		loading,
		timelineError,
		refetch
	} = hook.useFetchTimeline(postCount);

	return (timelineError ?
		<Component.Err refetch={refetch} /> :
		<div
			className='flex flex-col'
		>
			<ul className='flex flex-col'>
				{createPostList(posts, 'Post')}
			</ul>
			{loading ?
				<Component.Spinner /> :
				<div>
					{posts.length === 0 ?
						<Component.Empty
							text={`
								Your timeline is empty.
								Check out the connect page to find other users.
								`}
						/> :
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
			}
		</div>
	);
}

export default HomePage;
