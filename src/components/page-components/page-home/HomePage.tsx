import Post from '../Post';

function HomePage() {
	return (
		<div className='flex flex-col gap-4'>
			<Post />
			<Post />
			<Post />
			<Post />
			<Post />
			<Post />
		</div>
	);
}

export default HomePage;
