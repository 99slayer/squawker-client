import { useCallback, useEffect, useState } from 'react';
import { ConnectCardData } from '../types';
import { user } from '../api/api';

function useFetchUsers(userCount: number = 0) {
	const [users, setUsers] = useState<ConnectCardData[]>([]);

	const fetchUsers = useCallback(async () => {
		const res: Response = await user.getUsers(null, userCount);
		const data: ConnectCardData[] = await res.json();
		setUsers(prev => {
			if (prev[0]?.username === data[0]?.username) return prev;
			return [...prev, ...data];
		});
	}, [userCount]);

	useEffect(() => {
		fetchUsers();
	}, [fetchUsers]);

	return { users };
}

export default useFetchUsers;
