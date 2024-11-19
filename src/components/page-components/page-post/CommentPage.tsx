import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Component from '../../Component';
import hook from '../../../hooks/hooks';
import { createPostList } from '../../componentUtil';

function CommentPage() {
	const { id }: { id: string } = useOutletContext();
	const [commentCount, setCommentCount] = useState<number>(0);
	const {
		commentGroup,
		loading,
		commentError,
		refetch,
		postId
	} = hook.useFetchComment(id);
	const {
		comments,
		repliesLoading,
		repliesError,
		repliesRefetch
	} = hook.useFetchReplies(postId, commentCount, 'Comment');

	return (loading ?
		<Component.Spinner /> :
		<div>
			{commentError ?
				<Component.Err refetch={refetch} /> :
				<div className='flex flex-col'>
					<Component.CommentDisplayGroup
						commentGroup={commentGroup!}
					/>
					<Component.ReplyUI id={commentGroup!.post_data.post_id} />
					{repliesError ?
						<Component.Err refetch={repliesRefetch} /> :
						<div className='mt-2 flex flex-col'>
							<ul className='flex flex-col'>
								{createPostList(comments, 'Post')}
							</ul>
							{repliesLoading ?
								<Component.Spinner /> :
								<div className='self-center'>
									{comments.length === 0 ?
										<Component.Empty text={'This post has no comments.'} /> :
										<div>
											{commentCount !== comments.length ?
												<button
													className='px-5 py-1 rounded-full hover:text-white hover:bg-gray-onyx font-semibold'
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
			}
		</div>
	);
}

export default CommentPage;
