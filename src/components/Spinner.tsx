function Spinner() {
	return (
		<div className='flex-1 mt-[40px] flex justify-center'>
			<div
				className='w-14 h-14 flex items-center justify-center border-x-[6px] border-t-[6px] border-b-[6px] border-b-white border-zinc-900 rounded-full animate-spin'
			></div>
		</div>
	);
}

export default Spinner;
