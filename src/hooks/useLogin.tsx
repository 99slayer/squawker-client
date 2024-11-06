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

function useLogin() {
	const {
		setAppUsername,
		setAppNickname,
		setAppPfp
	} = useContext(AppContext) as AppContextInterface;
	const navigate = useNavigate();
	const [validationErrors, setValidationErrors] = useState<Record<string, string[]> | null>(null);

	const handleLogin = useCallback(async (e: FormEvent) => {
		setValidationErrors(null);
		const res = await login(e);
		const data: ReturnDataInterface = await res.json();

		if (data.username) setAppUsername(data.username);
		if (data.nickname) setAppNickname(data.nickname);
		if (data.pfp) setAppPfp(data.pfp);
		if (data.errors) setValidationErrors(data.errors);
		if (res.ok) navigate('/main');
	}, [navigate, setAppUsername, setAppNickname, setAppPfp]);

	return { handleLogin, validationErrors };
}

export default useLogin;
