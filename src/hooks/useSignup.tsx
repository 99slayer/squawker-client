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

function useSignup() {
	const {
		setAppUsername,
		setAppNickname
	} = useContext(AppContext) as AppContextInterface;
	const navigate = useNavigate();
	const [validationErrors, setValidationErrors] = useState<Record<string, string[]> | null>(null);

	const handleSignup = useCallback(async (e: FormEvent) => {
		setValidationErrors(null);
		const res = await user.createUser(e);
		const data: ReturnDataInterface = await res.json();

		if (data.username) setAppUsername(data.username);
		if (data.nickname) setAppNickname(data.nickname);
		if (data.errors) setValidationErrors(data.errors);
		if (res.ok) navigate('/main');
	}, [navigate, setAppUsername, setAppNickname]);

	return { handleSignup, validationErrors };
}

export default useSignup;
