import { Link, Outlet } from 'react-router-dom';
import Component from '../../Component';

function SettingsPage() {
	return (
		<div>
			<Component.Back />
			<div className="mt-2 flex max-[650px]:flex-col gap-2">
				<div
					className="p-4 pt-3 flex flex-col items-center rounded-lg bg-gray-onyx"
				>
					<h1 className="pb-2 text-center font-semibold">SETTINGS</h1>
					<div className="flex flex-col gap-2">
						<Link
							className="px-4 py-1 flex justify-center rounded-full font-semibold hover:text-white bg-gray-outer-space"
							to={'/squawker-client/main/settings/account'}
						>
							Account
						</Link>
						<Link
							className="px-4 py-1 flex justify-center rounded-full font-semibold hover:text-white bg-gray-outer-space"
							to={'/squawker-client/main/settings/security'}
						>
							Security
						</Link>
					</div>
				</div>
				<div className="flex-1 p-4 rounded-lg bg-gray-onyx">
					<Outlet />
				</div>
			</div>
		</div>
	);
}

export default SettingsPage;
