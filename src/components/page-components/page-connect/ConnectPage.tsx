import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { ConnectCardData } from '../../../types';
import Component from '../../Component';
import useFetchUsers from '../../../hooks/useFetchUsers';

function ConnectPage() {
	const [userCount, setUserCount] = useState<number>(0);
	const { users }: { users: ConnectCardData[] } = useFetchUsers(userCount);

	function createFollowerCards(userArr: ConnectCardData[]): JSX.Element[] {
		const cards: JSX.Element[] = [];
		userArr.map((user) => {
			cards.push(<li key={uuid()}><Component.UserCard data={user} /></li>);
		});

		return cards;
	}

	return (
		(users.length > 0 ?
			<div
				className='flex flex-col'
			>
				<Component.Back />
				<ul className="mt-2 flex flex-col gap-2">
					{createFollowerCards(users)}
				</ul>
				{userCount > users.length ?
					<></> :
					<button
						className='p-2 border-[2px] border-black self-center'
						onClick={() => setUserCount(prev => prev + 10)}
					>
						GET MORE
					</button>
				}
			</div>
			:
			<div>THIS WEBSITE HAS NO USERS D:</div>
		)
	);
}

export default ConnectPage;
