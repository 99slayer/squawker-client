import { createContext, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './styles/App.css';
import { logout } from './api/auth';
import { AppContextInterface, RequestEvent } from './types';

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

	function setAppPfp(pfp: string) {
		if (pfp === null) {
			localStorage.setItem('pfp', '');
		} else localStorage.setItem('pfp', pfp);

		setPfp(pfp);
	}

	async function appLogout(e: RequestEvent): Promise<void> {
		await logout(e);
		setPfp(null);
		navigate('/');
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
				className='min-w-full min-h-screen bg-white'
			>
				<Outlet />
			</div>
		</AppContext.Provider>
	);
}

export default App;
