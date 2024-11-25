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
import { login } from '../api/auth';
import { supaLogin } from '../supabase';

function useLogin() {
	const {
		setAppUsername,
		setAppNickname,
		setAppPfp
	} = useContext(AppContext) as AppContextInterface;
	const navigate = useNavigate();
	const [validationErrors, setErrors] = useState<Record<string, string[]> | null>(null);

	const handleLogin = useCallback(async (e: FormEvent) => {
		setErrors(null);
		const res = await login(e);
		const data: ReturnDataInterface = await res.json();

		if (data.username) setAppUsername(data.username);
		if (data.nickname) setAppNickname(data.nickname);
		if (data.pfp) setAppPfp(data.pfp);
		if (data.errors) setErrors(data.errors);
		if (res.ok) {
			await supaLogin();
			navigate('/main');
		}
	}, [navigate, setAppUsername, setAppNickname, setAppPfp]);

	const setValidationErrors = useCallback(
		(value: Record<string, string[]> | null) => {
			setErrors(value);
		}, []
	);

	return { handleLogin, validationErrors, setValidationErrors };
}

export default useLogin;
