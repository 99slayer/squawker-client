import Post from '../Post';

function ProfileLikes() {
	return (
		<div className='pt-2 flex flex-col gap-4'>
			<h1>LIKES</h1>
			<Post />
			<Post />
			<Post />
		</div>
	);
}

export default ProfileLikes;
