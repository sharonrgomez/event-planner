import '../styles/globals.css'
import {Roboto} from 'next/font/google'
import type {AppProps} from 'next/app'
import dayjs from 'dayjs'

var customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

const inter = Roboto({
	subsets: ['latin'],
	variable: '--font-roboto',
	weight: ['300', '400', '500', '700'],
})

export default function App({Component, pageProps}: AppProps) {
	return (
		<main className={`${inter.variable} font-sans`}>
			<Component {...pageProps} />
		</main>
	)
}
