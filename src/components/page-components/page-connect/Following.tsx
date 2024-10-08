import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { user } from '../../../api/api';
import { ConnectCardData } from '../../../types';
import Component from '../../Component';

function Following() {
	const { state } = useLocation();
	const [users, setUsers] = useState<ConnectCardData[]>([]);
	const [userCount, setUserCount] = useState<number>(0);

	const pullFollowing = useCallback(async () => {
		const res: Response = await user
			.getUserFollowing(null, state.username, userCount);
		const data: ConnectCardData[] = await res.json();

		setUsers(prev => {
			if (prev[0]?.username === data[0]?.username) return prev;
			return [...prev, ...data];
		});
	}, [state, userCount]);

	useEffect(() => {
		pullFollowing();
	}, [pullFollowing]);

	function createFollowingCards(userArr: ConnectCardData[]): JSX.Element[] {
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
				<ul className="mt-2 flex flex-col gap-2">
					{createFollowingCards(users)}
				</ul>
				{userCount > users.length ?
					<></> :
					<button
						className='p-2 border-[2px] border-black self-center'
						onClick={() => setUserCount(prev => prev + 4)}
					>
						GET MORE
					</button>
				}
			</div>
			:
			<div>THIS USER IS NOT FOLLOWING ANYONE YET</div>
		)
	);
}

export default Following;
