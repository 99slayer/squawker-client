import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { comment } from '../../../api/api';
import { upload } from '../../../supabase';

function ReplyUI({ id }: { id: string | null }) {
	const navigate = useNavigate();
	const ref = useRef<HTMLTextAreaElement>(null);
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

	return (
		(id ?
			<div>
				<form
					className='my-2 flex flex-col items-stretch gap-2'
					onSubmit={async (e) => {
						e.preventDefault();

						const res: Response = await comment.createComment(e, id);
						const data: { _id: string } = await res.json();

						if (res.ok && data) {
							ref.current!.value = '';
							setImage(null);
							setUpload({ type: null, data: null, folder: null });
							navigate(
								`/main/status/comment/${data._id}`,
								{
									state: {
										id: data._id,
										post_type: 'Comment'
									}
								}
							);
						}
					}}
				>
					<textarea
						className='w-[100%] min-h-24 p-2 resize-none rounded-xl border-[2px] border-black'
						ref={ref}
						name='text'
						placeholder='whats up?'
					/>
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
							className="ml-auto p-1 border-[2px] border-black"
							onClick={async (e) => {
								e.preventDefault();

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