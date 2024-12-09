import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import {
	AppContextInterface,
	MainContextInterface
} from '../../../types';
import { AppContext } from '../../../App';
import { MainContext } from './MainTemplate';

function Sidebar() {
	const {
		appLogout,
		appUsername,
		appNickname,
		appPfp,
	} = useContext(AppContext) as AppContextInterface;
	const {
		toggle,
		postRef
	} = useContext(MainContext) as MainContextInterface;

	function handleOpen(openRef: React.RefObject<HTMLDialogElement>) {
		const textarea: HTMLTextAreaElement | null = openRef!.current!.querySelector('textarea:first-of-type');
		textarea!.focus();
	}

	return (
		<div
			className='flex flex-col items-start max-[1020px]:items-end gap-2'
		>
			<ul className="mt-[56px] flex flex-col items-start gap-2 text-xl font-semibold">
				<li className="flex items-center">
					<Link
						className='px-4 py-1 max-[1020px]:p-1 flex items-center gap-2 rounded-full hover:text-white hover:bg-gray-onyx'
						to={'/squawker-client/main'}
						key={uuid()}
						title='home'
					>
						<span className="material-symbols-outlined filled">
							home
						</span>
						<p className='max-[1020px]:hidden'>HOME</p>
					</Link>
				</li>
				<li className="flex">
					<Link
						className='px-4 py-1 max-[1020px]:p-1 flex items-center gap-2 rounded-full hover:text-white hover:bg-gray-onyx'
						key={uuid()}
						to={'/squawker-client/main/profile'}
						state={{ username: appUsername }}
						title='profile'
					>
						<span className="material-symbols-outlined">
							person
						</span>
						<p className='max-[1020px]:hidden'>PROFILE</p>
					</Link>
				</li>
				<li className="flex">
					<Link
						className='px-4 py-1 max-[1020px]:p-1 flex items-center gap-2 rounded-full hover:text-white hover:bg-gray-onyx'
						key={uuid()}
						to={'/squawker-client/main/connect'}
						state={{ username: appUsername }}
						title='connect'
					>
						<span className="material-symbols-outlined">
							person_add
						</span>
						<p className='max-[1020px]:hidden'>CONNECT</p>
					</Link>
				</li>
				<li className="flex">
					<Link
						className='px-4 py-1 max-[1020px]:p-1 flex items-center gap-2 rounded-full hover:text-white hover:bg-gray-onyx'
						key={uuid()}
						to={'/squawker-client/main/settings/account'}
						state={{ username: appUsername }}
						title='settings'
					>
						<span className="material-symbols-outlined filled">
							settings
						</span>
						<p className='max-[1020px]:hidden'>SETTINGS</p>
					</Link>
				</li>
			</ul>
			<button
				className='flex-1 px-4 py-1 max-[1020px]:p-1 flex items-center gap-2 rounded-full text-xl font-semibold hover:text-white hover:bg-gray-onyx'
				title='post'
				onClick={() => {
					toggle(postRef);
					handleOpen(postRef);
				}}
			>
				<span className="material-symbols-outlined">
					edit_square
				</span>
				<p className='max-[1020px]:hidden'>POST</p>
			</button >
			<button
				className='flex-1 px-4 py-1 max-[1020px]:p-1 flex items-center gap-2 rounded-full text-xl font-semibold hover:text-white hover:bg-gray-onyx'
				title='logout'
				onClick={(e) => { appLogout(e); }}
			>
				<span className="material-symbols-outlined">
					logout
				</span>
				<p className='max-[1020px]:hidden'>LOGOUT</p>
			</button>
			<div
				className='mt-2 min-[1020px]:pl-4 flex items-center gap-2'
			>
				{appPfp ?
					<div
						className='min-w-[44px]'
					>
						<img className='size-[44px] rounded-full object-cover' src={appPfp} />
					</div>
					:
					<span className="text-[44px] material-symbols-outlined filled rounded-full">
						account_circle
					</span>
				}
				<div className='max-w-[160px] max-[1020px]:hidden '>
					<h3 className='font-bold overflow-hidden text-nowrap text-ellipsis'>{appNickname}</h3>
					<p className='overflow-hidden text-nowrap text-ellipsis'>{`@${appUsername}`}</p>
				</div>
			</div>
		</div>
	);
}

export default Sidebar;
