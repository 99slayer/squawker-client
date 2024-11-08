import Component from '../../Component';
import { createValidationErrors as cve } from '../../componentUtil';
import useUpdateUser from '../../../hooks/useUpdateUser';

function SettingsAccount() {
	const { handleUpdateUser, validationErrors } = useUpdateUser();

	return (
		<div className="p-2 flex-1">
			<h1 className="">ACCOUNT</h1>
			<form
				className="flex flex-col items-stretch gap-2"
				onSubmit={async (e) => {
					const success: boolean = await handleUpdateUser(e);
					if (success) window.location.reload();
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
