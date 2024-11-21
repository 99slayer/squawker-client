import {
	forwardRef,
	useImperativeHandle,
	useRef,
	useState
} from 'react';
import Component from '../Component';
import hook from '../../hooks/hooks';
import { FormEvent } from '../../types';

type Props = {
	toggle: (ref: React.RefObject<HTMLDialogElement>) => void;
}

const SignupModal = forwardRef<HTMLDialogElement, Props>(
	({ toggle }, forwardedRef) => {
		const ref = useRef<HTMLDialogElement>(null);
		useImperativeHandle(forwardedRef, () => ref.current as HTMLDialogElement);
		const {
			handleSignup,
			validationErrors,
			setValidationErrors
		} = hook.useSignup();
		const [passVis, setPassVis] = useState<boolean>(false);
		const [confirmVis, setConfirmVis] = useState<boolean>(false);

		return (
			<dialog
				ref={ref}
				className='mt-[140px] rounded-lg text-white/50 bg-gray-onyx'
				onClose={() => {
					setValidationErrors(null);
					setPassVis(false);
					setConfirmVis(false);
				}}
			>
				<div
					className='p-4 flex flex-col items-stretch gap-2'
				>
					<div className='flex'>
						<h1 className='text-2xl font-bold'>SIGNUP</h1>
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
							async (e: FormEvent) => handleSignup(e)
						}
						autoComplete='off'
					>
						<div className='flex flex-col gap-2'>
							<div
								className='flex items-center'
							>
								<label
									className='min-w-[150px]'
									htmlFor='username'
								>
									Username
								</label>
								<input
									className='p-1 rounded-md bg-gray-outer-space'
									type='text'
									name='username'
									placeholder='Username'
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
									className='min-w-[150px]'
									htmlFor='email'
								>
									Email
								</label>
								<input
									className='p-1 rounded-md bg-gray-outer-space'
									type='email'
									name='email'
									placeholder='Email'
									minLength={3}
									maxLength={320}
									required
								/>
							</div>
							<Component.ValidationErrors errors={validationErrors?.emailErrors} />
						</div>
						<div className='flex flex-col gap-2'>
							<div
								className='flex items-center'
							>
								<label
									className='min-w-[150px]'
									htmlFor='password'
								>
									Password
								</label>
								<input
									className='p-1 rounded-md bg-gray-outer-space'
									type={passVis ? 'text' : 'password'}
									name='password'
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
						</div>
						<div className='flex flex-col gap-2'>
							<div
								className='flex items-center'
							>
								<label
									className='min-w-[150px]'
									htmlFor='password-confirm'
								>
									Password Confirm
								</label>
								<input
									className='p-1 rounded-md bg-gray-outer-space'
									type={confirmVis ? 'text' : 'password'}
									name='password-confirm'
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
						</div>
						<button
							className='px-4 self-end rounded-full font-semibold hover:text-white bg-gray-outer-space'
						>
							SIGNUP
						</button>
					</form>
				</div>
			</dialog>
		);
	}
);

export default SignupModal;
