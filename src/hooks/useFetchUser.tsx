import { useCallback, useEffect, useState } from 'react';
import { UserInterface } from '../types';
import { user } from '../api/api';

function useFetchUser(username: string) {
	const [currentUser, setCurrentUser] = useState<UserInterface | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [userError, setError] = useState<unknown>(null);

	const fetchUser = useCallback(async () => {
		setLoading(true);
		setError(null);

		try {
			if (!username) throw new Error('Problem fetching user.');

			const res: Response = await user.getUser(null, username);
			const data: UserInterface = await res.json();
			setCurrentUser(data);
		} catch (err: unknown) {
			setError(err);
		} finally {
			setLoading(false);
		}
	}, [username]);

	useEffect(() => {
		fetchUser();
	}, [fetchUser]);

	return { currentUser, loading, userError, refetch: fetchUser };
}

export default useFetchUser;
