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
		navigate('/squawker-client/');
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
						xmlns='http://www.w3.org/2000/svg'
						width='24'
						height='24'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'>
						<path
							d='M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z'
						>
						</path>
						<line x1='16' y1='8' x2='2' y2='22'></line>
						<line x1='17.5' y1='15' x2='9' y2='15'></line>
					</svg>
				</div>
				<a
					className='fixed bottom-4 left-2'
					href='https://github.com/99slayer'
					target='_blank'
					rel='noopener noreferrer'
					title='My github'
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='50'
						height='50'
						viewBox='0 0 100 100'
					>
						<path
							fillRule='evenodd'
							clipRule='evenodd'
							d='M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z'
							fill='#53FC18'
						/>
					</svg>
				</a>
			</div>
		</AppContext.Provider>
	);
}

export default App;
