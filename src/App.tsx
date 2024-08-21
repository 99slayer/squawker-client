import { Outlet, useNavigate } from 'react-router-dom';
import './styles/App.css';
import { createContext } from 'react';
import { logout } from './api/auth';
import { RequestEvent } from './types';

export const AppContext = createContext<((e: RequestEvent) => void)>(() => { });

function App() {
	const navigate = useNavigate();

	async function appLogout(e: RequestEvent): Promise<void> {
		await logout(e);
		navigate('/');
	}

	return (
		<AppContext.Provider value={appLogout}>
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
