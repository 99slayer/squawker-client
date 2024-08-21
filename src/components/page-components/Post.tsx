function Post() {
	return (
		<article className="p-2 flex flex-col gap-2 border-[2px] border-black bg-white">
			<div>reposted by user</div>
			<div className="flex items-start gap-2">
				<span className="min-w-6 min-h-6 rounded-full bg-black"></span>
				<div className="flex flex-col">
					<div className="flex">
						<h3>NICKNAME @user timestamp</h3>
						<button className="flex justify-center text-white items-center w-4 h-4 ml-auto rounded-full bg-slate-400">
							O
						</button>
					</div>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi rhoncus blandit neque eget condimentum. Mauris in lorem at mauris fermentum rutrum ultricies vel lorem. Proin quis blandit sapien. Vivamus suscipit erat vel risus efficitur, nec faucibus dolor facilisis. Mauris in purus vel mi blandit ultricies. Vestibulum lobortis tellus a viverra sollicitudin. Vivamus sit amet accumsan urna. Aenean nec felis efficitur, tristique massa eu, dictum lorem.
					</p>
					<div>
						IMAGE
					</div>
					<div>
						STATS
					</div>
				</div>
			</div>
		</article>
	);
}

export default Post;
