import { useCallback, useEffect, useState } from 'react';
import { ConnectCardData } from '../types';
import { user } from '../api/api';

function useFetchFollowers(username: string, userCount: number = 0) {
	const [users, setUsers] = useState<ConnectCardData[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<unknown>(null);

	const fetchFollowers = useCallback(async () => {
		setLoading(true);
		setError(null);

		try {
			if (!username) throw new Error('Problem fetching followers.');

			const res: Response = await user
				.getUserFollowers(null, username, userCount);
			const data: ConnectCardData[] = await res.json();
			setUsers(prev => {
				if (prev[0]?.username === data[0]?.username) return prev;
				return [...prev, ...data];
			});
		} catch (err) {
			setError(err);
		} finally {
			setLoading(false);
		}
	}, [username, userCount]);

	useEffect(() => {
		fetchFollowers();
	}, [fetchFollowers]);

	return { users, loading, error, refetch: fetchFollowers };
}

export default useFetchFollowers;
