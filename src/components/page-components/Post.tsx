import React, { useContext, useEffect, useRef, useState } from 'react';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import { formatDate } from '../../util';
import { comment, like, post } from '../../api/api';
import { MainContext } from './page-main/MainTemplate';
import { MainContextInterface, PostInterface } from '../../types';

function Post({ data }: { data: PostInterface | null }) {
	const location = useLocation();
	const navigate: NavigateFunction = useNavigate();
	const textRef = useRef<HTMLTextAreaElement | null>(null);
	const [openEdit, setOpenEdit] = useState<boolean>(false);
	const [editText, setEditText] = useState<string | null>(null);
	const [liked, setLiked] = useState<boolean>(false);
	const [likeCount, setLikeCount] = useState<number | undefined>(0);
	const [deleted, setDeleted] = useState<boolean>(false);

	useEffect(() => {
		if (!data) return;
		setLiked(Boolean(data.liked));
		setLikeCount(data.like_count);

		return () => {
			setDeleted(false);
		};
	}, [data]);

	if ((data && !data.post_data) || deleted) {
		return (
			<div
				className="mt-2 mb-2 p-2 flex flex-col gap-2 border-[2px] border-black cursor-pointer bg-white"
			>
				Post was removed by user.
			</div>
		);
	}

	return (
		(data ?
			<article
				className="mt-2 mb-2 p-2 flex flex-col gap-2 border-[2px] border-black cursor-pointer bg-white"
				onClick={() => {
					if (location.pathname === `/main/status/post/${data._id}`) return;
					if (data.post_type === 'Post') {
						navigate(
							`/main/status/post/${data._id}`,
							{ state: { id: data._id } }
						);
					} else {
						navigate(
							`/main/status/comment/${data._id}`,
							{ state: { id: data._id } }
						);
					}

				}}
			>
				{data.post_data.repost ?
					<p>{`${data.post_data.user.nickname} reposted`}</p>
					:
					<></>
				}
				<div className="flex items-start gap-2">
					<span className="min-w-6 min-h-6 rounded-full bg-black"></span>
					<div className="flex-1 flex flex-col">
						<div className="flex items-center">
							<div
								className='flex gap-2'
								onClick={(e) => {
									e.stopPropagation();
									navigate('/main/profile', {
										state: {
											username: (
												data.post_data.repost ?
													data.post.user.username :
													data.post_data.user.username
											)
										}
									});
								}}
							>
								<h3 className='font-bold'>{data.post.user.nickname}</h3>
								<p>{`@${data.post.user.username}`}</p>
								<p>{`${formatDate(data.post_data.timestamp)}`}</p>
							</div>
							{data.post_data.user.username === localStorage.getItem('username') ?
								<OptionsDropdown
									data={data}
									type={data.post_type}
									setOpenEdit={setOpenEdit}
									setDeleted={setDeleted}
								/>
								: <></>
							}
						</div>
						{data.post_data.repost && data.post_type === 'Comment' ?
							<div>
								<p>{`Replying to @${data.parent_post?.post_data.user.username}`}</p>
							</div>
							:
							<></>
						}
						{openEdit && !data.post_data.repost ?
							<form
								className='flex flex-col gap-2 relative'
								onSubmit={async (e) => {
									if (data.post_type === 'Post') {
										const res: Response = await post.updatePost(e, data._id);
										if (res.ok) setEditText(textRef.current!.value);
										setOpenEdit(false);
									} else if (data.post_type === 'Comment') {
										const res: Response = await comment.updateComment(e, data._id);
										if (res.ok) setEditText(textRef.current!.value);
										setOpenEdit(false);
									}
								}}
							>
								<textarea
									className='w-[100%] p-2 pr-[44px] border-[2px] border-black'
									ref={textRef}
									name='text'
									defaultValue={editText ?? data.post.text}
									autoFocus
									onClick={(e) => e.stopPropagation()}
								/>
								<button
									className='ml-auto px-2 border-[2px] border-black'
									onClick={(e) => e.stopPropagation()}
								>
									save edit
								</button>
								<button
									className='w-6 h-6 flex justify-center items-center absolute right-6 top-2 border-[2px] border-black'
									onClick={(e) => {
										e.stopPropagation();
										setOpenEdit(false);
									}}
								>X</button>
							</form>
							:
							<p
								className='mt-2 mb-2'
							>
								{editText ?? data.post.text}
							</p>
						}
						{data.quoted_post && !data.quoted_post.post_data ?
							<div
								className='flex justify-center p-2 border-[2px] border-black cursor-default'
								onClick={(e) => e.stopPropagation()}
							>
								Post was removed by user.
							</div>
							:
							<></>
						}
						{data.quoted_post && data.quoted_post.post_data ?
							<article
								className='flex flex-col gap-2 p-2 border-[2px] border-black'
								onClick={(e) => {
									e.stopPropagation();
									if (!data.quoted_post!._id) return;
									if (data.quoted_post?.post_type === 'Post') {
										navigate(
											`/main/status/post/${data.quoted_post!._id}`,
											{
												state: {
													id: data.quoted_post!._id,
													post_type: data.quoted_post!.post_type
												}
											}
										);
									} else {
										navigate(
											`/main/status/comment/${data.quoted_post!._id}`,
											{
												state: {
													id: data.quoted_post!._id,
													post_type: data.quoted_post!.post_type
												}
											}
										);
									}

								}}
							>
								<div className='flex items-start gap-2'>
									<span className='min-w-6 min-h-6 rounded-full bg-black'></span>
									<h3 className='font-bold'>{data.quoted_post.post.user.nickname}</h3>
									<p>{`@${data.quoted_post.post.user.username}`}</p>
									<p>{`${formatDate(data.quoted_post.post_data.timestamp)}`}</p>
								</div>
								<div className='flex gap-2'>
									<div>image</div>
									<p>{data.quoted_post.post.text}</p>
								</div>
							</article>
							:
							<></>
						}
						<div className='flex gap-2 relative'>
							<div
								className='p-[2px] flex items-center border-[1px] border-black'
							>
								<span className="material-symbols-outlined">
									mode_comment
								</span>
								{data.direct_comment_count}
							</div>
							<RepostDropdown
								repostCount={data.repost_count as number}
								postId={data.post_data.post_id}
								type={data.post_type}
							/>
							<div
								className='p-[2px] flex items-center border-[1px] border-black hover:bg-slate-300'
								onClick={async (e) => {
									e.stopPropagation();
									if (liked) {
										const res: Response = await like.deleteLike(null, data.post_data.post_id);
										if (res.ok) {
											setLiked(false);
											setLikeCount(prev => prev! - 1);
										}
									} else {
										const res: Response = await like.createLike(null, data.post_data.post_id);
										if (res.ok) {
											setLiked(true);
											setLikeCount(prev => prev! + 1);
										}
									}
								}}
							>
								{liked ?
									<span className="material-symbols-outlined filled">
										favorite
									</span>
									:
									<span className="material-symbols-outlined">
										favorite
									</span>
								}
								{likeCount}
							</div>
						</div>
					</div>
				</div>
			</article >
			:
			<></>
		)
	);
}

