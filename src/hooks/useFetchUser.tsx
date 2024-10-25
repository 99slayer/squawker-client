import { useCallback, useEffect, useState } from 'react';
import { UserInterface } from '../types';
import { user } from '../api/api';

function useFetchUser(username: string) {
	const [currentUser, setCurrentUser] = useState<UserInterface | null>(null);
	const [isUser, setIsUser] = useState<boolean>(false);
	const [following, setFollowing] = useState<boolean>(false);
	const [header, setHeader] = useState<string | null | undefined>(null);

	const fetchUser = useCallback(async () => {
		if (!username) return;

		const res: Response = await user.getUser(null, username);
		const data: { user: UserInterface, isUser: boolean } = await res.json();

		setCurrentUser(data.user);
		setIsUser(data.isUser);
		setFollowing(Boolean(data.user.isFollowing));
		setHeader(data.user.profile_header);
	}, [username]);

	const changeFollowing = (x: boolean) => {
		setFollowing(x);
	};

	const changeHeader = (x: string) => {
		setHeader(x);
	};

	useEffect(() => {
		fetchUser();
	}, [fetchUser]);

	return {
		currentUser,
		isUser,
		following,
		changeFollowing,
		header,
		changeHeader,
	};
}

export default useFetchUser;
