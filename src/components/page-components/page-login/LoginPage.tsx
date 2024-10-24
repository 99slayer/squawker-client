import React, { useContext, useRef } from 'react';
import Component from '../../Component';
import { user } from '../../../api/api';
import { AppContext } from '../../../App';
import { AppContextInterface } from '../../../types';
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
		if (ref.current?.hasAttribute('open')) {
			ref.current.close();
		} else {
			ref.current?.showModal();
		}
	}

	return (
		<div className='flex justify-center'>
			<div className='mt-[260px] p-4 flex flex-col gap-4 border-2 border-black'>
				<h1>LOGIN PAGE</h1>
				<div className='flex flex-col gap-4'>
					<button
						onClick={() => { toggle(loginRef); }}
						className='border-2 border-black'
					>
						LOGIN
					</button>
					<button
						onClick={() => { toggle(signupRef); }}
						className='border-2 border-black'
					>
						SIGNUP
					</button>
					<button
						className='px-2 border-2 border-black'
						onClick={async (e) => {
							const data: {
								username: string,
								nickname: string,
								pfp: string
							} = await user.createGuestUser(e);
							setAppUsername(data.username);
							setAppNickname(data.nickname);
							setAppPfp(data.pfp);
							navigate('/main');
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
