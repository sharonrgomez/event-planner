import Head from 'next/head'
import {App} from './App'

export const Home = () => {
	return (
		<div>
			<Head>
				<title>Create Next App</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main>
				<App />
			</main>
		</div>
	)
}

export default Home
