import {
	forwardRef,
	useImperativeHandle,
	useRef
} from 'react';
import { createValidationErrors as cve } from '../componentUtil';
import hook from '../../hooks/hooks';
import { FormEvent } from '../../types';

type Props = {
	toggle: (ref: React.RefObject<HTMLDialogElement>) => void;
}

const SignupModal = forwardRef<HTMLDialogElement, Props>(
	({ toggle }, forwardedRef) => {
		const ref = useRef<HTMLDialogElement>(null);
		useImperativeHandle(forwardedRef, () => ref.current as HTMLDialogElement);
		const { handleSignup, validationErrors } = hook.useSignup();

		return (
			<dialog
				ref={ref}
				className='translate-y-[-220px] bg-transparent'
			>
				<div
					className='p-4 flex flex-col items-stretch gap-4 border-2 border-black bg-gray-300'
				>
					<div className='flex'>
						<h1 className='text-3xl font-bold text-white'>SIGNUP</h1>
						<button
							onClick={() => { toggle(ref); }}
							className='ml-auto'
						>
							X
						</button>
					</div>
					<form
						className='flex flex-col gap-2'
						onSubmit={
							async (e: FormEvent) => handleSignup(e)
						}
					>
						<div>
							<div
								className='flex items-center'
							>
								<label
									className='min-w-[140px]'
									htmlFor='username'
								>
									Username
								</label>
								<input
									type='text'
									name='username'
									placeholder='Username'
									className='p-1'
								/>
							</div>
							{validationErrors?.usernameErrors ?
								<ul>
									{cve(validationErrors.usernameErrors)}
								</ul>
								: <></>
							}
						</div>
						<div>
							<div
								className='flex items-center'
							>
								<label
									className='min-w-[140px]'
									htmlFor='email'
								>
									Email
								</label>
								<input
									type='text'
									name='email'
									placeholder='Email'
									className='p-1'
								/>
							</div>
							{validationErrors?.usernameErrors ?
								<ul>
									{cve(validationErrors.emailErrors)}
								</ul>
								: <></>
							}
						</div>
						<div>
							<div
								className='flex items-center'
							>
								<label
									className='min-w-[140px]'
									htmlFor='password'
								>
									Password
								</label>
								<input
									type='password'
									name='password'
									placeholder='Password'
									className='p-1'
								/>
							</div>
							{validationErrors?.passwordErrors ?
								<ul>
									{cve(validationErrors.passwordErrors)}
								</ul>
								: <></>
							}
						</div>
						<div>
							<div
								className='flex items-center'
							>
								<label
									className='min-w-[140px]'
									htmlFor='password-confirm'
								>
									Password Confirm
								</label>
								<input
									type='password'
									name='password-confirm'
									placeholder='Password Confirm'
									className='p-1'
								/>
							</div>
							{validationErrors?.['password-confirmErrors'] ?
								<ul>
									{cve(validationErrors['password-confirmErrors'])}
								</ul>
								: <></>
							}
						</div>
						<button className='px-4 self-end rounded-full bg-gray-200'>sign up</button>
					</form>
				</div>
			</dialog>
		);
	}
);

export default SignupModal;
