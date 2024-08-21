import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

function MainTemplate() {
	return (
		<div
			id='main-page'
			className='flex-1 min-h-[1500px] px-2 flex justify-between items-start gap-4 relative'
		>
			<div className='w-64 min-w-32 ml-auto sticky top-0'>
				<Sidebar />
			</div>
			<div className='self-stretch w-[600px] min-w-[600px] flex flex-col'>
				<Outlet />
			</div>

			<div className='min-w-64 mr-auto'></div>
		</div>
	);
}

export default MainTemplate;
