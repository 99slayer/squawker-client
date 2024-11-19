import { createValidationErrors } from '../componentUtil';

function ValidationErrors({ errors }: { errors: string[] | undefined }) {
	return (errors ?
		<ul
			className='px-2 py-1 text-sm rounded-md bg-red-500'
		>
			{createValidationErrors(errors)}
		</ul>
		: <></>
	);
}

export default ValidationErrors;
