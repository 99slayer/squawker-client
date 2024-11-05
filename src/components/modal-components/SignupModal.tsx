import {
	forwardRef,
	useContext,
	useImperativeHandle,
	useRef,
	useState
} from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../App';
import { AppContextInterface, ReturnDataInterface } from '../../types';
import { user } from '../../api/api';
import { createValidationErrors as cve } from '../componentUtil';

type Props = {
	toggle: (ref: React.RefObject<HTMLDialogElement>) => void;
}

const SignupModal = forwardRef<HTMLDialogElement, Props>(({ toggle }, forwardedRef) => {
	const {
		setAppUsername,
		setAppNickname
	} = useContext(AppContext) as AppContextInterface;
	const navigate = useNavigate();
	const ref = useRef<HTMLDialogElement>(null);
	useImperativeHandle(forwardedRef, () => ref.current as HTMLDialogElement);
	const [validationErrors, setValidationErrors] = useState<Record<string, string[]> | null>(null);

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
					className='flex flex-col gap-4'
					onSubmit={
						async (e) => {
							const res: Response = await user.createUser(e);
							const data: ReturnDataInterface = await res.json();

							if (data.username) setAppUsername(data.username);
							if (data.nickname) setAppNickname(data.nickname);
							if (data.errors) setValidationErrors(data.errors);
							if (res.ok) navigate('/main');
						}
					}
				>
					<div>
						<input
							type='text'
							name='username'
							placeholder='username'
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
							type='text'
							name='email'
							placeholder='email'
							className='p-1'
						/>
						{validationErrors?.usernameErrors ?
							<ul>
								{cve(validationErrors.emailErrors)}
							</ul>
							: <></>
						}
					</div>
					<div>
						<input
							type='text'
							name='password'
							placeholder='password'
							className='p-1'
						/>
						{validationErrors?.passwordErrors ?
							<ul>
								{cve(validationErrors.passwordErrors)}
							</ul>
							: <></>
						}
					</div>
					<div>
						<input
							type='text'
							name='password-confirm'
							placeholder='password confirm'
							className='p-1'
						/>
						{validationErrors?.['password-confirmErrors'] ?
							<ul>
								{cve(validationErrors['password-confirmErrors'])}
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

export default SignupModal;
