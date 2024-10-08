export function Input({ options }: {
	options: {
		labelText: string;
		name: string;
		type: string;
		placeholder: string;
	}
}) {
	return (
		<div
			className="flex-1 flex gap-2"
		>
			<label
				className="min-w-[140px]"
				htmlFor={options.name}
			>
				{options.labelText}
			</label>
			<input
				className="p-[2px] border-[2px] border-black"
				name={options.name}
				type={options.type}
				placeholder={options.placeholder}
			/>
		</div>
	);
}

export function TextArea({ options }: {
	options: {
		labelText: string;
		name: string;
		placeholder: string;
	}
}) {
	return (
		<div
			className="flex-1 flex gap-2"
		>
			<label
				className="min-w-[140px]"
				htmlFor=""
			>
				{options.labelText}
			</label>
			<textarea
				className="p-[2px] border-[2px] border-black"
				name={options.name}
				placeholder={options.placeholder}
			/>
		</div>
	);
}
