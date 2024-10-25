import { useCallback, useEffect, useState } from 'react';
import { UserInterface } from '../types';
import { user } from '../api/api';

function useFetchUser(username: string) {
	const [currentUser, setCurrentUser] = useState<UserInterface | null>(null);

	const fetchUser = useCallback(async () => {
		if (!username) return;

		const res: Response = await user.getUser(null, username);
		const data: UserInterface = await res.json();
		setCurrentUser(data);
	}, [username]);

	useEffect(() => {
		fetchUser();
	}, [fetchUser]);

	return { currentUser };
}

export default useFetchUser;
