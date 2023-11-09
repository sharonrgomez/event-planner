import Head from 'next/head'
import App from '../App'
import {AuthContext, AuthContextProvider, GlobalProvider} from '../context'
import {useRouter} from 'next/router'
import {useContext, useEffect} from 'react'

export const Home = () => {
	const {user} = useContext(AuthContext) as any
	const router = useRouter()

	useEffect(() => {
		if (user == null) {
			console.log('not logged in')
			// router.push('/signup')
		}
	}, [user])

	return (
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
}

export default Home
