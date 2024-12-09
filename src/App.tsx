import { createContext, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { logout } from './api/auth';
import { AppContextInterface, RequestEvent } from './types';
import { supaLogout } from './supabase';

export const AppContext = createContext<AppContextInterface | null>(null);

function App() {
	const navigate = useNavigate();
	const [appUsername, setUsername] = useState<string>(localStorage.getItem('username') as string);
	const [appNickname, setNickname] = useState<string>(localStorage.getItem('nickname') as string);
	const [appPfp, setPfp] = useState<string | null>(localStorage.getItem('pfp') as string);

	function setAppUsername(username: string) {
		localStorage.setItem('username', username);
		setUsername(username);
	}

	function setAppNickname(nickname: string) {
		localStorage.setItem('nickname', nickname);
		setNickname(nickname);
	}

	function setAppPfp(pfp: string | null) {
		if (pfp === null) {
			localStorage.setItem('pfp', '');
		} else localStorage.setItem('pfp', pfp);

		setPfp(pfp);
	}

	async function appLogout(e: RequestEvent): Promise<void> {
		await logout(e);
		await supaLogout();
		setPfp(null);
		navigate('/squawker-client');
	}

	const contextValues: AppContextInterface = {
		appLogout,
		appUsername,
		setAppUsername,
		appNickname,
		setAppNickname,
		appPfp,
		setAppPfp
	};

	return (
		<AppContext.Provider value={contextValues}>
			<div
				id='app'
				className='min-h-screen text-white/50 bg-black-night relative'
			>
				<Outlet />
				<div
					className='flex items-start gap-1 fixed top-2 left-[16px] text-green-harlequin z-50'
				>
					<h1 className='self-end font-extrabold tracking-widest'>
						SQUAWKER
					</h1>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round">
						<path
							d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"
						>
						</path>
						<line x1="16" y1="8" x2="2" y2="22"></line>
						<line x1="17.5" y1="15" x2="9" y2="15"></line>
					</svg>
				</div>
			</div>
		</AppContext.Provider>
	);
}

export default App;
