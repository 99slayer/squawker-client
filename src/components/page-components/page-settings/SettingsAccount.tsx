import { useContext, useState } from 'react';
import { user } from '../../../api/api';
import { AppContext } from '../../../App';
import { AppContextInterface, ReturnDataInterface } from '../../../types';
import Component from '../../Component';
import { createValidationErrors as cve } from '../../componentUtil';

function SettingsAccount() {
	const {
		appUsername,
		setAppUsername,
		setAppNickname
	} = useContext(AppContext) as AppContextInterface;
	const [validationErrors, setValidationErrors] = useState<Record<string, string[]> | null>(null);

	return (
		<div className="p-2 flex-1">
			<h1 className="">ACCOUNT</h1>
			<form
				className="flex flex-col items-stretch gap-2"
				onSubmit={async (e) => {
					const res: Response = await user.updateUserAccount(e, appUsername);
					const data: ReturnDataInterface = await res.json();

					if (data.username) setAppUsername(data.username);
					if (data.nickname) setAppNickname(data.nickname);
					if (data.errors) setValidationErrors(data.errors);
					if (res.ok) window.location.reload();
				}}
			>
				<div>
					<Component.Input
						options={{
							labelText: 'Username',
							name: 'username',
							type: 'text',
							placeholder: 'Username',
						}}
					/>
					{validationErrors?.usernameErrors ?
						<ul>
							{cve(validationErrors.usernameErrors)}
						</ul>
						: <></>
					}
				</div>
				<div>
					<Component.Input
						options={{
							labelText: 'Nickname',
							name: 'nickname',
							type: 'text',
							placeholder: 'Nickname',
						}}
					/>
					{validationErrors?.nicknameErrors ?
						<ul>
							{cve(validationErrors.nicknameErrors)}
						</ul>
						: <></>
					}
				</div>
				<div>
					<Component.Input
						options={{
							labelText: 'Email',
							name: 'email',
							type: 'email',
							placeholder: 'Email',
						}}
					/>
					{validationErrors?.emailErrors ?
						<ul>
							{cve(validationErrors.emailErrors)}
						</ul>
						: <></>
					}
				</div>
				<div>
					<Component.TextArea
						options={{
							labelText: 'Profile Text',
							name: 'profile_text',
							placeholder: 'Profile text'
						}}
					/>
					{validationErrors?.profile_textErrors ?
						<ul>
							{cve(validationErrors.profile_textErrors)}
						</ul>
						: <></>
					}
				</div>
				<button>Save Settings</button>
			</form>
		</div>
	);
}

export default SettingsAccount;
