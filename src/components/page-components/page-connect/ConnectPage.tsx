import { useState } from 'react';
import Component from '../../Component';
import hook from '../../../hooks/hooks';
import { createUserCards } from '../../componentUtil';

function ConnectPage() {
	const [userCount, setUserCount] = useState<number>(0);
	const {
		users,
		loading,
		error,
		refetch
	} = hook.useFetchUsers(userCount);

	return (error ?
		<Component.Err refetch={refetch} /> :
		<div className='flex flex-col relative'>
			<div
				className='pt-2 max-[1020px]:pt-[45px] sticky top-0 bg-black-night'
			>
				<Component.Back />
			</div>
			<ul className="mt-2 flex flex-col items-stretch gap-4">
				{createUserCards(users)}
			</ul>
			{loading ?
				<Component.Spinner /> :
				<div className='self-center'>
					{users.length === 0 ?
						<Component.Empty text='There are no users.' /> :
						<div>
							{userCount !== users.length ?
								<button
									className='mt-2 px-5 py-1 rounded-full hover:text-white hover:bg-gray-onyx font-semibold'
									onClick={() => setUserCount(users.length)}
								>
									GET MORE
								</button>
								: <></>
							}
						</div>
					}
				</div>
			}
		</div>
	);
}

export default ConnectPage;
