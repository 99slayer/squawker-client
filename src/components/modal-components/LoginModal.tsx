import React, {
	forwardRef,
	useContext,
	useImperativeHandle,
	useRef,
	useState
} from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/auth';
import {
	AppContextInterface,
	FormEvent,
	ReturnDataInterface
} from '../../types';
import { AppContext } from '../../App';
import { createValidationErrors as cve } from '../componentUtil';

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
	const [validationErrors, setValidationErrors] = useState<Record<string, string[]> | null>(null);

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
							const res = await login(e);
							const data: ReturnDataInterface = await res.json();

							if (data.username) setAppUsername(data.username);
							if (data.nickname) setAppNickname(data.nickname);
							if (data.pfp) setAppPfp(data.pfp);
							if (data.errors) setValidationErrors(data.errors);
							if (res.ok) navigate('/main');
						}
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
});

export default LoginModal;
