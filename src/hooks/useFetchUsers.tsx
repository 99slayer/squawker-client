import { useCallback, useEffect, useState } from 'react';
import { ConnectCardData } from '../types';
import { user } from '../api/api';

function useFetchUsers(userCount: number = 0) {
	const [users, setUsers] = useState<ConnectCardData[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<unknown>(null);

	const fetchUsers = useCallback(async () => {
		setLoading(true);
		setError(null);

		try {
			const res: Response = await user.getUsers(null, userCount);
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
	}, [userCount]);

	useEffect(() => {
		fetchUsers();
	}, [fetchUsers]);

	return { users, loading, error, refetch: fetchUsers };
}

export default useFetchUsers;
