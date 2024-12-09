import {
	useCallback,
	useContext,
	useState
} from 'react';
import { useNavigate } from 'react-router-dom';
import {
	AppContextInterface,
	FormEvent,
	ReturnDataInterface
} from '../types';
import { AppContext } from '../App';
import { user } from '../api/api';
import { supaLogin } from '../supabase';

function useSignup() {
	const {
		setAppUsername,
		setAppNickname
	} = useContext(AppContext) as AppContextInterface;
	const navigate = useNavigate();
	const [validationErrors, setErrors] = useState<Record<string, string[]> | null>(null);

	const handleSignup = useCallback(async (e: FormEvent) => {
		setErrors(null);
		const res = await user.createUser(e);
		const data: ReturnDataInterface = await res.json();

		if (data.username) setAppUsername(data.username);
		if (data.nickname) setAppNickname(data.nickname);
		if (data.errors) setErrors(data.errors);
		if (res.ok) {
			await supaLogin();
			navigate('/squawker-client/main');
		}
	}, [navigate, setAppUsername, setAppNickname]);

	const setValidationErrors = useCallback(
		(value: Record<string, string[]> | null) => {
			setErrors(value);
		}, []
	);

	return { handleSignup, validationErrors, setValidationErrors };
}

export default useSignup;
