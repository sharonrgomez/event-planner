/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./pages/components/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['var(--font-roboto)'],
				mono: ['var(--font-roboto-mono)'],
			},
			gridTemplateColumns: {
				'1/5': '1fr 5fr',
			},
		},
	},
	plugins: [require('@tailwindcss/forms')],
}
