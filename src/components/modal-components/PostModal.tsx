import React, { forwardRef, useImperativeHandle, useRef } from 'react';

type Props = {
	toggle: (ref: React.RefObject<HTMLDialogElement>) => void;
}

const PostModal = forwardRef<HTMLDialogElement, Props>(({ toggle }, forwardedRef) => {
	const ref = useRef<HTMLDialogElement>(null);
	useImperativeHandle(forwardedRef, () => ref.current as HTMLDialogElement);

	return (
		<dialog
			ref={ref}
			className='p-2 translate-y-[-320px] border-2 border-black bg-gray-300'
		>
			<div className='flex flex-col gap-4'>
				<button
					onClick={() => { toggle(ref); }}
					className='size-5 flex justify-center items-center self-end bg-white'
				>
					X
				</button>
				<div className='flex items-stretch gap-2'>
					<div className='flex'>
						<span className='size-10 rounded-full bg-black'></span>
					</div>
					<textarea placeholder='whats up?' className='w-80 min-h-24 p-2 resize-none rounded-xl'></textarea>
				</div>
				<div className='flex gap-2'>
					<button className='p-1 bg-white'>i.</button>
					<button className='p-1 bg-white'>o.</button>
					<button className='ml-auto p-1 bg-white'>POST</button>
				</div>
			</div>
		</dialog>
	);
});

export default PostModal;
