import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { PostInterface } from '../../../types';
import Component from '../../Component';
import useFetchTimeline from '../../../hooks/useFetchTimeline';
import Spinner from '../../Spinner';
import Err from '../../Err';

function HomePage() {
	const [postCount, setPostCount] = useState<number>(0);
	const {
		posts,
		loading,
		timelineError,
		refetch
	} = useFetchTimeline(postCount);

	function createTimeline(postArr: PostInterface[]): JSX.Element[] | [] {
		const postElements: JSX.Element[] = [];
		postArr.map((post) => {
			postElements.push(
				<li key={uuid()}><Component.Post data={post} /></li>
			);
		});

		return postElements;
	}

	return (timelineError ?
		<Err refetch={refetch} /> :
		<div
			className='flex flex-col'
		>
			<ul className='flex flex-col'>
				{createTimeline(posts)}
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
