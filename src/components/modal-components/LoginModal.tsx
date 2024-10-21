import React, { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/auth';
import { AppContextInterface, FormEvent } from '../../types';
import { AppContext } from '../../App';

type Props = {
	toggle: (ref: React.RefObject<HTMLDialogElement>) => void;
}

const LoginModal = forwardRef<HTMLDialogElement, Props>(({ toggle }, forwardedRef) => {
	const {
		setAppUsername,
		setAppNickname,
		setAppPfp
	} = useContext(AppContext) as AppContextInterface;
	const navigate = useNavigate();
	const ref = useRef<HTMLDialogElement>(null);
	useImperativeHandle(forwardedRef, () => ref.current as HTMLDialogElement);

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
						async (e: FormEvent) => {
							const data = await login(e);
							setAppUsername(data.username);
							setAppNickname(data.nickname);
							setAppPfp(data.pfp);
							navigate('/main');
						}
					}
				>
					<input
						type='text'
						placeholder='username'
						name='username'
						className='p-1'
					/>
					<input
						type='password'
						placeholder='password'
						name='password'
						className='p-1'
					/>
					<button className='rounded-xl bg-gray-200'>login</button>
				</form>
			</div>
		</dialog>
	);
});

export default LoginModal;
