function Followers() {
	return (
		<ul className="mt-2 flex flex-col gap-2">
			<FollowerCard />
			<FollowerCard />
			<FollowerCard />
			<FollowerCard />
		</ul>
	);
}

function FollowerCard() {
	return (
		<li className="p-2 flex gap-2 border-2 border-black">
			<span className="size-8 rounded-full bg-gray-700"></span>
			<div className="flex-1 flex flex-col items-stretch gap-2">
				<div className="flex items-center gap-2">
					<div>
						<h3>nickname</h3>
						<p>user@</p>
					</div>
					<button className="ml-auto p-1 border-2 border-black">Following</button>
					<button className="px-1 border-2 border-black">...</button>
				</div>
			</div>
		</li>
	);
}

export default Followers;
