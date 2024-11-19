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
				className='min-w-[400px] flex-1 px-2 flex justify-center items-start gap-4 relative'
			>
				<div className='sticky top-0'>
					<Component.Sidebar />
				</div>
				<div
					className='self-stretch w-[600px] max-[1020px]:max-w-[600px] mr-[200px] max-[1020px]:mr-auto pt-[40px] pb-[50px] flex flex-col'
				>
					<Outlet />
				</div>
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
