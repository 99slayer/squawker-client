import { useState } from 'react';
import Component from '../../Component';
import useFetchUsers from '../../../hooks/useFetchUsers';
import Err from '../../Err';
import Spinner from '../../Spinner';
import { createUserCards } from '../../componentUtil';

function ConnectPage() {
	const [userCount, setUserCount] = useState<number>(0);
	const { users, loading, error, refetch } = useFetchUsers(userCount);

	return (error ?
		<Err refetch={refetch} /> :
		<div className='flex flex-col'>
			<Component.Back />
			<ul className="mt-2 flex flex-col gap-2">
				{createUserCards(users)}
			</ul>
			{loading ?
				<Spinner /> :
				<div className='self-center'>
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
	);
}

export default ConnectPage;
