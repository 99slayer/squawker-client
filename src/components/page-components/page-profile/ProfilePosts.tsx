import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { PostInterface } from '../../../types';
import Component from '../../Component';
import useFetchPosts from '../../../hooks/useFetchPosts';
import Spinner from '../../Spinner';
import Err from '../../Err';

function ProfilePosts() {
	const { state } = useLocation();
	const [postCount, setPostCount] = useState<number>(0);
	const {
		posts,
		loading,
		postsError,
		refetch
	} = useFetchPosts(state.username, postCount);

	function createPosts(postArr: PostInterface[]): JSX.Element[] {
		const postElements: JSX.Element[] = [];
		postArr.map((post) => {
			postElements.push(
				<li key={uuid()}><Component.Post data={post} /></li>
			);
		});

		return postElements;
	}

	return (postsError ?
		<Err refetch={refetch} /> :
		<div className='flex flex-col'>
			<ul className='pt-2 flex flex-col'>
				{createPosts(posts)}
			</ul>
			{loading ?
				<Spinner /> :
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
	);
}

export default ProfilePosts;
