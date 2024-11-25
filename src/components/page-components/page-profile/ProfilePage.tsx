import { useContext, useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { user } from '../../../api/api';
import { formatDate } from '../../../util';
import { AppContextInterface } from '../../../types';
import { AppContext } from '../../../App';
import { clearUpload, upload } from '../../../supabase';
import hook from '../../../hooks/hooks';
import Component from '../../Component';

function ProfilePage() {
	const { state } = useLocation();
	const navigate = useNavigate();
	const { appPfp } = useContext(AppContext) as AppContextInterface;
	const headerRef = useRef<HTMLInputElement>(null);
	const pfpRef = useRef<HTMLInputElement>(null);
	const {
		currentUser,
		loading,
		userError,
		refetch
	} = hook.useFetchUser(state.username);
	const {
		handleUpdateUser,
		returnData,
		validationErrors,
		setValidationErrors
	} = hook.useUpdateUser();
	const { isUser } = hook.useVerifyUser(state.username);
	const [following, setFollowing] = useState<boolean>(false);
	const [header, setHeader] = useState<string | null | undefined>(null);
	const [pfpHover, setPfpHover] = useState<boolean>(false);
	const [headerHover, setHeaderHover] = useState<boolean>(false);

	useEffect(() => {
		if (!currentUser) return;

		setFollowing(Boolean(currentUser.isFollowing));
		setHeader(currentUser.profile_header);
	}, [currentUser]);

	useEffect(() => {
		if (returnData?.header || returnData?.header === null) {
			setHeader(returnData.header);
		}
	}, [returnData]);

	return (loading ?
		<Component.Spinner /> :
		<div className='relative'>
			{userError ?
				<Component.Err refetch={refetch} /> :
				<div>
					<header className='p-2 max-[1020px]:pt-[45px] flex gap-4 sticky top-0 z-20 bg-black-night'>
						<button
							className='hover:text-white'
							type='button'
							onClick={() => {
								navigate(-1);
							}}
						>
							<span className="material-symbols-outlined">
								arrow_back
							</span>
						</button>
						<div>
							<h1
								className='overflow-hidden text-nowrap text-ellipsis'
							>
								{currentUser!.nickname}
							</h1>
							<p>{`${currentUser!.post_count} posts`}</p>
						</div>
					</header>
					<div className="relative">
						{validationErrors ?
							<div className='p-2 top-2 left-2 z-50 absolute'>
								<Component.ValidationErrors errors={validationErrors.pfpErrors} />
								<Component.ValidationErrors errors={validationErrors.headerErrors} />
							</div>
							: <></>
						}
						<form
							onSubmit={async (e) => {
								e.preventDefault();
								handleUpdateUser(e);
							}}
						>
							<input
								type='hidden'
								ref={pfpRef}
								name='pfp'
								accept='image/jpeg image/png'
							/>
							<span
								className={`absolute top-[140px] left-8 ${isUser ? 'cursor-pointer' : 'cursor-default'}`}
								onClick={(e) => {
									setValidationErrors(null);
									if (!isUser) return;
									e.preventDefault();
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
												pfpErrors: [`File size cannot exceed ${limit / 1000000}MB.`]
											});
											throw new Error('to big lmao');
										}

										const arrayReader: FileReader = new FileReader();
										arrayReader.onload = async (e) => {
											if (!e.target) return;
											const url: string | null = await upload({
												type: file.type,
												data: e.target.result as ArrayBuffer,
												folder: 'pfp'
											});
											if (!url) return;
											pfpRef.current!.value = url;
											pfpRef.current!.form?.requestSubmit();
										};
										arrayReader.readAsArrayBuffer(file);
									};
									input.click();
								}}
								onMouseOver={() => {
									setPfpHover(true);
								}}
								onMouseLeave={() => {
									setPfpHover(false);
								}}
							>
								<div
									className='flex items-center justify-center relative z-10'
								>
									<div className='flex rounded-full'>
										{(isUser && Boolean(appPfp)) || (!isUser && currentUser!.pfp) ?
											<img
												className='size-[120px] rounded-full object-cover'
												src={isUser ? appPfp as string : currentUser!.pfp}
											/>
											:
											<span
												className="material-symbols-outlined filled text-[120px] rounded-full bg-black-eerie-black"
											>
												account_circle
											</span>
										}
									</div>
									{pfpHover && appPfp && isUser ?
										<button
											className='size-5 flex justify-center items-center absolute top-1 right-1 rounded-full font-semibold hover:text-white bg-red-500'
											onClick={async (e) => {
												e.preventDefault();
												e.stopPropagation();
												await clearUpload(pfpRef.current!.value);
												pfpRef.current!.value = 'clear';
												pfpRef.current!.form?.requestSubmit();
											}}
										>X</button>
										: <></>
									}
								</div>
							</span>
						</form>
						<div className="flex flex-col items-stretch">
							<form
								onSubmit={async (e) => {
									e.preventDefault();
									handleUpdateUser(e);
								}}
							>
								<input
									type='hidden'
									ref={headerRef}
									name='header'
									accept='image/jpeg image/png'
								/>
								<div
									className={`h-[200px] flex ${isUser ? 'cursor-pointer' : 'cursor-default'}`}
									onClick={(e) => {
										setValidationErrors(null);
										if (!isUser) return;
										e.preventDefault();
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
													headerErrors: [`File size cannot exceed ${limit / 1000000}MB.`]
												});
												throw new Error('to big lmao');
											}

											const arrayReader: FileReader = new FileReader();
											arrayReader.onload = async (e) => {
												if (!e.target) return;
												const url: string | null = await upload({
													type: file.type,
													data: e.target.result as ArrayBuffer,
													folder: 'header'
												});
												if (!url) return;
												headerRef.current!.value = url;
												headerRef.current!.form?.requestSubmit();
											};
											arrayReader.readAsArrayBuffer(file);
										};
										input.click();
									}}
									onMouseOver={() => {
										setHeaderHover(true);
									}}
									onMouseLeave={() => {
										setHeaderHover(false);
									}}
								>
									<div
										className='flex-1 flex relative rounded-t-xl bg-gray-onyx'
									>
										{header ?
											<img
												className='w-[100%] rounded-t-xl object-cover'
												src={header}
											/>
											:
											<></>
										}
										{headerHover && header && isUser ?
											<button
												className='size-5 flex justify-center items-center absolute top-2 right-2 rounded-full font-semibold hover:text-white bg-red-500'
												onClick={async (e) => {
													e.preventDefault();
													e.stopPropagation();
													await clearUpload(headerRef.current!.value);
													headerRef.current!.value = 'clear';
													headerRef.current!.form?.requestSubmit();
												}}
											>X</button>
											:
											<></>
										}
									</div>
								</div>
							</form>
							<div className="p-4 pt-[44px] flex flex-col gap-2 relative rounded-b-xl bg-black-eerie-black">
								{!isUser ?
									<button
										className='ml-auto px-2 py-1 absolute right-2 top-2 rounded-full bg-gray-onyx hover:text-white'
										type='button'
										onClick={async () => {
											if (following) {
												const res: Response = await user.unfollow(null, currentUser!.username);
												if (res.ok) setFollowing(false);
											} else {
												const res: Response = await user.follow(null, currentUser!.username);
												if (res.ok) setFollowing(true);
											}
										}}
									>
										{following ? 'Unfollow' : 'Follow'}
									</button>
									:
									<></>
								}
								<h2
									className='mt-6 text-xl font-semibold overflow-hidden text-nowrap text-ellipsis'
								>
									{currentUser!.nickname}
								</h2>
								<p>{`@${currentUser!.username}`}</p>
								<p>{currentUser!.profile_text}</p>
								<p>{`Joined ${formatDate(currentUser!.join_date as string)}`}</p>
								<div className="flex gap-2">
									<Link
										className='px-4 py-1 rounded-full bg-gray-outer-space hover:text-white'
										to={'/main/connections/following'}
										state={{
											username: currentUser!.username,
											nickname: currentUser!.nickname
										}}
									>
										{`${currentUser!.following.length} Following`}
									</Link>
									<Link
										className='px-4 py-1 rounded-full bg-gray-outer-space hover:text-white'
										to={'/main/connections/followers'}
										state={{
											username: currentUser!.username,
											nickname: currentUser!.nickname
										}}
									>
										{`${currentUser!.followers.length} Followers`}
									</Link>
								</div>
							</div>
							<div className="my-4 flex gap-4">
								<Link
									className='flex-1 px-8 py-1 flex justify-center items-center rounded-full text-xl font-semibold text-center bg-gray-onyx hover:text-white'
									to={'/main/profile/'}
									state={{ username: currentUser!.username }}
								>
									POSTS
								</Link>
								<Link
									className='flex-1 px-8 py-1 flex justify-center items-center rounded-full text-xl font-semibold text-center bg-gray-onyx hover:text-white'
									to={'/main/profile/replies'}
									state={{ username: currentUser!.username }}
								>
									REPLIES
								</Link>
							</div>
						</div>
					</div>
					<div>
						<Outlet />
					</div>
				</div>
			}
		</div>
	);
}

export default ProfilePage;
