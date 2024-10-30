import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { ConnectCardData } from '../../../types';
import Component from '../../Component';
import useFetchFollowing from '../../../hooks/useFetchFollowing';
import Err from '../../Err';
import Spinner from '../../Spinner';

function Following() {
	const { state } = useLocation();
	const [userCount, setUserCount] = useState<number>(0);
	const {
		users,
		loading,
		error,
		refetch
	} = useFetchFollowing(state.username, userCount);

	function createFollowingCards(userArr: ConnectCardData[]): JSX.Element[] {
		const cards: JSX.Element[] = [];
		userArr.map((user) => {
			cards.push(<li key={uuid()}><Component.UserCard data={user} /></li>);
		});

		return cards;
	}

	return (error ?
		<Err refetch={refetch} /> :
		<div className='flex flex-col'>
			<ul className="mt-2 flex flex-col gap-2">
				{createFollowingCards(users)}
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

export default Following;
