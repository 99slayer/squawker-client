import { PostInterface } from '../../types';
import Component from '../Component';

function CommentDisplayGroup({ commentGroup }: { commentGroup: PostInterface }) {
	return (
		(commentGroup ?
			<div
				className='my-2 px-3 py-1 flex flex-col rounded-lg bg-gray-onyx'
			>
				{commentGroup.root_post ?
					<Component.Post data={commentGroup.root_post} />
					: <></>
				}
				{commentGroup.parent_post ?
					<Component.Post data={commentGroup.parent_post} />
					: <></>
				}
				<Component.Post data={commentGroup} />
			</div>
			: <></>
		)
	);
}

export default CommentDisplayGroup;
