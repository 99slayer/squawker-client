import { useCallback, useContext, useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { user } from '../../../api/api';
import { formatDate } from '../../../util';
import { AppContextInterface, UserInterface } from '../../../types';
import { AppContext } from '../../../App';

function ProfilePage() {
	const { state } = useLocation();
	const navigate = useNavigate();
	const { appUsername } = useContext(AppContext) as AppContextInterface;
	const [currentUser, setCurrentUser] = useState<UserInterface | null>(null);
	const [following, setFollowing] = useState<boolean>(false);

	const pullUserData = useCallback(async () => {
		if (!state) return;
		const res: Response = await user.getUser(null, state.username);
		const data: UserInterface = await res.json();
		setCurrentUser(data);
	}, [state]);

	useEffect(() => {
		pullUserData();
	}, [pullUserData]);

	useEffect(() => {
		if (!currentUser) return;
		setFollowing(Boolean(currentUser.isFollowing));
	}, [currentUser]);

	return (
		(currentUser ?
			<div className='relative'>
				<header className="p-2 flex gap-4 sticky top-0 z-10 border-2 border-black bg-white">
					<button
						className=''
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
						<h1>{currentUser.nickname}</h1>
						<p>{`${currentUser.post_count} posts`}</p>
					</div>
				</header>
				<div className="border-r-2 border-b-2 border-l-2 border-black">
					<span
						className="size-28 absolute top-[200px] left-3 rounded-full bg-black"
					></span>
					<div className="flex flex-col items-stretch">
						<div className="h-[200px] border-b-[2px] border-black"></div>
						<div className="p-2 flex flex-col gap-2">
							<div className="flex gap-2">
								<button className="ml-auto p-1 border-2 border-black">...</button>
								{currentUser.username !== appUsername ?
									<button
										className='p-1 border-2 border-black'
										type='button'
										onClick={async () => {
											if (following) {
												const res: Response = await user.unfollow(null, currentUser.username);
												if (res.ok) setFollowing(false);
											} else {
												const res: Response = await user.follow(null, currentUser.username);
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
							<h2 className="mt-6">{currentUser.nickname}</h2>
							<p>{`@${currentUser.username}`}</p>
							<p>{currentUser.profile_text}</p>
							<p>{`Joined ${formatDate(currentUser.join_date as string)}`}</p>
							<div className="flex gap-2">
								<Link
									to={'/main/connections/following'}
									state={{
										username: currentUser.username,
										nickname: currentUser.nickname
									}}
									className='p-1 border-2 border-black'
								>
									{`${currentUser.following.length} Following`}
								</Link>

								<Link
									to={'/main/connections/followers'}
									state={{
										username: currentUser.username,
										nickname: currentUser.nickname
									}}
									className='p-1 border-2 border-black'
								>
									{`${currentUser.followers.length} Followers`}
								</Link>
							</div>
						</div>
						<div className="flex">
							<Link
								className='flex-1 m-2 p-4 border-2 border-black text-center'
								to={'/main/profile/'}
								state={{ username: currentUser.username }}
							>
								Posts
							</Link>
							<Link
								className='flex-1 m-2 p-4 border-2 border-black text-center'
								to={'/main/profile/replies'}
								state={{ username: currentUser.username }}
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
			:
			<></>
		)
	);
}

export default ProfilePage;
