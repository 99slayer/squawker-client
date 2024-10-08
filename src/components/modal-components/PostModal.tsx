import React, {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useRef,
	useState
} from 'react';
import { useNavigate } from 'react-router-dom';
import { post } from '../../api/api';
import { PostInterface } from '../../types';
import { formatDate } from '../../util';

type Props = {
	toggle: (ref: React.RefObject<HTMLDialogElement>) => void;
	postId: string | null;
	setPostId: React.Dispatch<React.SetStateAction<string | null>>
}

const PostModal = forwardRef<HTMLDialogElement, Props>(
	({ toggle, postId, setPostId }, forwardedRef) => {
		const navigate = useNavigate();
		const ref = useRef<HTMLDialogElement>(null);
		useImperativeHandle(forwardedRef, () => ref.current as HTMLDialogElement);
		const [quotedPost, setQuotedPost] = useState<PostInterface | null>(null);
		const textRef = useRef<HTMLTextAreaElement>(null);

		const pullQuotedPost = useCallback(async () => {
			if (!postId) {
				setQuotedPost(null);
				return;
			}
			const res: Response = await post.getPost(null, postId);
			const data: PostInterface = await res.json();
			setQuotedPost(data);
		}, [postId]);

		useEffect(() => {
			pullQuotedPost();
		}, [pullQuotedPost]);

		return (
			<dialog
				ref={ref}
				className='w-[500px] max-w-[500px] p-2 translate-y-[-200px] border-2 border-black bg-gray-300'
				onClose={() => {
					textRef.current!.value = '';
					setPostId(null);
				}}
			>
				<div className='flex flex-col gap-4'>
					<button
						onClick={() => { toggle(ref); }}
						className='size-5 flex justify-center items-center self-end bg-white'
					>
						X
					</button>
					<form
						className='flex flex-col gap-2'
						onSubmit={async (e) => {
							const res = await post.createPost(e, postId);
							const data = await res.json();
							navigate(
								`/main/status/post/${data._id}`,
								{
									state: {
										id: data._id,
										post_type: 'Post'
									}
								}
							);
							toggle(ref);
						}}
					>
						<div className='flex items-stretch gap-2'>
							<div className='flex'>
								<span className='size-10 rounded-full bg-black'></span>
							</div>
							<textarea
								className='w-[100%] min-h-24 p-2 resize-none rounded-xl'
								ref={textRef}
								name='text'
								placeholder='whats up?'
							/>
						</div>
						{quotedPost ?
							<div
								className='p-2 flex items-start gap-2 border-[2px] border-black bg-white'
							>
								<span className="min-w-6 min-h-6 rounded-full bg-black"></span>
								<div
									className='flex flex-col gap-2'
								>
									<div
										className='flex gap-2'
									>
										<h3 className='font-bold'>{quotedPost.post.user.nickname}</h3>
										<p>{`@${quotedPost.post.user.username}`}</p>
										<p>{`${formatDate(quotedPost.post_data.timestamp)}`}</p>
									</div>
									<p>{quotedPost.post.text}</p>
								</div>
							</div>
							: <></>
						}
						<div className='flex gap-2'>
							<button type='button' className='p-1 bg-white'>i.</button>
							<button type='button' className='p-1 bg-white'>o.</button>
							<button type='submit' className='ml-auto p-1 bg-white'>POST</button>
						</div>
					</form>
				</div>
			</dialog>
		);
	});

export default PostModal;
