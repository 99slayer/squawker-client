import React, {
	forwardRef,
	useCallback,
	useContext,
	useEffect,
	useImperativeHandle,
	useRef,
	useState
} from 'react';
import { useNavigate } from 'react-router-dom';
import { post } from '../../api/api';
import { AppContextInterface, FormEvent, PostInterface } from '../../types';
import { formatDate } from '../../util';
import { upload } from '../../supabase';
import { AppContext } from '../../App';

type Props = {
	toggle: (ref: React.RefObject<HTMLDialogElement>) => void;
	postId: string | null;
	setPostId: React.Dispatch<React.SetStateAction<string | null>>
}

const PostModal = forwardRef<HTMLDialogElement, Props>(
	({ toggle, postId, setPostId }, forwardedRef) => {
		useImperativeHandle(forwardedRef, () => ref.current as HTMLDialogElement);
		const { appPfp } = useContext(AppContext) as AppContextInterface;
		const navigate = useNavigate();
		const ref = useRef<HTMLDialogElement>(null);
		const textRef = useRef<HTMLTextAreaElement>(null);
		const fileRef = useRef<HTMLInputElement>(null);
		const [image, setImage] = useState<string | null>(null);
		const [uploadData, setUpload] = useState<{
			type: string | null,
			data: ArrayBuffer | null,
			folder: string | null
		}>({
			type: null,
			data: null,
			folder: null
		});
		const [quotedPost, setQuotedPost] = useState<PostInterface | null>(null);

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
				className='w-[500px] max-w-[500px] p-2 translate-y-[-80px] border-2 border-black bg-gray-300'
				onClose={() => {
					textRef.current!.value = '';
					fileRef.current!.value = '';
					setPostId(null);
					setImage(null);
					setUpload({ type: null, data: null, folder: null });
				}}
			>
				<div className='flex flex-col gap-4'>
					<button
						onClick={() => toggle(ref)}
						className='size-5 flex justify-center items-center self-end bg-white'
					>
						X
					</button>
					<form
						className='flex flex-col gap-2'
						onSubmit={async (e: FormEvent) => {
							e.preventDefault();

							const res: Response = await post.createPost(e, postId);
							const data: { _id: string } = await res.json();

							if (res.ok && data) {
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
							}
						}}
					>
						<div className='flex items-stretch gap-2'>
							{appPfp ?
								<div
									className='rounded-full'
								>
									<img className='w-[44px] h-[44px] rounded-full object-cover' src={appPfp} />
								</div>
								:
								<span className="text-[44px] material-symbols-outlined filled rounded-full">
									account_circle
								</span>
							}
							<textarea
								className='w-[100%] min-h-24 p-2 resize-none rounded-xl'
								ref={textRef}
								name='text'
								placeholder='whats up?'
							/>
						</div>
						{image ?
							<div
								className='relative'
							>
								<img src={image} />
								<button
									className='w-8 h-8 absolute border-[2px] border-black rounded-full top-2 right-2 text-stone-100 bg-red-500 hover:border-white'
									type='button'
									onClick={() => {
										setImage(null);
										setUpload({ type: null, data: null, folder: null });
									}}
								>
									X
								</button>
							</div>
							: <></>
						}
						{quotedPost ?
							<div
								className='p-2 flex items-start gap-2 border-[2px] border-black bg-white'
							>
								<div
									className='w-6 h-6 rounded-full'
								>
									{quotedPost.post.user.pfp ?
										<img src={quotedPost.post.user.pfp} />
										:
										<span className="material-symbols-outlined">
											account_circle
										</span>
									}
								</div>
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
									<div
										className='flex gap-2'
									>
										{quotedPost.post.post_image ?
											<div
												className='w-32 h-32 flex items-center justify-center'
											>
												<img src={quotedPost.post.post_image} />
											</div>
											: <></>
										}
										<p>{quotedPost.post.text}</p>
									</div>
								</div>
							</div>
							: <></>
						}
						<input
							type='hidden'
							ref={fileRef}
							name='image'
							accept='image/jpeg image/png'
						/>
						<div className='flex gap-2'>
							<button
								className='flex items-center justify-center rounded-full bg-white'
								type='button'
								onClick={(e) => {
									e.preventDefault();
									const input: HTMLInputElement = document.createElement('input');
									input.type = 'file';
									input.name = 'image';
									input.accept = 'image/jpeg, image/png';
									input.onchange = () => {
										if (input.files === null) return;

										const file: File = Array.from(input.files)[0];
										const arrayReader: FileReader = new FileReader();
										const fileReader: FileReader = new FileReader();

										arrayReader.onload = (e) => {
											if (!e.target) return;
											setUpload({
												type: file.type,
												data: e.target.result as ArrayBuffer,
												folder: 'post'
											});
										};
										fileReader.onload = (e) => {
											if (!e.target) return;
											setImage(e.target.result as string);
										};

										arrayReader.readAsArrayBuffer(file);
										fileReader.readAsDataURL(file);
									};

									input.click();
								}}
							>
								<span className="p-1 material-symbols-outlined">
									image
								</span>
							</button>
							<button
								className='ml-auto p-1 bg-white'
								type='button'
								onClick={async () => {
									if (uploadData.type && uploadData.data) {
										const url: string | null = await upload(uploadData);
										if (!url) return;

										fileRef.current!.value = url;
									}

									fileRef.current?.form?.requestSubmit();
								}}
							>
								POST
							</button>
						</div>
					</form>
				</div>
			</dialog>
		);
	});

export default PostModal;
