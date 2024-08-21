import Post from '../Post';

function PostPage() {
	return (
		<div className='pt-2 flex flex-col gap-4'>
			<Post />
			<div>
				<Post />
				<Post />
				<Post />
				<Post />
			</div>
		</div>
	);
}

export default PostPage;
