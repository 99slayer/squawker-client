import { useCallback, useEffect, useState } from 'react';
import { ConnectCardData } from '../types';
import { user } from '../api/api';

function useFetchFollowers(username: string, userCount: number = 0) {
	const [users, setUsers] = useState<ConnectCardData[]>([]);

	const fetchFollowers = useCallback(async () => {
		if (!username) return;

		const res: Response = await user
			.getUserFollowers(null, username, userCount);
		const data: ConnectCardData[] = await res.json();
		setUsers(prev => {
			if (prev[0]?.username === data[0]?.username) return prev;
			return [...prev, ...data];
		});
	}, [username, userCount]);

	useEffect(() => {
		fetchFollowers();
	}, [fetchFollowers]);

	return { users };
}

export default useFetchFollowers;
