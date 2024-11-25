import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

function UserConnectionsPage() {
	const { state } = useLocation();
	const navigate = useNavigate();

	return (
		<div className='flex-1'>
			<header className="px-2 py-2 flex flex-col gap-4 bg-black-night">
				<div className='flex gap-4'>
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
						<h1>{state.nickname}</h1>
						<p>{`@${state.username}`}</p>
					</div>
				</div>
				<div className='flex gap-4'>
					<Link
						className='px-4 py-1 rounded-full hover:text-white bg-gray-onyx'
						to={'/main/connections/followers'}
						state={{
							username: state.username,
							nickname: state.nickname
						}}
					>
						Followers
					</Link>

					<Link
						className='px-4 py-1 rounded-full hover:text-white bg-gray-onyx'
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
