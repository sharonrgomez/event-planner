import Head from 'next/head'
import App from '../App'
import {AuthContextProvider, GlobalProvider} from '../context'

export const Home = () => (
	<div>
		<Head>
			<title>Event planner</title>
			<link rel='icon' href='/favicon.ico' />
		</Head>

		<main>
			<AuthContextProvider>
				<GlobalProvider>
					<App />
				</GlobalProvider>
			</AuthContextProvider>
		</main>
	</div>
)

export default Home
