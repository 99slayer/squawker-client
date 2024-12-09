import React, { useContext, useRef, useState } from 'react';
import Component from '../../Component';
import { user } from '../../../api/api';
import { AppContext } from '../../../App';
import { AppContextInterface, ReturnDataInterface } from '../../../types';
import { useNavigate } from 'react-router-dom';
import { supaLogout } from '../../../supabase';

function LoginPage() {
	const {
		setAppUsername,
		setAppNickname,
		setAppPfp
	} = useContext(AppContext) as AppContextInterface;
	const navigate = useNavigate();
	const loginRef = useRef<HTMLDialogElement>(null);
	const signupRef = useRef<HTMLDialogElement>(null);
	const [infoHover, setInfoHover] = useState<boolean>(false);

	function toggle(ref: React.RefObject<HTMLDialogElement>): void {
		const form: HTMLFormElement | null = ref.current!.querySelector('form');
		form!.reset();

		if (ref.current?.hasAttribute('open')) {
			ref.current.close();
		} else {
			ref.current?.showModal();
		}
	}

	function handleOpen(openRef: React.RefObject<HTMLDialogElement>) {
		const firstInput: HTMLInputElement | null = openRef!.current!.querySelector('input:first-of-type');
		firstInput!.focus();
	}

	return (
		<div className='flex flex-col items-center justify-center gap-2'>
			<div className='mt-[220px] p-6 flex flex-col rounded-lg bg-gray-onyx'>
				<div className='flex flex-col justify-evenly gap-4'>
					<button
						className='px-3 rounded-full hover:text-white bg-gray-outer-space'
						onClick={() => {
							toggle(loginRef);
							handleOpen(loginRef);
						}}
					>
						LOGIN
					</button>
					<button
						className='px-3 rounded-full hover:text-white bg-gray-outer-space'
						onClick={() => {
							toggle(signupRef);
							handleOpen(signupRef);
						}}
					>
						SIGNUP
					</button>
					<div className='flex items-stretch'>
						<button
							className='px-3 rounded-l-full hover:text-white bg-gray-outer-space'
							onClick={async (e) => {
								supaLogout();
								const res: Response = await user.createGuestUser(e);
								const data: ReturnDataInterface = await res.json();
								if (data.username) setAppUsername(data.username);
								if (data.nickname) setAppNickname(data.nickname);
								if (data.pfp) setAppPfp(data.pfp);
								if (res.ok) navigate('/squawker-client/main');
							}}
						>
							LOGIN AS GUEST
						</button>
						<div
							className='px-[3px] flex justify-center items-center rounded-r-full bg-blue-500 cursor-help'
							onMouseOver={() => setInfoHover(true)}
							onMouseLeave={() => setInfoHover(false)}
						>
							<span className="material-symbols-outlined text-[22px] text-white font-semibold">
								info
							</span>
						</div>
					</div>
				</div>
				<div>
					<Component.LoginModal ref={loginRef} toggle={toggle} />
					<Component.SignupModal ref={signupRef} toggle={toggle} />
				</div>
			</div>
			<div
				className={`w-[245px] p-2 rounded-lg text-sm text-white bg-blue-500 ${infoHover ? 'opacity-100' : 'opacity-0'}`}
			>
				<p>
					This will log you into a temporary guest account. You will be able to browse user accounts and posts, but you will not be able to interact with them or create your own.
				</p>
			</div>
		</div>
	);
}

export default LoginPage;
