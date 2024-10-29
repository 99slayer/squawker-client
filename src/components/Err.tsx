function Err({ refetch }: { refetch: () => Promise<void> }) {
	return (
		<div
			className='flex flex-col items-center gap-2'
		>
			<p>Something went wrong.</p>
			<button
				className='px-2 border-[2px] border-black'
				onClick={async () => { refetch(); }}
			>Retry</button>
		</div>
	);
}

export default Err;
