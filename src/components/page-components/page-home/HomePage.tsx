import { useCallback, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { post } from '../../../api/api';
import { PostInterface } from '../../../types';
import Component from '../../Component';

function HomePage() {
	const [posts, setPosts] = useState<PostInterface[]>([]);
	const [postCount, setPostCount] = useState<number>(0);

	const pullTimeline = useCallback(async () => {
		const res: Response = await post
			.getTimeline(null, postCount);
		const data = await res.json();
		setPosts(prev => {
			if (prev[0]?._id === data[0]?._id) return prev;
			return [...prev, ...data];
		});
	}, [postCount]);

	useEffect(() => {
		pullTimeline();
	}, [pullTimeline]);

	function createTimeline(postArr: PostInterface[]): JSX.Element[] | [] {
		const postElements: JSX.Element[] = [];
		postArr.map((post) => {
			postElements.push(
				<li key={uuid()}><Component.Post data={post} /></li>
			);
		});

		return postElements;
	}

	return (
		(posts.length > 0 ?
			<div
				className='flex flex-col'
			>
				<ul className='flex flex-col'>
					{createTimeline(posts)}
				</ul>
				{postCount > posts.length ?
					<></> :
					<button
						className='p-2 border-[2px] border-black self-center'
						onClick={() => setPostCount(prev => prev + 10)}
					>
						GET MORE
					</button>}
			</div>
			:
			<div>
				NO POSTS
			</div>
		)
	);
}

export default HomePage;
