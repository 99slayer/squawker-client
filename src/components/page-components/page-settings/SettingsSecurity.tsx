import { useContext, useState } from 'react';
import { user } from '../../../api/api';
import { AppContext } from '../../../App';
import { AppContextInterface, ReturnDataInterface } from '../../../types';
import Component from '../../Component';

function SettingsSecurity() {
	const { appUsername } = useContext(AppContext) as AppContextInterface;
	const [validationErrors, setValidationErrors] = useState<Record<string, string[]> | null>(null);
	const [passVis, setPassVis] = useState<boolean>(false);
	const [confirmVis, setConfirmVis] = useState<boolean>(false);

	return (
		<div className="flex-1">
			<h1 className="font-semibold">SECURITY</h1>
			<form
				className="flex flex-col items-stretch gap-2"
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
				<div
					className="flex-1 flex items-center"
				>
					<label
						className='min-w-[150px] max-[650px]:hidden'
						htmlFor='password'
					>
						Password
					</label>
					<input
						className='flex-1 p-1 rounded-md bg-gray-outer-space'
						name='password'
						type={passVis ? 'text' : 'password'}
						placeholder='Password'
						minLength={8}
						maxLength={200}
						required
					/>
					<button
						className='ml-2 p-[2px] flex rounded-md bg-gray-outer-space'
						type='button'
						onClick={() => setPassVis(!passVis)}
					>
						<span
							className={`text-[26px] material-symbols-outlined hover:text-white ${passVis ? 'filled text-white' : ''}`}
						>
							visibility
						</span>
					</button>
				</div>
				<Component.ValidationErrors errors={validationErrors?.passwordErrors} />
				<div
					className="flex-1 flex items-center"
				>
					<label
						className='min-w-[150px] max-[650px]:hidden'
						htmlFor='password-confirm'
					>
						Password Confirm
					</label>
					<input
						className='flex-1 p-1 rounded-md bg-gray-outer-space'
						name='password-confirm'
						type={confirmVis ? 'text' : 'password'}
						placeholder='Password Confirm'
						minLength={8}
						maxLength={200}
						required
					/>
					<button
						className='ml-2 p-[2px] flex rounded-md bg-gray-outer-space'
						type='button'
						onClick={() => setConfirmVis(!confirmVis)}
					>
						<span
							className={`text-[26px] material-symbols-outlined hover:text-white ${confirmVis ? 'filled text-white' : ''}`}
						>
							visibility
						</span>
					</button>
				</div>
				<Component.ValidationErrors errors={validationErrors?.['password-confirmErrors']} />
				<button
					className='self-center px-4 py-1 rounded-full text-sm font-semibold hover:text-white bg-gray-outer-space'
				>SAVE</button>
			</form>
		</div>
	);
}

export default SettingsSecurity;
