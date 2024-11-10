import React, {
	forwardRef,
	useImperativeHandle,
	useRef
} from 'react';
import { FormEvent } from '../../types';
import { createValidationErrors as cve } from '../componentUtil';
import hook from '../../hooks/hooks';

type Props = {
	toggle: (ref: React.RefObject<HTMLDialogElement>) => void;
}

const LoginModal = forwardRef<HTMLDialogElement, Props>(
	({ toggle }, forwardedRef) => {
		const ref = useRef<HTMLDialogElement>(null);
		useImperativeHandle(forwardedRef, () => ref.current as HTMLDialogElement);
		const { handleLogin, validationErrors } = hook.useLogin();

		return (
			<dialog
				ref={ref}
				className='translate-y-[-220px] bg-transparent'>
				<div
					className='p-4 flex flex-col items-stretch gap-4 border-2 border-black bg-gray-300'
				>
					<div className='flex'>
						<h1 className='text-3xl font-bold text-white'>LOGIN</h1>
						<button
							onClick={() => { toggle(ref); }}
							className='ml-auto'
						>
							X
						</button>
					</div>
					<form
						className='flex flex-col gap-4'
						onSubmit={
							async (e: FormEvent) => handleLogin(e)
						}
					>
						<div>
							<input
								type='text'
								placeholder='username'
								name='username'
								className='p-1'
							/>
							{validationErrors?.usernameErrors ?
								<ul>
									{cve(validationErrors.usernameErrors)}
								</ul>
								: <></>
							}
						</div>
						<div>
							<input
								type='password'
								placeholder='password'
								name='password'
								className='p-1'
							/>
							{validationErrors?.passwordErrors ?
								<ul>
									{cve(validationErrors.passwordErrors)}
								</ul>
								: <></>
							}
						</div>
						<button className='rounded-xl bg-gray-200'>login</button>
					</form>
				</div>
			</dialog>
		);
	}
);

export default LoginModal;
