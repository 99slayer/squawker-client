import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { PostInterface } from '../../../types';
import Component from '../../Component';
import useFetchComment from '../../../hooks/useFetchComment';
import useFetchReplies from '../../../hooks/useFetchReplies';
import Spinner from '../../Spinner';
import Err from '../../Err';

function CommentPage() {
	const { id }: { id: string } = useOutletContext();
	const [commentCount, setCommentCount] = useState<number>(0);
	const {
		commentGroup,
		loading,
		commentError,
		refetch,
		postId
	} = useFetchComment(id);
	const {
		comments,
		repliesLoading,
		repliesError,
		repliesRefetch
	} = useFetchReplies(postId, commentCount, 'Comment');

	function createComments(commentArr: PostInterface[]): JSX.Element[] {
		const commentElements: JSX.Element[] = [];
		commentArr.map((cmnt) => {
			commentElements.push(
				<li key={uuid()}><Component.Post data={cmnt} /></li>
			);
		});

		return commentElements;
	}

	return (loading ?
		<Spinner /> :
		<div>
			{commentError ?
				<Err refetch={refetch} /> :
				<div className='flex flex-col'>
					<Component.CommentDisplayGroup
						commentGroup={commentGroup!}
					/>
					<Component.ReplyUI id={commentGroup!.post_data.post_id} />
					{repliesError ?
						<Err refetch={repliesRefetch} /> :
						<div className='flex flex-col'>
							<ul className='flex flex-col'>
								{createComments(comments)}
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

export default CommentPage;
