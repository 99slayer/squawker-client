import { useCallback, useContext, useState } from 'react';
import { AppContext } from '../App';
import { AppContextInterface, FormEvent, ReturnDataInterface } from '../types';
import { user } from '../api/api';

function useUpdateUser() {
	const {
		appUsername,
		setAppUsername,
		setAppNickname,
		setAppPfp
	} = useContext(AppContext) as AppContextInterface;
	const [returnData, setReturnData] = useState<ReturnDataInterface | null>(null);
	const [validationErrors, setErrors] = useState<Record<string, string[]> | null>(null);

	const handleUpdateUser = useCallback(
		async (e: FormEvent) => {
			let success: boolean = false;
			const res: Response = await user.updateUserAccount(e, appUsername);
			const data: ReturnDataInterface = await res.json();
			setReturnData(data);

			if (data.username) setAppUsername(data.username);
			if (data.nickname) setAppNickname(data.nickname);
			if (data.pfp || data.pfp === null) setAppPfp(data.pfp);
			if (data.errors) setErrors(data.errors);
			if (res.ok) success = true;

			return success;
		}, [appUsername, setAppUsername, setAppNickname, setAppPfp]
	);

	const setValidationErrors = useCallback(
		(value: Record<string, string[]> | null) => {
			setErrors(value);
		}, []
	);

	return {
		handleUpdateUser,
		returnData,
		validationErrors,
		setValidationErrors
	};
}

export default useUpdateUser;
