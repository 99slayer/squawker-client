import React, {
	forwardRef,
	useImperativeHandle,
	useRef,
	useState
} from 'react';
import { FormEvent } from '../../types';
import Component from '../Component';
import hook from '../../hooks/hooks';

type Props = {
	toggle: (ref: React.RefObject<HTMLDialogElement>) => void;
}

const LoginModal = forwardRef<HTMLDialogElement, Props>(
	({ toggle }, forwardedRef) => {
		const ref = useRef<HTMLDialogElement>(null);
		useImperativeHandle(forwardedRef, () => ref.current as HTMLDialogElement);
		const {
			handleLogin,
			validationErrors,
			setValidationErrors
		} = hook.useLogin();
		const [passVis, setPassVis] = useState<boolean>(false);

		return (
			<dialog
				className='mt-[140px] rounded-lg text-white/50 bg-gray-onyx'
				ref={ref}
				onClose={() => {
					setValidationErrors(null);
					setPassVis(false);
				}}
			>
				<div
					className='p-4 flex flex-col items-stretch gap-2'
				>
					<div className='flex'>
						<h1 className='text-2xl font-bold'>LOGIN</h1>
						<button
							className='self-start size-5 ml-auto flex justify-center items-center rounded-sm font-semibold hover:text-white hover:bg-red-500'
							onClick={() => toggle(ref)}
						>
							X
						</button>
					</div>
					<form
						className='flex flex-col gap-2'
						onSubmit={
							async (e: FormEvent) => handleLogin(e)
						}
						autoComplete='off'
					>
						<div className='flex flex-col gap-2'>
							<div
								className='flex items-center'
							>
								<label
									className='min-w-[100px]'
									htmlFor='username'
								>
									Username
								</label>
								<input
									className='p-1 rounded-md bg-gray-outer-space'
									type='text'
									placeholder='Username'
									name='username'
									maxLength={50}
									required
								/>
							</div>
							<Component.ValidationErrors errors={validationErrors?.usernameErrors} />
						</div>
						<div className='flex flex-col gap-2'>
							<div
								className='flex items-center'
							>
								<label
									className='min-w-[100px]'
									htmlFor='password'
								>
									Password
								</label>
								<input
									className='p-1 rounded-md bg-gray-outer-space'
									type={passVis ? 'text' : 'password'}
									placeholder='Password'
									name='password'
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
						</div>
						<button
							className='px-4 self-end rounded-full font-semibold hover:text-white bg-gray-outer-space'
						>
							LOGIN
						</button>
					</form>
				</div>
			</dialog>
		);
	}
);

export default LoginModal;
