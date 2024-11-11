import { createContext, useEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { MainContextInterface } from '../../../types';
import Component from '../../Component';

export const MainContext = createContext<MainContextInterface | null>(null);

function MainTemplate() {
	const location = useLocation();
	const postRef: React.RefObject<HTMLDialogElement> =
		useRef<HTMLDialogElement>(null);
	const [postId, setPostId] = useState<string | null>(null);

	function toggle(ref: React.RefObject<HTMLDialogElement>): void {
		const form: HTMLFormElement | null = ref.current!.querySelector('form');
		form!.reset();

		if (ref.current?.hasAttribute('open')) {
			ref.current.close();
		} else {
			ref.current?.showModal();
		}
	}

	useEffect(() => {
		window.scroll(0, 0);
	}, [location]);

	const contextValues: MainContextInterface = {
		toggle,
		postRef,
		setPostId
	};

	return (
		<MainContext.Provider value={contextValues}>
			<div
				id='main-page'
				className='flex-1 min-h-[1500px] px-2 flex justify-between items-start gap-4 relative'
			>
				<div className='w-64 min-w-32 ml-auto sticky top-0'>
					<Component.Sidebar />
				</div>
				<div className='self-stretch w-[600px] min-w-[600px] pt-[40px] pb-[50px] flex flex-col'>
					<Outlet />
				</div>
				<div className='min-w-64 mr-auto'></div>
				<Component.PostModal
					ref={postRef}
					toggle={toggle}
					postId={postId}
					setPostId={setPostId}
				/>
			</div>
		</MainContext.Provider>
	);
}

export default MainTemplate;
