function SettingsPage() {
	return (
		<div className="mt-12 p-2 flex gap-2 border-2 border-black">
			<div className="flex-2 flex flex-col border-2 border-black">
				<h1 className="p-2">SETTINGS</h1>
				<div className="flex flex-col items-start">
					<button className="p-2">Account</button>
					<button className="p-2">Security</button>
					<button className="p-2">Privacy</button>
					<button className="p-2">Display</button>
				</div>
			</div>
			<div className="flex-1 border-2 border-black">
				<h1 className="p-2">MENU</h1>
				<div className="flex flex-col items-start">
					<button className="p-2">username</button>
					<button className="p-2">nickname</button>
					<button className="p-2">email</button>
					<button className="p-2">password</button>
				</div>
			</div>
		</div>
	);
}

export default SettingsPage;
