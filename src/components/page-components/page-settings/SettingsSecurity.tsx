import { useContext } from 'react';
import { user } from '../../../api/api';
import { AppContext } from '../../../App';
import { AppContextInterface } from '../../../types';
import Component from '../../Component';

function SettingsSecurity() {
	const { appUsername } = useContext(AppContext) as AppContextInterface;
	return (
		<div className="p-2 flex-1">
			<h1 className="">SECURITY</h1>
			<form
				className="flex flex-col items-start gap-2"
				onSubmit={async (e) => {
					await user
						.updateUserSecurity(
							e,
							appUsername
						);
				}}
			>
				<Component.Input
					options={{
						labelText: 'password',
						name: 'password',
						type: 'password',
						placeholder: 'Password',
					}}
				/>
				<Component.Input
					options={{
						labelText: 'password confirm',
						name: 'password-confirm',
						type: 'password',
						placeholder: 'Password Confirm',
					}}
				/>
				<button>Save Settings</button>
			</form>
		</div>
	);
}

export default SettingsSecurity;
