function Err({ refetch }: { refetch: (() => Promise<void>) | undefined }) {
	if (!refetch) return;

	return (
		<div
			className='pt-4 flex flex-col items-center gap-4'
		>
			<p
				className='text-xl'
			>
				Something went wrong.
			</p>
			<button
				className='px-5 py-1 rounded-full hover:text-white bg-gray-outer-space  font-semibold'
				onClick={async () => { refetch(); }}
			>Retry</button>
		</div>
	);
}

export default Err;
