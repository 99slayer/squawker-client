import { useLocation, useNavigate } from 'react-router-dom';

function InvalidRoutePage() {
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<div
			className="p-2 pl-4 flex flex-col"
		>
			<button
				className='mt-[30px] mr-auto'
				type='button'
				onClick={() => {
					navigate('/');
				}}
			>
				<span className="material-symbols-outlined">
					arrow_back
				</span>
			</button>
			<p>{`Woops! The ${location.pathname} page does not exist.`}</p>
		</div>
	);
}

export default InvalidRoutePage;
