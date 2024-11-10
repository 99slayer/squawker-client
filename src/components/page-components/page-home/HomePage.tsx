import { useState } from 'react';
import useFetchTimeline from '../../../hooks/useFetchTimeline';
import Spinner from '../../Spinner';
import Err from '../../Err';
import { createPostList } from '../../componentUtil';

function HomePage() {
	const [postCount, setPostCount] = useState<number>(0);
	const {
		posts,
		loading,
		timelineError,
		refetch
	} = useFetchTimeline(postCount);

	return (timelineError ?
		<Err refetch={refetch} /> :
		<div
			className='flex flex-col'
		>
			<ul className='flex flex-col'>
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

export default HomePage;
