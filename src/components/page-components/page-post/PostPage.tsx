import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Component from '../../Component';
import useFetchPost from '../../../hooks/useFetchPost';
import useFetchReplies from '../../../hooks/useFetchReplies';
import Err from '../../Err';
import Spinner from '../../Spinner';
import { createPostList } from '../../componentUtil';

function PostPage() {
	const { id }: { id: string } = useOutletContext();
	const [commentCount, setCommentCount] = useState<number>(0);
	const [
		currentPost,
		loading,
		postError,
		postRefetch,
		postId
	] = useFetchPost(id);
	const {
		comments,
		repliesLoading,
		repliesError,
		repliesRefetch
	} = useFetchReplies(postId, commentCount, 'Post');

	return (loading ?
		<Spinner /> :
		<div>
			{postError ?
				<Err refetch={postRefetch} /> :
				<div className='flex flex-col'>
					<Component.Post data={currentPost} />
					<Component.ReplyUI id={currentPost!.post_data.post_id} />
					{repliesError ?
						<Err refetch={repliesRefetch} /> :
						<div className='flex flex-col'>
							<ul className='flex flex-col'>
								{createPostList(comments, 'Post')}
							</ul>
							{repliesLoading ?
								<Spinner /> :
								<div className='self-center'>
									{commentCount !== comments.length ?
										<button
											className='p-2 border-[2px] border-black'
											onClick={() => setCommentCount(comments.length)}
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
			}
		</div>
	);
}

export default PostPage;
