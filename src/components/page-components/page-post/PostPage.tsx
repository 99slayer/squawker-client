import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { PostInterface } from '../../../types';
import Component from '../../Component';
import useFetchPost from '../../../hooks/useFetchPost';
import useFetchReplies from '../../../hooks/useFetchReplies';

function PostPage() {
	const { id }: { id: string } = useOutletContext();
	const [commentCount, setCommentCount] = useState<number>(0);
	const [currentPost] = useFetchPost(id);
	const { comments } = useFetchReplies(id, commentCount, 'Post');

	function createComments(commentArr: PostInterface[]): JSX.Element[] {
		const commentElements: JSX.Element[] = [];
		commentArr.map((cmnt) => {
			commentElements.push(
				<li key={uuid()}><Component.Post data={cmnt} /></li>
			);
		});

		return commentElements;
	}

	return (
		(currentPost ?
			<div className='flex flex-col'>
				<Component.Post data={currentPost} />
				<Component.ReplyUI id={currentPost.post_data.post_id} />
				{comments.length > 0 ?
					<div>
						<ul
							className='flex flex-col'
						>
							{createComments(comments)}
						</ul>
						{commentCount > comments.length ?
							<></> :
							<button
								className='p-2 border-[2px] border-black self-center'
								onClick={() => { setCommentCount(prev => prev + 2); }}
							>
								GET MORE
							</button>
						}
					</div>
					:
					<div>NO COMMENTS YET</div>
				}
			</div>
			:
			<></>
		)
	);
}

export default PostPage;
