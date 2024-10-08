import { useCallback, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { user } from '../../../api/api';
import { ConnectCardData } from '../../../types';
import Component from '../../Component';

function ConnectPage() {
	const [users, setUsers] = useState<ConnectCardData[]>([]);
	const [userCount, setUserCount] = useState<number>(0);

	const pullUsers = useCallback(async () => {
		const res: Response = await user.getUsers(null, userCount);
		const data: ConnectCardData[] = await res.json();

		setUsers(prev => {
			if (prev[0]?.username === data[0]?.username) return prev;
			return [...prev, ...data];
		});
	}, [userCount]);

	useEffect(() => {
		pullUsers();
	}, [pullUsers]);

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
