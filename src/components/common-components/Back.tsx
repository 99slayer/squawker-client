import { useNavigate } from 'react-router-dom';

function Back() {
	const navigate = useNavigate();
	return (
		<div>
			<button
				className='mr-auto hover:text-white'
				type='button'
				onClick={() => {
					navigate(-1);
				}}
			>
				<span className="material-symbols-outlined">
					arrow_back
				</span>
			</button>
		</div>
	);
}

export default Back;
