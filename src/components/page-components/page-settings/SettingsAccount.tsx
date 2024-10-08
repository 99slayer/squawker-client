import { useContext } from 'react';
import { user } from '../../../api/api';
import { AppContext } from '../../../App';
import { AppContextInterface } from '../../../types';
import Component from '../../Component';

function SettingsAccount() {
	const {
		appUsername,
		setAppUsername,
		setAppNickname
	} = useContext(AppContext) as AppContextInterface;
	return (
		<div className="p-2 flex-1">
			<h1 className="">ACCOUNT</h1>
			<form
				className="flex flex-col items-stretch gap-2"
				onSubmit={async (e) => {
					const data: { username: string, nickname: string } = await user
						.updateUserAccount(e, appUsername);
					setAppUsername(data.username);
					setAppNickname(data.nickname);
				}}
			>
				<Component.Input
					options={{
						labelText: 'Username',
						name: 'username',
						type: 'text',
						placeholder: 'Username',
					}}
				/>
				<Component.Input
					options={{
						labelText: 'Nickname',
						name: 'nickname',
						type: 'text',
						placeholder: 'Nickname',
					}}
				/>
				<Component.Input
					options={{
						labelText: 'Email',
						name: 'email',
						type: 'email',
						placeholder: 'Email',
					}}
				/>
				<Component.TextArea
					options={{
						labelText: 'Profile Text',
						name: 'profile_text',
						placeholder: 'Profile text'
					}}
				/>
				<button>Save Settings</button>
			</form>
		</div>
	);
}

export default SettingsAccount;
