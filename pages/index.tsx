import Head from 'next/head'
import {App} from './App'
import {GlobalProvider} from './context'

export const Home = () => {
	return (
		<div>
			<Head>
				<title>Create Next App</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main>
				<GlobalProvider>
					<App />
				</GlobalProvider>
			</main>
		</div>
	)
}

export default Home
