/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}'
	],
	theme: {
		extend: {
			colors: {
				black: {
					'eerie-black': '#232628',
					'night': '#141517'
				},
				gray: {
					'onyx': '#383d40',
					'outer-space': '#4c5357'
				},
				green: {
					'harlequin': '#53FC18'
				}
			},
		},
	},
	plugins: [],
};

