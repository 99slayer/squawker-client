import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { comment } from '../../../api/api';

function ReplyUI({ id }: { id: string | null }) {
	const navigate = useNavigate();
	const ref = useRef<HTMLInputElement>(null);

	return (
		(id ?
			<div>
				<form
					className='my-2 flex items-center gap-2'
					onSubmit={async (e) => {
						const res: Response = await comment.createComment(e, id);
						const data: { _id: string } = await res.json();

						if (res.ok && data) {
							ref.current!.value = '';
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
					<input
						className="w-[100%] p-1 border-[2px] border-black"
						type="text"
						name="text"
						ref={ref}
					/>
					<button
						className="ml-auto p-1 border-[2px] border-black"
					>
						Reply
					</button>
				</form>
			</div>
			: <></>
		)
	);
}

export default ReplyUI;