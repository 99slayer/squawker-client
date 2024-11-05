import { useContext, useState } from 'react';
import { user } from '../../../api/api';
import { AppContext } from '../../../App';
import { AppContextInterface, ReturnDataInterface } from '../../../types';
import Component from '../../Component';
import { createValidationErrors as cve } from '../../componentUtil';

function SettingsSecurity() {
	const { appUsername } = useContext(AppContext) as AppContextInterface;
	const [validationErrors, setValidationErrors] = useState<Record<string, string[]> | null>(null);

	return (
		<div className="p-2 flex-1">
			<h1 className="">SECURITY</h1>
			<form
				className="flex flex-col items-start gap-2"
				onSubmit={async (e) => {
					const res: Response = await user.updateUserSecurity(e, appUsername);
					try {
						const text: string = await res.text();
						const data: ReturnDataInterface = JSON.parse(text);
						if (data.errors) setValidationErrors(data.errors);
					} catch {
						if (res.ok) {
							if (res.ok) window.location.reload();
						}
					}
				}}
			>
				<div>
					<Component.Input
						options={{
							labelText: 'password',
							name: 'password',
							type: 'password',
							placeholder: 'Password',
						}}
					/>
					{validationErrors?.passwordErrors ?
						<ul>
							{cve(validationErrors.passwordErrors)}
						</ul>
						: <></>
					}
				</div>
				<div>
					<Component.Input
						options={{
							labelText: 'password confirm',
							name: 'password-confirm',
							type: 'password',
							placeholder: 'Password Confirm',
						}}
					/>
					{validationErrors?.['password-confirmErrors'] ?
						<ul>
							{cve(validationErrors['password-confirmErrors'])}
						</ul>
						: <></>
					}
				</div>
				<button>Save Settings</button>
			</form>
		</div>
	);
}

export default SettingsSecurity;
