import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import hook from '../../../hooks/hooks';
import { createUserCards } from '../../componentUtil';
import Component from '../../Component';

function Following() {
	const { state } = useLocation();
	const [userCount, setUserCount] = useState<number>(0);
	const {
		users,
		loading,
		error,
		refetch
	} = hook.useFetchFollowing(state.username, userCount);

	return (error ?
		<Component.Err refetch={refetch} /> :
		<div className='flex flex-col'>
			<ul className="mt-2 flex flex-col gap-2">
				{createUserCards(users)}
			</ul>
			{loading ?
				<Component.Spinner /> :
				<div className='self-center'>
					{users.length === 0 ?
						<Component.Empty text={'User is not following anyone.'} /> :
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

export default Following;
