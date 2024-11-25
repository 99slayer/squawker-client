import React, {
	forwardRef,
	useContext,
	useImperativeHandle,
	useRef,
	useState
} from 'react';
import {
	AppContextInterface,
	FormEvent
} from '../../types';
import { formatDate } from '../../util';
import { upload } from '../../supabase';
import { AppContext } from '../../App';
import hook from '../../hooks/hooks';
import Component from '../Component';

type Props = {
	toggle: (ref: React.RefObject<HTMLDialogElement>) => void;
	postId: string | null;
	setPostId: React.Dispatch<React.SetStateAction<string | null>>
}

const PostModal = forwardRef<HTMLDialogElement, Props>(
	({ toggle, postId, setPostId }, forwardedRef) => {
		useImperativeHandle(forwardedRef, () => ref.current as HTMLDialogElement);
		const { appPfp } = useContext(AppContext) as AppContextInterface;
		const ref = useRef<HTMLDialogElement>(null);
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
		const [disabled, setDisabled] = useState<boolean>(false);
		const [quotedPost] = hook.useFetchPost(postId as string);
		const {
			handleCreatePost,
			textRef,
			fileRef,
			validationErrors,
			setValidationErrors
		} = hook.useCreatePost();

		return (
			<dialog
				className='w-[500px] max-w-[500px] max-h-[75%] mx-auto mt-[140px] p-2 border-[3px] border-gray-outer-space rounded-lg text-white/50 bg-black-eerie-black'
				ref={ref}
				onClose={() => {
					setPostId(null);
					setImage(null);
					setUpload({ type: null, data: null, folder: null });
					setValidationErrors(null);
				}}
			>
				<div className='flex flex-col gap-2'>
					<button
						className='self-end size-5 flex justify-center items-center rounded-sm font-semibold hover:text-white hover:bg-red-500'
						onClick={() => toggle(ref)}
					>
						X
					</button>
					<form
						className='flex flex-col gap-2'
						onSubmit={async (e: FormEvent) => {
							e.preventDefault();
							const success: boolean = await handleCreatePost(e, postId, 'Post');
							if (success) toggle(ref);
							setDisabled(false);
						}}
					>
						<div className='flex items-stretch gap-2'>
							{appPfp ?
								<div
									className='rounded-full'
								>
									<img className='p-1 size-[44px] rounded-full object-cover' src={appPfp} />
								</div>
								:
								<span className="text-[44px] material-symbols-outlined filled rounded-full">
									account_circle
								</span>
							}
							<div className='flex-1 flex flex-col gap-2'>
								<textarea
									className='w-[100%] min-h-24 p-2 resize-none rounded-lg bg-gray-outer-space'
									ref={textRef}
									name='text'
									placeholder='What&apos;s up?'
									maxLength={500}
								/>
								<Component.ValidationErrors errors={validationErrors?.textErrors} />
								<Component.ValidationErrors errors={validationErrors?.imageErrors} />
							</div>
						</div>
						{image ?
							<div
								className='self-center relative'
							>
								<img
									className='rounded-lg'
									src={image}
								/>
								<button
									className='size-5 flex justify-center items-center absolute top-2 right-2 rounded-full font-semibold hover:text-white bg-red-500'
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
								className='p-2 flex items-start gap-2 rounded-lg bg-gray-outer-space'
							>

								{quotedPost.post.user.pfp ?
									<img
										className='p-1 size-[44px] rounded-full object-cover'
										src={quotedPost.post.user.pfp}
									/>
									:
									<span className="text-[44px] material-symbols-outlined filled">
										account_circle
									</span>
								}

								<div
									className='flex flex-col gap-2'
								>
									<div
										className='flex gap-2  gap-y-0 flex-wrap'
									>
										<h3
											className='max-w-[40%] font-semibold overflow-hidden text-nowrap text-ellipsis'
										>
											{quotedPost.post.user.nickname}
										</h3>
										<p
											className='max-w-[40%] text-sm overflow-hidden text-nowrap text-ellipsis'
										>
											{`@${quotedPost.post.user.username}`}
										</p>
										<p
											className='text-xs'
										>
											{`${formatDate(quotedPost.post_data.timestamp)}`}
										</p>
									</div>
									<div
										className='flex items-start gap-2'
									>
										{quotedPost.post.post_image ?
											<img
												className='size-[100px] rounded-lg object-cover'
												src={quotedPost.post.post_image}
											/>
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
								className="p-1 flex items-center justify-center rounded-md hover:text-white bg-gray-onyx hover:bg-gray-outer-space"
								type='button'
								onClick={(e) => {
									e.preventDefault();
									setValidationErrors(null);
									const input: HTMLInputElement = document.createElement('input');
									input.type = 'file';
									input.name = 'image';
									input.accept = 'image/jpeg, image/png';
									input.onchange = () => {
										if (input.files === null) return;

										const file: File = Array.from(input.files)[0];
										const limit = 1000000 * 2;
										if (file.size > limit) {
											setValidationErrors({
												imageErrors: [`File size cannot exceed ${limit / 1000000}MB.`]
											});
											throw new Error('to big lmao');
										}

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
								<span className="material-symbols-outlined">
									image
								</span>
							</button>
							<button
								className="ml-auto px-4 py-1 self-center rounded-full hover:text-white hover:bg-gray-outer-space font-semibold"
								type='button'
								disabled={disabled}
								onClick={async () => {
									setDisabled(true);

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
