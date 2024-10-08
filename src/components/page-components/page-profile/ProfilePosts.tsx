import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { PostInterface } from '../../../types';
import { post } from '../../../api/api';
import Component from '../../Component';

function ProfilePosts() {
	const { state } = useLocation();
	const [posts, setPosts] = useState<PostInterface[]>([]);
	const [postCount, setPostCount] = useState<number>(0);

	const pullUserPosts = useCallback(async () => {
		if (!state) return;
		const res: Response = await post
			.getUserPosts(null, state.username, postCount);
		const data: PostInterface[] = await res.json();
		setPosts(prev => {
			if (prev[0]?._id === data[0]?._id) return prev;
			return [...prev, ...data];
		});
	}, [state, postCount]);

	useEffect(() => {
		pullUserPosts();
	}, [pullUserPosts]);

	function createPosts(postArr: PostInterface[]): JSX.Element[] {
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
				<ul className='pt-2 flex flex-col'>
					{createPosts(posts)}
				</ul>
				{postCount > posts.length ?
					<></> :
					<button
						className='p-2 border-[2px] border-black self-center'
						onClick={() => {
							setPostCount(prev => prev + 10);
						}}
					>
						GET MORE
					</button>
				}
			</div>
			:
			<div>THIS USER HAS NO POSTS</div>
		)
	);
}

export default ProfilePosts;
