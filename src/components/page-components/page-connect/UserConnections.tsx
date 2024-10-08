import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

function UserConnectionsPage() {
	const { state } = useLocation();
	const navigate = useNavigate();

	return (
		<div className='flex-1 relative'>
			<header className="p-2 flex flex-col gap-4 sticky top-0 z-10 border-2 border-black bg-white">
				<div className='flex gap-4'>
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
						<h1>{state.nickname}</h1>
						<p>{`@${state.username}`}</p>
					</div>
				</div>
				<div className='flex gap-4'>
					<Link
						className='p-2 border-[2px] border-black'
						to={'/main/connections/followers'}
						state={{
							username: state.username,
							nickname: state.nickname
						}}
					>
						Followers
					</Link>

					<Link
						className='p-2 border-[2px] border-black'
						to={'/main/connections/following'}
						state={{
							username: state.username,
							nickname: state.nickname
						}}
					>
						Following
					</Link>
				</div>
			</header>
			<Outlet />
		</div>
	);
}

export default UserConnectionsPage;
