import { useCallback, useEffect, useState } from 'react';
import { auth } from '../api/api';

function useVerifyUser(username: string) {
	const [isUser, setIsUser] = useState<boolean>(false);

	const verifyUser = useCallback(async () => {
		if (!username) throw new Error('Problem verifying user.');

		const res: Response = await auth.verify(null, username);
		const data: boolean = await res.json();
		setIsUser(data);
	}, [username]);

	useEffect(() => {
		verifyUser();
	}, [verifyUser]);

	return { isUser };
}

export default useVerifyUser;
