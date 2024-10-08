import { Link, Outlet } from 'react-router-dom';
import Component from '../../Component';

function SettingsPage() {
	return (
		<div>
			<Component.Back />
			<div
				className="p-2 flex gap-2 border-2 border-black"
			>
				<div
					className="flex-2 flex flex-col border-2 border-black"
				>
					<h1 className="p-2">SETTINGS</h1>
					<div className="flex flex-col items-start">
						<Link
							to={'/main/settings'}
							className="p-2"
						>
							Account
						</Link>
						<Link
							to={'/main/settings/security'}
							className="p-2"
						>
							Security
						</Link>
					</div>
				</div>
				<div className="flex-1 border-2 border-black">
					<Outlet />
				</div>
			</div>
		</div>
	);
}

export default SettingsPage;
