import Component from '../../Component';
import hook from '../../../hooks/hooks';

function SettingsAccount() {
	const { handleUpdateUser, validationErrors } = hook.useUpdateUser();

	return (
		<div className="flex-1">
			<h1 className="font-semibold">ACCOUNT</h1>
			<form
				className="flex flex-col items-stretch gap-2"
				onSubmit={async (e) => {
					const success: boolean = await handleUpdateUser(e);
					if (success) window.location.reload();
				}}
			>
				<div className='flex flex-col gap-2'>
					<div className="flex items-center">
						<label
							className="min-w-[150px] max-[650px]:hidden"
							htmlFor={'username'}
						>
							Username
						</label>
						<input
							className="flex-1 p-1 rounded-md bg-gray-outer-space"
							name={'username'}
							type='text'
							placeholder={'Username'}
						/>
					</div>
					<Component.ValidationErrors errors={validationErrors?.usernameErrors} />
				</div>
				<div className='flex flex-col gap-2'>
					<div className="flex items-center">
						<label
							className="min-w-[150px] max-[650px]:hidden"
							htmlFor={'nickname'}
						>
							Nickname
						</label>
						<input
							className="flex-1 p-1 rounded-md bg-gray-outer-space"
							name={'nickname'}
							type='text'
							placeholder={'Nickname'}
						/>
					</div>
					<Component.ValidationErrors errors={validationErrors?.nicknameErrors} />
				</div>
				<div className='flex flex-col gap-2'>
					<div className="flex items-center">
						<label
							className="min-w-[150px] max-[650px]:hidden"
							htmlFor={'email'}
						>
							Email
						</label>
						<input
							className="flex-1 p-1 rounded-md bg-gray-outer-space"
							name={'email'}
							type='email'
							placeholder={'Email'}
						/>
					</div>
					<Component.ValidationErrors errors={validationErrors?.emailErrors} />
				</div>
				<div className='flex flex-col gap-2'>
					<div className="flex">
						<label
							className="min-w-[150px] max-[650px]:hidden"
							htmlFor='profile_text'
						>
							Profile Text
						</label>
						<textarea
							className="flex-1 min-h-24 p-1 resize-none rounded-md bg-gray-outer-space"
							name={'profile_text'}
							placeholder={'Profile Text'}
						/>
					</div>
					<Component.ValidationErrors errors={validationErrors?.profile_textErrors} />
				</div>
				<button
					className='self-center px-4 py-1 rounded-full text-sm font-semibold hover:text-white bg-gray-outer-space'
				>
					SAVE
				</button>
			</form>
		</div>
	);
}

export default SettingsAccount;
