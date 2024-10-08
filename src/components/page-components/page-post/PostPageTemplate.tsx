import { Outlet, useLocation } from 'react-router-dom';
import Component from '../../Component';

function PostPageTemplate() {
	const { state } = useLocation();

	return (
		<div className='flex flex-col'>
			<Component.Back />
			<Outlet context={{ id: state.id }} />
		</div>
	);
}

export default PostPageTemplate;
