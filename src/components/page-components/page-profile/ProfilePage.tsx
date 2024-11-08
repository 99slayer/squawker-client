import { useContext, useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { user } from '../../../api/api';
import { formatDate } from '../../../util';
import { AppContextInterface } from '../../../types';
import { AppContext } from '../../../App';
import { clearUpload, upload } from '../../../supabase';
import useFetchUser from '../../../hooks/useFetchUser';
import useVerifyUser from '../../../hooks/useVerifyUser';
import Spinner from '../../Spinner';
import Err from '../../Err';
import { createValidationErrors as cve } from '../../componentUtil';
import useUpdateUser from '../../../hooks/useUpdateUser';

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
	} = useFetchUser(state.username);
	const {
		handleUpdateUser,
		returnData,
		validationErrors,
		setValidationErrors
	} = useUpdateUser();
	const { isUser } = useVerifyUser(state.username);
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
		<Spinner /> :
		<div className='relative'>
			{userError ?
				<Err refetch={refetch} /> :
				<div>
					<header className="p-2 flex gap-4 sticky top-0 z-10 border-2 border-black bg-white">
						<button
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
							<h1>{currentUser!.nickname}</h1>
							<p>{`${currentUser!.post_count} posts`}</p>
						</div>
					</header>
					<div className="relative border-r-2 border-b-2 border-l-2 border-black">
						{validationErrors ?
							<div
								className='p-2 top-2 left-2 z-50 border-[2px] border-black absolute bg-white'
							>
								{validationErrors.pfpErrors ?
									<ul>
										{cve(validationErrors.pfpErrors ?? [])}
									</ul>
									:
									<ul>
										{cve(validationErrors.headerErrors ?? [])}
									</ul>
								}
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
								className={`absolute top-[140px] left-3 ${isUser ? 'cursor-pointer' : 'cursor-default'}`}
								onClick={(e) => {
									setValidationErrors(null);
									if (!isUser) return;
									e.preventDefault();
									const input: HTMLInputElement = document.createElement('input');
									input.type = 'file';
									input.name = 'image';
									input.accept = 'image/jpeg, image/png';
									// is there a way to remove this listener v??
									// needs to be gone after pfp change/error <===
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
									{appPfp ?
										<div
											className='rounded-full'
										>
											<img
												className='w-[120px] h-[120px] rounded-full object-cover'
												src={appPfp}
											/>
										</div>
										:
										<span
											className="material-symbols-outlined filled text-[120px] rounded-full bg-white"
										>
											account_circle
										</span>
									}
									{pfpHover && appPfp && isUser ?
										<button
											className='w-8 h-8 absolute border-[2px] border-black rounded-full top-0 right-0 text-stone-100 bg-red-500'
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
									className={`h-[200px] border-b-[2px] flex border-black ${isUser ? 'cursor-pointer' : 'cursor-default'}`}
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
										className='flex-1 flex relative'
									>
										{header ?
											<img
												className='w-[100%] object-cover'
												src={header}
											/>
											:
											<></>
										}
										{headerHover && header && isUser ?
											<button
												className='w-8 h-8 absolute border-[2px] border-black rounded-full top-2 right-2 text-stone-100 bg-red-500'
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
							<div className="p-2 flex flex-col gap-2">
								<div className="flex gap-2">
									<button className="ml-auto p-1 border-2 border-black">...</button>
									{!isUser ?
										<button
											className='p-1 border-2 border-black'
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
								</div>
								<h2 className="mt-6">{currentUser!.nickname}</h2>
								<p>{`@${currentUser!.username}`}</p>
								<p>{currentUser!.profile_text}</p>
								<p>{`Joined ${formatDate(currentUser!.join_date as string)}`}</p>
								<div className="flex gap-2">
									<Link
										to={'/main/connections/following'}
										state={{
											username: currentUser!.username,
											nickname: currentUser!.nickname
										}}
										className='p-1 border-2 border-black'
									>
										{`${currentUser!.following.length} Following`}
									</Link>
									<Link
										to={'/main/connections/followers'}
										state={{
											username: currentUser!.username,
											nickname: currentUser!.nickname
										}}
										className='p-1 border-2 border-black'
									>
										{`${currentUser!.followers.length} Followers`}
									</Link>
								</div>
							</div>
							<div className="flex">
								<Link
									className='flex-1 m-2 p-4 border-2 border-black text-center'
									to={'/main/profile/'}
									state={{ username: currentUser!.username }}
								>
									Posts
								</Link>
								<Link
									className='flex-1 m-2 p-4 border-2 border-black text-center'
									to={'/main/profile/replies'}
									state={{ username: currentUser!.username }}
								>
									Replies
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
