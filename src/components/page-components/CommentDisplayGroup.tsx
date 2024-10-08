import { PostInterface } from '../../types';
import Component from '../Component';

function CommentDisplayGroup({ commentGroup }: { commentGroup: PostInterface }) {
	return (
		(commentGroup ?
			<div
				className='px-2 flex flex-col border-[2px] border-black'
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
