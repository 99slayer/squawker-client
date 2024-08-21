import Post from '../Post';

function ProfileReplies() {
	return (
		<div className='pt-2 flex flex-col gap-4'>
			<h1>REPLIES</h1>
			<Post />
			<Post />
			<Post />
		</div>
	);
}

export default ProfileReplies;
