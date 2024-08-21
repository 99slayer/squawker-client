import Post from '../Post';

function ProfilePosts() {
	return (
		<div className='pt-2 flex flex-col gap-4'>
			<h1>POSTS</h1>
			<Post />
			<Post />
			<Post />
			<Post />
			<Post />
			<Post />
		</div>
	);
}

export default ProfilePosts;
