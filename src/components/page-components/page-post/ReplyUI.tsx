import { useState } from 'react';
import { upload } from '../../../supabase';
import { createValidationErrors as cve } from '../../componentUtil';
import useCreatePost from '../../../hooks/useCreatePost';

function ReplyUI({ id }: { id: string | null }) {
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
	const {
		handleCreatePost,
		textRef,
		fileRef,
		validationErrors,
		setValidationErrors
	} = useCreatePost();

	const clearForm = () => {
		textRef.current!.value = '';
		fileRef.current!.value = '';
		setImage(null);
		setUpload({ type: null, data: null, folder: null });
	};

	return (
		(id ?
			<div>
				<form
					className='my-2 flex flex-col items-stretch gap-2'
					onSubmit={async (e) => {
						e.preventDefault();
						const success: boolean = await handleCreatePost(e, id, 'Comment');
						if (success) clearForm();
						setDisabled(false);
					}}
				>
					<div>
						<textarea
							className='w-[100%] min-h-24 p-2 resize-none rounded-xl border-[2px] border-black'
							ref={textRef}
							name='text'
							placeholder='whats up?'
						/>
						{validationErrors?.textErrors ?
							<ul>
								{cve(validationErrors.textErrors)}
							</ul>
							: <></>
						}
						{validationErrors?.imageErrors ?
							<ul>
								{cve(validationErrors.imageErrors)}
							</ul>
							: <></>
						}
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
					<input
						type='hidden'
						ref={fileRef}
						name='image'
						accept='image/jpeg image/png'
					/>
					<div
						className='flex'
					>
						<button
							className="p-1 flex items-center justify-center border-[2px] border-black rounded-full"
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
							<span className="p-1 material-symbols-outlined">
								image
							</span>
						</button>
						<button
							className="ml-auto p-1 border-[2px] border-black"
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
							Reply
						</button>
					</div>
				</form>
			</div>
			: <></>
		)
	);
}

export default ReplyUI;