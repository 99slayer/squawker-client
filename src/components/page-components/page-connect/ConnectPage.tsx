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
		<div className='flex flex-col'>
			<Component.Back />
			<ul className="mt-2 flex flex-col gap-2">
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
									className='p-2 border-[2px] border-black'
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
