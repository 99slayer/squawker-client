import React, { useContext, useEffect, useRef, useState } from 'react';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import { formatDate } from '../../util';
import { comment, like, post } from '../../api/api';
import { MainContext } from '../page-components/page-main/MainTemplate';
import {
	MainContextInterface,
	PostInterface,
	ReturnDataInterface
} from '../../types';
import { clearUpload } from '../../supabase';
import Component from '../Component';

function Post({ data }: { data: PostInterface | null }) {
	const location = useLocation();
	const navigate: NavigateFunction = useNavigate();
	const textRef = useRef<HTMLTextAreaElement | null>(null);
	const [openEdit, setOpenEdit] = useState<boolean>(false);
	const [editText, setEditText] = useState<string | null>(null);
	const [liked, setLiked] = useState<boolean>(false);
	const [likeCount, setLikeCount] = useState<number | undefined>(0);
	const [deleted, setDeleted] = useState<boolean>(false);
	const [validationErrors, setValidationErrors] = useState<Record<string, string[]> | null>(null);

	useEffect(() => {
		if (!data) return;

		setLiked(Boolean(data.liked));
		setLikeCount(data.like_count);

		return () => {
			setDeleted(false);
		};
	}, [data]);

	useEffect(() => {
		setValidationErrors(null);
	}, [openEdit]);

	if ((data && !data.post_data) || deleted) {
		return (
			<div
				className="my-2 p-2 rounded-lg bg-black-eerie-black"
			>
				Post was removed by user.
			</div>
		);
	}

	return (
		(data ?
			<article
				className="my-2 p-2 flex flex-col gap-2 rounded-lg bg-black-eerie-black cursor-pointer break-all"
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
					<div className='min-w-[40px]'>
						{data.post.user.pfp ?
							<img
								className='p-[2px] size-[40px] rounded-full object-cover'
								src={data.post.user.pfp}
							/>
							:
							<span
								className="material-symbols-outlined filled text-[40px] rounded-full"
							>
								account_circle
							</span>
						}
					</div>
					<div className="flex-1 flex flex-col">
						<div className="flex items-center">
							<div
								className='flex items-center gap-2 gap-y-0 flex-wrap'
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
								<h3
									className='max-w-[40%] font-semibold overflow-hidden text-nowrap text-ellipsis'
								>
									{data.post.user.nickname}
								</h3>
								<p
									className='max-w-[40%] text-sm overflow-hidden text-nowrap text-ellipsis'
								>
									{`@${data.post.user.username}`}
								</p>
								<p className='text-xs'>{`${formatDate(data.post_data.timestamp)}`}</p>
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
								className='mt-2 flex flex-col relative'
								onSubmit={async (e) => {
									setValidationErrors(null);

									if (data.post_type === 'Post') {
										const res: Response = await post.updatePost(e, data._id);
										try {
											const text: string = await res.text();
											const data: ReturnDataInterface = JSON.parse(text);
											if (data.errors) setValidationErrors(data.errors);
										} catch {
											if (res.ok) {
												setEditText(textRef.current!.value);
												setOpenEdit(false);
											}
										}
									} else if (data.post_type === 'Comment') {
										const res: Response = await comment.updateComment(e, data._id);
										try {
											const text: string = await res.text();
											const data: ReturnDataInterface = JSON.parse(text);
											if (data.errors) setValidationErrors(data.errors);
										} catch {
											if (res.ok) {
												setEditText(textRef.current!.value);
												setOpenEdit(false);
											}
										}
									}
								}}
							>
								<div>
									<textarea
										className='w-[100%] min-h-24 p-2 pr-[44px] resize-none rounded-lg bg-gray-outer-space'
										ref={textRef}
										name='text'
										defaultValue={editText ?? data.post.text}
										autoFocus
										onClick={(e) => e.stopPropagation()}
									/>
									<Component.ValidationErrors errors={validationErrors?.textErrors} />
								</div>
								<button
									className='mt-1 ml-auto px-4 py-1 rounded-full font-semibold hover:text-white hover:bg-gray-onyx'
									onClick={(e) => e.stopPropagation()}
								>
									SAVE
								</button>
								<button
									className='size-6 flex justify-center items-center absolute right-2 top-2 rounded-sm font-semibold hover:text-white hover:bg-red-500'
									onClick={(e) => {
										e.stopPropagation();
										setOpenEdit(false);
									}}
								>X</button>
							</form>
							:
							<div>
								{data.post.text ?
									<p className='mt-2 mb-2'>
										{editText ?? data.post.text}
									</p>
									:
									<></>}
							</div>
						}
						{data.post.post_image ?
							<img
								className='mr-[44px] mb-2 rounded-lg'
								src={data.post.post_image}
							/>
							: <></>
						}
						{data.quoted_post && !data.quoted_post.post_data ?
							<div
								className="my-2 p-2 rounded-lg bg-gray-onyx"
								onClick={(e) => e.stopPropagation()}
							>
								Post was removed by user.
							</div>
							:
							<></>
						}
						{data.quoted_post && data.quoted_post.post_data ?
							<article
								className='max-w-[100%] mb-2 p-2 flex gap-2 rounded-lg bg-gray-onyx'
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
								<div className='min-w-[40px] rounded-full'>
									{data.quoted_post.post.user.pfp ?
										<img
											className='p-[2px] size-[40px] rounded-full object-cover'
											src={data.quoted_post.post.user.pfp}
										/>
										:
										<span
											className="material-symbols-outlined filled text-[40px] rounded-full"
										>
											account_circle
										</span>
									}
								</div>
								<div className='flex flex-col gap-2'>
									<div className='flex items-center gap-2 gap-y-0 flex-wrap'>
										<h3
											className='max-w-[30%] font-semibold overflow-hidden text-nowrap text-ellipsis'
										>
											{data.quoted_post.post.user.nickname}
										</h3>
										<p
											className='max-w-[30%] text-sm overflow-hidden text-nowrap text-ellipsis'
										>
											{`@${data.quoted_post.post.user.username}`}
										</p>
										<p
											className='text-xs'
										>
											{`${formatDate(data.quoted_post.post_data.timestamp)}`}
										</p>
									</div>
									<div className='flex gap-4 justify-center items-start'>
										{data.quoted_post.post.post_image ?
											<div>
												<img
													className='flex-1 rounded-lg'
													src={data.quoted_post.post.post_image}
												/>
											</div>
											: <></>
										}
										{data.quoted_post.post.text ?
											<p className='flex-2 min-w-[50%]'>{data.quoted_post.post.text}</p>
											: <></>
										}
									</div>
								</div>
							</article>
							:
							<></>
						}
						<div className='flex relative'>
							<div
								className='px-2 py-1 flex items-center gap-1 rounded-xl hover:bg-gray-onyx'
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
								className='px-2 py-1 flex items-center gap-1 rounded-xl hover:bg-gray-onyx'
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
				className='self-start ml-auto px-1 flex justify-center relative rounded-lg z-10 break-normal hover:bg-gray-onyx'
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
						className='p-2 flex flex-col gap-2 absolute top-7 rounded-xl bg-black-night'
						onMouseLeave={() => {
							setOpen(false);
						}}
					>
						{!data?.post_data.repost && data.post.text ?
							<button
								className='px-4 rounded-full hover:text-white bg-gray-onyx hover:bg-gray-outer-space'
								onClick={() => {
									setOpenEdit(true);
								}}
							>Edit</button>
							: <></>
						}
						<button
							className='px-4 rounded-full hover:text-white bg-gray-onyx hover:bg-gray-outer-space'
							onClick={async (e) => {
								e.stopPropagation();
								if (type === 'Post') {
									const res: Response = await post.deletePost(e, data._id);

									if (res.ok) setDeleted(true);
									if (!data.post_data.repost && data.post.post_image) await clearUpload(data.post.post_image);
								} else if (type === 'Comment') {
									const res: Response = await comment.deleteComment(e, data._id);

									if (res.ok) setDeleted(true);
									if (!data.post_data.repost && data.post.post_image) await clearUpload(data.post.post_image);
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
				className='px-2 py-1 flex items-center gap-1 relative rounded-xl hover:bg-gray-onyx'
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
					className='p-2 flex flex-col gap-2 absolute top-8 rounded-xl bg-black-night'
					onMouseLeave={() => {
						setOpen(false);
					}}
				>
					<button
						className='px-4 rounded-full hover:text-white bg-gray-onyx hover:bg-gray-outer-space'
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
						Repost
					</button>
					<button
						className='px-4 rounded-full hover:text-white bg-gray-onyx hover:bg-gray-outer-space'
						type='button'
						onClick={(e) => {
							e.stopPropagation();
							setPostId(postId);
							toggle(postRef);
						}}
					>
						Quote
					</button>
				</div>
				: <></>
			}
		</div>
	);
}

export default Post;
