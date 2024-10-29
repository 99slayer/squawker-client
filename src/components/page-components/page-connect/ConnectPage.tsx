import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { ConnectCardData } from '../../../types';
import Component from '../../Component';
import useFetchUsers from '../../../hooks/useFetchUsers';
import Err from '../../Err';
import Spinner from '../../Spinner';

function ConnectPage() {
	const [userCount, setUserCount] = useState<number>(0);
	const { users, loading, error, refetch } = useFetchUsers(userCount);

	function createFollowerCards(userArr: ConnectCardData[]): JSX.Element[] {
		const cards: JSX.Element[] = [];
		userArr.map((user) => {
			cards.push(<li key={uuid()}><Component.UserCard data={user} /></li>);
		});

		return cards;
	}

	return (error ?
		<Err refetch={refetch} /> :
		<div className='flex flex-col'>
			<Component.Back />
			<ul className="mt-2 flex flex-col gap-2">
				{createFollowerCards(users)}
			</ul>
			{loading ?
				<Spinner /> :
				<button
					className='p-2 border-[2px] border-black self-center'
					onClick={() => setUserCount(prev => prev + 10)}
				>
					GET MORE
				</button>
			}
		</div>
	);
}

export default ConnectPage;
