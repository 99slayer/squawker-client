import { createContext, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './styles/App.css';
import { logout } from './api/auth';
import { AppContextInterface, RequestEvent } from './types';

export const AppContext = createContext<AppContextInterface | null>(null);

function App() {
	const navigate = useNavigate();
	const [appUsername, setAppUsername] = useState<string>(localStorage.getItem('username') as string);
	const [appNickname, setAppNickname] = useState<string>(localStorage.getItem('nickname') as string);
	const [appPfp, setAppPfp] = useState<string | null>(localStorage.getItem('pfp') as string);

	async function appLogout(e: RequestEvent): Promise<void> {
		await logout(e);
		setAppPfp(null);
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