function OptionsDropdown(
	{
		data,
		type,
		setOpenEdit,
		setDeleted
	}:
		{
			data: PostInterface | null,
			type: string,
			setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>,
			setDeleted: React.Dispatch<React.SetStateAction<boolean>>
		}
) {
	const [open, setOpen] = useState<boolean>(false);

	return (
		(data ?
			<div
				className="ml-auto flex justify-center relative border-[2px] border-black"
				onClick={(e) => {
					e.stopPropagation();
					setOpen(!open);
				}}
			>
				<span className="material-symbols-outlined">
					more_horiz
				</span>
				{open ?
					<div
						className='flex flex-col absolute top-7 border-[2px] border-black bg-white'
						onMouseLeave={() => {
							setOpen(false);
						}}
					>
						{!data?.post_data.repost ?
							<button
								className='px-4 hover:bg-slate-300'
								onClick={() => {
									setOpenEdit(true);
								}}
							>Edit</button>
							: <></>
						}
						<button
							className='px-4 hover:bg-slate-300'
							onClick={async (e) => {
								e.stopPropagation();
								if (type === 'Post') {
									const res: Response = await post.deletePost(e, data._id);
									if (res.ok) setDeleted(true);
								} else if (type === 'Comment') {
									const res: Response = await comment.deleteComment(e, data._id);
									if (res.ok) setDeleted(true);
								}
							}}
						>Delete</button>
					</div>
					: <></>
				}
			</div>
			: <></>
		)
	);
}

function RepostDropdown({
	repostCount,
	postId,
	type
}: {
	repostCount: number,
	postId: string,
	type: 'Post' | 'Comment'
}) {
	const navigate = useNavigate();
	const {
		toggle,
		postRef,
		setPostId
	} = useContext(MainContext) as MainContextInterface;
	const [open, setOpen] = useState<boolean>(false);

	return (
		<div>
			<div
				className='p-[2px] flex items-center relative border-[1px] border-black'
				onClick={(e) => {
					e.stopPropagation();
					setOpen(!open);
				}}
			>
				<span className="material-symbols-outlined">
					autorenew
				</span>
				<p>{repostCount}</p>
			</div>
			{open ?
				<div
					className='flex flex-col absolute top-8 bg-white border-[2px] border-black'
					onMouseLeave={() => {
						setOpen(false);
					}}
				>
					<button
						className='px-4 hover:bg-gray-300'
						type='button'
						onClick={async (e) => {
							e.stopPropagation();

							if (type === 'Post') {
								const res: Response = await post.createRepost(e, postId);
								const data: { _id: string } = await res.json();
								if (res.ok) {
									navigate(
										`/main/status/post/${data._id}`,
										{
											state: {
												id: data._id,
												post_type: type
											}
										}
									);
								}
							} else {
								const res: Response = await comment.createRepost(e, postId);
								const data: { _id: string } = await res.json();
								if (res.ok) {
									navigate(
										`/main/status/comment/${data._id}`,
										{
											state: {
												id: data._id,
												post_type: type
											}
										}
									);
								}
							}
						}}
					>
						repost
					</button>
					<button
						className='px-4 hover:bg-gray-300'
						type='button'
						onClick={(e) => {
							e.stopPropagation();
							setPostId(postId);
							toggle(postRef);
						}}
					>
						quote
					</button>
				</div>
				: <></>
			}
		</div>
	);
}

export default Post;
