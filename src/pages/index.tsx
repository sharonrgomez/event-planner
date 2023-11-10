import Head from 'next/head'
import App from '../App'
import {AuthProvider, GlobalProvider} from '../context'
import SnackbarProvider from '../context/SnackbarContext'

export const Home = () => (
	<div>
		<Head>
			<title>Event planner</title>
			<link rel='icon' href='/favicon.ico' />
		</Head>

		<main>
			<AuthProvider>
				<SnackbarProvider>
					<GlobalProvider>
						<App />
					</GlobalProvider>
				</SnackbarProvider>
			</AuthProvider>
		</main>
	</div>
)

export default Home
