import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import {
	ButtonClickEvent,
	AppContextInterface,
	MainContextInterface
} from '../../../types';
import { AppContext } from '../../../App';
import { MainContext } from './MainTemplate';

function Sidebar() {
	const {
		appLogout,
		appUsername,
		appNickname
	} = useContext(AppContext) as AppContextInterface;
	const {
		toggle,
		postRef
	} = useContext(MainContext) as MainContextInterface;

	return (
		<div
			className='flex flex-col'
		>
			<ul className="flex flex-col items-stretch gap-2">
				<li
					className='size-10 flex justify-center items-center rounded-full text-white text-xs bg-black'
					key={uuid()}
				>
					ICON
				</li>
				<li className="flex">
					<Link
						to={'/main'}
						className="flex-1 p-4 border-[2px] border-black text-xl text-center"
						key={uuid()}
					>
						HOME
					</Link>
				</li>
				<li className="flex">
					<Link
						to={'/main/profile'}
						state={{ username: appUsername }}
						className="flex-1 p-4 border-[2px] border-black text-xl text-center"
						key={uuid()}
					>
						PROFILE
					</Link>
				</li>
				<li className="flex">
					<Link
						to={'/main/connect'}
						state={{ username: appUsername }}
						className="flex-1 p-4 border-[2px] border-black text-xl text-center"
						key={uuid()}
					>
						CONNECT
					</Link>
				</li>
				<li className="flex">
					<Link
						to={'/main/settings'}
						state={{ username: appUsername }}
						className="flex-1 p-4 border-[2px] border-black text-xl text-center"
						key={uuid()}
					>
						SETTINGS
					</Link>
				</li>
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
			<div
				className='mt-2 flex items-center gap-2'
			>
				<span className='min-w-10 min-h-10 rounded-full bg-black'></span>
				<div>
					<h3>{appNickname}</h3>
					<p>{`@${appUsername}`}</p>
				</div>
			</div>
		</div>
	);
}

export default Sidebar;
