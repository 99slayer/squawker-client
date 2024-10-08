import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { post, comment } from '../../../api/api';
import { PostInterface } from '../../../types';
import Component from '../../Component';

function PostPage() {
	const { id }: { id: string } = useOutletContext();
	const navigate = useNavigate();
	const [currentPost, setCurrentPost] = useState<PostInterface | null>(null);
	const [comments, setComments] = useState<PostInterface[]>([]);
	const [commentCount, setCommentCount] = useState<number>(0);

	const pullPost = useCallback(async () => {
		if (!id) return;
		const res: Response = await post.getPost(null, id);
		if (!res.ok && res.status === 404) return navigate(-1);
		const data: PostInterface = await res.json();

		setCurrentPost(data);
	}, [id, navigate]);

	const pullComments = useCallback(async () => {
		if (!currentPost || currentPost.direct_comment_count === 0) return;
		const res: Response = await comment
			.getPostReplies(null, currentPost.post_data.post_id, commentCount);
		const data: PostInterface[] = await res.json();

		setComments(prev => {
			if (prev[0]?._id === data[0]?._id) return prev;
			return [...prev, ...data];
		});
	}, [currentPost, commentCount]);

	useEffect(() => {
		pullPost();
		return () => {
			setComments([]);
		};
	}, [pullPost]);

	useEffect(() => {
		pullComments();
	}, [pullComments]);

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
