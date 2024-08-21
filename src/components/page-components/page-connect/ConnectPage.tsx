import { Link, Outlet } from 'react-router-dom';

function ConnectPage() {
	return (
		<div className='flex-1 relative'>
			<header className="p-2 flex flex-col gap-4 sticky top-0 z-10 border-2 border-black bg-white">
				<div className='flex gap-4'>
					<button>{'<-'}</button>
					<div>
						<h1>Nickname</h1>
						<p>762 posts</p>
					</div>
				</div>
				<div className='flex gap-4'>
					<Link to={'/main/connect/'}>Followers</Link>
					<Link to={'/main/connect/following'}>Following</Link>
					<Link to={'/main/connect/findusers'}>Find Users</Link>
				</div>
			</header>
			<Outlet />
		</div>
	);
}

export default ConnectPage;
