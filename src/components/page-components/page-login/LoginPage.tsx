import React, { useContext, useRef } from 'react';
import Component from '../../Component';
import { user } from '../../../api/api';
import { AppContext } from '../../../App';
import { AppContextInterface, ReturnDataInterface } from '../../../types';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
	const {
		setAppUsername,
		setAppNickname,
		setAppPfp
	} = useContext(AppContext) as AppContextInterface;
	const navigate = useNavigate();
	const loginRef = useRef<HTMLDialogElement>(null);
	const signupRef = useRef<HTMLDialogElement>(null);

	function toggle(ref: React.RefObject<HTMLDialogElement>): void {
		const form: HTMLFormElement | null = ref.current!.querySelector('form');
		form!.reset();

		if (ref.current?.hasAttribute('open')) {
			ref.current.close();
		} else {
			ref.current?.showModal();
		}
	}

	return (
		<div className='flex justify-center'>
			<div className='mt-[220px] p-6 flex flex-col rounded-lg bg-gray-onyx'>
				<div className='flex flex-col justify-evenly gap-4'>
					<button
						className='px-3 rounded-full hover:text-white bg-gray-outer-space'
						onClick={() => { toggle(loginRef); }}
					>
						LOGIN
					</button>
					<button
						className='px-3 rounded-full hover:text-white bg-gray-outer-space'
						onClick={() => { toggle(signupRef); }}
					>
						SIGNUP
					</button>
					<button
						className='px-3 rounded-full hover:text-white bg-gray-outer-space'
						onClick={async (e) => {
							const res: Response = await user.createGuestUser(e);
							const data: ReturnDataInterface = await res.json();

							if (data.username) setAppUsername(data.username);
							if (data.nickname) setAppNickname(data.nickname);
							if (data.pfp) setAppPfp(data.pfp);
							if (res.ok) navigate('/main');
						}}
					>
						LOGIN AS GUEST
					</button>
				</div>
				<div>
					<Component.LoginModal ref={loginRef} toggle={toggle} />
					<Component.SignupModal ref={signupRef} toggle={toggle} />
				</div>
			</div>
		</div>
	);
}

export default LoginPage;
