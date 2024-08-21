import { forwardRef, useImperativeHandle, useRef } from 'react';

type Props = {
	toggle: (ref: React.RefObject<HTMLDialogElement>) => void;
}

const SignupModal = forwardRef<HTMLDialogElement, Props>(({ toggle }, forwardedRef) => {
	const ref = useRef<HTMLDialogElement>(null);
	useImperativeHandle(forwardedRef, () => ref.current as HTMLDialogElement);

	return (
		<dialog
			ref={ref}
			className='translate-y-[-220px] bg-transparent'
		>
			<div className='p-4 flex flex-col items-stretch gap-4 border-2 border-black bg-gray-300'>
				<div className='flex'>
					<h1 className='text-3xl font-bold text-white'>SIGNUP</h1>
					<button
						onClick={() => { toggle(ref); }}
						className='ml-auto'
					>
						X
					</button>
				</div>
				<form className='flex flex-col gap-4'>
					<input
						type='text'
						name='username'
						placeholder='username'
						className='p-1'
					/>
					<input
						type='text'
						name='email'
						placeholder='email'
						className='p-1'
					/>
					<input
						type='text'
						name='password'
						placeholder='password'
						className='p-1'
					/>
					<input
						type='text'
						name='password-confirm'
						placeholder='password confirm'
						className='p-1'
					/>
					<button className='rounded-xl bg-gray-200'>login</button>
				</form>
			</div>
		</dialog>
	);
});

export default SignupModal;
