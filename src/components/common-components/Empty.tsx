function Empty({ text }: { text: string }) {
	return (
		<div>
			<p className='text-center whitespace-pre-line'>{text}</p>
		</div>
	);
}

export default Empty;
