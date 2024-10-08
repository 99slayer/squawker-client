import React, { useRef } from 'react';
import Component from '../../Component';

function LoginPage() {
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
