import { v4 as uuid } from 'uuid';

export function createValidationErrors(arr: string[]): JSX.Element[] {
	console.log(arr);
	const elements: JSX.Element[] = [];
	arr.map((x) => {
		elements.push(<li key={uuid()}>{x}</li>);
	});
	return elements;
}
