import Head from 'next/head'
import {App} from './App'
import {MonthProvider} from './context'

export const Home = () => {
	return (
		<div>
			<Head>
				<title>Create Next App</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main>
				<MonthProvider>
					<App />
				</MonthProvider>
			</main>
		</div>
	)
}

export default Home
