import { Link, Outlet } from 'react-router-dom';

function ProfilePage() {
	return (
		<div className='relative'>
			<header className="p-2 flex gap-4 sticky top-0 z-10 border-2 border-black bg-white">
				<button>{'<-'}</button>
				<div>
					<h1>Nickname</h1>
					<p>762 posts</p>
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
							<button className='p-1 border-2 border-black'>Follow</button>
						</div>
						<h2 className="mt-6">Nickname</h2>
						<p>user@</p>
						<p>profile text</p>
						<p>join date</p>
						<div className="flex gap-2">
							<button className='p-1 border-2 border-black'>Following</button>
							<button className='p-1 border-2 border-black'>Followers</button>
						</div>
					</div>
					<div className="flex">
						<Link
							className='flex-1 m-2 p-4 border-2 border-black text-center'
							to={'/main/profile/'}
						>
							Posts
						</Link>
						<Link
							className='flex-1 m-2 p-4 border-2 border-black text-center'
							to={'/main/profile/replies'}
						>
							Replies
						</Link>
						<Link
							className='flex-1 m-2 p-4 border-2 border-black text-center'
							to={'/main/profile/likes'}
						>
							Likes
						</Link>
					</div>
				</div>
			</div>
			<div>
				<Outlet />
			</div>
		</div>
	);
}

export default ProfilePage;
