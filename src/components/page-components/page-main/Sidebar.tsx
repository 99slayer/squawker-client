import { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import PostModal from '../../modal-components/PostModal';
import { AppContext } from '../../../App';
import { ButtonClickEvent } from '../../../types';

const pageLinks: string[] = [
	'profile',
	'connect',
	'settings'
];

function Sidebar() {
	const appLogout = useContext(AppContext);
	const postRef: React.RefObject<HTMLDialogElement> = useRef<HTMLDialogElement>(null);

	function toggle(ref: React.RefObject<HTMLDialogElement>): void {
		if (ref.current?.hasAttribute('open')) {
			ref.current.close();
		} else {
			ref.current?.showModal();
		}
	}

	return (
		<div
			className='flex flex-col'
		>
			<ul className="flex flex-col items-stretch gap-2">
				<li
					className='size-10 flex justify-center items-center rounded-full text-white text-xs bg-black'
				>
					ICON
				</li>
				<li className="flex">
					<Link
						to={'/main'}
						className="flex-1 p-4 border-[2px] border-black text-xl text-center"
					>
						home
					</Link>
				</li>
				{
					pageLinks.map((pl) => {
						return <li className="flex">
							<Link
								to={'/main/' + pl}
								className="flex-1 p-4 border-[2px] border-black text-xl text-center"
							>
								{pl}
							</Link>
						</li>;
					})
				}
			</ul>
			<button
				onClick={() => { toggle(postRef); }}
				className="flex-1 mt-2 p-4 border-[2px] border-black text-xl text-center"
			>
				POST
			</button >
			<button
				onClick={(e: ButtonClickEvent) => { appLogout(e); }}
				className="flex-1 mt-2 p-4 border-[2px] border-black text-xl text-center"
			>
				LOGOUT
			</button>
			<PostModal ref={postRef} toggle={toggle} />
		</div>
	);
}

export default Sidebar;
