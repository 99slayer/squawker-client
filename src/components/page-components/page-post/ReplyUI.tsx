import { useState } from 'react';
import { upload } from '../../../supabase';
import hook from '../../../hooks/hooks';
import Component from '../../Component';

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
	} = hook.useCreatePost();

	const clearForm = () => {
		textRef.current!.value = '';
		fileRef.current!.value = '';
		setImage(null);
		setUpload({ type: null, data: null, folder: null });
	};

	return (
		(id ?
			<div
				className='mt-2 p-2 rounded-lg bg-black-eerie-black'
			>
				<form
					className='flex flex-col items-stretch gap-2'
					onSubmit={async (e) => {
						e.preventDefault();
						const success: boolean = await handleCreatePost(e, id, 'Comment');
						if (success) clearForm();
						setDisabled(false);
					}}
				>
					<div className='flex flex-col gap-2'>
						<textarea
							className='w-[100%] min-h-24 p-2 resize-none rounded-lg bg-gray-outer-space'
							ref={textRef}
							name='text'
							placeholder='What&apos;s up?'
						/>
						<Component.ValidationErrors errors={validationErrors?.textErrors} />
						<Component.ValidationErrors errors={validationErrors?.imageErrors} />
					</div>
					{image ?
						<div
							className='self-center relative'
						>
							<img
								className='mt-1 mb-2 rounded-lg'
								src={image}
							/>
							<button
								className='size-5 flex justify-center items-center absolute top-3 right-2 rounded-full font-semibold hover:text-white bg-red-500'
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
							className="p-1 flex items-center justify-center rounded-md bg-gray-onyx hover:text-white"
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
							className="ml-auto px-4 py-1 self-center rounded-full hover:text-white hover:bg-gray-onyx font-semibold"
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
							REPLY
						</button>
					</div>
				</form>
			</div>
			: <></>
		)
	);
}

export default ReplyUI;