import { useCallback, useEffect, useState } from 'react';
import { ConnectCardData } from '../types';
import { user } from '../api/api';

function useFetchFollowing(username: string, userCount: number = 0) {
	const [users, setUsers] = useState<ConnectCardData[]>([]);

	const fetchFollowing = useCallback(async () => {
		if (!username) return;

		const res: Response = await user
			.getUserFollowing(null, username, userCount);
		const data: ConnectCardData[] = await res.json();
		setUsers(prev => {
			if (prev[0]?.username === data[0]?.username) return prev;
			return [...prev, ...data];
		});
	}, [username, userCount]);

	useEffect(() => {
		fetchFollowing();
	}, [fetchFollowing]);

	return { users };
}

export default useFetchFollowing;
